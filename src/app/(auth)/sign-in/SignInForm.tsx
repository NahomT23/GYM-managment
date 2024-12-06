"use client"; // Ensure this part is client-side

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

// Define the type for the form data
type SignInFormProps = {
  onSubmit: (values: { email: string; password: string }) => void;
};

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
      <Input placeholder="Your email" {...form.register('email')} />
      <Input placeholder="Your password" {...form.register('password')} />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default SignInForm;
