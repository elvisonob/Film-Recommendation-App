import QUESTIONS from '../questions.js';
import Summary from './Summary';
import { useState } from 'react';
import Header from './Header';

const OptionsSelector = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState('');
  console.log(userAnswers);

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;

  const onhandleOptionsClick = (answer) => {
    setAnswerState('correct');
    setUserAnswers((prev) => [...prev, answer]);

    setTimeout(() => {
      setAnswerState('');
    }, 1000);
  };

  if (activeQuestionIndex === QUESTIONS.length) {
    return (
      <div>
        <Summary userAnswers={userAnswers} />
      </div>
    );
  }

  const onClickBack = () => {
    setUserAnswers((prev) => prev.slice(0, -1));
  };

  return (
    <div className="container">
      <div className="quiz">
        <Header />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul>
          {QUESTIONS[activeQuestionIndex].answers.map((options) => {
            const isSelected = options === userAnswers[userAnswers.length - 1];

            let cssClass = '';
            if (isSelected) {
              cssClass = answerState;
            }
            return (
              <div key={options}>
                <button
                  className={cssClass}
                  disabled={answerState !== ''}
                  onClick={() => onhandleOptionsClick(options)}
                >
                  {options}
                </button>
              </div>
            );
          })}
          {userAnswers.length > 0 && (
            <button className="back" onClick={onClickBack}>
              Back
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OptionsSelector;
