"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import PhoneNumberComponent from "./_componets/phone-numper";
import PasswordStrengthComponent from "./_componets/strong-pasowrd";

import Image from "next/image";
import paineer from "@/public/text-logo2.png";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import GoogleAuthButton from "@/components/auth/google_uth_button";

// import { toast } from "@/components/ui/use-toast"

const FormSchema = z
  .object({
    firstName: z.string().min(4, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(4, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "input a valid mail" }),
    inviteToken: z.string().optional(),
    countryCode: z.string().min(1, { message: "Country code is required" }),
    phoneNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      inviteToken: "",
    },
  });

  const { isSubmitting } = form.formState;
 function onSubmit(values: z.infer<typeof FormSchema>) {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

        })
        .catch(() => setError("Something went wrong!"));
    });
  }
  

  return (
    <div className="min-w-[400px] w-2/3 h-full bg-white p-3 flex flex-col justify-center items-center rounded-md lg:rounded-none">
      <Image alt="paineer" src={paineer} className="h-36 w-full" />
      <h1 className="text-3xl italic  text-center font-bold mb-6 ">sign Up</h1>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-between items-center gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>First name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="First name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Last name</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Last name" {...field}  disabled={isSubmitting}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Email</FormLabel> */}
                  <FormControl>
                    <Input placeholder="email" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <PhoneNumberComponent />
            <PasswordStrengthComponent />
            <FormField
              control={form.control}
              name="inviteToken"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>reffrial code</FormLabel> */}
                  <FormControl>
                    <Input placeholder=" reffral code (optional)"  disabled={isSubmitting}  {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    dont have an account?
                    <Link
                      href="/auth/login"
                      className="border-b-2  me-auo text-indigo-700"
                    >
                      SignIn
                    </Link>
                  </p>
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full" disabled={ isSubmitting}>
              {isPending ? <Loader2 className="animate-spin text-indigo-700" /> : 'Submit'}
            </Button>
          </form>
        </Form>
      </FormProvider>
      <GoogleAuthButton />
    </div>
  );
}
