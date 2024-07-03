const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "java" },
  { id: 2, name: "python" },
  { id: 3, name: "c++" },
];

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.post("/courses", (req, res) => {
  const course = req.body.course;
  if (!course) {
    return res.status(400).send("Course not provided");
  }
  courses.push({
    id: courses.length + 1,
    course: course,
  });
  res.send(`Course received: ${course}`);
});

app.put("/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = req.body.course;
  if (!id || !course) {
    return res.status(400).send("Incomplete request");
  }
  let courseMod = courses[id];
  if (!courseMod) return res.status(400).send("Course with ID not found");
  else courseMod.course = course;
  res.send(`Course id ${id}: ${course} updated`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
