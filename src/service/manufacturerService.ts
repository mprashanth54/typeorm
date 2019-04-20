import Manufacturer from '../entity/manufacturer'
import { getConnection, Repository } from 'typeorm';

class ManufacturerService {

  repository: Repository<Manufacturer>
  initialize() {
    const connection = getConnection();
    this.repository = connection.getRepository(Manufacturer);
  }

  async findOne(id: number) {
    this.initialize()
    return await this.repository.findOne(id, {
      relations: ["id"]
    })
  }

  async save(manufacturer: any) {
    this.initialize()
    let data = new Manufacturer()
    data.name = manufacturer.name
    data.company = manufacturer.company
    data.city = manufacturer.city
    await this.repository.save(data);
    return data
  }

}

export default new ManufacturerService()