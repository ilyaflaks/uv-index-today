import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CardBox = ({ date_time, uv_value }) => {
  console.log(date_time);
  console.log(uv_value);
  const localTime = new Date();
  const exactTime = localTime.toLocaleTimeString();
  let integerLocalTime = parseInt(exactTime.substring(0, 1));
  console.log("integerLocalTime: ", integerLocalTime);
  if (exactTime.substring(8) === "PM") {
    integerLocalTime = integerLocalTime + 12;
  }
  console.log("integerLocalTime AGAIN: ", integerLocalTime);

  let timeOfDay = date_time.substring(12);
  if (timeOfDay.startsWith("0")) {
    timeOfDay = timeOfDay.substring(1);
  }

  let integerPropTime = parseInt(date_time.substring(12, 14));
  console.log("integerPropTime: ", integerPropTime);
  if (date_time.substring(15) === "PM" && integerPropTime !== 12) {
    integerPropTime = integerPropTime + 12;
  }
  console.log("props.date_time.substring(15):", date_time.substring(15), "$$");
  console.log("integerPropTime: ", integerPropTime);

  ////Military time converter
  // function timeConversion(s) {
  //   let hour = s.substring(0, 2);
  //   let ampm = s.substring(8);
  //   let militaryHour = "";
  //   if (ampm === "AM" && hour !== "12") {
  //     militaryHour = hour;
  //   } else if (ampm === "PM" && hour === "12") {
  //     militaryHour = hour;
  //   } else if (ampm === "AM" && hour === "12") {
  //     militaryHour = "00";
  //   } else {
  //     militaryHour = parseInt(hour) + 12;
  //   }
  //   let minutes = s.substring(2, 8);
  //   let militaryTime = militaryHour + minutes;
  //   return militaryTime;
  // }
  /////END MILITARY TIME CONVERTER

  return (
    <div>
      {integerPropTime < integerLocalTime ? (
        <Accordion
          sx={{
            minWidth: 275,
            maxWidth: 400,
            marginBottom: 1,
            backgroundColor: "#EAEAEA",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{timeOfDay}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>UV Index: {uv_value}</Typography>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Card
          sx={{ minWidth: 275, maxWidth: 400, marginBottom: 1 }}
          variant="outlined"
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              {timeOfDay}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              UV Index: {uv_value}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {uv_value < 3
                ? "Low risk of harm from the sun"
                : uv_value > 2 && uv_value < 6
                ? "Moderate risk of harm. Make sure to protect your eyes outside"
                : uv_value > 5 && uv_value < 8
                ? "High risk of harm. Wear sunblock, sunglasses and a hat if you need to be outside for more than 15 minutes"
                : uv_value > 7 && uv_value < 11
                ? "Very high risk of harm. Wear sunblock, sunglasses and a hat if you need to be outside for more than 15 minutes. Seek shade when possible"
                : uv_value > 11
                ? "Extremely high risk of harm. Wear sunblock, sunglasses and a hat if you need to be outside for more than 15 minutes. Try to avoid sun exposure between 10 a.m. and 4 p.m."
                : ""}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CardBox;
