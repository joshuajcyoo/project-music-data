import { render, fireEvent } from "@testing-library/react/";
import Rating from "./Rating";

// Requirement: 10 Tests
test('component renders with baseline information', () => {
  const { getByText } = render(<Rating />);
  expect(getByText("Spotify")).toBeInTheDocument();
  expect(getByText("Stats")).toBeInTheDocument();
  expect(getByText("Length:")).toBeInTheDocument();
  expect(getByText("Tempo:")).toBeInTheDocument();
  expect(getByText("Popularity:")).toBeInTheDocument();
  expect(getByText("Danceability:")).toBeInTheDocument();
  expect(getByText("Energy:")).toBeInTheDocument();
  expect(getByText("Positiveness:")).toBeInTheDocument();
  expect(getByText("Liveness:")).toBeInTheDocument();
})

test('component returns correctly formatted title', () => {
  const {getByTestId} = render(
    <Rating />
  );

  expect(getByTestId("rating-title").innerHTML).toBe("<span data-testid=\"rating-title-spotify\" id=\"spotify\">Spotify</span> Stats");
});

test('component returns correct grid dimensions', () => {
  const {getByTestId} = render(
    <Rating />
  );
  expect(getByTestId("stat-container").childElementCount).toBe(3);
  expect(getByTestId("stat-row1").childElementCount).toBe(2);
  expect(getByTestId("stat-row2").childElementCount).toBe(3);
  expect(getByTestId("stat-row3").childElementCount).toBe(3);
});

test('component returns correct first row structure', () => {
  const {getByTestId} = render(
    <Rating />
  );

  expect(getByTestId("stat-row1").childNodes[0].childNodes[0].innerHTML).toBe(" Length:");
  expect(getByTestId("stat-row1").childNodes[0].childNodes[1].innerHTML).toBe(" /  s");
  expect(getByTestId("stat-row1").childNodes[1].childNodes[0].innerHTML).toBe(" Tempo:");
  expect(getByTestId("stat-row1").childNodes[1].childNodes[1].innerHTML).toBe(" (bpm)");
})

test('component returns correct second row structure', () => {
  const {getByTestId} = render(
    <Rating />
  );

  expect(getByTestId("stat-row2").childNodes[0].childNodes[0].innerHTML).toBe(" Popularity:");
  expect(getByTestId("stat-row2").childNodes[1].childNodes[0].innerHTML).toBe(" Danceability:");
  expect(getByTestId("stat-row2").childNodes[2].childNodes[0].innerHTML).toBe(" Energy:");
})

test('component returns correct third row structure', () => {
  const {getByTestId} = render(
    <Rating />
  );

  expect(getByTestId("stat-row3").childNodes[0].childNodes[0].innerHTML).toBe(" Positiveness:");
  expect(getByTestId("stat-row3").childNodes[1].childNodes[0].innerHTML).toBe(" Speechiness:");
  expect(getByTestId("stat-row3").childNodes[2].childNodes[0].innerHTML).toBe(" Liveness:");
})

test('component using an "Album" type returns correct titles', () => {
  const {getByTestId} = render(
    <Rating type="Album"/>
  );

  expect(getByTestId("stat-length-title").innerHTML).toBe("Avg Song Length:");
  expect(getByTestId("stat-tempo-title").innerHTML).toBe("Avg Tempo:");
  expect(getByTestId("stat-popularity-title").innerHTML).toBe("Avg Popularity:");
  expect(getByTestId("stat-danceability-title").innerHTML).toBe("Avg Danceability:");
  expect(getByTestId("stat-energy-title").innerHTML).toBe("Avg Energy:");
  expect(getByTestId("stat-positiveness-title").innerHTML).toBe("Avg Positiveness:");
  expect(getByTestId("stat-speechiness-title").innerHTML).toBe("Avg Speechiness:");
  expect(getByTestId("stat-liveness-title").innerHTML).toBe("Avg Liveness:");
});

test('component using a "Song" type returns correct titles', () => {
  const {getByTestId} = render(
    <Rating type="Song"/>
  );

  expect(getByTestId("stat-length-title").innerHTML).toBe("Song Length:");
  expect(getByTestId("stat-tempo-title").innerHTML).toBe("Song Tempo:");
  expect(getByTestId("stat-popularity-title").innerHTML).toBe("Song Popularity:");
  expect(getByTestId("stat-danceability-title").innerHTML).toBe("Song Danceability:");
  expect(getByTestId("stat-energy-title").innerHTML).toBe("Song Energy:");
  expect(getByTestId("stat-positiveness-title").innerHTML).toBe("Song Positiveness:");
  expect(getByTestId("stat-speechiness-title").innerHTML).toBe("Song Speechiness:");
  expect(getByTestId("stat-liveness-title").innerHTML).toBe("Song Liveness:");
});

test('component returns example Album info correct', () => {
  // Midnights by Taylor Swift
  const length_formattedA = "3:23";
  const length_secondsA = 203;
  const tempo_bpmA = 117.54;
  const popularityA = 89;
  const danceabilityA = 63.92;
  const energyA = 41.15;
  const positivenessA = 22.31;
  const speechinessA = 10.23;
  const livenessA = 15.92;

  const {getByTestId} = render(
    <Rating 
      length_formatted={length_formattedA}
      length_seconds={length_secondsA}
      tempo_bpm={tempo_bpmA}
      popularity={popularityA}
      danceability={danceabilityA}
      energy={energyA}
      positiveness={positivenessA}
      speechiness={speechinessA}
      liveness={livenessA}
    />
  )

  expect(getByTestId("stat-length").innerHTML).toBe("3:23 / 203 s");
  expect(getByTestId("stat-tempo").innerHTML).toBe("117.54 (bpm)");
  expect(getByTestId("stat-popularity").innerHTML).toBe("89");
  expect(getByTestId("stat-danceability").innerHTML).toBe("63.92");
  expect(getByTestId("stat-energy").innerHTML).toBe("41.15");
  expect(getByTestId("stat-positiveness").innerHTML).toBe("22.31");
  expect(getByTestId("stat-speechiness").innerHTML).toBe("10.23");
  expect(getByTestId("stat-liveness").innerHTML).toBe("15.92");
})

test('component returns example Song info correct', () => {
  // "Lavender Haze" - Midnights by Taylor Swift
  const length_formattedS = "3:22";
  const length_secondsS = 202;
  const tempo_bpmS = 97;
  const popularityS = 91;
  const danceabilityS = 73;
  const energyS = 44;
  const positivenessS = 10;
  const speechinessS = 8;
  const livenessS = 16;

  const {getByTestId} = render(
    <Rating 
      length_formatted={length_formattedS}
      length_seconds={length_secondsS}
      tempo_bpm={tempo_bpmS}
      popularity={popularityS}
      danceability={danceabilityS}
      energy={energyS}
      positiveness={positivenessS}
      speechiness={speechinessS}
      liveness={livenessS}
    />
  )

  expect(getByTestId("stat-length").innerHTML).toBe("3:22 / 202 s");
  expect(getByTestId("stat-tempo").innerHTML).toBe("97 (bpm)");
  expect(getByTestId("stat-popularity").innerHTML).toBe("91");
  expect(getByTestId("stat-danceability").innerHTML).toBe("73");
  expect(getByTestId("stat-energy").innerHTML).toBe("44");
  expect(getByTestId("stat-positiveness").innerHTML).toBe("10");
  expect(getByTestId("stat-speechiness").innerHTML).toBe("8");
  expect(getByTestId("stat-liveness").innerHTML).toBe("16");
})