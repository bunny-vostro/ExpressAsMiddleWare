const express = require('express');
const app = express();

let courses = [
    {name : "Name 1", id : 1},
    {name : "Name 2", id : 2},
    {name : "Name 3", id : 3}
]

app.use(express.json());

app.get('/', function(req,res){
    res.send('Hello World');
    res.end();
});

app.get('/api/courses', (req,res) => {
    res.send(courses);
    throw new Error("BROKEN"); // Express will catch this on its own
})

app.get('/api/courses/:id', (req,res) => {
    const selectedCourse = courses.find(c => (c.id === req.params.id))
    res.send(selectedCourse);
    throw new Error("BROKEN"); // Express will catch this on its own
});

app.post('/api/courses', (req,res) => {
    console.log("Request Received");
    const course = {
        id : courses.length + 1,
        name : req.body.name        
    };
    courses.push(course);
    res.send(courses);
    throw new Error("BROKEN"); // Express will catch this on its own
});



const port = process.env.PORT || 1377;

app.listen(port,() => {
    console.log("Listening to port "+ port);
})