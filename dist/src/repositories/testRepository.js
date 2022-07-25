var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../../database.js";
export function createTest(newTest) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.tests.create({ data: newTest });
    });
}
export function getTestsByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield prisma.terms.findMany({
            include: {
                Disciplines: {
                    include: {
                        TeachersDisciplines: {
                            include: {
                                Disciplines: {},
                                Teachers: {},
                                Tests: {
                                    include: {
                                        Categories: {},
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return tests;
    });
}
export function getTestsByTeacher() {
    return __awaiter(this, void 0, void 0, function* () {
        const tests = yield prisma.teachersDisciplines.findMany({
            where: {},
            include: {
                Teachers: {},
                Disciplines: { include: {
                        Terms: {}
                    } },
                Tests: { include: { Categories: {} }
                },
            },
        });
        return tests;
    });
}
