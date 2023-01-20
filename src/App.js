import logo from "./logo.svg";
import { useState, useEffect } from "react";
//import { Axios, AxiosError } from "axios";
import axios from "axios";
import CardBox from "./components/card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function App() {
  const [zipInput, setZipInput] = useState("");
  const [zipQuery, setZipQuery] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("url in useEff");
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log("response.data: ");
        console.log(response.data);
        console.log(response.data[0].CITY);
        console.log(response.data[0].DATE_TIME);

        let newData = response.data;
        if (typeof newData === "object") {
          setData(newData);
        }
        let formattedDay = response.data[0].DATE_TIME.substring(0, 11).replace(
          /\//g,
          " "
        );
        console.log("formattedDay: " + formattedDay);
        let resultStatus =
          response.data[0].ZIP +
          ": " +
          response.data[0].CITY +
          ", " +
          response.data[0].STATE +
          " " +
          formattedDay;
        setStatus(resultStatus);
        setZipInput("");
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          console.log(error.response.status);
          setStatus("No data found for your request");
          setData(null);
        }
      });
  }, [url]);

  function onInputChange(e) {
    setZipInput(e.target.value);
    console.log(zipInput);
  }

  function onSubmit() {
    const numRegex = /^\d+$/;
    if (
      (zipInput.length < 5 || zipInput.length > 5) &&
      numRegex.test(zipInput)
    ) {
      setError(true);
      setStatus("ZIP Code must be 5 digits long");
      setData(null);
    } else if (!numRegex.test(zipInput)) {
      setError(true);
      setStatus("Only digits allowed");
      setData(null);
    } else {
      setError(false);
      setStatus("Loading...");
      setUrl(
        `https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/${zipInput}/json`
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <TextField
          label="Enter a ZIP Code"
          id="outlined-size-small"
          size="small"
          type="search"
          error={error}
          helperText={status}
          value={zipInput}
          onChange={onInputChange}
          sx={{
            minWidth: 285,
            maxWidth: 400,
            marginBottom: 1,
            marginTop: 1,
            marginLeft: 1,
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          size="large"
          sx={{
            marginBottom: 1,
            marginTop: 1,
          }}
          onClick={onSubmit}
        >
          SEARCH
        </Button>

        {/* <h3>{status}</h3> */}
        {data &&
          data.map((item, index) => {
            return (
              <CardBox
                key={index}
                date_time={item.DATE_TIME}
                uv_value={item.UV_VALUE}
              />
            );
          })}
      </header>
    </div>
  );
}

export default App;
