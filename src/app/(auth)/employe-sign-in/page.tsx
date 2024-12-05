// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { signInFormSchema } from "@/lib/auth-schema";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "@/hooks/use-toast";

// const EmployeSignIn = () => {
//   const form = useForm<z.infer<typeof signInFormSchema>>({
//     resolver: zodResolver(signInFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof signInFormSchema>) {
//     const { email, password } = values;

//     // Step 1: Authenticate the user
//     const { data, error } = await authClient.signIn.email({ email, password }, {
//       onRequest: () => {
//         toast({
//           title: "Please wait...",
//         });
//       },
//       onSuccess: () => {
//         // Step 2: Check if the employee exists in the database
//         fetch("/api/checkEmployee", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email }),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.exists) {
//             form.reset();
//             toast({
//               title: "Signed in successfully",
//             });
//           } else {
//             toast({
//               title: "Error",
//               description: "Employee not found in the database.",
//             });
//           }
//         })
//         .catch(() => {
//           toast({
//             title: "Error",
//             description: "Failed to verify employee.",
//           });
//         });
//       },
//       onError: (ctx) => {
//         toast({
//           title: "Error",
//           description: ctx.error.message || "An error occurred during sign-in.",
//         });
//       },
//     });

//     if (error) {
//       toast({
//         title: "Error",
//         description: error.message || "Authentication failed."
//       });
//     }
//   }

//   return (
//     <div>
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-center text-xl">Employe Sign in</CardTitle>
//           <CardDescription>Please enter your credentials to sign in.</CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your email..." {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Your password..." {...field} type="password" />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full">Sign In</Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-muted-foreground">
//             Not an employe?{' '}
//             <Link href="/admin-sign-in">
//               Admin sign in
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default EmployeSignIn;
