const FilmGrid = ({ films, mediaType }) => (
  <div className="film-container">
    {films.map((film) => {
      const date = mediaType === 'tv' ? film.first_air_date : film.release_date;
      const displayTitle = mediaType === 'tv' ? film.name : film.title;
      const splitReleaseDate = date.split('-');
      return (
        <div key={film.id} className="films">
          <div className="film-title">{displayTitle}</div>
          <img
            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
            alt={film.title}
            className="film-poster"
            height="100%"
            width="100%"
          />
          <p>Release-year: {splitReleaseDate[0]}</p>
        </div>
      );
    })}
  </div>
);

export default FilmGrid;
