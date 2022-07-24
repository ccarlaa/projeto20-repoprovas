import prisma from "../../database.js";
import { Categories } from "@prisma/client";

export type category = Omit<Categories, "id" >

export async function verifyCategory(id: number) {
    const categoryInfos = await prisma.categories.findFirst({where: {id: id}});
    return categoryInfos;
}

