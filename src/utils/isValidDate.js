export default date => {
  const API_VERSION_FORMAT_REGEX = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/g;

  return API_VERSION_FORMAT_REGEX.test(date) && isValid(date);
};

const daysInMonth = (month, year) => {
  switch (month) {
    case 2:
      return (year % 4 === 0 && year % 100) || year % 400 === 0 ? 29 : 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    default:
      return 31;
  }
};

const isValid = date => {
  const [year, month, day] = date.split('-').map(value => parseInt(value, 10));

  return month >= 1 && month <= 12 && day > 0 && day <= daysInMonth(month, year);
};
