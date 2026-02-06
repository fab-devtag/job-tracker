"use server";

import bcrypt from "bcryptjs";

export const signup = async (password: string) => {
  console.log(password);
  const pass = await bcrypt.hash(password, 10);
  console.log(pass);
  const testcompare = "unmotdepass";
  const comp = await bcrypt.compare(testcompare, pass);
  console.log(comp);
};
