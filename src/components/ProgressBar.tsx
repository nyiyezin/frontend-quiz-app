import * as React from "react";
import { motion, useAnimation } from "framer-motion";

export function ProgressBar({ progress }: { progress: number }) {
  const [prevProgress, setPrevProgress] = React.useState<number>();
  const controls = useAnimation();

  React.useEffect(() => {
    controls.start({ width: `${progress}%` });
    setPrevProgress(progress);
  }, [controls, prevProgress, progress]);

  return (
    <div className="flex h-4 w-full rounded-full bg-pure-white dark:bg-navy">
      <motion.div
        className="m-1 h-2 rounded-full bg-purple"
        style={{ width: `${prevProgress}%` }}
        animate={controls}
      />
    </div>
  );
}
