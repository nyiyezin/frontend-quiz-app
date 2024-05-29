import { useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import data from "../data/data.json";
import { getClassname } from "../utils/util";
import { Quiz } from "../utils/types";
import { ThemeToggle } from "../components/ThemeToggle";

export default function Home() {
  const [, animate] = useAnimate();
  const refs = useRef<HTMLLIElement[]>([]);

  const sequence = (index: number) => {
    animate([
      [refs.current[index], { scale: 1.5 }],
      [refs.current[index], { scale: 1 }],
    ]);
  };

  const visible = { opacity: 1, transition: { duration: 1 } };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible,
  };

  return (
    <>
      <div className="flex items-center justify-end py-4 md:py-5 lg:py-10">
        <ThemeToggle />
      </div>

      <div className="flex w-full flex-wrap justify-between">
        <motion.div
          className="flex flex-col gap-12"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0, transition: { duration: 0 } }}
          transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <h1 className="flex select-all flex-col gap-2">
            <span className="text-3xl font-extralight md:text-4xl">
              Welcome to the
            </span>
            <span className="text-3xl font-medium md:text-4xl">
              Frontend Quiz!
            </span>
          </h1>
          <p className="select-all text-[1rem] italic text-grey-navy dark:text-light-bluish md:text-base">
            Pick a subject to get started.
          </p>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
          className="mt-10 flex w-full flex-col gap-3 md:mt-16 lg:mt-0 lg:w-[564px] lg:gap-6"
        >
          {data.quizzes.map(({ title, icon }: Quiz, index: number) => (
            <motion.li
              key={title}
              className="transform cursor-pointer rounded-xl border-[3px] border-pure-white bg-pure-white shadow-light transition duration-300 ease-in-out hover:border-purple dark:border-navy dark:bg-navy dark:shadow-dark dark:hover:border-purple md:rounded-3xl"
              ref={(element) => {
                if (index < refs.current.length) {
                  refs.current[index] = element as HTMLLIElement;
                } else {
                  console.error(
                    `Index ${index} is out of bounds for refs.current`,
                  );
                }
              }}
              onTap={() => sequence(index)}
              variants={itemVariants}
            >
              <button className="flex w-full items-center gap-4 p-2 md:gap-8 lg:p-4">
                <img
                  src={icon}
                  alt={`${title} icon`}
                  className={`h-10 w-10 rounded-md p-1.5 md:h-12 md:w-12 md:rounded-lg md:p-2 ${getClassname(
                    title,
                  )}`}
                />
                <span className="text-[1.12rem] font-medium md:text-xl">
                  {title}
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </>
  );
}
