import { useState, useEffect } from 'react';

const Summary = ({ userAnswers }) => {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const API_key = '0514ea5bc02a1f50a634dad7f81a8877';

      // Extract answers
      const genre = userAnswers[0]; // e.g. Romance
      const rating = userAnswers[1]; // e.g. R or PG-18
      const type = userAnswers[2]; // e.g. Feature film
      const region = userAnswers[3]; // e.g. US

      // Genre mapping (expand as needed)
      const genreMap = {
        Romance: 10749,
        Action: 28,
        Comedy: 35,
        Drama: 18,
      };

      const genreId = genreMap[genre] || 10749; // fallback to Romance

      const query = new URLSearchParams({
        api_key: API_key,
        with_genres: genreId,
        certification_country: region,
        certification: rating,
        region: region,
        sort_by: 'popularity.desc',
        page: '1',
      }).toString();

      const url = `https://api.themoviedb.org/3/discover/movie?${query}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setRecommendation(data.results.slice(0, 10));
      } catch (err) {
        console.error('Error fetching movie recommendations:', err);
      }
    };

    if (userAnswers.length === 4) {
      fetchRecommendations();
    }
  }, [userAnswers]);

  return (
    <div>
      <h2>Top Recommendations</h2>
      <ul>
        {recommendation.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
