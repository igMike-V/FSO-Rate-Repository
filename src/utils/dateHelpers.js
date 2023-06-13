export const convertDate = (dateString) => {
  const date = new Date(dateString);
  // return date as a string in the format: "MM.DD.YYYY" with leading zeros
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${month}.${day}.${date.getFullYear()}`;
};
