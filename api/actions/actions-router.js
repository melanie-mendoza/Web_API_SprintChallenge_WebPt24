// Write your "actions" router here!

const express = require("express")
const actions = require("./actions-model")
const { checkIfActionIdExists, checkActionData } = require("./actions-middleware")

const router = express.Router()

router.get("/api/actions", (req, res, next) => {
    actions.get()
        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            next(error)
        })
})

router.get("/api/actions/:id", checkActionData(), (req, res) => {
    res.status(200).json(req.action)
})

router.post("/api/actions", checkActionData(), (req, res) => {
    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            next(error)
        })
})

router.put("/api/actions/:id", checkActionData(), checkIfActionComplete(), (req, res) => {
    actions.update(req.params.id, req.body)
    .then((action) => {
        if (action) {
            res.status(200).json(action)
        } else {
            res.status(400).json({
                message: "The action could not be found.",
            })
        }
    })
    .catch((error) => {
        next(error)
    })
})

router.delete("/api/actions/:id", checkIfActionIdExists(), (req, res) => {
    actions.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The action has been deleted.",
                })
            } else {
                res.status(404).json({
                    message: "The action could not be found.",
                })
            }
        })
        .catch((error) => {
            next(error)
        })
})

module.exports = router