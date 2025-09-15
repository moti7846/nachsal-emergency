import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function createHashPassword(pass) {
  return await bcrypt.hash(pass, 10);
}

export async function checkPasswordIsTrue(pass, hashPass) {
  return await bcrypt.compare(pass, hashPass);
}

export function createToken(soldier) {
  const token = jwt.sign(
    {
      name: soldier.name,
      personalNumber: soldier.personal_number,
      role: soldier.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
}