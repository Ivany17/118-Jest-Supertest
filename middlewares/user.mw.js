const {User} = require('../models');

module.exports.checkUser = async (req, res, next) => {
    try {
        const {params:{userId}} = req;
        const userInstance = await User.findByPk(userId);
        if(!userInstance){
            throw new Error('user is not found');
        }
        req.userInstance = userInstance;
        next();
    } catch (error) {
        next(error)
    }
}