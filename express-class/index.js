const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

var courseCounter = 3;

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
    id: courseCounter + 1,
    course: course,
  });
  courseCounter += 1;
  res.send(`Course received: ${course}`);
});

app.put("/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = req.body.course;
  console.log(id);
  console.log(course);
  if ((!id && id != 0) || !course) {
    return res.status(400).send("Incomplete request");
  }
  let courseMod = courses.find((c) => c.id == id);
  if (!courseMod) return res.status(400).send("Course with ID not found");
  else courseMod.name = course;
  res.send(`Course id ${id}: ${course} updated`);
});

app.delete("/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((c) => c.id == id);
  console.log(id);
  console.log(course);
  if ((!id && id !== 0) || !course) {
    return res.status(400).send("Bad request");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
