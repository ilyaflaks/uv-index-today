import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CardBox = (props) => {
  const localTime = new Date();
  // console.log("props date time: " + props.date_time);
  const exactTime = localTime.toLocaleTimeString();
  //  console.log("exactTime: " + exactTime);
  const localHour = exactTime.substring(0, 1);
  // console.log("localHour: " + localHour);
  const localAmpm = exactTime.substring(8);
  // console.log("localAmpm: " + localAmpm);
  const localHourAmPm = localHour + " " + localAmpm;

  let timeOfDay = props.date_time.substring(12);

  if (timeOfDay.startsWith("0")) {
    timeOfDay = timeOfDay.substring(1);
  }
  console.log("time of day: " + timeOfDay);
  console.log("localHourAmPm: " + localHourAmPm);

  //TODO
  //add some logic to add styles based on local time of day. If the time has already passed, make it gray
  //if the UV index is over 4, make it red or orange

  ////Military time converter from HackerRank:
  function timeConversion(s) {
    let hour = s.substring(0, 2);
    let ampm = s.substring(8);
    let militaryHour = "";
    if (ampm === "AM" && hour !== "12") {
      militaryHour = hour;
    } else if (ampm === "PM" && hour === "12") {
      militaryHour = hour;
    } else if (ampm === "AM" && hour === "12") {
      militaryHour = "00";
    } else {
      militaryHour = parseInt(hour) + 12;
    }
    let minutes = s.substring(2, 8);
    let militaryTime = militaryHour + minutes;
    return militaryTime;
  }
  /////END MILITARY TIME CONVERTER

  return (
    // <div className="uv-card">
    //   <h3>{timeOfDay}</h3>
    //   <h3>UV Index: {props.uv_value}</h3>
    // </div>

    <Card
      sx={{ minWidth: 275, maxWidth: 400, marginBottom: 1 }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {timeOfDay}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          UV Index: {props.uv_value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardBox;
