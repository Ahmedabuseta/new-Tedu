"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { v4 as uuidv4 } from "uuid";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const {
    firstName,
    lastName,
    email,
    countryCode,
    phoneNumber,
    password,
    inviteToken,
  } = validatedFields.data;
  const referralCode = uuidv4().toUpperCase().substring(0, 8);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const phoneWithCode = countryCode + phoneNumber;
  const fullName = firstName + " " + lastName;

  const newUser = await db.user.create({
    data: {
      name: fullName,
      email,
      phoneNumber: phoneWithCode,
      password: hashedPassword,
      inviteToken: referralCode,
    },
  });
  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent! cheeck your email" };
};
