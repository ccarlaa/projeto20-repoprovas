import supertest from 'supertest';
import bcrypt from "bcrypt";

import app from '../src/app.js';
import userFactory from './factories/userFactory.js';
import prisma from '../database.js';

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "Sessions"`;
    await prisma.$executeRaw`DELETE FROM "Users" WHERE email = 'teste@driven.com'`;
})

describe("User tests suite", () => {
    it("returns 201 for valid params", async() => {
        const login = userFactory.createLogin();
        const result = await supertest(app).post("/sign-up").send(login);
        const status = result.status;
        expect(status).toEqual(201);

        const user = await prisma.users.findFirst({
            where: {email: login.email }
          });
      
        expect(user.email).toBe(login.email);
    });

    it("returns 422 for invalid params", async() => {
        const login = userFactory.createLogin();
        delete login.password
        const result = await supertest(app).post("/sign-up").send(login);
        const status = result.status;
        expect(status).toEqual(422);
    });

    it("given email and password already in use, fail to create user. Returns 409 for conflict", async () => {
        const login = userFactory.createLogin();
        await userFactory.createUser(login);

        const response = await supertest(app).post(`/sign-up`).send(login);
        expect(response.statusCode).toEqual(409);
      })

    it("given valid email and password, receive token", async () => {
    const login = userFactory.createLogin();
    const user: any = await userFactory.createUser(login);
    
    const response = await supertest(app).post(`/sign-in`).send({
        email: user.email,
        password: user.plainPassword
    });

    const token = response.body.token;
    expect(token).not.toBeNull();
    });

    it("given invalid password, receive 401", async () => {
    const login = userFactory.createLogin();
    const user = userFactory.createUser(login);
    delete login.passwordConfirmation

    const response = await supertest(app).post(`/sign-in`).send({...login, password: "wrong_password"});
    expect(response.status).toBe(401);
    })
});

afterAll(async () => {
    await prisma.$disconnect();
})
