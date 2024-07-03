const express = require("express");

const app = express();

const courses = [
  { id: 1, name: "java" },
  { id: 2, name: "python" },
  { id: 3, name: "c++" },
];

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/courses", (req, res) => {
  const courseName = req.body.courseName;
  courses.append({id: courses.length+1, name: courseName});
});

app.listen(3000);