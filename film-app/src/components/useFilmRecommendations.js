import { useEffect, useState } from 'react';
import QUESTIONS from '../questions';
import API_KEY from '../ApiKey';

const useFilmRecommendations = (userAnswers) => {
  const [films, setFilms] = useState([]);
  const [mediaType, setMediaType] = useState('movie');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userAnswers.length !== 4) return;

    const fetchFilms = async () => {
      setIsLoading(true);

      const [genre, rating, category, country] = userAnswers;

      const genreMap = { Romance: 10749, Action: 28, Comedy: 35, Drama: 18 };
      const isDocumentary = category === QUESTIONS[2].answers[1];

      const type = category === QUESTIONS[2].answers[2] ? 'tv' : 'movie';
      setMediaType(type);

      const genreId = isDocumentary ? 99 : genreMap[genre];

      const params = new URLSearchParams({
        api_key: API_KEY,
        with_genres: genreId,
        certification: rating,
        region: country,
      });

      if (type === 'movie') {
        params.append('certification', rating);
        params.append('certification_country', country);
      }

      if (type === 'tv') {
        params.append('with_content_ratings', rating);
        params.append('content_rating_country', country);
      }

      const results = [];

      for (let page = 1; page <= 6; page++) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/${type}?${params}&page=${page}`,
        );
        const data = await res.json();
        results.push(...(data.results || []));
      }

      setFilms(results.sort(() => 0.5 - Math.random()).slice(0, 10));
      setIsLoading(false);
    };

    fetchFilms();
  }, [userAnswers]);

  return { films, mediaType, isLoading };
};

export default useFilmRecommendations;
