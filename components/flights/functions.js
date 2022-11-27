const now = new Date();

export const convertISOTimeToDateTime = (time) => {
  return new Date(time);
};

export const findNextFlight = (flightsArray) => {
  let currentFlight;
  const { data } = flightsArray;

  for (let i = 0; i < data.length; i++) {
    let flightTime = convertISOTimeToDateTime(data[i].scheduled_off);
    let nextFlight = data[i + 1];
    if (flightTime > now && nextFlight.status !== "Scheduled") {
      if (nextFlight.status.includes("En Route")) {
        currentFlight = nextFlight;
        return currentFlight;
      }
      currentFlight = data[i];
    }
  }
  return currentFlight;
};

export const convertDate = (date) => {
  if (date) {
    const toDateString = new Date(date);
    const newDate = toDateString.toLocaleDateString();
    const newTime = toDateString.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
    });

    const newDateAndTime = newTime + " " + newDate;
    return newDateAndTime;
  }
};
