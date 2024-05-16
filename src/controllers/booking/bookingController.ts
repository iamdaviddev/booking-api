import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export class BookingController {
  async index(request: Request, response: Response) {
    const bookings = await prisma.booking.findMany();

    return response.json({ bookings });
  }

  async create(request: Request, response: Response) {
    const { userId, roomId, checkinDate, checkoutDate, amout, price } = request.body;

    const existingBooking = await prisma.booking.findFirst({
      where: {
        roomId,
        checkinDate: {
          lte: new Date(checkinDate),
          gte: new Date(checkinDate)
        }
      }
    })

    if (existingBooking) {
      return response.json({ error: "Room is already booked" })
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        checkinDate,
        checkoutDate,
        amout
      }
    })

    return response.status(201).json({ booking });
  }
}