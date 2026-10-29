import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import authSchema from '../validators/auth.validator';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';

export const Signup = async (req : Request, res : Response) => {
    const validationResult = authSchema.safeParse(req.body);
    if(!validationResult.success) return res.status(400).json({error: "Invalid input data", details: validationResult.error.format()});

    const {username, password} = validationResult.data;

    const userAlreadyExist = await prisma.user.findUnique({where: {username: username}});
    if(userAlreadyExist) return res.status(400).json({message: "User with this username already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        },
        select: {id: true}
    });

    return res.status(201).json({message: "User signed up successfully", id: newUser.id});
}

export const Signin = async (req : Request, res : Response) => {
    const validationResult = authSchema.safeParse(req.body);
    if(!validationResult.success) return res.status(400).json({error: "Invalid input data", details: validationResult.error.format()});

    const {username, password} = validationResult.data;

    const user = await prisma.user.findUnique({where: {username: username}});
    if(!user) return res.status(400).json({message: "Invalid credentials"});

    const hashedPassword = user.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

    const token = jwt.sign({userId: user.id}, JWT_SECRET || "secret123");
    return res.status(200).json({message: "User signed in successfully", token});
}

export const Signout = (req : Request, res : Response) => {
    return res.status(200).json({message: "User signed out successfully"});
}