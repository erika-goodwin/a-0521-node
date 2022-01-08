const { v4: uuidv4 } = require("uuid");

let members = [
  {
    id: uuidv4(),
    name: "Hoge",
    email: "hoge@hoge.com",
    status: "active",
  },
];

module.exports = members;
