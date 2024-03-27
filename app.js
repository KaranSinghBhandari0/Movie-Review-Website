let input = document.querySelector('input');
let search_btn = document.querySelector('button');
let movieContainer = document.querySelector('.movieContainer');

// function to show movie data on screen
let showMovieData = (data) => {
    // removing previous movie
    movieContainer.innerHTML = "";
    // array destructuring assignment 
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster, BoxOffice, Director} = data;

    // movie info
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2><p><strong>Rating: &#11088</strong>${imdbRating}</p><p><strong>Type: </strong>${Genre}</p><p><strong>Released Date: </strong>${Released}</p><p><strong>Duration: </strong>${Runtime}</p><p><strong>Director: </strong>${Director}</p><p><strong>Cast: </strong>${Actors}</p><p><strong>Collection: </strong>${BoxOffice}</p><p><strong>Plot: </strong>${Plot}</p>`;
    
    //movie Poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src=${Poster}>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

// function to get movie data from api
let getMovieInfo = async (movieName) => {
    let url = "https://www.omdbapi.com/?apikey=f2531369&t=" + movieName;  
    const response = await fetch(url);
    const data = await response.json();

    if(data.Response == "False") {
        movieContainer.innerHTML = "";
        alert("No movie found");
        return;
    } else {
        return showMovieData(data);   
    }
}

// event listner for button
search_btn.addEventListener("click",(e)=> {
    e.preventDefault();
    let movieName = input.value;
    if(movieName !== "") {
        getMovieInfo(movieName);
    } else {
        movieContainer.innerHTML = "";
        alert("Enter a movie name");
    }
});