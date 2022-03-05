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
    let divClass = "";
    let month = 0;
    let year = 0;
    if(date.getMonth()==0)
    {
      month = 11;
      year = date.getFullYear()-1;
    }
    else
    {
      month = date.getMonth()-1;
      year = date.getFullYear();
    }
    divClass = BookingCheck(new Date(year,month,prevLastDay - x + 1));
    days += `<div class="prev-date ${divClass}">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    let divClass = "";
    divClass = BookingCheck(new Date(date.getFullYear(),date.getMonth(),i));
    let message = "";
    message = BookedBy(divClass);
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      days += `<div class="today ${divClass}" onmouseover="InfoShow(${i})" onmouseout="InfoHide(${i})">${i}<span class="hide" id="${i}">${message}</span></div>`;
    } else {
      days += `<div class="${divClass}" onmouseover="InfoShow(${i})" onmouseout="InfoHide(${i})">${i}<span class="hide" id="${i}">${message}</span></div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    let divClass = "";
    let month = 0;
    let year = 0;
    if(date.getMonth()==11)
    {
      month = 0;
      year = date.getFullYear()+1;
    }
    else
    {
      month = date.getMonth()+1;
      year = date.getFullYear();
    }
    divClass = BookingCheck(new Date(year,month,j));
    days += `<div class="next-date ${divClass}">${j}</div>`;
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

function BookingCheck(theDate)
{
  console.log(theDate);
  let StartDate = new Date(2022,1,28);
  let EndDate = new Date(2022,2,8);
  if(theDate >= StartDate && theDate <= EndDate)
  {
    return "BookedByMe";
  }
  return "myClass";
}

function BookedBy(divClass)
{
  if(divClass == "BookedByMe")
  {
    return "Reserved By Me";
  }
  else return "Available";
}