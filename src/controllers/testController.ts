import { Request, Response } from 'express';
import { newTestService } from "../services/testServices.js";
import { createTest } from '../repositories/testRepository.js';
import { getTestsByDiscipline, getTestsByTeacher } from '../repositories/testRepository.js';

export async function newTestController(req: Request, res: Response) {
    const { name, pdfUrl, categoryId, teacherDisciplineId } : { name: string, pdfUrl: string, categoryId: number, teacherDisciplineId: number } = req.body;
    const newTest = await newTestService(name, pdfUrl, categoryId, teacherDisciplineId);
    try {
        await createTest(newTest);
        return res.status(201).send("Test created");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function getTestsByDisciplineController(req: Request, res: Response) {
    try {
        const testsList = await getTestsByDiscipline()
        return res.status(200).send(testsList);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function getTestsByTeacherController(req: Request, res: Response) {
    try {
        const testsList = await getTestsByTeacher()
        return res.status(200).send(testsList);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}