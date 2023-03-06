const faker = require('faker');
const boom = require('@hapi/boom')

// Programación orientada a objetos

class CategoriesService {
  constructor() {
    this.category = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.category.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productMaterial(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.category.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.category;
  }

  async findOne(id) {
    const categories = this.category.find((item) => item.id === id);
    if (!categories) {
      throw boom.notFound('categories not found');
    }
    if (categories.isBlock) {
      throw boom.conflict('product is block');
    }
    return categories;
  }

  async update(id, changes) {
    const index = this.category.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    const categories = this.category[index];
    // Esta parte es importante para evitar modificar completamente el objeto. (-this.category[index] = change- lo cambiaría por completo)
    this.category[index] = {
      ...categories,
      ...changes
    }
    return this.category[index]
  }

  async delete(id) {
    const index = this.category.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    this.category.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
