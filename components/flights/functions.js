export const convertISOTimeToDateTime = (time) => {
  return new Date(time);
};
const flightScheduled = [
  "Scheduled",
  "Scheduled / Delayed",
  "Delayed",
  "En Route / Delayed",
  "En Route / On Time",
  "Taxiing",
  "Taxiing / Delayed",
  "En Route",
];

const nextScheduledFlight = (currentFlight, nextFlight) => {
  if (
    nextFlight.actual_off === null &&
    !nextFlight.status.includes("Cancelled")
  ) {
    return false;
  }
  if (
    nextFlight.actual_off !== null &&
    flightScheduled.includes(nextFlight.status)
  ) {
    return false;
  }

  return true;
};

export const findCurrentFlight = (flightsArray) => {
  const { data } = flightsArray;

  for (let i = 0; i < data.length; i++) {
    let nextFlight = data[i + 1];
    let currentFlight = data[i];

    if (nextScheduledFlight(currentFlight, nextFlight)) {
      return currentFlight;
    }
  }
};

export function checkFlightStatus(status) {
  if (status.includes("Taxiing")) {
    if (status.includes("Delayed")) {
      return "taxiing delayed";
    }
    return "taxiing";
  }

  if (status === "Delayed") {
    return "delayed";
  }

  if (status.includes("Scheduled")) {
    if (status.includes("Delayed")) {
      return "scheduled delayed";
    }
    return "scheduled";
  }

  if (status.includes("En Route")) {
    if (status.includes("On Time")) {
      return "enroute on-time";
    }
    if (status.includes("Delayed")) {
      return "enroute delayed";
    }
    return "enroute";
  }

  if (status.includes("Arrived") || status.includes("Landed")) {
    return "arrived";
  }

  if (status.includes("Cancelled")) {
    return "cancelled";
  }

  return "scheduled";
}

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
