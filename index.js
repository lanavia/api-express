const Joi = require('joi') // the name of the variable has the first letter in upper case, because the return is a class
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
]

app.get('/', (req, res)=>{
    res.send(' Hello World Lore')
})

app.get('/api/courses',(req, res)=>{
    res.send(courses)
})


app.get('/api/courses/:id',(req, res)=>{
const course = courses.find(c => c.id === parseInt(req.params.id))
if(!course) res.status(404).send('The course with the given ID was not found')
res.send(course)
})


app.post('/api/courses/',(req, res)=>{
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()})

            
    const result = schema.validate(req.body)
    console.log(result)
    

    if(result.error){
        // 400 Bad Request
        res.status(400)
        .send(result.error)
        return
    }
    const course = {
        id:courses.length +1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
    })


const port = process.env.PORT || 3000
app.listen(port, ()=> 
console.log(`Listening on port ${port} ... do you see me`))