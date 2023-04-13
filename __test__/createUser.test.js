const request = require("supertest");
const yup = require('yup');
const app = require('../app');
const db = require('../models');
const appRequest = request(app);

const getUserData = () => ({
    firstName: 'Test1',
    lastName: 'Test2',
    email: `test${Date.now()}@gmail.com`,
    password: 'test123456',
    birthday: '1999-10-10',
    isMale: true
})

const user = getUserData();

const SchemaUser = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    birthday: yup.date(),
    isMale: yup.boolean(),
})

const schemaResponseSuccess = yup.object({
    data: yup.array().of(SchemaUser)
})

beforeAll(() => {
    return db.sequelize.sync({force: true});
})

afterAll(() => {
    return db.sequelize.close();
});

describe('create user', () => {
    test('create(post) user successfully expect 201', async () => {
        const response = await appRequest.post('api/users').send(user);
        expect(response.statusCode).toBe(201);
        expect(schemaResponseSuccess.isValidSync(response.body)).toBe(true);
    });
    test('create(post) empty user expect 400', async () => {
        const response = await appRequest.post('api/users').send({});
        expect(response.statusCode).toBe(400);
    });
    test('create(post) exists user expect 409', async () => {
        const response = await appRequest.post('api/users').send(user);
        expect(response.statusCode).toBe(409);
    });   
});

describe('get user/users', () => {
    test('get user successfully expect 200', async () => {
        const response = await appRequest.get('api/users/1');
        expect(response.statusCode).toBe(200);
    });
    test('get user not found expect 404', async () => {
        const response = await appRequest.get('api/users/10');
        expect(response.statusCode).toBe(404);
    });
});

