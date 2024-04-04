// pages/index.js or components/Calendar.js

import { useEffect, useState } from "react";
import { Button, Select } from "@nextui-org/react";

const MONTH_NAMES = [
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
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [month, setMonth] = useState(Number(new Date().getMonth()));
  const [year, setYear] = useState(new Date().getFullYear());
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);

  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }

    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  useEffect(() => {
    getNoOfDays();
  }, [month, year]);

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  function nextMonth() {
    console.log(month);
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  return (
    <div className="antialiased sans-serif bg-gray-100 h-screen">
      <div className="container mx-auto px-8 py-2 md:py-10">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex items-center justify-between py-2 px-6">
            <div>
              <span className="text-lg font-bold text-gray-800">
                {MONTH_NAMES[month]}
              </span>
              <span className="ml-1 text-lg text-gray-600 font-normal">
                {year}
              </span>
            </div>
            <div
              className="border rounded-lg px-1"
              style={{ paddingTop: "2px" }}
            >
              <Button auto flat onClick={prevMonth}>
                &lt;
              </Button>
              <Button auto flat onClick={nextMonth}>
                &gt;
              </Button>
            </div>
          </div>
          <div className="-mx-1 -mb-1">
            <div className="flex flex-wrap" style={{ marginBottom: "-10px" }}>
              {DAYS.map((day, index) => (
                <div
                  key={index}
                  style={{ width: "14.26%" }}
                  className="px-2 py-3"
                >
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                    {day}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap border-t border-l">
              {blankDays.map((_, index) => (
                <div
                  key={index}
                  style={{ width: "14.28%", height: "120px" }}
                  className="text-center border-r border-b px-4 pt-2"
                ></div>
              ))}
              {noOfDays.map((date, index) => (
                <div
                  key={index}
                  style={{ width: "14.28%", height: "120px" }}
                  className="px-4 pt-2 border-r border-b"
                >
                  <div className="flex flex-col gap-3">
                    <div
                      className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                        new Date().toDateString() ===
                        new Date(year, month, date).toDateString()
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-blue-200"
                      }`}
                    >
                      {date}
                    </div>
                    <p className="text-neutral-950">test</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
