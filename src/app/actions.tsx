"use server";

import { axiosApi } from "@/lib/utils";

export const getOneHour = async (where: object) => {
  try {
    const { data } = await axiosApi("/getOneHour", "get", where);
    return data || {};
  } catch (err) {
    console.log("HomeActions getOneHour error: ", err);
  }
};
/**
 * - 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
- 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7)
                      (단기) 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)

 * @param where { nx: number, ny: number }
 * @returns
 *
 * { T1H: '14.4', RN1: '3', REH: '97', PTY: '1', Update: '1714' }
 *
 *
 */
export const getCurrentWeather = async (where: object) => {
  try {
    const { data } = await axiosApi("/getCurrentWeather", "get", where);
    return data || {};
  } catch (err) {
    console.log("HomeActions getCurrentWeather error: ", err);
  }
};

export const getShortWeather = async (where: object) => {
  try {
    const { data } = await axiosApi("/getShortWeather", "get", where);
    return data || [];
  } catch (err) {
    console.log("HomeActions getShortWeather error: ", err);
  }
};

export const getWeekTemp = async (where: object) => {
  try {
    const { data } = await axiosApi("/getWeekTemp", "get", where);
    return data || {};
  } catch (err) {
    console.log("HomeActions getWeekTemp error: ", err);
  }
};

export const getWeekWeather = async (where: object) => {
  try {
    const { data } = await axiosApi("/getWeekWeather", "get", where);
    return data || {};
  } catch (err) {
    console.log("HomeActions getWeekWeather error: ", err);
  }
};
