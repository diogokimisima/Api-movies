const { hash, compare } = require("bcryptjs");
const AppError = require('../utils/AppError');
const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const checkUserExists = await knex('users').where({ email }).first();

    if (checkUserExists) {
      throw new AppError("Este email já está em uso.");
    }

    if (typeof password !== 'string') {
      throw new AppError("A senha deve ser uma string.");
    }

    const hashedPassword = await hash(password, 8);

    await knex('users').insert({
      name,
      email,
      password: hashedPassword
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex('users').where({ id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    const userWithUpdatedEmail = await knex('users').where({ email }).first();

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Você precisa digitar a senha antiga para definir a nova senha");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      if (typeof password !== 'string') {
        throw new AppError("A nova senha deve ser uma string.");
      }

      user.password = await hash(password, 8);
    }

    await knex('users')
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now()
      })
      .where({ id });

    return response.json();
  }
}

module.exports = UsersController;
