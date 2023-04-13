'use strict';
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const { User, sequelize } = require('../models');

module.exports = {
    async up (queryInterface, Sequelize) {
        const users = await sequelize.query('SELECT * FROM "users"', {
            type: QueryTypes.SELECT
        });

        const tasks = users.map(u => {
            return new Array(_.random(3, 7, false)).fill(null).map((t, i) => ({
                body: `text task ${i} from user ${u.id}`,
                user_id: u.id,
                created_at: new Date(),
                updated_at: new Date(),
            }))
        }).flat(2)

        await queryInterface.bulkInsert('tasks', tasks, {});
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tasks', null, {});
    }
}