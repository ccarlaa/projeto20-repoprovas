import prisma from "../../database.js";
import { Tests } from "@prisma/client";

export type test = Omit<Tests, "id" >;

export async function createTest(newTest: test) {
    await prisma.tests.create({data: newTest});
}

export async function getTestsByDiscipline() {
	const tests = await prisma.terms.findMany({
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
}

export async function getTestsByTeacher() {
    const tests = await prisma.teachersDisciplines.findMany({
		where: {},
		include: {
			Teachers: {},
			Disciplines: { include: { 
                Terms: {}
             } },
			Tests: { include: 
                { Categories: {} } 
            },
		},
	});

	return tests;
}