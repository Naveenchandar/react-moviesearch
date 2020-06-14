import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

function MovieCard({ movie }) {
    const [trailer, setTrailer] = useState('')
    useEffect(() => {
        async function fetchTrailer() {
            const url = `http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=8b40eae734096a4234c35315c17d1351&append_to_response=trailers`;
            const resp = await fetch(url)
            const data = await resp.json()
            if (data && data.results && data.results.length > 0) {
                setTrailer(data.results[0].key)
            }
        }
        fetchTrailer();
    }, [trailer])
    return (
        <div className="card" key={movie.id}>
            <img className="card--image"
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + ' poster'}
            />
            <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p><small>RELEASE DATE: {movie.release_date}</small></p>
                <p><small>RATING: {movie.vote_average}</small></p>
                <p className="card--desc">{movie.overview}</p>
                {/* <button onClick={getMovieById} value={movie.id}>Trailer..</button> */}
                <YouTube
                    videoId={trailer}
                />
            </div>

        </div>
    )
}

export default React.memo(MovieCard);
