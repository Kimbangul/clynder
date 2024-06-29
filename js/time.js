// PARAM time diff
const timeDiff = {
  kr: 9 * 60 * 60 * 1000,
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

// FUNCTION set intro clock
const setIntroClock = () => {
  const clock = document.querySelector(".intro [data-time='1']");
  const clock2 = document.querySelector("[data-area='3'] .time");

  const korTime = getTimeFromUtc(timeDiff.kr);
  const time = {
    hour: padToDigit(korTime.getHours()),
    min: padToDigit(korTime.getMinutes()),
    second: padToDigit(korTime.getSeconds()),
  };

  const result = `${time.hour}:${time.min}:${time.second}`;

  clock.innerText = result;
  clock2.querySelector('.time__hour').innerText = time.hour;
  clock2.querySelector('.time__min').innerText = time.min;
  clock2.querySelector('.time__sec').innerText = time.second;

  clock.setAttribute('datetime', result);
  clock2.setAttribute('datetime', result);
};

// FUNCTION set datetime
const setDateTime = () => {
  const korTime = getTimeFromUtc(timeDiff.kr);
  const date = document.querySelector("[data-area='3']");
  date.querySelector('.date__year').innerText = korTime.getFullYear();
  date.querySelector('.date__day').innerText = `${getNth(korTime.getDate())}`;
  date.querySelector('.date__month').innerText = korTime.toLocaleString(
    'en-us',
    { month: 'short' }
  );
};

// FUNCTION After window load
window.addEventListener('load', () => {
  console.log('time load');

  const introClock = setInterval(setIntroClock, 1000);
  setDateTime();
});
