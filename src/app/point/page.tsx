"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";

export default function Point() {
  const [data, setData] = useState<any>();
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [point1, setPoint1] = useState(0);
  const [point2, setPoint2] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  const handleIncrementPoint = (competitor: any, action: any) => {
    if (action === "increment") {
      if (competitor === data?.competitor_one) {
        setPoint1(point1 + 1);
      } else {
        setPoint2(point2 + 1);
      }
    }
  };

  const handleDecrementPoint = (competitor: any, action: any) => {
    if (action === "decrement") {
      if (competitor === data.competitor_one) {
        setPoint1(point1 - 1);
      } else {
        setPoint2(point2 - 1);
      }
    }
  };

  const handlePauseTimer = () => {
    setTimerRunning(false);
  };

  // const handlePlayTime = () => {
  //   if (!timerRunning && (minutes > 0 || seconds > 0)) {
  //     setTimerRunning(true);
  //     const intervalId = setInterval(() => {
  //       if (minutes === 0 && seconds === 0) {
  //         clearInterval(intervalId);
  //         setTimerRunning(false);
  //       } else if (seconds === 0) {
  //         if (minutes > 0) {
  //           setMinutes((prevMinutes) => prevMinutes - 1);
  //           setSeconds(59);
  //         }
  //       } else {
  //         setSeconds((prevSeconds) => prevSeconds - 1)
  //       }
  //     }, 1000);
  //   }
  // };

  const handlePlayTime = () => {
    if (!timerRunning && (minutes > 0 || seconds > 0)) {
      setTimerRunning(true);
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalRef.current!)
            setTimerRunning(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    setMinutes(Number(data?.minutes));
    setSeconds(Number(data?.seconds));
  }, [data]);

  return (
    <div className="grid min-h-[100vh] bg-orange-500">
      <div className="">
        <div className="">
          <div className="grid items-center">
            <p className="">{data?.competitor_one}</p>
            <p className="">{point1}</p>
            <div className="">
              <button
                name="increment"
                onClick={() =>
                  handleIncrementPoint(data?.competitor_one, "increment")
                }
                className="">
                +
              </button>
              <button
                onClick={() =>
                  handleDecrementPoint(data?.competitor_one, "decrement")
                }
                className="">
                -
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">
            <p className="">{data?.competitor_two}</p>
            <p className="">{point2}</p>
            <div className="">
              <button
                name="increment"
                onClick={() =>
                  handleIncrementPoint(data?.competitor_two, "increment")
                }
                className="">
                +
              </button>
              <button
                onClick={() =>
                  handleDecrementPoint(data?.competitor_two, "decrement")
                }
                className="">
                -
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 h-40 self-end flex flex-col place-content-center justify-center w-full gap-5">
        {data ? (
          <>
            <span className="text-4xl self-center">
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
              {/* {timerValue}:{secondsLeft.toString().padStart(2, "0")} */}
              {/* {formatMinutes(data?.timer)} */}
              {/* {minutes}:{secondsLeft < 10 ? "0" : ""}
              {secondsLeft} */}
            </span>
            <div className="self-center">
              {timerRunning ? (
                <Button onClick={handlePauseTimer}>PAUSA</Button>
              ) : (
                <Button onClick={handlePlayTime}>PLAY</Button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* <span className="text-4xl self-center">Espere...</span> */}
            <div className="w-[150px] self-center">
              <Skeleton className="rounded-lg">
                <div className="h-2 rounded-lg bg-default-foreground"></div>
              </Skeleton>
            </div>
            <div className="w-[100px] self-center">
              <Skeleton className="rounded-lg">
                <div className="h-2 rounded-lg bg-default-foreground"></div>
              </Skeleton>
            </div>
            <div className="w-[200px] self-center">
              <Skeleton className="rounded-lg">
                <div className="h-2 rounded-lg bg-default-foreground"></div>
              </Skeleton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
