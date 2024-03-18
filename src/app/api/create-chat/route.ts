import { DB } from "@/lib/db";
import { chats } from '@/lib/db/schema';
import { loadS3IntoPinecone } from '@/lib/pinecone';
import { getS3Url } from "@/lib/s3";
import {NextResponse} from 'next/server'
import {auth} from '@clerk/nextjs'
import React from 'react'

export async function POST(req:Request, res: Response){
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    console.log('inside the create chat route');
    try {
        console.log('inside the create chat route');
        const body=await req.json()
        const {file_key,file_name}= body;
        console.log(file_key,file_name);
console.log('above the loads3 function ');
await loadS3IntoPinecone(file_key);
const chat_id = await DB
  .insert(chats)
  .values({
    fileKey: file_key,
    pdfName: file_name,
    pdfUrl: getS3Url(file_key),
    userId,
  })
  .returning({
    insertedId: chats.id,
  });

return NextResponse.json(
  {
    chat_id: chat_id[0].insertedId,
  },
  { status: 200 }
);} catch (error) {
        console.error(error)
        return NextResponse.json({error:"Internal server error"},
        {status:500})
    }
}