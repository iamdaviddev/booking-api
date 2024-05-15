import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import multer from "multer";

export class RoomController {
  async index(request: Request, response: Response) {
    const rooms = await prisma.room.findMany();

    return response.json({ rooms });
  }

  async create(request: Request, response: Response) {
    const { roomId } = request.params;
    const { name, description, capacity, price } = request.body;

    if (!name || !description || !capacity || !price || !request.file) {
      return response.status(400).json({ error: 'Missing required fields' });
    }

    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname); 
      }
    });

    const upload = multer({ storage: storage }).single('image');

    upload(request, response, async function (err) {
      if (err) {
        return response.status(500).json({ error: err.message });
      }

      if (!request.file) {
        return response.status(400).json({ error: 'No file uploaded' });
      }

      const roomImageUrl = request.file.path;

      const existingRoom = await prisma.room.findUnique({
        where: {
          id: roomId,
        },
      });

      if (!existingRoom) {
        return response.status(404).json({ error: 'Room not found' });
      }

      const room = await prisma.room.create({
        data: {
          name,
          description,
          capacity,
          price,
          images: {
            create: roomImageUrl,
          },
        },
      });

      return response.json({ room });
    });
  }
}
