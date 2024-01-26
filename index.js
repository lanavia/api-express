const Joi = require('joi') // the name of the variable has the first letter in upper case, because the return is a class
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
]

app.get('/', (req, res) => {
    res.send(' Hello World Lore')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found')
    res.send(course)
})


app.post('/api/courses/', (req, res) => {
    const { error } = validateCourse(req.body)

    if (error) {
        // 400 Bad Request
        res.status(400)
            .send(error.details[0].message)
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    //look up the course if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found')

    //validate if it is invalid, return 400 - Bad request
    const { error } = validateCourse(req.body)

    if (error) {
        // 400 Bad Request
        res.status(400).send(error.details[0].message)
        return
    }
    //update course
    course.name = req.body.name
    //return course updated
    res.send(course)
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    })

    const result = schema.validate(course)
    return result
}



app.delete('/api/courses/:id', (req, res) => {
    //look up the course if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('The course with the given ID was not found')

    //get the course index to delete
    const indexToDelete = courses.indexOf(course)
    //delete course
    courses.splice(indexToDelete, 1)
    //return course updated
    res.send(course)
})


const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Listening on port ${port} ... do you see me`))