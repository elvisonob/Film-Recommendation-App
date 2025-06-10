import { useState, useEffect } from 'react';
import QUESTIONS from '../questions.js';

const Summary = ({ userAnswers }) => {
  const [filmRecommendation, setFilmRecommendation] = useState([]);
  const [shuffledFilm, setShuffledFilm] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaType, setMediaType] = useState('movie');

  useEffect(() => {
    const finalFilmDisplay = [...filmRecommendation]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    setShuffledFilm(finalFilmDisplay);
  }, [filmRecommendation]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      const genre = userAnswers[0];
      const rating = userAnswers[1];
      const category = userAnswers[2];
      const country = userAnswers[3];

      const API_key = '0514ea5bc02a1f50a634dad7f81a8877';

      let isDocumentary = false;

      if (category === QUESTIONS[2].answers[1]) {
        isDocumentary = true;
      }

      if (userAnswers[2] === QUESTIONS[2].answers[2]) {
        setMediaType('tv');
      }

      const genreMap = {
        Romance: 10749,
        Action: 28,
        Comedy: 35,
        Drama: 18,
      };

      const genreId = isDocumentary ? '99' : genreMap[genre] || 10749;

      const query = new URLSearchParams({
        api_key: API_key,
        with_genres: genreId,
        certification_country: country,
        certification: rating,
        region: country,
        sort_by: 'popularity.desc',
        page: '1',
      }).toString();

      try {
        let allResults = [];

        for (let i = 1; i <= 5; i++) {
          const url = `https://api.themoviedb.org/3/discover/${mediaType}?${query}&page=${i}`;
          console.log(url);
          const response = await fetch(url);
          const data = await response.json();

          allResults = allResults.concat(data.results || []);
        }
        setIsLoading(false);
        setFilmRecommendation(allResults.slice(0, 100));
      } catch (err) {
        console.log('Error fetching Films', err);
      }
    };
    if (userAnswers.length === 4) {
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswers]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="film-background">
      <h1>Top Recommendation</h1>
      {!isLoading && (
        <div className="film-container">
          {shuffledFilm.map((film) => {
            const releaseDate =
              mediaType === 'tv' ? film.first_air_date : film.release_date;

            const splitReleaseDate = releaseDate.split('-');
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
                {<p>Release-year: {splitReleaseDate[0]}</p>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Summary;
