export const dynamic = 'force-dynamic'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import SignInForm  from "./SignInForm"; 

const SignIn = () => {
  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-center text-xl">Sign in</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
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
