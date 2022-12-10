from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import pandas as pd

driver = webdriver.Chrome('/Users/joshuayoo/Downloads/chromedriver')
driver.get('https://musicstax.com/')

# uses Selenium keys to search for the album on the home page of the website 
def searchForAlbum(artist, album):
    search = driver.find_element_by_name('q')

    search.send_keys(artist + " " + album)
    search.send_keys(Keys.RETURN)


# takes the website format of a song length and converts it to total seconds
def convertLengthToSeconds(length_stat):
    minutes = int(length_stat[:2])
    seconds = int(length_stat[-2:])
    total_seconds = (minutes * 60) + seconds
    return total_seconds


# takes the length in seconds and re-formats it back into the colon format
def convertSecondsToLength(seconds):
    round(seconds)
    minutes = int(seconds // 60)
    seconds_remaining = int(seconds % 60)
    str_seconds_remaining = str(seconds_remaining)
    if str_seconds_remaining[-1:] == "0":
        str_seconds_remaining += "0"
    formatted_time = str(minutes) + ":" + str_seconds_remaining
    return formatted_time


# gathers all of the relevant stats for a given song
    # takes in the two containers on the website that combined hold all of the relevant statistics as the parameters
def gatherStatsForSong(container_1, container_2):
    array_of_stats = []
    
    all_stats_1 = container_1.find_elements_by_class_name('song-fact-container')
    all_stats_2 = container_2.find_elements_by_class_name('song-fact-3-stat')

    # grabs length of song (in seconds)
    length_container = all_stats_1[0]
    length_stat = length_container.find_element_by_class_name('song-fact-container-stat').text
    length = convertLengthToSeconds(length_stat)
    array_of_stats.append(length)

    # grabs tempo of song (in bpm)
    tempo_container = all_stats_1[1]
    tempo = int(tempo_container.find_element_by_class_name('song-fact-container-stat').text)
    array_of_stats.append(tempo)

    # simplifies the process of grabbing all of the stats from the second container
    def grabStatContainer2(all_stats_2, index):
        container = all_stats_2[index]
        container_stat = container.find_element_by_class_name('song-bar-statistic-number').text
        if len(container_stat) == 3:
            stat = int(container_stat[:2])
        elif len(container_stat) == 2:
            stat = int(container_stat[:1])
        return stat

    # grabs popularity of song
    popularity = grabStatContainer2(all_stats_2, 0)
    array_of_stats.append(popularity)

    # grabs danceability of song
    danceability = grabStatContainer2(all_stats_2, 1)
    array_of_stats.append(danceability)

    # grabs energy of song
    energy = grabStatContainer2(all_stats_2, 2)
    array_of_stats.append(energy)

    # grabs positiveness of song
    positiveness = grabStatContainer2(all_stats_2, 3)
    array_of_stats.append(positiveness)

    # grabs speechiness of song
    speechiness = grabStatContainer2(all_stats_2, 4)
    array_of_stats.append(speechiness)

    # grabs liveness of song
    liveness = grabStatContainer2(all_stats_2, 5)
    array_of_stats.append(liveness)

    return array_of_stats


def calculateAlbumStats(tracks):
    # holds the data for the stats of each individual song, for all of the songs
    all_tracks_individual_data = []
    # creates a dictionary that stores all of the total album stats
        # values are constantly updated after grabbing data from each song
    album_averages = {
        # avg_length
        0 : 0,
        # avg_tempo
        1 : 0,
        # avg_popularity
        2 : 0,
        # avg_danceability
        3 : 0,
        # avg_energy
        4 : 0,
        # avg_positiveness
        5 : 0,
        # avg_speechiness
        6 : 0,
        # avg_liveness
        7 : 0
    }

    for i in range(len(tracks)):
        all_tracks = driver.find_element_by_class_name('album-tracks')
        tracks = all_tracks.find_elements_by_tag_name('a')      
        current_track = tracks[i]
        current_track.click()
        
        song_title = driver.find_element_by_class_name('song-title').text
        print(song_title)

        stats_container_1 = driver.find_element_by_class_name('song-4-facts-container')
        stats_container_2 = driver.find_element_by_class_name('song-3-facts-container')

        # gathers stats for the song
        stats = gatherStatsForSong(stats_container_1, stats_container_2)
        stats.insert(0, str(song_title))
        all_tracks_individual_data.append(stats)
        
        # updates the running totals for each statistic in the album
        for i in range(1, len(stats)):
            album_averages[i - 1] += stats[i]
        
        driver.back()
    
    # calculates the averages by dividing by the number of tracks
    for i in range(len(album_averages)):
        album_averages[i] = round((album_averages[i] / len(tracks)), 2)
        if i == 0:
            print(album_averages[i])
            album_averages[i] = [convertSecondsToLength(album_averages[i]), int(album_averages[i])]
    
    all_album_stats = list(album_averages.values())
    all_album_stats.append(len(tracks))
    all_album_stats.append(all_tracks_individual_data)

    return all_album_stats


def main():
    excel_file = '/Volumes/GoogleDrive-117007981319040166239/My Drive/2022-23 (Junior - 1st Sem)/ITP 404 (Advanced Front-End Web Development)/AFE Final Project/AFE Final Project Spotify Data.xlsx'
    album_data = pd.read_excel(excel_file)
    all_albums = album_data['album'].to_list()
    all_artists = album_data['artist'].to_list()

    album_data_columns = list(album_data.columns)
    df = pd.DataFrame(columns=album_data_columns)

    for i in range(0, len[all_albums]):
        driver.get('https://musicstax.com/')
        searchForAlbum(all_artists[i], all_albums[i])

        album_results = driver.find_elements_by_class_name('artist-search-container')
        for j in range(len(album_results)):     
            album_container = album_results[j]
            name = album_container.find_element_by_class_name('artist-search-name')
            album_name = name.find_element_by_tag_name('u')

            if album_name.text.lower() == all_albums[i].lower():
                album_container.click()
        
                all_tracks = driver.find_element_by_class_name('album-tracks')
                tracks = all_tracks.find_elements_by_tag_name('a')      

                all_album_stats = calculateAlbumStats(tracks)
                
                all_album_stats.insert(0, all_artists[i])
                all_album_stats.insert(0, all_albums[i])

                df.loc[i] = all_album_stats
                df.to_excel("/Users/joshuayoo/Desktop/test.xlsx", startrow = i, header = False)

                break
        
        
main()

