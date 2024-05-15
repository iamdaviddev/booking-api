import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';
import { hash, compare } from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import { GenerateRefreshToken } from '../../provider/genereateRefreshToken';

import { GenerateToken } from '../../provider/GenerateToken';

export class AuthController {
  async index(request: Request, response: Response){
    const users = await prisma.user.findMany()
    return response.json({ users })
  }

  async signup(request: Request, response: Response){
    const { name, email, password } = request.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(userExists){
      throw new Error("User already exists")
    }

    const hash_password = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      }
    })

    return response.json({
      message: "User created successfully",
      user
    })
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user){
      throw new Error("User does not exists")
    }

    const isPasswordValid = await compare(password, user.password);

    if(!isPasswordValid){
      throw new Error("Password is incorrect")
    }

    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "60s" })

    const generateToken = new GenerateToken()
    const toKen = generateToken.execute(user.id)

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = generateRefreshToken.execute(user.id)

    response.json({ user, token, refreshToken, toKen })
  }

  async uploadAvatar(request: Request, response: Response){
    const { userId } = request.params;
    if (!request.file) {
      return response.status(400).json({ error: 'No file uploaded' });
    }

    const avatarUrl = request.file.path; 
    await prisma.user.update({
      where: { 
        id: userId 
      },
      data: { 
        avatar: avatarUrl 
      },
    });
    response.json({ message: 'Avatar uploaded successfully' });
  };
}