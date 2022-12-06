export const convertISOTimeToDateTime = (time) => {
  return new Date(time);
};

export const findNextFlight = (flightsArray) => {
  const { data } = flightsArray;

  for (let i = 0; i < data.length; i++) {
    let nextFlight = data[i + 1];
    let currentFlight = data[i];

    if (nextFlight.status.includes("Arrived")) {
      return currentFlight;
    }
  }
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
