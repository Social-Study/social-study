export default function generateCode() {
  const uuidv4 = require("uuid/v4");
  return uuidv4().split("-")[0];
}
