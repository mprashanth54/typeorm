import Product from '../entity/product'
import { getConnection, Repository } from 'typeorm';

class ProductService {

  repository: Repository<Product>
  initialize() {
    const connection = getConnection();
    this.repository = connection.getRepository(Product);
  }

  async findOne(id: number) {
    this.initialize()
    return await this.repository.findOne(id, {
      relations: ["manufacturer_id"]
    })
  }

  async save(product: any) {
    this.initialize()
    let data = new Product()
    data.name = product.name
    data.manufacturer_id = product.manufacturer_id
    data.qty = product.qty
    data.price = product.price
    await this.repository.save(data);
    return data
  }

}

export default new ProductService()