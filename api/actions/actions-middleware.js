const actions = require("./actions-model")

function checkIfActionIdExist() {
    return (req, res, next) => {
        actions.get(req.params.id)
            .then((action) => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(404).json({
                        message: "Action not found.",
                    })
                }
            })
            .catch((error) => {
                next(error)
            })
    }
}

function checkActionData() {
    return (req, res, next) => {
        if (!req.body.project_id || !req.body.description) {
            res.status(400).json({
                message: "Missing project id or description.",
            })
        } else {
            next()
        }
    }
}

module.exports = {
    checkIfActionIdExist,
    checkActionData,
}