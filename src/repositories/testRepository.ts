import prisma from "../../database.js";
import { Tests } from "@prisma/client";

export type test = Omit<Tests, "id" >

export async function createTest(newTest: test) {
    await prisma.tests.create({data: newTest});
}
