const faker = require('faker');

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
        name: faker.commerce.productMaterial()
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.category.push(newProduct);
    return newProduct;
  }

  find() {
    return this.category;
  }

  findOne(id) {
    return this.category.find((item) => item.id === id);
  }

  update(id, changes) {
    const index = this.category.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found')
    }
    const categories = this.category[index];
    // Esta parte es importante para evitar modificar completamente el objeto. (-this.category[index] = change- lo cambiaría por completo)
    this.category[index] = {
      ...categories,
      ...changes
    }
    return this.category[index]
  }

  delete(id) {
    const index = this.category.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found')
    }
    this.category.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;
