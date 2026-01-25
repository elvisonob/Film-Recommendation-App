import FilmGrid from './FilmGrid';

const Summary = ({ films, isLoading, mediaType, onStartAfresh }) => {
  if (isLoading) return <h1>Loading...</h1>;

  const startAfreshButton = (
    <button className="refresh" onClick={onStartAfresh}>
      Start Afresh
    </button>
  );

  if (films.length === 0) {
    return (
      <div className="film-background">
        <h2 className="shuffledFilm">
          No Films matching your preference found
        </h2>
        {startAfreshButton}
      </div>
    );
  }

  return (
    <div className="film-background">
      <h1>Top Recommendation</h1>
      <FilmGrid films={films} mediaType={mediaType} />
      {startAfreshButton}
    </div>
  );
};

export default Summary;
