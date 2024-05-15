import { sign } from "jsonwebtoken"

export class GenerateToken {
  async execute(userId: string){
    const token = sign({ userId }, "secret", { expiresIn: "60s" })
    return token;
  }
}