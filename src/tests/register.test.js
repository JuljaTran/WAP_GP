import {
    describe,
    test,
    expect,
    jest,
    beforeEach
} from '@jest/globals';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { registerPostHandler, activateAccountHandler } from '../routing/register.js';

describe('function registerPostHandler', () => {
    let req;
    let res;
    let mockDb;

    beforeEach(() => {
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword123');
        const mockCollection = {
            findOne: jest.fn(),
            insertOne: jest.fn()
        };

        mockDb = {
            collection: jest.fn(() => mockCollection)
        };

        req = {
            app: { get: jest.fn(() => mockDb) },
            body: { email: '', username: ''},
            params: {}
        };

        res = {
            status: jest.fn(function (code) {
                this.statusCode = code;
                return this;
            }),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('returns 400 if email or username is missing', async () => {
        await registerPostHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                error: expect.stringContaining('required')
            })
        );
    });

    test('creates user successfully', async () => {
        req.body = {
            email: 'test@test.de',
            username: 'testuser'
        };

        mockDb.collection().findOne.mockResolvedValue(null);
        mockDb.collection().insertOne
            // user_auth
            .mockResolvedValueOnce({
                acknowledged: true,
                insertedId: '123'
            })
            // token
            .mockResolvedValueOnce({
                acknowledged: true
            });

        await registerPostHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.stringContaining('User created')
            })
        );
    });
});

describe ('activationAccountHandler', () => {
    let req; 
    let res;
    let mockDb;

    beforeEach(() => {
        const mockCollection = {
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn()
        };
        mockDb = { collection: jest.fn(() => mockCollection) };

        req = {
            app: { get: jest.fn(() => mockDb) },
            body: { password: 'myPassword' },
            params: { token: 'token1234'}
        };

        res = {
            status: jest.fn(function (code) {
                this.statusCode = code; 
                return this;
            }),
            json: jest.fn(),
            send: jest.fn()
        };
    });

    test('returns 400 if token not found', async ()=> {
        mockDb.collection().findOne.mockResolvedValue(null);

        await activateAccountHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ error: expect.stringContaining('Invalid') })
        );
    });

    test('activates user successfully', async ()=> {
        const userAuthId = new ObjectId();

        mockDb.collection().findOne
        .mockResolvedValueOnce({ user_id: userAuthId })
        .mockResolvedValueOnce({ _id: userAuthId });

        mockDb.collection().insertOne.mockResolvedValue({ insertedId: new ObjectId() });
        mockDb.collection().updateOne.mockResolvedValue({ modifiedCount: 1 });
        mockDb.collection().deleteOne.mockResolvedValue({ deletedCount: 1 });

        await activateAccountHandler(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ message: expect.stringContaining('Account activated') })
        );
    });
});
