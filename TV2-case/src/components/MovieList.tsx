// React komponent for film-liste
import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/v4/feeds/page_01jwxh2p1me02sbhyxmht24cbp');
        const data = await response.json();
        console.log(data)
        setMovies(data.feeds[0].content || data);
      } catch (error) {
        console.error('Feil ved henting av filmer:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) return <div>Laster filmer...</div>;

  return (
    <div className="movie-list">
      <h2>Filmer</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card" onClick={() => navigateToMovie(movie.url)}>
            <img 
              src={getMoviePoster(movie.image.src)} 
              alt={movie.title}
              className="movie-thumbnail"
            />
            <h3 className="movie-title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hjelpefunksjon for å navigere til film-detaljer
function navigateToMovie(movieUrl) {
  // Implementer navigasjon til detail page
  window.location.href = `/movie/${movieUrl}`;
}

// Hjelpefunksjon for filmplakater
function getMoviePoster(imageUrl, width = 300, height = 450) {
  const posterUrl = imageUrl.replace('location=list', 'location=moviePoster');
  return `${posterUrl}&width=${width}&height=${height}`;
}

export default MovieList;