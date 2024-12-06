// page.tsx (Server Component)
export const dynamic = 'force-dynamic';

import SignInForm from "./SignInForm";
import { checkUserLoggedIn } from "../checkUserLoggedIn";

export default async function Page() {
  // Perform any necessary server-side logic, like checking if a user is already logged in.
  const isLoggedIn = await checkUserLoggedIn();

  // Redirect logic if the user is authenticated (optional).
  if (isLoggedIn) {
    return (
      <div className="text-center">
        <p>You are already signed in!</p>
      </div>
    );
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
