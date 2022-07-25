var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import supertest from 'supertest';
import app from '../src/app.js';
import userFactory from './factories/userFactory.js';
import prisma from '../database.js';
import testFactory from './factories/testFactory.js';
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$executeRaw `TRUNCATE TABLE "Sessions"`;
    yield prisma.$executeRaw `DELETE FROM "Users" WHERE email = 'teste@driven.com'`;
}));
describe("User tests suite", () => {
    it("returns 201 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const result = yield supertest(app).post("/sign-up").send(login);
        const status = result.status;
        expect(status).toEqual(201);
        const user = yield prisma.users.findFirst({
            where: { email: login.email }
        });
        expect(user.email).toBe(login.email);
    }));
    it("returns 422 for invalid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        delete login.password;
        const result = yield supertest(app).post("/sign-up").send(login);
        const status = result.status;
        expect(status).toEqual(422);
    }));
    it("given email and password already in use, fail to create user. Returns 409 for conflict", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-up`).send(login);
        expect(response.statusCode).toEqual(409);
    }));
    it("given valid email and password, receive token", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = response.text;
        expect(token).not.toBeNull();
    }));
    it("given invalid password, receive 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send(Object.assign(Object.assign({}, login), { password: "wrong_password" }));
        expect(response.status).toBe(401);
    }));
});
describe("Create new tests", () => {
    it("returns 201 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.teachersDisciplines.create({
            data: {
                teacherId: 1,
                disciplineId: 1
            }
        });
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = response.text;
        const test = testFactory.createTest();
        const result = yield supertest(app).post("/new-test").set('Authorization', `Bearer ${token}`).send(test);
        const status = result.status;
        expect(status).toEqual(201);
    }));
    it("returns 401 for invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const test = testFactory.createTest();
        const result = yield supertest(app).post("/new-test").set('Authorization', `Bearer invalid_token`).send(test);
        const status = result.status;
        expect(status).toEqual(401);
    }));
    it("returns 404 for invalid relation of categoryId", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = response.text;
        const test = testFactory.createTest();
        const result = yield supertest(app).post("/new-test").set('Authorization', `Bearer ${token}`).send(Object.assign(Object.assign({}, test), { categoryId: 1000 }));
        const status = result.status;
        expect(status).toEqual(404);
    }));
    it("returns 404 for invalid relation of teacherDisciplineId", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = response.text;
        const test = testFactory.createTest();
        const result = yield supertest(app).post("/new-test").set('Authorization', `Bearer ${token}`).send(Object.assign(Object.assign({}, test), { teacherDisciplineId: 1000 }));
        const status = result.status;
        expect(status).toEqual(404);
    }));
});
describe("Get tests by discipline", () => {
    it("returns 200 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = response.text;
        const result = yield supertest(app).get('/tests/disciplines').set('Authorization', `Bearer ${token}`);
        const status = result.status;
        expect(status).toEqual(200);
    }));
    it("returns 401 for invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest(app).get("/tests/disciplines").set('Authorization', `Bearer invalid_token`);
        const status = result.status;
        expect(status).toEqual(401);
    }));
});
describe("Get tests by teacher", () => {
    it("returns 200 for valid params", () => __awaiter(void 0, void 0, void 0, function* () {
        const login = userFactory.createLogin();
        const user = yield userFactory.createUser(login);
        const response = yield supertest(app).post(`/sign-in`).send({
            email: user.email,
            password: user.plainPassword
        });
        const token = response.text;
        const result = yield supertest(app).get('/tests/teachers').set('Authorization', `Bearer ${token}`);
        const status = result.status;
        expect(status).toEqual(200);
    }));
    it("returns 401 for invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield supertest(app).get("/tests/teachers").set('Authorization', `Bearer invalid_token`);
        const status = result.status;
        expect(status).toEqual(401);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
