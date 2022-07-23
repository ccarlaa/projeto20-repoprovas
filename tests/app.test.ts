import supertest from 'supertest';
import bcrypt from "bcrypt";

import app from '../src/app.js';
import userFactory from './factories/userFactory.js';
import prisma from '../database.js';

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM "Users" WHERE email = 'teste@driven.com'`;
})

describe("POST /sign-up", () => {
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

  });

  afterAll(async () => {
    await prisma.$disconnect();
  })
