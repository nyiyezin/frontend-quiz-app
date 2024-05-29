import { CircleX } from "lucide-react";

const ErrorMessage = () => {
  return (
    <div className="mt-4 flex items-center justify-center gap-2 text-lg font-normal text-red dark:text-light-grey md:mt-6">
      <CircleX className="h-8 w-8 md:h-12 md:w-12" />
      <p className="text-[1.12rem] md:text-lg">Please select an answer</p>
    </div>
  );
};

export default ErrorMessage;
