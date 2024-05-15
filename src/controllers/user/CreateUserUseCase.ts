import { prisma } from "../../lib/prisma";
import { hash } from "bcrypt";

interface IuserRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async index(){
    const users = await prisma.user.findMany()
    return users;
  }

  async execute({ name, email, password }: IuserRequest){
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(userExists){
      throw new Error("User already exists")
    }

    const hash_password = await hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash_password,
      }
    })

    return user;
  }
}