const createError = require('http-errors');
const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
    try {
        const {body} = req;
        const createdUser = await User.create(body);
        if(!createdUser) {
            throw new Error('400. Bad Request');
        }
        res.status(201).send({data:createdUser});
    } catch (error) {
        next(error)
    }
}

module.exports.getUser = async(req, rest, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(userId, {
            attributes: {exclude: ['password']}
        });
        if(!user) {
            const error = createError(404, 'User Does Not Found');
            return next(error);
        }
        res.status(200).send({data:user});
    } catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const {pagination = {}} = req;
        const users = await User.findAll({
            where: {
                firstName:'Elon'
            },
            attributes: {
                exclude: ['password']
            },
            ...pagination,
        });
        res.status(200).send({data:users});
    } catch (error) {
        next(error)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const {body, params:{userId}} = req;
        const [rows, [updateUser]] = await User.update(body, {
            where: {id : userId},
            returning: true //['first_name', 'last_name', 'email']
        });
        updateUser.password = undefined;
        res.status(200).send({data:updateUser});
    } catch (error) {
        next(error)
    }
}

module.exports.updateUserInstance = async (req, res, next) => {
    try {
        const {body, params:{id}} = req;
        //const userInstance = await User.findByPk(id);
        const updatedUser = await userInstance.update(body, {
            returning: true
        });
        updatedUser.password = undefined;
        res.status(200).send({data:updatedUser});
    } catch (error) {
        next(error)
    }
}