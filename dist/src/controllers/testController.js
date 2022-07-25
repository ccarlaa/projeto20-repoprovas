var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { newTestService } from "../services/testServices.js";
import { createTest } from '../repositories/testRepository.js';
import { getTestsByDiscipline, getTestsByTeacher } from '../repositories/testRepository.js';
export function newTestController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, pdfUrl, categoryId, teacherDisciplineId } = req.body;
        const newTest = yield newTestService(name, pdfUrl, categoryId, teacherDisciplineId);
        try {
            yield createTest(newTest);
            return res.status(201).send("Test created");
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });
}
export function getTestsByDisciplineController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testsList = yield getTestsByDiscipline();
            return res.status(200).send(testsList);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });
}
export function getTestsByTeacherController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const testsList = yield getTestsByTeacher();
            return res.status(200).send(testsList);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    });
}
