"use client";
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

export default function Point() {
  const [data, setData] = useState<any>();
  const [timerRunning, setTimerRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [point1, setPoint1] = useState(0);
  const [point2, setPoint2] = useState(0);
  const [lack1, setLack1] = useState(0);
  const [lack2, setLack2] = useState(0);
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

  const handleLackCompetitor = (competitor: any, action: any) => {
    if (action === "lack") {
      if (competitor === data.competitor_one) {
        setLack1(lack1 + 1);
      } else {
        setLack2(lack2 + 1);
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
            clearInterval(intervalRef.current!);
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
      <div className="flex content-center">
        <div className="flex-auto grid place-items-center bg-red-800">
          <div className="grid place-items-center p-4">
            <p className="text-[3rem]">{data?.competitor_one}</p>
            <p className="text-[7rem]">{point1}</p>
            <div className="flex gap-4">
              <Button
                color="default"
                name="increment"
                onClick={() =>
                  handleIncrementPoint(data?.competitor_one, "increment")
                }
                className="">
                +
              </Button>
              <Button
                onClick={() =>
                  handleDecrementPoint(data?.competitor_one, "decrement")
                }
                className="">
                -
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  handleLackCompetitor(data?.competitor_one, "lack")
                }
                className="">
                Falta
              </Button>
            </div>
            <div className="mt-10">
              {lack1 > 0 && (
                <Chip className="text-white" color="danger" variant="dot">
                  {lack1} falta
                </Chip>
              )}
            </div>
          </div>
        </div>
        <div className="flex-auto grid place-items-center bg-blue-800">
          <div className="grid place-items-center p-4">
            <p className="text-[3rem]">{data?.competitor_two}</p>
            <p className="text-[7rem]">{point2}</p>
            <div className="flex gap-4">
              <Button
                color="default"
                name="increment"
                onClick={() =>
                  handleIncrementPoint(data?.competitor_two, "increment")
                }
                className="">
                +
              </Button>
              <Button
                onClick={() =>
                  handleDecrementPoint(data?.competitor_two, "decrement")
                }
                className="">
                -
              </Button>
              <Button
                color="danger"
                onClick={() =>
                  handleLackCompetitor(data?.competitor_two, "lack")
                }
                className="">
                Falta
              </Button>
            </div>
            <div className="mt-10">
              {lack2 > 0 && (
                <Chip className="text-white" color="danger" variant="dot">
                  {lack2} falta
                </Chip>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-slate-900 h-[20vh] self-end flex flex-col place-content-center justify-center w-full gap-5">
        {data ? (
          <>
            <span className="text-4xl self-center">
              {minutes}:{seconds < 10 ? "0" : ""}
              {seconds}
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
      </div> */}
    </div>
  );
}
