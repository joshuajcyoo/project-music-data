from ast import literal_eval
import pandas as pd

csv_file = "/Volumes/GoogleDrive-117007981319040166239/My Drive/2022-23 (Junior - 1st Sem)/ITP 404 (Advanced Front-End Web Development)/AFE Final Project/AFE Final Project Data Get Songs.csv"

df = pd.read_csv(csv_file, converters={'all_tracks': pd.eval})
albums_column = df['album']
artists_column = df['artist']
tracks_column = df['all_tracks']

def convertSecondsToLength(seconds):
    minutes = int(seconds // 60)
    seconds_remaining = int(seconds % 60)
    str_seconds_remaining = str(seconds_remaining)
    if str_seconds_remaining == "0":
        str_seconds_remaining += "0"
    elif len(str_seconds_remaining) == 1:
        str_seconds_remaining = "0" + str_seconds_remaining

    formatted_time = str(minutes) + ":" + str_seconds_remaining
    return formatted_time

song_id = []
title = []
formatted_length = []
length = []
tempo = []
popularity = []
danceability = []
energy = []
positiveness = []
speechiness = []
liveness = []
album_id = []
album = []
artist = []

current_song_id = 0
for i in range(len(tracks_column)):
    album_tracks = tracks_column[i]
    for j in range(len(album_tracks)):
        song = album_tracks[j]
        album_id.append(i)
        album.append(albums_column[i])
        artist.append(artists_column[i])
        song_id.append(current_song_id)
        current_song_id += 1
       
        for k in range(len(song)):
            if k == 0:
                title.append(song[k])
            elif k == 1:
                s_formatted_length = convertSecondsToLength(song[k])
                formatted_length.append(s_formatted_length)
                length.append(song[k])
            elif k == 2:
                tempo.append(song[k])
            elif k == 3:
                popularity.append(song[k])
            elif k == 4:
                danceability.append(song[k])
            elif k == 5:
                energy.append(song[k])
            elif k == 6:
                positiveness.append(song[k])
            elif k == 7:
                speechiness.append(song[k])
            elif k == 8:
                liveness.append(song[k])
        
final_df = pd.DataFrame()

final_df['song_id'] = song_id
final_df['song_title'] = title
final_df['song_length_formatted'] = formatted_length
final_df['song_length_seconds'] = length
final_df['song_tempo'] = tempo
final_df['song_popularity'] = popularity
final_df['song_danceability'] = danceability
final_df['song_energy'] = energy
final_df['song_positiveness'] = positiveness
final_df['song_speechiness'] = speechiness
final_df['song_liveness'] = liveness
final_df['album_id'] = album_id
final_df['album'] = album
final_df['artist'] = artist

print(final_df)


final_df.to_excel("/Users/joshuayoo/Desktop/test.xlsx")