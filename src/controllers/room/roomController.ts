import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class RoomController {
  async index(request: Request, response: Response) {
    const rooms = await prisma.room.findMany();

    return response.json({ rooms });
  }

  async create(request: Request, response: Response) {
    const { name, description, capacity, price } = request.body;


    const room = await prisma.room.create({
      data: {
        name,
        description,
        capacity,
        price
      },
    });
  

      return response.json({ room });
    };
  }
