import { Quiz } from "../utils/types";
import { getClassname } from "../utils/util";

export function QuizTitle({
  selectedQuiz,
}: {
  selectedQuiz: Quiz;
}) {
  return (
    <div className="flex items-center gap-4 text-xl font-medium md:gap-6">
      <img
        src={selectedQuiz?.icon}
        alt={`${selectedQuiz?.title} icon`}
        className={`h-10 w-10 rounded-md p-1.5 md:h-12 md:w-12 md:rounded-lg md:p-2 ${getClassname(
          selectedQuiz?.title,
        )}`}
      />
      <h2 className="text-[1.12rem] md:text-xl">{selectedQuiz?.title}</h2>
    </div>
  );
}
