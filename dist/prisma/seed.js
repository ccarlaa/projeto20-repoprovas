var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from "../database.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.disciplines.upsert({
            where: { name: 'HTML e CSS' },
            update: {},
            create: {
                name: 'HTML e CSS',
                termId: 1
            }
        });
        yield prisma.terms.upsert({
            where: { number: 1 },
            update: {},
            create: {
                number: 1
            }
        });
        yield prisma.categories.upsert({
            where: { name: 'Projeto' },
            update: {},
            create: {
                name: 'Projeto'
            }
        });
        yield prisma.teachers.upsert({
            where: { name: 'Diego Pinho' },
            update: {},
            create: {
                name: 'Diego Pinho'
            }
        });
    });
}
main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
