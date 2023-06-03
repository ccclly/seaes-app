import React, { useState, useEffect } from "react";

function ExamCountdown({ rstartTime, examDuration, handleSubmit, finish }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const startTime =  new Date(rstartTime).getTime()
  const currentTime = new Date().getTime();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date(currentTime).getTime();
      const diff = now - startTime;
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setRemainingTime(`${minutes}:${seconds}`);
      // console.log(startTime, now, diff/1000, examDuration*60, minutes, seconds, diff / 1000, examDuration * 60)
      if (diff / 1000 >= examDuration * 60) clearInterval(intervalId);
    }, 1000);
    if (finish) {
      handleSubmit()
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, currentTime, finish]);

  return <div>时间: {remainingTime}</div>;
}

export default ExamCountdown;
