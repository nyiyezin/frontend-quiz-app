export function QuestionDisplay({
  questionText,
}: {
  questionText: string | undefined;
}) {
  const renderTextWithNewlines = (text: string) => {
    return text.split("\n").map((line, index) => (
      <p
        key={index}
        className="max-w-[35rem] text-base font-medium md:text-2xl"
      >
        {line}
      </p>
    ));
  };

  const renderQuestion = (question: string) => {
    const codeRegex = /```([\s\S]*?)```/g;
    let match;
    const parts = [];
    let lastIndex = 0;

    while ((match = codeRegex.exec(question)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          renderTextWithNewlines(question.substring(lastIndex, match.index)),
        );
      }

      parts.push(
        <pre
          key={match.index}
          className="mt-4 rounded bg-dark-navy p-4 text-light-grey dark:bg-light-grey dark:text-dark-navy"
        >
          <code>{match[1]}</code>
        </pre>,
      );

      lastIndex = codeRegex.lastIndex;
    }

    if (lastIndex < question.length) {
      parts.push(renderTextWithNewlines(question.substring(lastIndex)));
    }

    return parts;
  };

  return <div>{renderQuestion(questionText as string)}</div>;
}
