import React from "react";
import { Text } from "react-native";

const FormattedDate = ({ dateString , style }) => {
  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formattedDate = formatDateToYYYYMMDD(dateString);

  return <Text style={[style]}>{formattedDate}</Text>;
};

export default FormattedDate;