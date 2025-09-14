import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export function createHashPassword(pass) {
  return bcrypt.hash(pass, 10);
}

export async function checkPasswordIsTrue(pass, hashPass) {
  return await bcrypt.compare(pass, hashPass);
}


export function createToken(soldier) {
    const token = jwt.sign(
      {
        fullName: soldier.fullName,
        privateNumber: soldier.privateNumber,
        role: soldier.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  }