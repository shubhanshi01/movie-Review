const Apilink =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&api_key=82af078342bbced67d3ec7334ab9fb3d&page=1";

const Imglink = "https://image.tmdb.org/t/p/w1280";

const searchApi =
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=82af078342bbced67d3ec7334ab9fb3d&query=";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmFmMDc4MzQyYmJjZWQ2N2QzZWM3MzM0YWI5ZmIzZCIsIm5iZiI6MTc1OTYwMDIzMC43MzksInN1YiI6IjY4ZTE1ZTY2MTlmMjYzMTNmMjljYTM4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e8vhPSs5qFLMZwW9hPx3Ge5wYgXIsSISzfGq4dIk81g",
  },
};

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovie(Apilink, options);

function returnMovie(url, options) {
  fetch(url, options)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results);
      main.innerHTML = ""; // clear old content

      data.results.forEach((element) => {
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card");

        const div_row = document.createElement("div");
        div_row.setAttribute("class", "row");

        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("id", "image");

        const title = document.createElement("h3");
        title.setAttribute("id", "title");

        const center = document.createElement("center");

        title.innerHTML = `${element.title}`;
        image.src = Imglink + element.poster_path;

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
      });
    })
    .catch((err) => console.error("Error fetching movies:", err));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value.trim();
  if (searchItem) {
    returnMovie(searchApi + searchItem, options);
    search.value = "";
  }
});
