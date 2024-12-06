// SignInForm.tsx (Client Component)
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/lib/auth-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const SignInForm = () => {
  const router = useRouter(); // Use Next.js router for redirection

  // Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    // Handle sign-in logic here using authClient
    toast({ title: "Please wait..." });

    // Simulate sign-in success for demonstration
    setTimeout(() => {
      toast({ title: "Signed in successfully!" });
      // Redirect after successful login
      router.push("/dashboard");
    }, 1000); // Simulated delay
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
      <div>
        <Input placeholder="Email" {...form.register("email")} />
      </div>
      <div>
        <Input placeholder="Password" {...form.register("password")} />
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
