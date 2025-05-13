"use client";

import { useEffect, useState } from "react";
import { getCurrentWeather, getOneHour } from "./actions";
import { cn } from "@/lib/utils";

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<
    | {
        T1H: string;
        RN1: string;
        REH: string;
        PTY: string;
        Update: string;
      }
    | undefined
  >(undefined);
  const [oneHourWeather, setOneHourWeather] = useState<
    | {
        LGT: string;
        PTY: string;
        SKY: string;
        Time: string;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      const [currentResult, oneHourResult] = await Promise.all([
        getCurrentWeather({
          nx: 60,
          ny: 127,
        }),
        getOneHour({
          nx: 60,
          ny: 127,
        }),
      ]);

      console.log("ws", currentResult, oneHourResult);
      setCurrentWeather(currentResult);
      setOneHourWeather(oneHourResult);
    };

    fetchCurrentWeather();
  }, []);

  const checkSky = (PTY?: string, SKY?: string) => {
    if (!PTY || !SKY) return null;

    const sky = Number(SKY);
    const pty = Number(PTY);

    if (pty > 0) {
      if (pty === 1) {
        return { name: "비", icon: "wi-day-rain", color: "text-blue-400" };
      } else if (pty === 2) {
        return {
          name: "비/눈",
          icon: "wi-day-rain-mix",
          color: "text-blue-300",
        };
      } else if (pty === 3) {
        return { name: "눈", icon: "wi-day-snow", color: "text-blue-200" };
      } else if (pty === 5) {
        return { name: "빗방울", icon: "wi-day-hail", color: "text-blue-400" };
      } else if (pty === 6) {
        return {
          name: "빗방울눈날림",
          icon: "wi-day-sleet",
          color: "text-blue-400",
        };
      } else if (pty === 7) {
        return {
          name: "눈날림",
          icon: "wi-day-snow-wind",
          color: "text-blue-200",
        };
      }
    } else {
      if (sky === 1) {
        return { name: "맑음", icon: "wi-day-sunny", color: "text-yellow-300" };
      } else if (sky === 3) {
        return {
          name: "구름많음",
          icon: "wi-day-cloudy",
          color: "text-gray-400",
        };
      } else if (sky === 4) {
        return { name: "흐림", icon: "wi-day-cloudy", color: "text-gray-400" };
      }
    }
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex text-6xl w-22 h-22 justify-center items-center">
            <i
              className={cn(
                "wi",
                checkSky(currentWeather?.PTY, oneHourWeather?.SKY)?.icon,
                checkSky(currentWeather?.PTY, oneHourWeather?.SKY)?.color
              )}
            ></i>
          </div>
          <p>{checkSky(currentWeather?.PTY, oneHourWeather?.SKY)?.name}</p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl mb-1">{currentWeather?.T1H}°C</p>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center gap-1">
              <i className="wi wi-umbrella text-md text-blue-700"></i>
              <p className="text-xl">{currentWeather?.RN1}mm</p>
            </div>
            <div className="flex flex-row items-center justify-center gap-1">
              <i className="wi wi-humidity text-md text-sky-500"></i>
              <p className="text-xl">{currentWeather?.REH}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// - 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
//   - 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
//                         (단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
