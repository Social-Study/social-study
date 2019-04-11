//SCI ID: 045
//Name: generateCod
//Version: 1.0

export default function generateCode() {
  const uuidv4 = require("uuid/v4");
  return uuidv4().split("-")[0];
}
