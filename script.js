const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let str = months[date.getMonth()] + ", " + date.getFullYear();
  document.querySelector(".date h1").innerHTML = str;
  str = "<strong>Today: </strong> " + new Date().toDateString()
  document.querySelector(".date p").innerHTML = str;

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      // days += `<div class="today">${i}</div>`;
      days += `<div class="today" onmouseover="InfoShow(${i})" onmouseout="InfoHide(${i})">${i}<span class="hide" id="${i}">Today!</span></div>`;
    } else {
      // days += `<div>${i}</div>`;
      days += `<div onmouseover="InfoShow(${i})" onmouseout="InfoHide(${i})">${i}<span class="hide" id="${i}">Other Day!</span></div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    
  }
  monthDays.innerHTML = days;
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();

function InfoShow(ID) {
  document.getElementById(ID).className = "showPopup";
}

function InfoHide(ID) {
  document.getElementById(ID).className = "hide";
}