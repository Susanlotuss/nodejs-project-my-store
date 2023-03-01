const faker = require('faker');

// Programación orientada a objetos

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.imageUrl(),
        city: faker.address.cityName(),
        email: faker.internet.email(),
      });
    }
  }

  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newProduct);
    return newProduct;
  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(item => item.id === id)
  }

  update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found')
    }
    const user = this.users[index];
    // Esta parte es importante para evitar modificar completamente el objeto. (-this.users[index] = change- lo cambiaría por completo)
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not found')
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
