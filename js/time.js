// PARAM time diff
const timeDiff = {
  kr: 9 * 60 * 60 * 1000,
  london: 1 * 60 * 60 * 1000,
  losAngeles: -7 * 60 * 60 * 1000,
  santiago: -4 * 60 * 60 * 1000,
  newYork: -4 * 60 * 60 * 1000,
  dallas: -5 * 60 * 60 * 1000,
  bucharest: 3 * 60 * 60 * 1000,
  durham: 1 * 60 * 60 * 1000,
};

// FUNCTION utc시간과의 차이를 매개변수로 입력받아 시간을 구하는 함수
const getTimeFromUtc = (diff) => {
  // diff: number(utc 시간과 구하고자 하는 시간과의 차이)
  const currDate = new Date();
  const utcTime = currDate.getTime() + currDate.getTimezoneOffset() * 60 * 1000;

  return new Date(utcTime + diff);
};

// FUNCTION 자릿수 변환 함수
const padToDigit = (number) => {
  // number: number|string
  let str = number.toString();

  // 문자열의 길이가 1이라면 앞에 '0'을 붙여준다.
  if (str.length === 1) {
    str = '0' + str;
  }

  return str;
};

// PARAM Datetime 객체들
const dateTimeList = {
  kr: () => getTimeFromUtc(timeDiff.kr),
  london: () => getTimeFromUtc(timeDiff.london),
  losAngeles: () => getTimeFromUtc(timeDiff.losAngeles),
  santiago: () => getTimeFromUtc(timeDiff.santiago),
  newYork: () => getTimeFromUtc(timeDiff.newYork),
  dallas: () => getTimeFromUtc(timeDiff.dallas),
  bucharest: () => getTimeFromUtc(timeDiff.bucharest),
  durham: () => getTimeFromUtc(timeDiff.durham),
};

// FUNCTION DateTime을 시/분/초 단위로 나누기
const getTime = (time) => {
  return {
    hour: padToDigit(time.getHours()),
    min: padToDigit(time.getMinutes()),
    second: padToDigit(time.getSeconds()),
  };
};

// FUNCTION 날짜 서수 구하는 함수
const getNth = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
};

// FUNCTION 시계 style(각도) 설정
const setClockHands = (time, selector) => {
  // time = "HH:mm:ss" 형식의 문자열
  const { hour, min, second } = getTime(time);
  const clock = document.querySelector(selector);

  // 시침의 각도 설정 (시간에 따라 30도씩 회전 + 분에 따른 보정)
  const hourAngle = (hour % 12) * 30 + min * 0.5;
  clock.querySelector(
    '.clock-group-hour'
  ).style.transform = `rotate(${hourAngle}deg)`;

  // 분침의 각도 설정 (분에 따라 6도씩 회전 + 초에 따른 보정)
  const minuteAngle = min * 6 + second * 0.1;
  clock.querySelector(
    '.clock-group-min'
  ).style.transform = `rotate(${minuteAngle}deg)`;

  // 초침의 각도 설정 (초에 따라 6도씩 회전)
  const secondAngle = second * 6;
  clock.querySelector(
    '.clock-group-sec'
  ).style.transform = `rotate(${secondAngle}deg)`;
};

// FUNCTION set intro clock
const setIntroClock = () => {
  const clock = document.querySelector(".intro [data-time='1']");
  const clock2 = document.querySelector("[data-area='3'] .time");

  const time = getTime(dateTimeList.kr());

  const result = `${time.hour}:${time.min}:${time.second}`;

  clock.innerText = result;
  clock2.querySelector('.time__hour').innerText = time.hour;
  clock2.querySelector('.time__min').innerText = time.min;
  clock2.querySelector('.time__sec').innerText = time.second;

  clock.setAttribute('datetime', result);
  clock2.setAttribute('datetime', result);
};

// FUNCTION 세계시각 설정
const setWorldClock = () => {
  //const clockList = ["[data-clock='london']"];
  const clockList = document.querySelectorAll("[data-area='2'] .clock");

  clockList.forEach((el) => {
    const cityName = el.getAttribute('data-clock');

    setClockHands(dateTimeList[cityName](), `[data-clock='${cityName}']`);
  });
};

// FUNCTION set datetime
const setDateTime = () => {
  const date = document.querySelector("[data-area='3']");
  date.querySelector('.date__year').innerText = dateTimeList.kr().getFullYear();
  date.querySelector('.date__day').innerText = `${getNth(
    dateTimeList.kr().getDate()
  )}`;
  date.querySelector('.date__month').innerText = dateTimeList
    .kr()
    .toLocaleString('en-us', { month: 'short' });
};

// FUNCTION After window load
window.addEventListener('load', () => {
  const introClock = setInterval(setIntroClock, 1000);

  setDateTime();
  setClockHands(dateTimeList.kr(), '.clock--big');
  setWorldClock();
});
