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
export default function Home() {
  const [textChange, setTextChange] = useState("");
  const [editInput, setEditInput] = useState("randomText");
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

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
  let currentDate = `${currentYear}-${currentMonth}-${weekday[currentDay]}`;
  let Time = `${currentHour}:${currentMinute}:${currentSecond}  seconds`;

  function handleClickAddTask() {
    if (localStorage.getItem("tasks") == null) {
      data.push(text);
      setData(data);
      let convertArrToStr = JSON.stringify(data);
      localStorage.setItem("tasks", convertArrToStr);
    } else {
      let retString = localStorage.getItem("tasks");

      let retArray = JSON.parse(retString);
      retArray.push(text);
      setData(retArray);
      let convertArrToStr = JSON.stringify(retArray);
      localStorage.setItem("tasks", convertArrToStr);
    }
  }
  function handleClickDeleteTask(e) {
    setEditInput("Random Text");

    let retString = localStorage.getItem("tasks");
    console.log("hiii");
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
  function handleClickSaveTask(index) {
    setEditInput("Random text to change the value of editTextArea");

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
      // setData(data);
    } else {
      let retString = localStorage.getItem("tasks");

      let retArray = JSON.parse(retString);

      setData(retArray);
    }
  }, []);
  // console.log(data);
  return (
    <div className={styles.page}>
      <p className={styles.dateAndTime}>
        {currentDate}

        <br />
        {currentTime}
      </p>

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
            handleClickAddTask();
          }}
        />
      </div>
      {data.length > 0 ? (
        data.map((e, index) => (
          <div className={styles.todoSection} key={index}>
            <div>
              <Checkbox
                {...label}
                // checked={isChecked}
                checked={false}
                // defaultChecked
                color="success"
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                style={{ display: "inline" }}
                onClick={() => {
                  handleClickDeleteTask(index);
                }}
              />
              <p className={styles.tasks}>{e} </p>
              <Button
                onClick={() => {
                  handleEditClick(index);
                }}
                variant="contained"
                className={styles.btn}
              >
                Edit
              </Button>

              {console.log(editInput, index, "check")}
              {index == editInput && (
                <div className={styles.saveInputSection}>
                  <TextField
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
                      handleClickSaveTask(index);
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
