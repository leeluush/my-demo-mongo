const {verifyAccessToken, verifyRefreshToken} = require("../services/jwt.service");
const UserToken = require('../models/user-token')

async function verifyUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({message:'not connected'})
    }

    const user = verifyRefreshToken(token)
    const creationTime = user.iat;
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime - creationTime > 10 * 60) {
      const isTokenInDB = await UserToken.exists({ user: user._id, token: user.identifier });
    
      if (isTokenInDB) {
        //to do create to token 
      } else {
        return res.status(401).json({ message: 'not connected' });
      }
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'not authorized' });
  }
}








//   const authHeader = req.headers['authorization'] || ''
//   const token = authHeader.split(' ')[1];

//   try {
//     const user = verifyAccessToken(token);
//     req.user = user;
//     next();
//   } catch {
//     res.status(401).json({message: 'not authorized'});
//   }
// }

module.exports = verifyUser 