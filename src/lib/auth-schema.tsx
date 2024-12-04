import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(3, { message: 'Name must be atleast 3 characters long' }).max(50, { message: 'Name cannot exceed 50 characters' }),
    email: z.string().email({ message: 'Please enetr a valid email adress' }).max(50, { message: 'email cannot exceed 50 characters' }),
    password: z.string().min(6, { message: 'password must be atleast 6 characters long' }).max(30, { message: 'Password cannot exceed 30 characters' }),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNo: z.string().optional(),
    adminId: z.string()
})

export const signInFormSchema = formSchema.pick({
    email: true,
    password: true,
})

export const signUpFormSchema = formSchema.pick({
    email: true,
    name: true,
    password: true,
})


export const employeFormSchema = formSchema.pick({
    email: true,
    name: true,
    password: true,
    phoneNo: true,
    adminId: true,
})


export const gymFormSchema = formSchema.pick({
    email: true,
    name: true
})