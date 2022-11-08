import logo from "./logo.svg";
import { useState, useEffect } from "react";
//import { Axios, AxiosError } from "axios";
import axios from "axios";
import Card from "./components/card";
function App() {
  const [zipInput, setZipInput] = useState("");
  const [zipQuery, setZipQuery] = useState("");
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  let apiUrl = `https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/${zipQuery}/json`;

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
          response.data[0].CITY +
          ", " +
          response.data[0].STATE +
          " " +
          formattedDay;
        setStatus(resultStatus);
        setZipInput("");
        //setStatus("");
      })
      .catch(function (error) {
        if (error.response.status === 404) {
          console.log(error.response.status);
          setStatus("No data found for your request");
          setData(null);
        }
        //       setStatus("There was an error with your request");
      });
  }, [url]);

  // ////THIS WORKS
  //   useEffect(() => {
  //     axios.get(apiUrl).then((response) => {
  //       console.log(response.data);
  //     });
  //   }, []);
  // ////

  function onInputChange(e) {
    setZipInput(e.target.value);
    console.log(zipInput);
  }

  function onSubmit() {
    const numRegex = /^\d+$/;
    if (zipInput.length !== 5 || !numRegex.test(zipInput)) {
      setStatus(
        "Invalid ZIP code. Please enter 5 digits with no special characters"
      );
      setData(null);
    } else {
      setStatus("Loading...");
      setUrl(
        `https://data.epa.gov/efservice/getEnvirofactsUVHOURLY/ZIP/${zipInput}/json`
      );
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={onInputChange}
          placeholder="Enter a 5 digit ZIP code"
          value={zipInput}
        ></input>
        <button onClick={onSubmit}>Submit</button>
        <h3>{status}</h3>
        {data &&
          data.map((item, index) => {
            return (
              <Card
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

{
  /* <Card DATE_TIME={item.DATE_TIME} index={index} UV_VALUE={item.UV_VALUE}/> */
}
{
  /* <div key={index}>
                <h3>_____</h3>
                <h3>{item.CITY}</h3>
                <h3>{item.DATE_TIME}</h3>
                <h3>{item.ZIP}</h3>
                <h3>{item.UV_VALUE}</h3>
              </div> */
}
