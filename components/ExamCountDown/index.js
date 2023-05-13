import React, { useState, useEffect } from "react";

function ExamCountdown({ rstartTime, examDuration }) {
  const [remainingTime, setRemainingTime] = useState(null);
  const startTime =  new Date(rstartTime).getTime()
  const currentTime = new Date().getTime();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date(currentTime).getTime();
      const diff = startTime - now;
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setRemainingTime(`${minutes}:${seconds}`);
      console.log(diff/1000, examDuration*60)
      if (diff / 1000 >= examDuration * 60) clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, currentTime]);

  return <div>Remaining Time: {remainingTime}/{examDuration} </div>;
}

export default ExamCountdown;
