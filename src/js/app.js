const arrows = document.querySelectorAll(".arrow");
const bodyEl = document.body;


const movieList = document.querySelectorAll(".movie_list");
const toggleBall = document.querySelector(".toggle_ball");
const items = document.querySelectorAll(".container,.navbar_container,.searchbar,.sidebar,.sidebar_icon,.toggle,.movie,.populars,.movideTitl,.popular_list_container,.nav-links-item ")


// slider


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slider");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1 }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
}



// arrow
arrows.forEach((arrow, i) => {
  const itemNum = movieList[i].querySelectorAll("img").length;

  let count = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor((window.innerWidth / 270));
    count++;
    if (itemNum - (4 + count) + (4 - ratio) >= 0) {
      movieList[i].style.transform = `translateX(${(movieList[i]
        .computedStyleMap()
        .get("transform")[0].x.value = -300)}px)`;
    }
    else {
      movieList[i].style.transform = "translateX(0)";
      count = 0;
    }

  });

});


// toggle 

toggleBall.addEventListener("click", () => {
  items.forEach(item => {
    item.classList.toggle("active");


  })
  toggleBall.classList.toggle("active")



})













// API

const API_KEY = "api_key=76a88025a60c7db7d6ef4a86b36b9e1e";
const BASE_URL = "https://api.themoviedb.org/3";
const searchUrl = BASE_URL + '/search/movie?' + API_KEY;
// const API_URL = BASE_URL + "discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&" + API_KEY;

// getMovies(API_URL);
// function getMovies(url) {
//   fetch(url).then(res => res.json()).then(data => {
//     console.log(data)
//   }).catch(err => {
//     console.log(err)
//   })
// }

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NmE4ODAyNWE2MGM3ZGI3ZDZlZjRhODZiMzZiOWUxZSIsInN1YiI6IjY0YzI2YjMwMTNhMzIwMDExYzVmZGFhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AYDUhcuETW-ZyDQY7IXmlPrwLopphUEQD9JHk954v3o'
  }
};
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main")
const popularList = document.getElementById("main_list")




//NEW REALEASE

fetch('https://api.themoviedb.org/3/movie/now_playing', options)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    showMovies(data.results)
    // featureMovies(data.results)
  }).catch(err => console.error(err));


function showMovies(data) {

  main.innerHTML = "";

  data.forEach(movie => {
    const { title, poster_path, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie_list_item");
    movieEl.innerHTML = `
      <img class="movie_list_item_img" src="${IMG_URL + poster_path}" alt="" />
    `

    main.appendChild(movieEl);

  })

}

// POPULAR
// const searchUrl = "https://api.themoviedb.org/3/search/movie";
const API_URL = "https://api.themoviedb.org/3/movie/popular"

getMovies(API_URL)
function getMovies(url) {
  fetch(url, options)
    .then(response => response.json())
    .then(resp => {
      console.log(resp)
      showPopularMovies(resp.results);
    })
    .catch(err => console.error(err));
}


function showPopularMovies(response) {
  popularList.innerHTML = ""


  response.forEach(item => {
    const { title, poster_path, vote_average
      , id, overview } = item;
    const popularEl = document.createElement("div");
    popularEl.classList.add("popular_movie");
    popularEl.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}">
            <div class="movie_info">
              <h3>${title}</h3>
              <span class="green">${vote_average}</span>
            </div>
            <div class="overview">
              <h3>overview</h3>
              ${overview}
              <br/>
              <button class="trailer" id="${id}">Watch</button>
            </div>
    
    `
    // console.log(popularEl)
    popularList.appendChild(popularEl)
    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openNav(item);

    })

  })

}


// Open when someone clicks on the span element */
const overlayContainer = document.getElementById("overlayContent")
function openNav(item) {
  let id = item.id;
  console.log(id)
  fetch(BASE_URL + '/movie/' + id + '/videos?' + API_KEY).then(resp => resp.json()).then(videoData => {
    console.log(videoData.results)
    document.getElementById("myNav").style.width = "100%";
    if (videoData.results.length > 0) {
      const embed = [];
      videoData.results.forEach(video => {
        let { name, key, site, type } = video;
        if (site == "YouTube" && type == "Trailer") {
          embed.push(`
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `)
        }
      })
      overlayContainer.innerHTML = embed.join("");
      activeSite = 0;
      showVideos()


    } else {
      overlayContainer.innerHTML = `<h1>No result found</h1>`

    }

  })


}

let activeSite = 0;
function showVideos() {
  let embedClas = document.querySelectorAll(".embed");
  embedClas.forEach((embedTag, i) => {
    if (activeSite == i) {
      embedTag.classList.add("show");
      embedTag.classList.remove("hide")
    } else {
      embedTag.classList.add("hide")
      embedTag.classList.remove("show")
    }
  })


}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  // stop playing video on modal close
  const iframes = document.getElementsByTagName('iframe');
  if (iframes !== null) {
    for (let i = 0; i < iframes.length; i++) {
      iframes[i].src = iframes[i].src; //causes a reload so it stops playing, music, video, etc.
    }
  }
  document.getElementById("myNav").style.width = "0%";

}

//search
const searchForm = document.getElementById("search_bar")
const search = document.getElementById("search")

// fetch('https://api.themoviedb.org/3/search/movie', options)
//   .then(response => response.json())
//   .then(response => {
//     console.log(response)
//     searchMovie(response)
//   })
//   .catch(err => console.error(err));

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  console.log(searchTerm)
  if (searchTerm) {
    getMovies(searchUrl + "&query=" + searchTerm);
  }

})


// 
const navBtn = document.querySelector(".nav-btn");



navBtn.addEventListener("click", () => {
  let navLink = document.querySelector(".nav-links")
  if (navLink.style.display == "none") {
    navLink.style.display = "block";
  } else {
    navLink.style.display = "none";
  }


})

