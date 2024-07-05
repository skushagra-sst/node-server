const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const { log } = require("console");

const db = mongoose
  .connect(
    "mongodb+srv://kushagrarigel:vSeaO0pgqV8trzJn@cluster0.kfxlans.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    log("Connected");
  })
  .catch(() => {
    log("Failed");
  });

const app = express();
app.use(express.json());

let courseFile = JSON.parse(fs.readFileSync("courses.json", "utf-8"));
let courseCounter = courseFile.length;

const readCourses = () => {
  return JSON.parse(fs.readFileSync("courses.json", "utf-8"));
};

const writeCourses = (courses) => {
  fs.writeFileSync("courses.json", JSON.stringify(courses, null, 2));
};

app.get("/courses", logger, (req, res) => {
  const courses = readCourses();
  res.json(courses);
});

app.post("/courses", logger, (req, res) => {
  const courses = readCourses();
  const course = req.body.course;
  if (!course) {
    return res.status(400).send("Course not provided");
  }
  courses.push({
    id: courseCounter + 1,
    course: course,
  });
  courseCounter += 1;
  writeCourses(courses);
  res.send(`Course received: ${course}`);
});

app.put("/courses/:id", (req, res) => {
  const courses = readCourses();
  const id = parseInt(req.params.id);
  const course = req.body.course;
  console.log(id);
  console.log(course);
  if ((!id && id !== 0) || !course) {
    return res.status(400).send("Incomplete request");
  }
  let courseMod = courses.find((c) => c.id === id);
  if (!courseMod) return res.status(400).send("Course with ID not found");
  else courseMod.course = course;
  writeCourses(courses);
  res.send(`Course id ${id}: ${course} updated`);
});

app.delete("/courses/:id", (req, res) => {
  const courses = readCourses();
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);
  console.log(id);
  console.log(course);
  if ((!id && id !== 0) || !course) {
    return res.status(400).send("Bad request");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  writeCourses(courses);
  res.sendStatus(200);
});

function logger(req, res, next) {
  console.log(`${new Date()} ${req.method} ${req.url} ${req.ip}`);
  next();
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
