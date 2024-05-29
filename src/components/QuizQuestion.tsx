import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { CircleCheck, CircleX } from "lucide-react";
import {
  incrementScore,
  setCurrentQuestionIndex,
  setFinishQuiz,
} from "../redux/quizSlice";
import {
  selectTitle,
  selectCurrentQuestionIndex,
} from "../redux/quizSelectors";
import { Question, Quiz } from "../utils/types";
import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { ThemeToggle } from "./ThemeToggle";
import { QuestionDisplay } from "./QuestionDisplay";
import QuizTitle from "./QuizTitle";
import data from "../data/data.json";
import ErrorMessage from "./ErrorMessage";

export function QuizQuestion() {
  const dispatch = useDispatch();
  const quizTitle = useSelector(selectTitle);
  const questionIndex = useSelector(selectCurrentQuestionIndex);

  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const selectedQuiz: Quiz | undefined = data.quizzes.find(
    (quiz) => quiz.title === quizTitle,
  );
  console.log(selectedQuiz);
  const currentQuestion: Question | undefined =
    selectedQuiz?.questions[questionIndex];

  useEffect(() => {
    if (currentQuestion) {
      const shuffled = [...currentQuestion.options];
      shuffled.sort(() => Math.random() - 0.5);
      setShuffledOptions(shuffled);
    }
  }, [currentQuestion]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionIndex = +e.target.id;
    if (!isAnswerSubmitted) {
      setSelectedAnswer(optionIndex);
    }
  };

  const correctAnswerIndex = shuffledOptions.findIndex(
    (option) => option === currentQuestion?.answer,
  );

  const handleSubmit = () => {
    setIsErrorVisible(false);

    if (selectedAnswer !== null) {
      const selectedOption = shuffledOptions[selectedAnswer];

      if (selectedOption === currentQuestion?.answer) {
        setIsCorrect(true);
        dispatch(incrementScore());
      }

      setIsAnswerSubmitted(true);
    } else {
      setIsErrorVisible(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(false);
    const nextQuestionIndex = +questionIndex + 1;
    dispatch(setCurrentQuestionIndex(nextQuestionIndex));

    if (selectedQuiz && nextQuestionIndex < selectedQuiz.questions.length) {
      setIsAnswerSubmitted(false);
    } else {
      dispatch(setFinishQuiz());
    }
  };

  const progress =
    ((+questionIndex + 1) / (selectedQuiz?.questions.length || 1)) * 100;

  return (
    <>
      <div className="flex items-center justify-between py-4 md:py-5 lg:py-10">
        <QuizTitle selectedQuiz={selectedQuiz} />
        <ThemeToggle />
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="flex max-h-[416px] w-full flex-col justify-between lg:w-auto">
          <div className="mb-6 flex flex-col gap-7 md:mb-10 lg:mb-0">
            <p className="select-all text-[0.88rem] italic text-grey-navy dark:text-light-bluish md:text-base">
              Question {+questionIndex + 1} of {selectedQuiz?.questions.length}
            </p>
            <QuestionDisplay questionText={currentQuestion?.question} />
          </div>
          <ProgressBar progress={progress} />
        </div>
        <motion.div
          className="w-full lg:w-[564px]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0, transition: { duration: 0 } }}
          transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <ul className="mt-10 flex flex-col gap-3 text-[1rem] font-medium md:mt-16 md:text-base lg:mt-0 lg:gap-6 ">
            {shuffledOptions.map((option, index) => (
              <li
                key={index}
                className={`group ${
                  isAnswerSubmitted && index === selectedAnswer && isCorrect
                    ? "correct"
                    : isAnswerSubmitted &&
                        index === selectedAnswer &&
                        !isCorrect
                      ? "incorrect"
                      : isAnswerSubmitted && index === correctAnswerIndex
                        ? "correct"
                        : ""
                }`}
              >
                <input
                  type="radio"
                  id={String(index)}
                  name="option"
                  className="peer hidden"
                  onChange={handleOptionChange}
                  disabled={isAnswerSubmitted}
                  checked={selectedAnswer === index}
                />
                <label
                  htmlFor={String(index)}
                  className={`inline-flex w-full cursor-pointer items-center justify-between rounded-xl border-[3px] border-pure-white bg-pure-white p-2 shadow-light transition duration-300 ease-in-out dark:border-navy dark:bg-navy dark:shadow-dark lg:rounded-3xl lg:p-4 ${
                    selectedAnswer === index && isAnswerSubmitted
                      ? "group-[.correct]:border-green group-[.incorrect]:border-red"
                      : "peer-checked:border-purple"
                  }`}
                >
                  <div className="inline-flex items-center gap-4 md:gap-8">
                    <div
                      className={`flex min-h-10 min-w-10 items-center justify-center rounded-md p-1.5 transition duration-300 ease-in-out md:min-h-12 md:min-w-12 md:p-2 lg:rounded-lg ${
                        selectedAnswer === index
                          ? isAnswerSubmitted
                            ? "group-[.correct]:bg-green group-[.incorrect]:bg-red group-[.correct]:text-pure-white group-[.incorrect]:text-pure-white"
                            : "bg-purple text-pure-white"
                          : "bg-light-grey text-grey-navy group-hover:bg-[#f6e7ff] group-hover:text-purple"
                      }`}
                    >
                      {String.fromCharCode(97 + index).toUpperCase()}
                    </div>
                    <div>{option}</div>
                  </div>
                  <CircleCheck className="hidden h-8 w-8 group-[.correct]:block md:h-10 md:w-10" />
                  <CircleX className="hidden h-8 w-8 group-[.incorrect]:block md:h-10 md:w-10" />
                </label>
              </li>
            ))}
          </ul>

          <Button
            onClick={isAnswerSubmitted ? handleNextQuestion : handleSubmit}
          >
            {isAnswerSubmitted ? "Next question" : "Submit answer"}
          </Button>
          {isErrorVisible && <ErrorMessage />}
        </motion.div>
      </div>
    </>
  );
}
