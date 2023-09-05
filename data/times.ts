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
  const displayTime = startTime.format("hh:mm A");
  const time = startTime.format("HH:mm:ss.SSS") + "Z"; // Add 'Z' for UTC timezone
  const searchTimes = [];

  // Generate search times for the next 1 interval (30 minutes)
  for (let i = 0; i < 1; i++) {
    searchTimes.push(startTime.format("HH:mm:ss.SSS") + "Z"); // Add 'Z' for UTC timezone
    startTime.add(30, "minutes");
  }

  times.push({
    displayTime,
    time,
    searchTimes,
  });
}
