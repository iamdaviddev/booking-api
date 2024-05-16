import { prisma } from "../../lib/prisma";
import { compare } from "bcrypt";
import { GenerateRefreshToken } from "../../provider/genereateRefreshToken";
import { GenerateToken } from "../../provider/GenerateToken";
import cookie from "js-cookie";

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase{
  async execute({ email, password }: IRequest){
    const userAlreadyExists = await prisma.user.findFirst({
      where: {
        email
      },
    })

    if(!userAlreadyExists){
      throw new Error("User or password incorrect")
    }

    const passwordMatch = compare(password, userAlreadyExists.password)

    if(!passwordMatch){
      throw new Error("User or password incorrect")
    }
    
    const generateTokenProvider = new GenerateToken()
    const token = await generateTokenProvider.execute(userAlreadyExists.id)

    cookie.set('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    await prisma.refreshToken.deleteMany({
      where: {
        userId: userAlreadyExists.id
      },
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id)
    

    return { token, refreshToken, userAlreadyExists }
  }
}