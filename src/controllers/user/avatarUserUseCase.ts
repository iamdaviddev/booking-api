import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class AvatarUserUseCase{
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