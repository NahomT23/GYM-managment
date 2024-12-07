// export const dynamic = 'force-dynamic';


// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { signUpFormSchema } from "@/lib/auth-schema";
// import { auth } from "@/lib/auth";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "@/hooks/use-toast";
// import { redirect } from "next/navigation";

// // Import the server-side action
// import { createAdminAction } from "@/app/actions/actions";

// const SignUp = () => {
//   // 1. Define your form for normal user.
//   const form = useForm<z.infer<typeof signUpFormSchema>>({
//     resolver: zodResolver(signUpFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   // 2. Define a submit handler for the normal user.
//   async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
//     const { name, email, password } = values;
//     const { data, error } = await authClient.signUp.email(
//       {
//         email,
//         password,
//         name,
//         callbackURL: "/sign-in",
//       },
//       {
//         onRequest: (ctx) => {
//           toast({
//             title: "Please wait...",
//           });
//         },
//         onSuccess: (ctx) => {
//           form.reset();
//           toast({
//             title: "Account created successfully",
//           });
//         },
//         onError: (ctx) => {
//           alert(ctx.error.message);
//         },
//       }
//     );
//   }

//   // 3. Define your form for admin user creation
//   const adminForm = useForm({
//     resolver: zodResolver(signUpFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   // 4. Define a submit handler for the admin user.
//   async function onAdminSubmit(values: z.infer<typeof signUpFormSchema>) {
//     const { name, email, password } = values;
//     try {
//       // Call the server-side action for admin creation
//       const { success, message } = await createAdminAction(name, email, password);

//       if (success) {
//         toast({
//           title: message,
//         });
//         adminForm.reset();
//       } else {
//         toast({
//           title: message,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       toast({
//         // title: "Error creating admin",
//         // variant: "destructive",
//       });
//     }
//   }

//   return (
//     <div className="flex flex-col space-y-8 mt-20"> {/* Added margin-top */}
//       {/* User SignUp Form */}
//       <div className="mt-20">
//         <div className="mt-20">
//           <div className="20">
            
//           </div>
//         </div>
//       </div>
//       <Card className="w-full max-w-2xl mx-auto mt-20">
//         <CardHeader className="">
//           <CardTitle className="flex items-center justify-center text-xl">Sign up</CardTitle>
//           <CardDescription>
//             <p className="text-base"></p>
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder=" name..." {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder=" your email..." {...field} />
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
//                       <Input placeholder=" your password" {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full">Submit</Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-muted-foreground">
//             Already have an account? {' '}
//             <Link href={'/sign-in'}>Sign in</Link>
//           </p>
//         </CardFooter>
//       </Card>

//       {/* Admin SignUp Form */}
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-center text-xl">Create Admin</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <Form {...adminForm}>
//             <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-1">
//               <FormField
//                 control={adminForm.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder=" name..." {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={adminForm.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder=" your email..." {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={adminForm.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input placeholder=" your password" {...field} />
//                     </FormControl>
//                     <FormDescription></FormDescription>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full">Submit</Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignUp;




// pages/sign-up.tsx (with 'force-dynamic')
export const dynamic = 'force-dynamic'; // This forces dynamic rendering

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import  SignUpForm  from "./SignUpForm";  // Import the client-side SignUpForm

const SignUp = () => {
  return (
    <div className="flex flex-col space-y-8 mt-20">
      {/* Normal User SignUp Form */}
      <Card className="w-full max-w-2xl mx-auto mt-20">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Sign up</CardTitle>
          <CardDescription>
            <p className="text-base"></p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm /> {/* Use the SignUpForm component here */}
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? {" "}
            <Link href={'/sign-in'}>Sign in</Link>
          </p>
        </CardFooter>
      </Card>

      {/* Admin User SignUp Form */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Create Admin</CardTitle>
        </CardHeader>

        <CardContent>
          <SignUpForm isAdmin={true} /> {/* Use the same SignUpForm, passing isAdmin prop */}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
