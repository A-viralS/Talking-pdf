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
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 relative overflow-hidden">
      <div className="absolute right-0 p-3">
        <UserButton afterSignOutUrl="/">signout</UserButton>
      </div>

      <div className="flex flex-col justify-center items-center h-full p-5 mt-20">
        <div className="text-center">
          <h1 className="text-5xl font-semibold font-mono gradient-text p-2">Talking PDF</h1>
          <p className="max-w-xl mt-1 text-lg text-slate-600 font-extrabold">
            Revolutionize your reading experience - Engage in conversation with your PDFs!
          </p>
        </div>

        <div className="mt-4 w-[400px] sm:w-[800px]">
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

        {isAuth && firstChat && (
          <div className="mt-4 w-full ml-[1200px]">
            <Link href={`/chat/${firstChat.id}`}>
              <Button>
                Go to your Chats <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        )}

        <div className="absolute bottom-4 p-2 m-2 font-mono mt-2 w-full text-center z-10">
          <p className="font-bold">NOTE</p>
          <div>
            <span className="gradient-text-dis">
              This website is currently operating on the free tiers of OPEN AI Embeddings and Vercel. If you face any issues with file uploads, it may be due to limits on upload request size or increased traffic on these free tiers. Try smaller PDFs. I will soon be upgrading to paid versions!
            </span>
            <span className="text-2xl font-bold"> 😊</span>
          </div>
        </div>
      </div>
    </div>
  );
}
