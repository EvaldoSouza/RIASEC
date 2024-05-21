import bcrypt from "bcrypt";

//const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

export async function saltAndHashPassword(plaintextPassword: string) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(plaintextPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error salting and hashing password:", error);
    throw new Error("Could not hash password");
  }
}
