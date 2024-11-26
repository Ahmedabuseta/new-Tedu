import { Resend } from "resend";
import PasswordResetEmail from '@/components/auth/emails/reset-password'
import EmailVerificationEmail from "@/components/auth/emails/email-vrification";
import WelcomeEmail from "@/components/auth/emails/welcome";
const resend = new Resend(process.env.RESEND_API_KEY);
// import { Html, Head, Body, Container, Section, Heading, Text, Link, Img } from '@react-email/components';

const domain = process.env.NEXT_PUBLIC_APP_URL;

// export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "2FA code",
//     html: `<p>Your 2FA code is <b>${token} </b></p>`,
//   });
// };

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react:PasswordResetEmail({resetLink}) ,
    // html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    // html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    react:EmailVerificationEmail({verificationLink:confirmLink}) ,
  });
};
export const sendWelcomeEmail = async (email: string) => {
  // const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    // html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    react:WelcomeEmail() ,
  });
};