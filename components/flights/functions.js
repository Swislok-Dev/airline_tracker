export const convertISOTimeToDateTime = (time) => {
  return new Date(time);
};

const arrivedOrLanded = (flight) => {
  return flight.status.includes("Landed") || flight.status.includes("Arrived")
    ? true
    : false;
};

export const findNextFlight = (flightsArray) => {
  const { data } = flightsArray;

  for (let i = 0; i < data.length; i++) {
    let nextFlight = data[i + 1];
    let currentFlight = data[i];

    if (arrivedOrLanded(nextFlight)) {
      return currentFlight;
    }
  }
};

const dateString = (date) => {
  return new Date(date);
};

export const getTime = (date) => {
  const time = dateString(date).toLocaleTimeString();
  return time;
};

export const getDate = (date) => {
  if (date) {
    return dateString(date).toDateString();
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
