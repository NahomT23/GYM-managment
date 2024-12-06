// export const dynamic = 'force-dynamic';

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
// import { useRouter } from "next/navigation";
// import { checkUserLoggedIn } from "../checkUserLoggedIn";

// const SignIn = () => {
//   const router = useRouter(); // Use Next.js router for redirection

//   // Define your form.
//   const form = useForm<z.infer<typeof signInFormSchema>>({
//     resolver: zodResolver(signInFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof signInFormSchema>) {
//     const { email, password } = values;
//     const { data, error } = await authClient.signIn.email(
//       {
//         email,
//         password,
//       },
//       {
//         onRequest: () => {
//           toast({ title: "Please wait..." });
//         },
//         onSuccess: async () => {
//           form.reset();
//           toast({ title: "Signed in successfully" });

//           // Check user role and redirect accordingly
//           const result = await checkUserLoggedIn();
//           // if (!result.isAuthenticated) {
//           //   router.push("/sign-in");
//           // }
//         },
//         onError: (ctx) => {
//           alert(ctx.error.message);
//         },
//       }
//     );
//   }

//   return (
//     <div>
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-center text-xl">Sign in</CardTitle>
//           <CardDescription></CardDescription>
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
//               <Button type="submit" className="w-full">
//                 Submit
//               </Button>
//             </form>
//           </Form>
//         </CardContent>

//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-muted-foreground">
//             Don&apos;t have an account yet?{" "}
//             <Link href={"/sign-up"}>Sign up</Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SignIn;


export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form as UiForm, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signInFormSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { checkUserLoggedIn } from "../checkUserLoggedIn";

const SignIn = () => {
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
          // if (!result.isAuthenticated) {
          //   router.push("/sign-in");
          // }
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  }

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Sign in</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
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
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account yet?{" "}
            <Link href={"/sign-up"}>Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
