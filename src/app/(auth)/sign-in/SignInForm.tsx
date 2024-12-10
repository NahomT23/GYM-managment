"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form as UiForm, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInFormSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation"; // Optional: If you use a router for redirection
import { checkUserLoggedIn } from "../checkUserLoggedIn";

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          toast({ title: "Please wait..." });
        },
        onSuccess: async () => {
          form.reset();
          toast({ title: "Signed in successfully" });

          // Check user role and redirect accordingly
          const result = await checkUserLoggedIn();
          // Uncomment if you want to handle user redirection based on the result
          // if (!result.isAuthenticated) {
          //   router.push("/sign-in");
          // }
        },
        onError: (ctx) => {
          toast({ title: "User email or password doesn't match" })
        },
      }
    );
  }

  return (
    <UiForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </UiForm>
  );
};

export default SignInForm;
