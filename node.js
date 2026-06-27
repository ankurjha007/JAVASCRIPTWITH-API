const API_KEY = "511c4db4";

const searchInput = document.getElementById("search input");
const searchBtn = document.getElementById("search-btn");
const moviesContainer = document.getElementById("movies");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;
let currentSearch = "";



async function getMovies() {
    if (currentSearch=="")return

    let response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${currentSearch}&page=${currentPage}`
    );
      let data = await response.json();
         movies.innerHTML = "";
        
    if (data.Response=="False"){
        movies.innerHTML="<h2>no movies found</h2>";
    }

  
 data.Search.forEach(movie => {
        movies.innerHTML += `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                <p>${movie.Type}</p>
            </div>
        `;

    });

    pageNumber.textContent = currentPage;
}

searchBtn.addEventListener("click", () => {
    currentSearch = searchInput.value;
         currentPage = 1;

    getMovies();
});

nextBtn.addEventListener("click", () => {
       currentPage++;
       getMovies();

});

prevBtn.addEventListener("click", () => {
      if(currentPage > 1){
         currentPage--;
         getMovies();

    }

});