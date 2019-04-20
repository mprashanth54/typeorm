import User from '../entity/user'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { getConnection, Repository } from 'typeorm';

class AuthService {
  secretKey = 'top-secret-very-hard-to-crack'
  saltRounds = 10
  repository: Repository<User>
  initialize() {
    const connection = getConnection();
    this.repository = connection.getRepository(User);
  }

  async register(user: any) {
    this.initialize()
    let data = new User()
    data.name = user.name
    data.username = user.username
    data.password = this.genPassword(user.password)
    await this.repository.save(data)
  }

  genPassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash
  }

  genToken(userDetails: any) {
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      username: userDetails.username,
      name: userDetails.name,
      role: 'admin'
    }, this.secretKey)
    return token
  }

  async login(user: any) {
    this.initialize()
    const userDetails = await this.repository.findOne({ username: user.username })
    if (userDetails && this.verifyPassword(userDetails.password, user.password)) return this.genToken(userDetails)
    else throw "Invalid Credentials"
  }

  verifyPassword(hashedPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashedPassword)
  }

  async verifyToken(token: string) {
    this.initialize()
    const isVerified = jwt.verify(token, this.secretKey)
    if (isVerified) {
      const user: any = jwt.decode(token)
      const isPresent = await this.repository.findOne({ username: user.username })
      if (isPresent)
        return isPresent
      else throw 'User is unauthorized'
    }
    else throw 'User is unauthorized'
  }
}

export default new AuthService()