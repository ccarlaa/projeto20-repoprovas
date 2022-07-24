import { verifyCategory } from "../repositories/categoryRepository.js";
import { verifyTeacherDiscipline } from "../repositories/teacherDisciplineRepository.js";
import { test } from "../repositories/testRepository.js";

export async function newTestService( 
name: string, 
pdfUrl: string,
categoryId: number,
teacherDisciplineId: number) {

    const validateCategory = await verifyCategory(categoryId);
    if(validateCategory == undefined) {
        throw { status: 404, message: "Category not found" };
    }

    const validateTeacherDiscipline = await verifyTeacherDiscipline(teacherDisciplineId);
    if(validateTeacherDiscipline == undefined) {
        throw { status: 404, message: "Teacher Discipline not found" };
    }

    const newTest : test = {
        name,
        pdfUrl,
        categoryId,
        teacherDisciplineId
    }
    
    return newTest;
}