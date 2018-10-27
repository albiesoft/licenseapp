import { IResolvers } from "graphql-tools";
import * as argon2 from "argon2";

import { User } from "./entity/User";

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, {req}) => {
      
      if (!req.session.userId) {
        return null;
      }

      return await User.findOne(req.session.userId);
    }
  },
  Mutation: {
    register: async (_, {firstname, lastname, email, password}) => {

      const hashedPassowrd = await argon2.hash(password)

      await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassowrd
      }).save();

      return true;

    },
    login: async (_, {email, password}, {req}) => {

      const user = await User.findOne({where: {email} });

      if(!user) {
        return null;
      }

      const valid = await argon2.verify(user.password, password);

      if (!valid) {
        return null;
      }

      req.session.userId = user.id;

      return user;

    }
  }
}
