// Write your "projects" router here!
const express = require("express")
const projects = require("./projects-model")
const { checkProjectData, checkIfProjectIdExists } = require("./projects-middleware")

const router = express.Router()

router.get("/api/projects", (req, res, next) => {
    projects.get()
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            next(error)
        })
})

router.get("/api/projects/:id", checkIfProjectIdExists(), (req, res) => {
    res.status(200).json(req.project)
})

router.post("/api/projects", checkProjectData(), (req, res) => {
    projects.insert(req.body)
    .then((project) => {
        res.status(201).json(project)
    })
    .catch((error) => {
        next(error)
    })
})

router.put("/api/projects/:id", checkProjectData(), checkIfProjectIdExists(), (req, res) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            if (project) {
                res.status(200).json(project)
            } else {
                res.status(404).json({
                    message:"The project could not be found.",
                })
            }
        })
        .catch((error) =>  {
            next(error)
        })          
})

router.delete("api/projects/:id", checkIfProjectIdExists(), (req, res) => {
    projects.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted.",
                })
            } else {
                res.status(404).json({
                    message: "The project could not be found.",
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})

// Retrieves the list of actions for a project. Sends an array of actions (or an empty array) as the body of the response.
router.get("/api/projects/:id/actions", checkIfProjectIdExists(), (req, res) => {
    projects.get(req.params.id)
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            next(error)
        })
})