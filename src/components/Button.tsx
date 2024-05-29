import React from "react";

export default function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="mt-4 w-full transform cursor-pointer rounded-xl bg-purple p-4 text-center text-[1.12rem] font-medium text-pure-white shadow-light transition duration-300 ease-in-out hover:opacity-75 dark:shadow-dark md:mt-6 lg:rounded-3xl lg:p-6 lg:text-xl"
    >
      {children}
    </button>
  );
}
