import supertest from 'supertest';
import bcrypt from "bcrypt";

import app from '../src/app.js';
import userFactory from './factories/userFactory.js';
import prisma from '../database.js';
import testFactory from './factories/testFactory.js';

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

        const token: string = response.text;

        expect(token).not.toBeNull();
    });

    it("given invalid password, receive 401", async () => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);

        const response = await supertest(app).post(`/sign-in`).send({...login, password: "wrong_password"});
        expect(response.status).toBe(401);

    }) 
});

describe("Create new tests", () => {
    it("returns 201 for valid params", async() => {
        await prisma.teachersDisciplines.create({
            data: {
            teacherId: 1,
            disciplineId : 1
            }
        });

        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });

        const token: string = response.text;

        const test = testFactory.createTest();

        const result = await supertest(app).post("/new-test").set('Authorization', `Bearer ${token}`).send(test);
        const status = result.status;
        expect(status).toEqual(201);
    });

    it("returns 401 for invalid token", async() => {
        const test = testFactory.createTest();

        const result = await supertest(app).post("/new-test").set('Authorization', `Bearer invalid_token`).send(test);

        const status = result.status;
        expect(status).toEqual(401);
    });

    it("returns 404 for invalid relation of categoryId", async() => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });

        const token: string = response.text;

        const test = testFactory.createTest();

        const result = await supertest(app).post("/new-test").set('Authorization', `Bearer ${token}`).send({...test, categoryId: 1000});
        const status = result.status;
        expect(status).toEqual(404);
    });

    it("returns 404 for invalid relation of teacherDisciplineId", async() => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });

        const token: string = response.text;

        const test = testFactory.createTest();

        const result = await supertest(app).post("/new-test").set('Authorization', `Bearer ${token}`).send({...test, teacherDisciplineId: 1000});
        const status = result.status;
        expect(status).toEqual(404);
    });
});


describe("Get tests by discipline", () => {
    it("returns 200 for valid params", async() => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });

        const token: string = response.text;

        const result = await supertest(app).get('/tests/disciplines').set('Authorization', `Bearer ${token}`);
        const status = result.status;
        expect(status).toEqual(200);
    });

    it("returns 401 for invalid token", async() => {

        const result = await supertest(app).get("/tests/disciplines").set('Authorization', `Bearer invalid_token`);

        const status = result.status;
        expect(status).toEqual(401);
    });
});

describe("Get tests by teacher", () => {
    it("returns 200 for valid params", async() => {
        const login = userFactory.createLogin();
        const user: any = await userFactory.createUser(login);
        
        const response = await supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });

        const token: string = response.text;

        const result = await supertest(app).get('/tests/teachers').set('Authorization', `Bearer ${token}`);
        const status = result.status;
        expect(status).toEqual(200);
    });

    it("returns 401 for invalid token", async() => {

        const result = await supertest(app).get("/tests/teachers").set('Authorization', `Bearer invalid_token`);

        const status = result.status;
        expect(status).toEqual(401);
    });
});

afterAll(async () => {
    await prisma.$disconnect();
})
