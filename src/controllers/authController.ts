import { Request, Response } from 'express';
import { newUserService, signInService } from '../services/authService.js';
import { creatSession } from '../repositories/sessionRepository.js';
import { insert } from '../repositories/authRepository.js';

export async function newUserController(req: Request, res: Response) {
    const { email, password } : { email: string, password: string } = req.body;
    const user = await newUserService(email, password);
    try {
        await insert(user);
        return res.status(201).send("Successfully registered");
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

export async function signInController(req: Request, res: Response) {
    const { email, password } : { email: string, password: string } = req.body;
    const session = await signInService(email, password);
    const { token } = session;
    try {
        await creatSession(session);
        return res.status(200).send(token);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}
