import moment from "moment";

export const times: {
  displayTime: string;
  time: string;
  searchTimes: string[];
}[] = [];

// Define the start time and end time for the day
const startTime = moment("00:00 AM", "hh:mm A");
const endTime = moment("11:30 PM", "hh:mm A");

// Loop to generate time slots in 30-minute intervals
while (startTime.isSameOrBefore(endTime)) {
  if (
    startTime.isSameOrAfter(moment("00:00 AM", "hh:mm A")) &&
    startTime.isSameOrBefore(moment("11:30 PM", "hh:mm A"))
  ) {
    const displayTime = startTime.format("hh:mm A");
    const time = startTime.format("HH:mm:ss.SSS") + "Z"; // Add 'Z' for UTC timezone
    const searchTimes = [];

    // Generate search times for the current time and two times before and after
    for (let i = -2; i <= 2; i++) {
      const searchTime = moment(startTime).add(i * 30, "minutes");
      searchTimes.push(searchTime.format("HH:mm:ss.SSS") + "Z"); // Add 'Z' for UTC timezone
    }

    times.push({
      displayTime,
      time,
      searchTimes,
    });
  }

  startTime.add(30, "minutes");
}
