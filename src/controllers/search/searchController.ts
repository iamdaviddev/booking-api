import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export class SearchRooms {
  async handle(request: Request, response: Response){
    const { checkinDate, checkoutDate } = request.query;

    const checkin = new Date(checkinDate as string);
    const checkout = new Date(checkoutDate as string);

    try {
      const existingBookings = await prisma.booking.findMany({
        where: {
          AND: [
            { checkinDate: { lte: checkout } },
            { checkoutDate: { gte: checkin } },
          ],
        },
      });

      if (existingBookings.length === 0) {
        const allRooms = await prisma.room.findMany();
        response.json(allRooms);
        return;
      }

      const availableRoomIds = await prisma.room.findMany({
        where: {
          NOT: {
            id: {
              in: existingBookings.map((booking) => booking.roomId),
            },
          },
        },
      }).then((rooms) => rooms.map((room) => room.id));

      const availableRooms = await prisma.room.findMany({
        where: {
          id: {
            in: availableRoomIds,
          },
        },
      });
      response.json(availableRooms);
    } 
    catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Error performing search' });
    }
  }
}