const {Task} = require('../models');

module.exports.createTask = async(req, rest, next) => {
    try {
        const {body, userInstance} = req;
        //const task = await Task.create({...body, userId: id});
        const task = await userInstance.createTask(body);
        rest.status(201).send();
    } catch (error) {
        next(error)
    }
}

module.exports.getUserTasks = async(req, rest, next) => {
    try {
        const {userInstance} = req;
        const tasks = await userInstance.getTasks();
        rest.status(200).send({data: tasks});
    } catch (error) {
        next(error)
    }
}