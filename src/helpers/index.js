import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("H:mm, D MMM YY");
};
