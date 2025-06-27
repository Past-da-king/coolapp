
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('chat_history');
    const collection = db.collection('messages');

    const history = await collection.find().sort({ createdAt: 1 }).toArray();

    return NextResponse.json({ history });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
