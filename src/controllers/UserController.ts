import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
import { AppError } from "../errors/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const { firstName, lastName, email, age } = request.body;

    const schema = yup.object().shape({
      firstName: yup.string().required(),
      lastName: yup.string().required(),
      email: yup.string().email().required(),
      age: yup.number().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      throw new AppError(err);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExists = await usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const user = usersRepository.create({
      firstName,
      lastName,
      email,
      age,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
}

export { UserController };
