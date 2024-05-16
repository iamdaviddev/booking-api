import { Request, Response, response } from 'express'
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async index(request: Request, response: Response) {
    const getallusers = new CreateUserUseCase()

    const users = await getallusers.index
    return response.json({ users })
  }

  async handle(request: Request, response: Response){
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase()

    const user = await createUserUseCase.execute({ name, email, password })

    return response.status(201).json({ user })
  }
}