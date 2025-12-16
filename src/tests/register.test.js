import {
    describe,
    test,
    expect,
    jest,
    beforeEach
} from '@jest/globals';

import router from '../routing/register.js';


    //Mockup variables for unit testing
    const mockDb = {
        collection: jest.fn(() => ({
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest-fn(),
        }))
    };

    const req = {
        app: {get: () => mockDb },
        body: {},
        params: {}
    }

    const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
    }

describe('POST /api/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return 400 if username oder email is missing', async () => {
        const req = { body: {} };
        const res = { status: jest.fn(() => res), json: jest.fn() };

        await router.handle(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(req.json)
    })
})

