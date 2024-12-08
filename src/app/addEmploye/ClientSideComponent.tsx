// "use client";

// import { Button } from "@/components/ui/button";
// import EmployeeSignupForm from "./page";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
//       <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
//         {/* First Form (User Signup) */}
//         <EmployeeSignupForm />

//       </div>

//     </div>
//   );
// }




"use client";

import { useForm } from "react-hook-form";
import { signUpFormSchema } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import { createEmploye } from "@/app/actions/actions";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";

export default function ClientSideForm() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
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
          authClient.signOut();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  const employeeFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let successMessage = "";
    let errorMessage = "";

    try {
      await createEmploye(formData);
      successMessage = "Employee created successfully!";
      errorMessage = ""; // Clear error message if successful
    } catch (error) {
      successMessage = "";
      errorMessage = "There was an issue creating the employee.";
    }

    if (successMessage) {
      toast({
        title: successMessage,
        description: "The employee has been added to the system.",
      });
    }

    if (errorMessage) {
      toast({
        title: "Employee Creation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Employee Details</h2>
        <form
          onSubmit={employeeFormSubmit}
          className="space-y-4 bg-gray-50 p-6 rounded-md shadow-sm"
        >
          {/* Employee Form Fields */}
          <label className="block">
            <span className="text-gray-700">First Name:</span>
            <input
              type="text"
              name="firstName"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="First name..."
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="text"
              name="email"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Email..."
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Last Name:</span>
            <input
              type="text"
              name="lastName"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Last name..."
            />
          </label>

          <label htmlFor="gymId">
            <input type="hidden" id="gymId" name="gymId" />
          </label>

          <label className="block">
            <span className="text-gray-700">Phone Number:</span>
            <input
              type="number"
              name="phoneNumber"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Phone number..."
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Password:</span>
            <input
              type="text"
              name="password"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Password..."
            />
          </label>

          <Button type="submit" className="w-full bg-blue-500 text-white">
            Submit
          </Button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Employee Signup</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 bg-gray-50 p-6 rounded-md shadow-sm"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name..."
                      {...field}
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
                      className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email..."
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-500 text-white">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
