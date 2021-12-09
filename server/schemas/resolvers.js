const { AuthenticationError } = require('apollo-server-express');
const { User, Photo, MullenPhoto } = require('../models');
const { signToken } = require('../utils/auth');
// const mongoose = require('mongoose');
//  const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.find();

      } catch (err) {
        throw new AuthenticationError(err)
      }
    },
    me: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user._id);
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    photos: async () => {
      try {
        return await Photo.find();
      } catch (err) {
        throw new AuthenticationError(err);
      }
    },
    mullen: async () => {
      try {
        return await MullenPhoto.find();
      } catch (err) {
        throw new AuthenticationError(err)
      }
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;