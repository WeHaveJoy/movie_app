const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

module.exports = (app, db) => {

  app.get("/test", async (req, res) =>
    res.json(await db.manyOrNone("select * from user_info"))
  );

  app.post("/api/signUp", async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    try {
      console.log(req.body);
      const findUser = await db.oneOrNone(
        `SELECT * FROM user_info WHERE username= $1`,
        [username]
      );

      console.log(findUser, 'find User func');

      if (findUser != null) {
        throw Error(`User already exists`);
      }

      console.log('hashing password');
      const pass = await bcrypt.hash(password, 10);
      console.log(pass, 'before insert pass hshed func');

      await db.none(
        `INSERT INTO user_info (first_name, last_name, username, password) VALUES ($1,$2,$3,$4)`,
        [first_name, last_name, username, pass]
      );

      console.log('done insert');
      res.status(200).json({
        messatge: "User created",
      });

    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        error: error.message,
      });
    }
  });

  app.post("/api/logIn", async (req, res) => {
    try {
      const { first_name, last_name, username, password } = req.body;

      const findUser = await db.oneOrNone(
        `SELECT * FROM user_info WHERE username= $1`,
        [username]
      );

      console.log({ findUser, username });

      if (!findUser) {
        // key == null
        throw Error(`The user doesn't exist`);
      }
      const isValid = await bcrypt.compare(password, findUser.password);
      if (!isValid) {
        throw Error(`The user doesn't exist`);
      }

      let token = jwt.sign(findUser, `secretKey`, { expiresIn: `24h` });

      res.status(200).json({
        message: "You are logged in",
        token,
        user: findUser,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  app.post("/api/playlist", async (req, res) => {
    try {
      const { user_id, movie_list, username } = req.body;

      const findMovie = await db.oneOrNone(`SELECT * FROM user_info WHERE username =$1`,
        [username]);

      await db.none(
        `INSERT INTO user_playlist (user_id, movie_list) VALUES ($1,$2)`,
        [username.id, movie_list]
      );

      res.status(200).json({
        message: "movie added",
        user: findMovie,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  })
}
