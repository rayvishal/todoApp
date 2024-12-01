// import Image from "next/image";
"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Checkbox from "@mui/material/Checkbox";
// import Button from "@mui//materialButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
// import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
export default function Home() {
  // let currentDate = new Date();
  // const [know,setKnow]=useState(localStorage.setItem("value",true));
  const [textChange, setTextChange] = useState("");
  const [editInput, setEditInput] = useState("randomText");
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [removeEditInput, setRemoveEditInput] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDay = new Date().getDay();
  let currentHour = new Date().getHours();
  let currentMinute = new Date().getMinutes();
  let currentSecond = new Date().getSeconds();
  let currentDate = `${currentYear},${currentMonth},${weekday[currentDay]}`;
  let Time = `${currentHour}:${currentMinute}:${currentSecond}  seconds`;
  // console.log(Date);
  // let array = [];
  function click() {
    console.log(localStorage.getItem("tasks"));
  }
  function handleClick() {
    if (localStorage.getItem("tasks") == null) {
      console.log(text, "singletext");
      data.push(text);
      let convertArrToStr = JSON.stringify(data);
      let firstTimeSentData = localStorage.setItem("tasks", convertArrToStr);
      let firstTimeBringData = localStorage.getItem("tasks");
      let firstTimeParseData = JSON.parse(firstTimeBringData);
      console.log(firstTimeBringData, "brign");
      setData(firstTimeParseData);
    } else {
      let retString = localStorage.getItem("tasks");
      // console.log("hiii");
      let retArray = JSON.parse(retString);
      retArray.push(text);
      let convertArrToStr = JSON.stringify(retArray);
      localStorage.setItem("tasks", convertArrToStr);
      let aretString = localStorage.getItem("tasks");
      let aretArray = JSON.parse(aretString);
      setData(aretArray);
      // console.log(data);
    }
  }
  function handleChecked(e) {
    // setIsChecked(true);
    // if (checked) {
    //   console.log("checked");
    // }
    let retString = localStorage.getItem("tasks");
    // console.log("hiii");
    let retArray = JSON.parse(retString);
    retArray.splice(e, 1);
    let leftTask = JSON.stringify(retArray);
    localStorage.setItem("tasks", leftTask);
    setData(retArray);
  }
  function handleEditClick(index) {
    // setEditInput(true);
    setEditInput(index);
  }
  function removeEventListener(index) {
    setEditInput("hello");

    data.splice(index, 1, textChange);
    let dataSent = JSON.stringify(data);
    localStorage.setItem("tasks", dataSent);
    console.log(data);
  }
  setTimeout(() => {
    setCurrentTime(Time);
  }, 1000);
  useEffect(() => {
    if (localStorage.getItem("tasks") == null) {
      setData(data);
    } else {
      let retString = localStorage.getItem("tasks");

      let retArray = JSON.parse(retString);

      setData(retArray);
    }
  }, []);
  // console.log(data);
  return (
    <div className={styles.page}>
      {/* <Button variant="contained" color="success" style={{ fontSize: "20px" }}>
        {currentDate}
      </Button> */}
      <h3
        style={{
          border: "2px solid green",
          fontFamily: "fantasy",
          backgroundColor: "black",
          color: "white",
          padding: "15px",
          fontSize: "35px",
        }}
        onClick={click}
      >
        {currentDate}

        <br />
        {currentTime}
      </h3>
      {/* {console.log("hel")} */}
      <div>
        <TextField
          id="standard-basic"
          label="Write your task here"
          variant="standard"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <AddIcon
          fontSize="large"
          color="success"
          onClick={() => {
            handleClick();
          }}
        />
      </div>
      {data.length > 0 ? (
        data.map((e, index) => (
          <div className={styles.todoSection} key={index}>
            <div>
              <Checkbox
                {...label}
                checked={isChecked}
                // defaultChecked
                color="success"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                style={{ display: "inline" }}
                onClick={() => {
                  handleChecked(index);
                }}
              />
              <h1 style={{ display: "inline", textAlign: "center" }}>{e} </h1>
              <Button
                onClick={() => {
                  handleEditClick(index);
                }}
                variant="contained"
                className={styles.btn}
              >
                Edit
              </Button>
              {/* {index == editInput && console.log(editInput, index, "edit")} */}
              {console.log(editInput, index, "check")}
              {index == editInput && (
                <div className={styles.saveInputSection}>
                  <TextField
                    // value={textChange}
                    defaultValue={e}
                    type="text"
                    onChange={(e) => {
                      setTextChange(e.target.value);
                    }}
                  />
                  <Button
                    className="saveButton"
                    variant="contained"
                    color="success"
                    onClick={() => {
                      removeEventListener(index);
                    }}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>Add Task</h1>
      )}
    </div>
  );
}
