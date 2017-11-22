const UserModel = require('../models/users');
const jwt = require('jsonwebtoken');

const generateToken = user => jwt.sign(user, 'secret' , { expiresIn: '1y' })

function registerUser (req, res, next) {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const username = body.username;

  UserModel.findOne({ email : email }, (error, user) => {
    if (error) {
      return next({
        status: 500,
        message: 'An error occurred!',
        error,
      })
    }
    if (user) {
      return next({
        status: 409,
        message: 'User already exists',
      })
    }

    user = new UserModel({
      email,
      username,
      password,
    })

    return user.save((error, user) => {
      if (error) {
        return next({
          status: 500,
          message: 'An error occurred!',
          error,
        })
      }

      const token = generateToken({
        id: user.id,
      })


      return res.json({
        token,
      })
    })
  })
}

function logInUser (req, res, next) {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email }, (error, user) => {
    if (error) {
      return next({
        status: 500,
        message: 'An error occurred!',
        error,
      })
    }

    if (!user) {
      return next({
        status: 404,
        message: 'No User Found',
      })
    }

    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        return next({
          status: 500,
          message: 'An error occurred!',
          error,
        })
      }

      if (!isMatch) {
        return next({
          status: 401,
          message: 'Wrong Password',
        })
      }

      const token = generateToken({
        id: user.id,
      })

      return res.json({
        token,
      })
    })
  })
}

module.exports = { registerUser, logInUser };