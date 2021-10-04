var moment = require("moment"); // require

/**
 * Format the date return from mongodb to human readable date time
 *
 * @param dateTime ex "2021-10-03T15:34:39.678Z"
 * @param format default "MM/DD/YYYY h:mm a" ex 02/28/2021 9:38 am
 * for more format, visit https://momentjs.com/docs/#/displaying/
 *
 * @return date string
 */
const formatDate = (dateTime, format = "MM/DD/YYYY h:mm a") => {
  let formattedDate;
  try {
    if (dateTime) {
      formattedDate = moment(dateTime).format(format);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  return formattedDate;
};

export default formatDate;
