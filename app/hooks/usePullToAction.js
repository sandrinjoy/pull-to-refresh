import React, { useEffect } from "react";

function usePullToAction({ elementRef, action = () => {}, hardness = 0 }) {
  useEffect(() => {
    if (!elementRef?.current) return;
    const handleTouchStart = (e) => {
      const firstTouch = e.touches[0];
      const x = firstTouch.clientX;
      const y = firstTouch.clientY;
      elementRef.current.setAttribute("data-x", x);
      elementRef.current.setAttribute("data-y", y);
    };

    const handleTouchMove = (e) => {
      const firstTouch = e.touches[0];
      const x = firstTouch.clientX;
      const y = firstTouch.clientY;
      const dataX = elementRef.current.getAttribute("data-x");
      const dataY = elementRef.current.getAttribute("data-y");
      const diffX = x - dataX;
      const diffY = y - dataY;
      if (diffY > 0 && diffY > Math.abs(diffX)) {
        // use log to make the pull more smooth, but the value shouldn't be too small
        const logDiffY = Math.log(diffY) * (10 - hardness);
        elementRef.current.setAttribute("data-pull", "true");
        elementRef.current.style.transform = `translateY(${logDiffY}px)`;
      } else {
        elementRef.current.setAttribute("data-pull", "false");
      }
    };

    const handleTouchEnd = (e) => {
      const dataPull = elementRef.current.getAttribute("data-pull");
      if (dataPull === "true") {
        elementRef.current.setAttribute("data-pull", "false");
        action();
        elementRef.current.style.transform = `translateY(0px)`;
      }
    };
    elementRef.current.addEventListener("touchstart", handleTouchStart);
    elementRef.current.addEventListener("touchmove", handleTouchMove);
    elementRef.current.addEventListener("touchend", handleTouchEnd);
    elementRef.current.addEventListener("onDragStart", handleTouchStart);
    elementRef.current.addEventListener("onDragMove", handleTouchMove);
    elementRef.current.addEventListener("onDragEnd", handleTouchEnd);
    return () => {
      elementRef.current.removeEventListener("touchstart", handleTouchStart);
      elementRef.current.removeEventListener("touchmove", handleTouchMove);
      elementRef.current.removeEventListener("touchend", handleTouchEnd);
      elementRef.current.removeEventListener("onDragStart", handleTouchStart);
      elementRef.current.removeEventListener("onDragMove", handleTouchMove);
      elementRef.current.removeEventListener("onDragEnd", handleTouchEnd);
    };
  }, [action, elementRef?.current]);
}

export default usePullToAction;
