import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import data from "../data/data.json";
import { resetQuiz } from "../redux/quizSlice";
import { selectTitle, selectScore } from "../redux/quizSelectors";
import Button from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import QuizTitle from "./QuizTitle";

export function QuizResult() {
  const dispatch = useDispatch();
  const quizTitle = useSelector(selectTitle);

  const selectedQuiz = data.quizzes.find((quiz) => quiz.title === quizTitle);

  const userScore = useSelector(selectScore);

  const handlePlayAgain = () => {
    dispatch(resetQuiz());
  };

  return (
    <>
      <div className="flex items-center justify-between py-4 md:py-5 lg:py-10">
        <QuizTitle selectedQuiz={selectedQuiz} />
        <ThemeToggle />
      </div>

      <motion.div
        className="mt-8 flex w-full flex-wrap justify-between"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0, transition: { duration: 0 } }}
        transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="flex select-all flex-col gap-2">
          <h2 className="text-3xl font-extralight md:text-4xl">
            Quiz completed
          </h2>
          <p className="text-3xl font-medium md:text-4xl">You scored...</p>
        </div>

        <div className="mt-10 w-full md:mt-16 lg:mt-0 lg:w-[564px]">
          <div className="flex w-full flex-col items-center gap-3 rounded-xl border-[3px] border-pure-white bg-pure-white p-8 shadow-light dark:border-navy dark:bg-navy dark:shadow-dark md:gap-8 md:rounded-3xl md:p-12 lg:w-[564px] ">
            <QuizTitle selectedQuiz={selectedQuiz} />

            <div className="flex flex-col items-center gap-4">
              <p className="text-5xl font-medium md:text-9xl">{userScore}</p>
              <p className="text-[1.12rem] text-grey-navy dark:text-light-bluish md:text-lg">
                out of {selectedQuiz?.questions.length}
              </p>
            </div>
          </div>
          <Button onClick={handlePlayAgain}>Play again</Button>
        </div>
      </motion.div>
    </>
  );
}
