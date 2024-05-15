import dayjs from 'dayjs';
import { prisma } from "../lib/prisma";


export class GenerateRefreshToken {
  async execute(userId: string){
    const expiresIn = dayjs().add(2, 'minutes').unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })

    return generateRefreshToken
  }
}