import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
    return (
        <>


            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link href="sign-up" className=" gradient-text-dis"> NO Account? SIGN-UP</Link>
                <SignIn /></div>
        </>


    )


}