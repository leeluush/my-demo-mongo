const User = require("../models/user");

async function login(req, res) {
    const credentials = req.body;
    try {
        const user = await User.findOne({
            email: credentials.email,
            password: credentials.password
        })
            .select('firstName lastName email birthdate')
            .exec()

        if (user) {
            res.cookie('cookieName', randomNumber, { maxAge: 90000, httpOnly: true, secure: true });
            res.json(user);
        } else {
            res.status(401).json({ message: 'not authorized' })
        }
    } catch {
        res.status(500).json({ messag: 'faild to login' });

    }
}

async function register(req, res) {
    const { firstName, lastName, email, password, birthdate } = req.body;
    try {
      const user = new User({
        firstName,
        lastName,
        email,
        password,
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
    getUserInfo
}