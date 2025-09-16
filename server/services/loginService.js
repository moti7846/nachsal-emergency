import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function createHashPassword(pass) {
  return await bcrypt.hash(pass, 10);
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

export async function checkPasswordIsTrue(pass, hashPass) {
  // Guard against undefined inputs
  if (typeof pass !== "string" || typeof hashPass !== "string" || !pass || !hashPass) {
    return false; // avoid throwing; let controller handle 403
  }
  return await bcrypt.compare(pass, hashPass);
}
