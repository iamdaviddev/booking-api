import { Router } from "express";

import { BookingController } from "../controllers/booking/bookingController";
import { RoomController } from "../controllers/room/roomController";

import { CreateUserController } from "../controllers/user/CreateUserController";
import { AuthenticateUserController } from "../controllers/user/AuthenticateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticateUser";
import { RefreshTokenUserController } from "../controllers/refreshtoken/refreshTokenController";

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const bookingController = new BookingController();
const roomsController = new RoomController();
const refreshTokenController = new RefreshTokenUserController();


export const router = Router();

//users
router.get('/users', createUserController.index);

//Auth routes
router.post("/signup", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/refresh-token", refreshTokenController.handle);

//Booking routes
router.get("/bookings", bookingController.index);
router.post("/bookings", bookingController.create);

//Room routes
router.get("/rooms", roomsController.index);
router.post("/rooms", ensureAuthenticated, roomsController.create);
