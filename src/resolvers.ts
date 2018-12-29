import { IResolvers } from "graphql-tools";
import * as argon2 from "argon2";
import * as nodemailer from 'nodemailer';
import { v4 as uuid } from 'uuid';

import { User } from "./entity/User";
import { License } from "./entity/License";
import { Nuller } from "./entity/Nuller";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info@instasky.io',
    pass: 'God7nW5B78bSStww0PMSkYA0lwiZP8'
  }
});

const mailOptions = {
  from: 'info@instasky.io',
  to: 'albert@albiesoft.com',
  subject: 'Nuller Signup',
  html: ''
};

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, {req}) => {
      
      if (!req.session.userId) {
        return null;
      }

      return await User.findOne(req.session.userId);
    },
    mylicense: async (_, { license }) => {
      return await License.findOne({where: {license}});
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

    },
    createlicense: async (_, { domain }) => {
      
      const license = await License.findOne({where: {domain}});

      if (license) {
        if (license.used) {

          Nuller.create({
            domain
          }).save();
  
          mailOptions.html = `<h1>New License!</h1><p>Domain: ${domain}</p>`;
          transporter.sendMail(mailOptions);
  
          return null;
          // Report bad license
        }  
      }

      return await License.create({
        domain,
        license: uuid(),
        used: true
      }).save();
    },
    signlicense: async (_, { domain, license}) => {
      const lc = await License.findOne({where: {domain}});

      const signNuller = async () => {
        Nuller.create({
          domain,
          license
        }).save();

        mailOptions.html = `<h1>Nuller Signed Up!</h1><p>Domain: ${domain}</p>`;
        await transporter.sendMail(mailOptions);
      }

      const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
      const valid = uuidV4Regex.test(license);

      if (!lc || license !== lc.license || !valid) {

        signNuller();

        return false;
      }

      return true;
    }
  }
}
