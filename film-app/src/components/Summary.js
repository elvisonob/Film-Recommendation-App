// Now, i take all the userInput and send it to an API,
// to use to bring the first 10 films
import { useState, useEffect } from 'react';

const Summary = ({ userAnswers }) => {
  const [filmRecommendation, setFilmRecommendation] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const genre = userAnswers[0];
      const rating = userAnswers[1];
      const movieType = userAnswers[2];
      const country = userAnswers[3];

      const API_key = '0514ea5bc02a1f50a634dad7f81a8877';

      const genreMap = {
        Romance: 10749,
        Action: 28,
        Comedy: 35,
        Drama: 18,
      };

      const genreId = genreMap[genre] || 10749;

      const query = new URLSearchParams({
        api_key: API_key,
        with_genres: genreId,
        certification_country: country,
        //primary_release_year,
        certification: rating,
        region: country,
        sort_by: 'popularity.desc',
        page: '1',
      }).toString();

      const url = `https://api.themoviedb.org/3/discover/movie?${query}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setFilmRecommendation(data.results.slice(0, 10));
      } catch (err) {
        console.log('Error fetching Films', err);
      }
    };
    if (userAnswers.length === 4) {
      sendRequest();
    }
  }, [userAnswers]);

  return (
    <div className="film-background">
      <h1>Top Movie Recommendation</h1>
      <div className="film-container">
        {filmRecommendation.map((film) => {
          return (
            <div key={film.id} className="films">
              <div className="film-title">{film.title}</div>
              {film.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                  alt={film.title}
                  height="100%"
                  width="100%"
                />
              )}
              <p>Release-year:{film.primary_release_year}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
