# CRUD RESTful api using express

The Courses API! This API is designed to manage and maintain courses efficiently.

## Getting Started with Express

To run this project locally using Express, follow these steps:

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Install nodemon
    npm install -g nodemon
4. Start the server with `nodemon index.js`.

This will launch the Express application and restart it automatically whenever you make changes to your code.

## Usage

### Making Requests

Below are the key operations you can perform:

### Endpoints

- `GET /api/courses/`: Get a list of courses.
- `POST /api/courses/`: Create a new course.
- `GET /api/courses/:id`: Get a specific course by ID.

## Configuration

Optional, to configure the application, you can create the variable 

- `PORT`: The port on which the server will run.
Using the console mac
$> export PORT=5500

Using the console windows
$> set PORT=5500