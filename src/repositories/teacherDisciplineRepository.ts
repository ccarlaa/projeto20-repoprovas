import prisma from "../../database.js";
import { TeachersDisciplines } from "@prisma/client";

export type teacherDiscipline = Omit<TeachersDisciplines, "id" >;

export async function verifyTeacherDiscipline(id: number) {
    const teacherDisciplineInfos = await prisma.teachersDisciplines.findFirst({where: {id: id}});
    return teacherDisciplineInfos;
}

