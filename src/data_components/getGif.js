async function getGif(searchTerm) {
  const apiKey = "AIzaSyAbjBP2DJwiM-Xz4cAp1-Nznijstg2n_GY";
  const limit = 20;
  const searchUrl =
    "https://tenor.googleapis.com/v2/search?q=" +
    searchTerm +
    "&key=" +
    apiKey +
    "&limit=" +
    limit;

  const response = await fetch(searchUrl);
  const gifsData = await response.json();

  const randomIndex = Math.floor(Math.random() * (limit - 1));
  const gifData = gifsData.results[randomIndex].media_formats.tinygif;
  return gifData;
}

export { getGif };
