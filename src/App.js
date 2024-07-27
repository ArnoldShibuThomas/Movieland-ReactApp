// Referenced: https://www.youtube.com/watch?v=b9eMGE7QtTk

import {React, useEffect, useState} from "react";
import './App.css';
import SearchIcon from './images/search.svg';
import MovieCard from './MovieCard';

// static variable for API url
const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=4b97f041';

// This will be a staitc movie object to test the container
// const movie1 = {
//     "Title": "Batman & Robin",
//     "Year": "1997",
//     "imdbID": "tt0118688",
//     "Type": "movie",
//     "Poster": "N/A"
//   }

const App = () =>{

    // We will use the state to set the movies we get back from api call
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovie = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        // Add the movies we get backf from the api call 
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovie('Batman');
    },[]);

    return(
        <div className="app">
            {/* This is the title of the website */}
            <h1>MovieLand</h1>

            {/* This is the search bar in our application */}
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value= {searchTerm}
                    onChange = { (e) => setSearchTerm(e.target.value)}
                />

                <img
                    src= {SearchIcon}
                    alt="search"
                    onClick={() => searchMovie(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {
                        movies.map((movie) =>(
                            <MovieCard movie={movie} />
                        ) )
                    }
                </div>
            ):(
                <div className="empty">
                    <h2>No Movies found</h2>
                </div>
            )}
        </div>
    );
}

export default App; 