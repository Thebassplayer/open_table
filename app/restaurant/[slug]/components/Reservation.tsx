"use client";
import useAvailability from "@/app/hooks/useAvailability";
import { partySize as partySizes, times } from "@/data/index";
import { Time, convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ReservationProps {
  openTime: string;
  closeTime: string;
  slug: string;
}

const Reservation = ({
  openTime,
  closeTime,
  slug,
}: ReservationProps): JSX.Element => {
  const { data, loading, error, fetchAvailabilities } = useAvailability();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const HandleChangeDate = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(null);
    setDay(date.toISOString().split("T")[0]);
    setSelectedDate(date);
  };

  const handleClick = () => {
    fetchAvailabilities({ slug, day, time, partySize });
  };

  const filterTimerByRestaurantOpenWindow = () => {
    const timesInWindow: typeof times = [];
    let isWithinWindow = false;
    times.forEach(time => {
      if (time.time === openTime) {
        isWithinWindow = true;
      }
      if (isWithinWindow) {
        timesInWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinWindow = false;
      }
    });

    return timesInWindow;
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={
            (e =>
              setPartySize(
                Number(e.target.value)
              )) as React.ChangeEventHandler<HTMLSelectElement>
          }
        >
          {partySizes.map((partySizeItem, index) => {
            const { value, label } = partySizeItem;
            return (
              <option value={value} key={`${value}-${index}`}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={HandleChangeDate}
            className="py-3 border-b font-light text-reg w-28"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={e => setTime(e.target.value)}
          >
            {filterTimerByRestaurantOpenWindow().map((time, index) => {
              return (
                <option value={time?.time} key={`${time?.time}-${index}`}>
                  {time.displayTime}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16 flex justify-center items-center"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Table"}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-5">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map(time => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-300 p-3 w-24 mb-3 rounded mr-3"></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Reservation;
