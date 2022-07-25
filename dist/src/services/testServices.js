var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { verifyCategory } from "../repositories/categoryRepository.js";
import { verifyTeacherDiscipline } from "../repositories/teacherDisciplineRepository.js";
export function newTestService(name, pdfUrl, categoryId, teacherDisciplineId) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateCategory = yield verifyCategory(categoryId);
        if (validateCategory == undefined) {
            throw { status: 404, message: "Category not found" };
        }
        const validateTeacherDiscipline = yield verifyTeacherDiscipline(teacherDisciplineId);
        if (validateTeacherDiscipline == undefined) {
            throw { status: 404, message: "Teacher Discipline not found" };
        }
        const newTest = {
            name,
            pdfUrl,
            categoryId,
            teacherDisciplineId
        };
        return newTest;
    });
}
