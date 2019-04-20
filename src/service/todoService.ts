import Todo from '../entity/todo'
import { getConnection, Repository } from 'typeorm';

class TodoService {

  repository: Repository<Todo>
  initialize() {
    const connection = getConnection();
    this.repository = connection.getRepository(Todo);
  }

  async findAll() {
    this.initialize()
    return await this.repository.find({})
  }

  async findOne(id: number) {
    this.initialize()
    return await this.repository.findOne({ id: id })
  }

  async updateByID(id: number, data: any) {
    this.initialize()
    await this.repository.update({ id: id }, {
      name: data.name,
      isComplete: data.isComplete
    })
  }

  async save(todo: any) {
    this.initialize()
    let data = new Todo()
    data.name = todo.name
    data.isComplete = todo.isComplete
    await this.repository.save(data);
    return data
  }

  async deleteByID(id: number) {
    this.initialize()
    await this.repository.delete({ id: id })
  }
}

export default new TodoService()