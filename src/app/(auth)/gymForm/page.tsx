
// "use client"

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs"; // Add this line


// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { gymFormSchema, signUpFormSchema } from "@/lib/auth-schema"
// import { auth } from "@/lib/auth"
// import { authClient } from "@/lib/auth-client"
// import { toast } from "@/hooks/use-toast"
// import { redirect } from "next/navigation"
// import { createGymAction } from "@/actions/actions";





// const CreateGym = () => {
//   // Define your form for gym creation using react-hook-form
//   const gymForm = useForm({
//     resolver: zodResolver(gymFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//     },
//   });

//   async function onGymSubmit(values: z.infer<typeof gymFormSchema>) {
//     const { name, email } = values;
//     try {
//       // Call the server-side action for admin creation
//       const { success, message } = await createGymAction(name, email);

//       if (success) {
//         toast({
//           title: message,
//         })
//         gymForm.reset();
//       } else {
//         toast({
//           title: message,
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         // title: "Error creating admin",
//         // variant: "destructive",
//       })
//     }
//   }
  
  
//   return (
//     <div>
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="flex items-center justify-center text-xl">Create GYM</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {/* Make sure the Form component wraps the form fields correctly */}
//           <Form {...gymForm}>
//             <form onSubmit={gymForm.handleSubmit(onGymSubmit)} className="space-y-1">
//               <FormField
//                 control={gymForm.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Gym Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Gym name..." {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={gymForm.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Admin email..." {...field} />
//                     </FormControl>
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

// export default CreateGym;
"use client"; // Ensure it's a client component
export const dynamic = "force-dynamic"; // Forces dynamic rendering
export const runtime = "nodejs"; // Ensures Node.js runtime is used

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { gymFormSchema } from "@/lib/auth-schema"; // Assuming you already have this
import { createGymAction } from "@/actions/actions"; // Adjust path as necessary
import { toast } from "@/hooks/use-toast";

const CreateGym = () => {
  const gymForm = useForm({
    resolver: zodResolver(gymFormSchema),
    defaultValues: { name: "", email: "" },
  });

  async function onGymSubmit(values: z.infer<typeof gymFormSchema>) {
    const { name, email } = values;

    try {
      const { success, message } = await createGymAction(name, email);

      if (success) {
        toast({ title: message });
        gymForm.reset();
      } else {
        toast({ title: message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error creating gym", variant: "destructive" });
    }
  }

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Create GYM</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...gymForm}>
            <form onSubmit={gymForm.handleSubmit(onGymSubmit)} className="space-y-1">
              <FormField control={gymForm.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Gym Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Gym name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={gymForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Admin email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGym;
