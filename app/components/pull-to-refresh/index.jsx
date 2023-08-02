import React, { useRef, useState } from "react";
import usePullToAction from "../../hooks/usePullToAction";
import { twMerge } from "tw-merge";

function PullToRefresh() {
  const pullRef = useRef(null);
  const [simple, setSimple] = useState(false);
  const [hardness, setHardness] = useState(1);

  usePullToAction({
    elementRef: pullRef,
    action: () => {
      setSimple((prev) => !prev);
    },
    hardness,
  });

  return (
    <>
      <div className="flex gap-2 mb-2 items-center">
        <label className="text-neutral-600 dark:text-neutral-400 text-sm">
          Hardness
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={hardness}
          onChange={(e) => setHardness(e.target.value)}
          className="w-64 h-4 bg-neutral-200 dark:bg-neutral-700 rounded-full appearance-none"
        />
      </div>
      <div className="flex gap-2 mb-2 items-center">
        <label className="text-neutral-600 dark:text-neutral-400 text-sm">
          {hardness}
        </label>
      </div>
      <div className="shadow-lg  h-24 w-12 gap-2 space-y-1">
        {/* wall */}
        {simple ? (
          <div className={"bg-red-400 h-4"}></div>
        ) : (
          <div className={"bg-white h-4"}></div>
        )}
        <div
          ref={pullRef}
          className="bg-gradient-to-t from-white to-neutral-600 h-20 cursor-move transition-transform"
        ></div>
      </div>
    </>
  );
}

export default PullToRefresh;
