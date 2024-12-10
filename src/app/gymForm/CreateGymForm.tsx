// // components/CreateGymForm.tsx (with 'use client')
// "use client"; // This ensures this component is client-side only

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { gymFormSchema } from "@/lib/auth-schema";
// import { createGymAction } from "@/app/actions/actions";
// import { toast } from "@/hooks/use-toast";

// const CreateGymForm = () => {
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
    
//     // Call the server-side action for gym creation
//     const { success, message } = await createGymAction(name, email);

//     if (success) {
//       toast({
//         title: message,
//       });
//       gymForm.reset();
//     } else {
//       toast({
//         title: message,
//         variant: "destructive",
//       });
//     }
//   }

//   return (
//     <Form {...gymForm}>
//       <form onSubmit={gymForm.handleSubmit(onGymSubmit)} className="space-y-1">
//         <FormField
//           control={gymForm.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Gym Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Gym name..." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={gymForm.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Admin email..." {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full">Submit</Button>
//       </form>
//     </Form>
//   );
// };

// export default CreateGymForm;


"use client"; // Ensures this component is client-side only

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { gymFormSchema } from "@/lib/auth-schema";
import { createGymAction } from "@/app/actions/actions";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const CreateGymForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Define your form for gym creation using react-hook-form
  const gymForm = useForm({
    resolver: zodResolver(gymFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onGymSubmit(values: z.infer<typeof gymFormSchema>) {
    setIsSubmitting(true); // Set loading state
    try {
      const { name, email } = values;

      // Call the server-side action for gym creation
      const { success, message } = await createGymAction(name, email);

      if (success) {
        toast({
          title: message,
        });
        gymForm.reset();
      } else {
        toast({
          title: message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        // title: "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Reset loading state
    }
  }

  return (
    <Form {...gymForm}>
      <form onSubmit={gymForm.handleSubmit(onGymSubmit)} className="space-y-1">
        <FormField
          control={gymForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gym Name</FormLabel>
              <FormControl>
                <Input placeholder="Gym name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={gymForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Admin email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateGymForm;
