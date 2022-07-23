
import { faker } from '@faker-js/faker';

import prisma from "../../database.js"

function createLogin(email = "teste@driven.com", passwordLength = 5) {
  const password = faker.internet.password(passwordLength)
  return {
    email,
    password,
    passwordConfirmation: password
  }
}

const userFactory = {
  createLogin
}

export default userFactory;