export const dynamic = 'force-dynamic'; 

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import  SignUpForm  from "./SignUpForm";  

const SignUp = () => {
  return (
    <div className="mt-20">
    <div className="flex flex-col  mt-20">
      {/* Normal User SignUp Form */}
      <Card className="w-full max-w-2xl mx-auto mt-20">
        <CardHeader className="">
          <CardTitle className="flex items-center justify-center text-xl">Sign up</CardTitle>
          <CardDescription>
            <p className="text-base"></p>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? {" "}
            <Link href={'/sign-in'}>Sign in</Link>
          </p>
        </CardFooter>
      </Card>


      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Create Admin</CardTitle>
        </CardHeader>

        <CardContent>
          <SignUpForm isAdmin={true} /> 
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

export default SignUp;
