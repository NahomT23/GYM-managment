// export const dynamic = 'force-dynamic';


// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import Link from "next/link"
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from 'react-hook-form';

// import { z } from "zod"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { gymFormSchema, signUpFormSchema } from "@/lib/auth-schema"
// import { auth } from "@/lib/auth"
// import { authClient } from "@/lib/auth-client"
// import { toast } from "@/hooks/use-toast"
// import { redirect } from "next/navigation"
// import { createGymAction } from "@/app/actions/actions";





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




// pages/create-gym.tsx (with 'force-dynamic')
export const dynamic = 'force-dynamic'; // This forces dynamic rendering

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import CreateGymForm  from "./CreateGymForm";  // Import the client-side CreateGymForm

const CreateGymPage = () => {
  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto mt-20">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Create GYM</CardTitle>
        </CardHeader>

        <CardContent>
          <CreateGymForm /> {/* Use the CreateGymForm component here */}
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateGymPage;
