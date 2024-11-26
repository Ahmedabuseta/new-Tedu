import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';
const prisma = new PrismaClient();

// Zod schema for input validation
const RegisterSchema = z.object({
  firstName: z.string().min(4, 'First name is required'),
  lastName: z.string().min(4, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  countryCode: z.string().min(2, 'Country code is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  inviteToken: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterInput = z.infer<typeof RegisterSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const result = RegisterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues }, { status: 400 });
    }

    const { firstName, lastName, email, countryCode, phoneNumber, password, inviteToken } = result.data;
    const referralCode = uuidv4().toUpperCase().substring(0, 8);
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const phoneWithCode  = countryCode+phoneNumber
    const fullName = firstName +' '+lastName

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name:fullName ,
        email,
        phoneNumber : phoneWithCode,
        password: hashedPassword,
        inviteToken :referralCode,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
  
    // return { success: "Confirmation email sent!" };
    return NextResponse.json({ message: 'User registered successfully', user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Error registering user' }, { status: 500 });
  }
}