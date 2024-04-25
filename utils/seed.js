const connect = require("../config/db.js");
const { User } = require("../models");

connect.once("open", async () => {
  const userSeed = [
  { username: "JamesTheEpic",
  email: "housejames18@gmail.com",
  password: "eightlong"}
  ];
  User.deleteMany({})
    .then(() => User.create(userSeed))
    .then((data) => {
      console.log(data);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});