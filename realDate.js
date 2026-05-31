let dt = 1777774442;

const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);

  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
  };

  const formatter = new Intl.DateTimeFormat(
    "en-US",
    options
  );

  return formatter.format(curDate);
};

console.log(getDateTime(dt));