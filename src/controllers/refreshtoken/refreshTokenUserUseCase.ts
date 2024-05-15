import dayjs from "dayjs";
import { prisma } from "../../lib/prisma";
import { GenerateToken } from "../../provider/GenerateToken";

export class RefreshTokenUserUseCase {
  async execute(refresh_token: string){
    const refreshtoken = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })

    if(!refreshtoken){
      throw new Error("Invalid refresh token")
    }

    const tokenExpired = dayjs().isAfter(dayjs.unix(refreshtoken.expiresIn));

    const generateTokenProvider = new GenerateToken();
    const token = await generateTokenProvider.execute(refreshtoken.userId)

    if(tokenExpired){
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshtoken.userId
        }
      })

      const generateTokenProvider = new GenerateToken();
      const newRefreshToken = await generateTokenProvider.execute(refreshtoken.userId)

      return { token, newRefreshToken };
    }

    return { token }
  }
}