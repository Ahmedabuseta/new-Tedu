"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneNumberComponent from "@/app/auth/(routes)/register/_componets/phone-numper";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [editable , setEditable] = useState(false)
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-b-xl p-6 "
      >
        <div className="text-center w-84 h-40 -translate-y-1/2 ms-8  flex items-center flex-1 gap-6">
          <div className="w-40 h-40  rounded-full overflow-hidden bg-gradient-to-tr from-pink-400 to-red-400"></div>
          <div>
            <h2 className="tetx-2xl  font-bold mt-1">Ahmed Abuseta</h2>
            (reffral code)
          </div>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="userName"
                  {...field}
                  className={`bg-white/50 dark:bg-black/40 backdrop-blur-md max-w-[600px] `}
                  disabled={!editable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email"
                  {...field}
                  className={`bg-white/50 dark:bg-black/40 backdrop-blur-md max-w-[600px] `}
                  disabled={!editable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhoneNumberComponent />
        {
          editable ? 
          <Button
          type="submit"
          className="bg-white/50 dark:bg-black/40  w-64 text-sky-700 backdrop-blur-md "
        >
          Submit
        </Button> : ""}
      </form>
    </Form>
  );
}
