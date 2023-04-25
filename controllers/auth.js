const User = require("../models/user");
const { encode, verifyRefreshToken } = require("../services/jwt.service");
const UserToken = require("../models/user-token");
const bcrypt = require("bcrypt");



async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    }).exec();

    if (user) {

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'not authorized' });
      }
      const { identifier, ...tokens } = encode(user.toObject());

      res.cookie('access_token', tokens.access_token, { httpOnly: true, maxAge: 1000 * 60 * 60, path: '/api' })

      const userToken = new UserToken({
        user: user._id,
        token: identifier
      })

      await userToken.save();

      res.json({
        ...tokens,
        payload: {
          user,
        }
      });
    } else {
      res.status(401).json({ message: 'not authorized' })
    }
  } catch {
    res.status(500).json({ message: 'failed to login' });
  }
}


async function refreshToken(req, res) {
  const authHeader = req.headers['authorization'] || ''
  const existingToken = authHeader.split(' ')[1];

  try {
    const { _id, email, firstName, lastName, identifier: existingIdentifier } = verifyRefreshToken(existingToken);
    const isExists = await UserToken.exists({
      user: _id,
      token: existingIdentifier
    });

    if (!isExists) {
      throw new Error('token does not exist in db');
    }

    const user = {
      _id,
      email,
      firstName,
      lastName
    };
    const { identifier, ...tokens } = encode(user);

    // 1. insert the new token to db
    const userToken = new UserToken({
      user: _id,
      token: identifier
    })
    await userToken.save();
    // 2. remove the old token from db
    await UserToken.deleteOne({
      user: _id,
      token: existingIdentifier
    });

    res.cookie('access_token', tokens.access_token, { httpOnly: true, maxAge: 1000 * 60 * 60, path: '/api' });
    res.json({
      ...tokens,
      payload: {
        user,
      }
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: 'not authorized' });
  }
}

async function register(req, res) {
  const { firstName, lastName, email, password, birthdate } = req.body;
  const hash = bcrypt.hashSync(password, 5)

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      password: hash,
      birthdate
    });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'failed to register user' });
  }
}


async function getUserInfo(req, res) {
  const userId = req.params.id
  try {
    const user = await User.findById(userId)
      .select('firstName lastName email birthdate')
      .exec()

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch {
    res.status(500).json({ messag: 'Failed to get user info' });
  }
}


module.exports = {
  login,
  register,
  getUserInfo,
  refreshToken
}