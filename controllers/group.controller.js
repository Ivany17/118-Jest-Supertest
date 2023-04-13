const _ = require('lodash');
const createError = require('http-errors');
const { Group, User } = require('../models');

module.exports.createUserGroup = async(req, res, next) => {
    try {
        const {body} = req;
        const values = _.pick(body, ['name', 'imagePath', 'description']);

        const user = await User.findByPk(body.userId);
        if(!user){
            return next(createError(404, 'User does not found'))
        }
        const group = await Group.create({
            ...values,
        })

        await group.addUser(user);

        res.status(201).send({data:group})
    } catch (error) {
        next(error)
    }
}

module.exports.getGroupsByUser = async(req, res, next) => {
    try {
        const {params:{userId}} = req;
        const userWithGroups = await User.findByPk(userId, {
            attributes: {exclude: 'password'},
            include: [
                {
                    model: Group,
                    through: {
                        attributes: []
                    }
                }
            ],
        })
        if(!userWithGroups){
            return next(createError(404, 'User does not found'));
        }
        res.status(200).send({data:userWithGroups});
    } catch (error) {
        next(error) 
    }
}

module.exports.createImageForTheGroup = async(req, res, next) => {
    try {
        const {
            file: {filename},
            params: {groupId}
        } = req;

        const [count, [updatedGroup]] = await Group.update(
            {imagePath: filename},
            {
                where: {id: groupId},
                returning: true
            }
        )
        res.send(req.file)
    } catch (error) {
        next(error)
    }
}