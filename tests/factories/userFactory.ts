
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt'

import prisma from "../../database.js"

function createLogin(email = "teste@driven.com", passwordLength = 5) {
  const password = faker.internet.password(passwordLength)
  return {
    email,
    password
  }
}

interface Login {email: string, password: string};

async function createUser(login: Login) {
  const user = await prisma.users.create({
    data: {
      email: login.email,
      password: bcrypt.hashSync(login.password, 5)
    }
  });

  return {...user, plainPassword: login.password};
}

const userFactory = {
  createLogin,
  createUser
}

export default userFactory;