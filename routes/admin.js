const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Movie = require('../models/movie');

const tokenSecret = "movieportal";

router.get('/getall', verifyToken, async function (req, res) {
  let data = await Movie.getAll();
  res.send({ code: 200, data });
});

router.post('/add', verifyToken, async function (req, res) {
  try {
    let data = await Movie.add(req.body);
    res.send({ code: 200, data });
  } catch (error) {
    res.send({ code: 400, error });
  }
});

router.post('/update', verifyToken, async function (req, res) {
  try {
    await Movie.edit(req.body);
    res.send({ code: 200, message: "Update API" });
  } catch (error) {
    res.send({ code: 400, error });
  }
});

router.post('/delete', verifyToken, async function (req, res) {
  await Movie.remove(req.body.id);
  res.send({ code: 200, message: "Delete API" });
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    let user = await Admin.find(username, password);
    jwt.sign({ user }, tokenSecret, { expiresIn: "24h" }, function (err, token) {
      if (err) {
        res.json({
          message: "Error in authentication"
        });
      } else {
        res.json({
          code: 200,
          token,
        });
      }
    });
  } catch (err) {
    res.sendStatus(401);
  }
});

// Verify token
function verifyToken(req, res, next) {
  console.log(req.headers);
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, tokenSecret, function (err, data) {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = data.user.username;
        next();
      }
    });
  } else {
    res.sendStatus(405);
  }
}

module.exports = router;