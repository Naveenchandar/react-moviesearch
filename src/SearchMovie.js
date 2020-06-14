import React, { useState } from 'react';
import MovieCard from './MovieCard';

function SearchMovie() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const handleChange = (e) => {
        setQuery(e.target.value);
    }
    const searchMovies = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=8b40eae734096a4234c35315c17d1351&language=en-US&query=${query}&page=1&include_adult=false`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log('data:', data)
            setMovies(data.results);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query" onChange={handleChange}
                    placeholder="i.e. Jurassic Park" />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
        </>
    )
}

export default React.memo(SearchMovie);
