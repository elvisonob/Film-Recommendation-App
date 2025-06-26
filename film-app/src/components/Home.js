import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      <div className="subhomepage">
        <p className="homepage-font">
          Tired of scrolling too much to find a film of your choice or a film
          that resonates with your unique preference?
        </p>
        <p className="homepage-font">
          Take this less than a minute quiz with only 4 questions to get a film
          recommendation that suits you.
        </p>
        <Link to="/optionsselector">
          <button className="homepage-button">START</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
