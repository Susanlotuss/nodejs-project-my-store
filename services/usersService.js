const faker = require('faker');
const boom = require('@hapi/boom')

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
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newProduct);
    return newProduct;
  }

  async find() {
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    if (user.isBlock) {
      throw boom.conflict('product is block');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    const user = this.users[index];
    // Esta parte es importante para evitar modificar completamente el objeto. (-this.users[index] = change- lo cambiaría por completo)
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('categories not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;
