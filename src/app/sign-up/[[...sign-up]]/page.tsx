import { SignUp } from "@clerk/nextjs";
import { Link } from "lucide-react";


export default function Page() {


    return (
        <>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link href="sign-in" className=" gradient-text-dis"> Have Account? SIGN-IN</Link>
                <SignUp /></div>

        </>



    )


}