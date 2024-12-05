// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { signInFormSchema } from "@/lib/auth-schema";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "@/hooks/use-toast";

// const AdminSignIn = () => {
//   const form = useForm<z.infer<typeof signInFormSchema>>({
//     resolver: zodResolver(signInFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof signInFormSchema>) {
//     const { email, password } = values;

//     const { data, error } = await authClient.signIn.email({ email, password }, {
//       onRequest: () => {
//         toast({
//           title: "Signing in...",
//         });
//       },
//       onSuccess: async () => {
//         // Check if the admin exists
//         const response = await fetch("/api/checkAdmin", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         });

//         const result = await response.json();

//         if (result.exists) {
//           form.reset();
//           toast({
//             title: "Sign-in successful!",
//           });

//           // Redirect to admin dashboard
//           window.location.href = "/adminDashboard"; // Replace with your actual admin dashboard route
//         } else {
//           toast({
//             title: "Error",
//             description: "Admin not found.",
//           });
//         }
//       },
//       onError: (ctx) => {
//         toast({
//           title: "Error",
//           description: ctx.error.message || "Sign-in failed.",
//         });
//       },
//     });

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Authentication failed.",
//       });
//     }
//   }

//   return (
//     <div>
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-center text-xl">Admin Sign In</CardTitle>
//           <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <Input id="email" {...form.register("email")} placeholder="Your email..." />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <Input
//                 id="password"
//                 type="password"
//                 {...form.register("password")}
//                 placeholder="Your password..."
//               />
//             </div>
//             <Button type="submit" className="w-full">
//               Sign In
//             </Button>
//           </form>
//         </CardContent>

//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-muted-foreground">
//             Not an admin?{" "}
//             <a href="/employe-sign-in" className="text-blue-500 underline">
//               Sign in as an employee
//             </a>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default AdminSignIn;
