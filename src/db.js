const fs = require("fs");
const path = require("path");

const JSON_PATH = "../data/users.json";
const DATA_PATH = path.join(__dirname, JSON_PATH);

const save = (data) => {
  const f = fs.readFileSync(DATA_PATH, "utf-8");
  const j = JSON.parse(f.toString());
  j.push(data);
  fs.writeFileSync(DATA_PATH, JSON.stringify(j, null, 2), (error) => {
    if (error) {
      throw error;
    }
  });
};

const find = (phone) => {
  const data = fs.readFileSync(DATA_PATH, "utf-8");
  const users = JSON.parse(data);
  return users.find((user) => user.phone === phone);
};

const update = (id, data) => {
  const f = fs.readFileSync(DATA_PATH, "utf-8");
  const j = JSON.parse(f.toString());
  const index = j.findIndex((user) => user.id === id);
  j[index] = data;
  fs.writeFileSync(DATA_PATH, JSON.stringify(j, null, 2), (error) => {
    if (error) {
      throw error;
    }
  });
};

module.exports = { save, find, update };
