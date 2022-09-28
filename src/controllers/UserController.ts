import { Request, Response } from "express";
import { User } from "../entity/User";
import * as yup from "yup";
import { AppDataSource } from "../database/data-source";
import { v4 as uuidv4 } from "uuid";

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
      response.json({
        message: console.log(`error : ${err}`),
      });
    }

    const usersRepository = AppDataSource.getRepository(User);

    // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    const userAlreadyExists = await usersRepository.findOne({
      where: {
        email: String(email),
      },
    });

    if (userAlreadyExists) {
      return response.status(400).json({
        message: "User already exists",
      });
    }

    const id = uuidv4();

    //INSERT INTO "user" ("firstName","lastName",email,age) VALUES('$firstName', '$lastName', '$email', $age);
    const user = usersRepository.create({
      id,
      firstName,
      lastName,
      email,
      age,
    });

    await usersRepository.save(user);

    return response.status(201).json(user);
  }
  catch(err) {
    console.log(`Error: ${err}`);
  }




  async read(request: Request, response: Response) {
    try {
      const usersRepository = AppDataSource.getRepository(User);

      const listUsers = await usersRepository.find();

      return response.status(200).json({
        users: listUsers
      });
    } catch (err) {
      return console.log(`Error: ${err}`);
    }
  }




  async update(request: Request, response: Response) {
    try {
      const usersRepository = AppDataSource.getRepository(User);
      const { firstName, lastName, email, age } = request.body;
      const {id} = request.params;

      const userId = await usersRepository.findOne({
        where: {
          id: String(id),
        },
      });

      if(!userId){
        return response.status(400).json({
          message: "User does not exists!"
        })
      }

      const updateUser = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({
          firstName: firstName,
          lastName: lastName,
          email: email,
          age: age,
      })
      .where("id = :id", { id: id })
      .execute();  

      return response.status(200).json({
        message: `The user: ${id} was sucess update`
      })


    } catch (err) {
      return console.log(`Error: ${err}`);
    }

  }



  async remove(request: Request, response: Response) {
    try {
      const usersRepository = AppDataSource.getRepository(User);
      const {id} = request.params;

      const userId = await usersRepository.findOne({
        where: {
          id: String(id),
        },
      });

      if(!userId){
        return response.status(400).json({
          message: "User does not exists!"
        })
      }

      const deleteUser = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: id })
      .execute();


      return response.status(200).json({
        message: `The user ${id} was deleted!`
      })


    } catch (err) {
      return console.log(`Error: ${err}`);
    }   
  }
}

export { UserController };