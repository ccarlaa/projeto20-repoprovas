import prisma from "../../database.js";
import { Sessions } from "@prisma/client";

export type session = Omit<Sessions, "id" >;

export async function creatSession(session: session) {
    await prisma.sessions.create({data: session});
}

export async function verifySession(token: string) {
    const sessionInfos = await prisma.sessions.findFirst({where: {token: token}});
    return sessionInfos;
}

