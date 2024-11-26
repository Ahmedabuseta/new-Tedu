"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
// import { toast } from "@/components/ui/use-toast"
import paineer from "@/public/text-logo2.png";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof FormSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
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
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-w-[400px] w-2/3 h-full bg-white dark:bg-black p-3 flex flex-col justify-center items-center rounded-md lg:rounded-none">
      <Image alt="paineer" src={paineer} className="h-36 w-full content-start" />
      <h1 className="text-3xl text-center font-bold mb-6 ">sign In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full px-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative w-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="w-full flex items-center justify-between">
                    password
                    <Link
                      href="/auth/reset"
                      className="border-b-2  me-auo text-indigo-700"
                    >
                      forget password?
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder=" your password"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-6"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 text-muted-foreground " />
                    ) : (
                      <EyeOff className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    dont have an account?
                    <Link
                      href="/auth/register"
                      className="border-b-2  me-auo text-indigo-700"
                    >
                      SignUp
                    </Link>
                  </p>
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className={`w-full ${isPending && 'disabled'}`}>
          {isPending ? <Loader2 className="animate-spin text-indigo-700" /> : 'Submit'}

          </Button>
        </form>
      </Form>
    </div>
  );
}
