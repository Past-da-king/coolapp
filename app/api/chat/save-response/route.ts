
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const { userMessage, modelResponse } = await req.json();

    const client = await clientPromise;
    const db = client.db('chat_history');
    const collection = db.collection('messages');

    await collection.insertMany([
      { ...userMessage, createdAt: new Date() },
      { ...modelResponse, createdAt: new Date() },
    ]);

    return NextResponse.json({ message: 'Messages saved' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
