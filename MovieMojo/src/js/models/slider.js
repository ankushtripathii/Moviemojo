// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE4ODAyNWE2MGM3ZGI3ZDZlZjRhODZiMzZiOWUxZSIsInN1YiI6IjY0YzI2YjMwMTNhMzIwMDExYzVmZGFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AYDUhcuETW-ZyDQY7IXmlPrwLopphUEQD9JHk954v3o'
//     }
// };
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const sliderMain = document.getElementById("sliderContainer")


// fetch('https://api.themoviedb.org/3/movie/now_playing', options)
//     .then(response => response.json())
//     .then(data => {
//         featureMovies(data.results)
//     }).catch(err => console.error(err));


export function featureMovies(data) {
    sliderMain.innerHTML = "";
    data.forEach(movie => {
        const { title, poster_path, overview } = movie;
        const featureEl = document.createElement("div")
        featureEl.classList.add("slider");
        featureEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" style="width: 100%; height: 550px" />
        <div class="text_content">
          <h2>${title}</h2>
          <p class="movie_Desc">
            ${overview}
          </p>
        </div>
        `
        sliderMain.appendChild(featureEl)

    })




}