import User from '../entity/user'
import * as bcrypt from 'bcrypt'
import { getConnection, Repository } from 'typeorm';

class AuthService {
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

  async login(user: any) {
    this.initialize()
    const userDetails = await this.repository.findOne({ username: user.username })
    if (this.verifyPassword(userDetails.password, user.password)) return
    else throw "Invalid Credentials"
  }

  verifyPassword(hashedPassword: string, password: string): Boolean {
    return bcrypt.compareSync(password, hashedPassword)
  }

}

export default new AuthService()