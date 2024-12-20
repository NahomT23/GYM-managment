"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpFormSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { createAdminAction } from "@/app/actions/actions"; 

interface SignUpFormProps {
  isAdmin?: boolean;
}

const SignUpForm = ({ isAdmin }: SignUpFormProps) => {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const { name, email, password } = values;

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/sign-in",
      },
      {
        onRequest: () => {
          toast({ title: "Please wait..." });
        },
        onSuccess: () => {
          form.reset();
          toast({ title: "Account created successfully" });
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  }

  async function onAdminSubmit(values: z.infer<typeof signUpFormSchema>) {
    const { name, email, password } = values;
    try {

      const { success, message } = await createAdminAction(name, email, password);

      if (success) {
        toast({ title: message });
        form.reset();
      } else {
        toast({ title: message, variant: "destructive" });
      }
    } catch (error) {
      // toast({ title: "Error creating admin", variant: "destructive" });
      console.log(error)
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(isAdmin ? onAdminSubmit : onSubmit)} className="space-y-1 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder=" name..." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
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
                  <Input placeholder=" your email..." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder=" your password" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;