import QUESTIONS from '../questions.js';
import Summary from './Summary';
import { useState } from 'react';

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
    }, 2000);
  };

  if (activeQuestionIndex === QUESTIONS.length) {
    return (
      <div>
        <Summary userAnswers={userAnswers} />
      </div>
    );
  }

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
