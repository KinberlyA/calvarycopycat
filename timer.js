const timer = document.getElementById("timer");

let curday;
let secTime;
let ticker;
let secs;

function getSeconds(day, time) {
  let nowDate = new Date();
  let dy = day; //Sunday through Saturday, 0 to 6
  let countertime = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate(),
    ...time
  ); //20 out of 24 hours = 8pm

  let curtime = nowDate.getTime(); //current time
  let atime = countertime.getTime(); //countdown time
  let diff = parseInt((atime - curtime) / 1000);
  if (diff > 0) {
    curday = dy - nowDate.getDay();
  } else {
    curday = dy - nowDate.getDay() - 1;
  } //after countdown time
  if (curday < 0) {
    curday += 7;
  } //already after countdown time, switch to next week
  if (diff <= 0) {
    diff += 86400 * 7;
  }
  startTimer(diff);
}

function startTimer(secs) {
  secTime = parseInt(secs);
  ticker = setInterval("tick()", 1000);
  tick(); //initial count display
}

function tick() {
  secs = secTime;
  if (secs > 0) {
    secTime--;
  }

  const days = Math.floor(secs / 86400);
  secs %= 86400;
  const hours = Math.floor(secs / 3600);
  secs %= 3600;
  const minutes = Math.floor(secs / 60);
  secs %= 60;

  timer.innerHTML = `${curday} ${curday != 1 ? "days" : "day"} ${hours} ${
    hours > 1 ? "hours" : "hour"
  } ${minutes} ${minutes != 1 ? "mins" : "min"} ${secs} ${
    secs != 1 ? "secs" : "sec"
  }`;
}

const monday = function () {
  getSeconds(1, [19, 0, 0]);
  // getSeconds(1, [14, 06, 0]);
  if (secs > 0) {
    secTime--;
  } else {
    clearInterval(ticker);
    location.reload();
  }
};

const wednesday = function () {
  getSeconds(3, [19, 0, 0]);

  if (secs > 0) {
    secTime--;
  } else {
    clearInterval(ticker);
    document.location.reload();
  }
};

const friday = function () {
  getSeconds(5, [19, 0, 0]);

  if (secs > 0) {
    secTime--;
  } else {
    clearInterval(ticker);
    document.location.reload();
  }
};

const sundaymorn = function () {
  getSeconds(0, [08, 30, 0]);

  if (secs > 0) {
    secTime--;
  } else {
    clearInterval(ticker);
    document.location.reload();
  }
};

const sundaybrunch = function () {
  getSeconds(0, [10, 30, 0]);
  if (secs > 0) {
    secTime--;
  } else {
    clearInterval(ticker);
    document.location.reload();
  }
};

const sundaylunch = function () {
  getSeconds(0, [11, 59, 0]);
  if (secs > 0) {
    secTime--;
  } else {
    clearInterval(ticker);
    document.location.reload();
  }
};

window.onload = function () {
  const today = new Date().getUTCDay();
  const todayHour = new Date().getHours();
  const todayMinute = new Date().getMinutes();
  console.log(today);

  if ((today === 1 && todayHour <= 18) || (today === 0 && todayHour >= 12)) {
    monday();
  } else if (
    (today === 1 && todayHour >= 19) ||
    today === 2 ||
    (today === 3 && todayHour <= 18)
  ) {
    wednesday();
  } else if (
    (today === 3 && todayHour >= 19) ||
    today === 4 ||
    (today === 5 && todayHour <= 18)
  ) {
    friday();
  } else if (
    (today === 5 && todayHour >= 19) ||
    today === 6 ||
    (today === 0 && todayHour <= 8 && todayMinute < 30)
  ) {
    sundaymorn();
  } else if (
    (today === 0 && todayHour === 8 && todayMinute > 29) ||
    (today === 0 && todayHour === 9) ||
    (today === 0 && todayHour === 10 && todayMinute < 15)
  ) {
    sundaybrunch();
  } else if (
    (today === 0 && todayHour === 10 && todayMinute >= 15) ||
    (today === 0 && todayHour === 11)
  ) {
    sundaylunch();
  }
};
