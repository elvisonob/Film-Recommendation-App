import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="homepage">
      <div className="subhomepage">
        <p className="homepage-font">
          Tired of scrolling too much to find a film of your choice or one that
          resonates with your unique preference?
        </p>
        <p className="homepage-font">
          Take this 30 seconds quiz with 4 questions to get a film
          recommendation that suits you.
        </p>
        <div className="start-button">
          <Link to="/optionsselector">
            <button className="homepagebutton">START</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
