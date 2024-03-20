import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import { DB } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = await auth();
  let firstChat;
  if (userId) {
    firstChat = await DB.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  const isAuth = !!userId;
  return (

    <div className="w-sreen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className=" absolute right-0 p-3 ">   <UserButton afterSignOutUrl="/" >signout</UserButton></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 ">
        <div className="fl
        ex flex-col items-center text-center">
          <div className="flex items-center justify-center">

            <h1 className="mr-3 text-5xl font-semibold font-mono gradient-text p-2">Talking PDF</h1>


          </div>
          <div className="flex mt-2 items-center justify-center">

            {isAuth && firstChat && (
              <>
                <Link href={`/chat/${firstChat.id}`}>
                  <Button>
                    Go to your Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>

              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600 font-extrabold">
            Revolutionize your reading experience - Engage in conversation with your PDFs!
          </p>
          <div className="w-full mt-4">
            {isAuth ? (

              <FileUpload />
            ) : (
              <Link href="/sign-in">

                <Button>

                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>


        </div>
      </div>
    </div>





  );
}
