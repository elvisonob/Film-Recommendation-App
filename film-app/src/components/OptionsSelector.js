import QUESTIONS from '../questions.js';
import Summary from './Summary';
import { useState } from 'react';

const OptionsSelector = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState('');
  console.log(userAnswers);

  const activeQuestionIndex = userAnswers.length;

  const onhandleOptionsClick = (answer) => {
    setTimeout(() => {
      setAnswerState('selected');
    }, 1000);

    setUserAnswers((prev) => [...prev, answer]);
  };

  if (activeQuestionIndex === QUESTIONS.length) {
    return (
      <div>
        <Summary />
      </div>
    );
  }

  // when an answer is clicked, it should show color yellow for a second and move to the next question
  return (
    <div className="container">
      <div className="quiz">
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul>
          {QUESTIONS[activeQuestionIndex].answers.map((options) => {
            const isSelected = options === userAnswers[userAnswers.length - 1];

            let cssClass = '';
            if (isSelected) {
              cssClass = answerState;
            }
            return (
              <li
                key={options}
                className={cssClass}
                onClick={() => onhandleOptionsClick(options)}
              >
                {options}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OptionsSelector;
