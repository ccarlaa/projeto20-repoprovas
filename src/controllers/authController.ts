import { Request, Response, NextFunction } from 'express';
import { newUserService } from '../services/authService.js';
import { insert } from '../repositories/authRepository.js';

export async function newUserController(req: Request, res: Response) {
    const { email, password } : { email: string, password: string } = req.body;
    const user = await newUserService(email, password)
    try {
        await insert(user);
        return res.status(201).send("Successfully registered")
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}
