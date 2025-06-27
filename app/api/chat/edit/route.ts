
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { id, newText } = await req.json();

    const client = await clientPromise;
    const db = client.db('chat_history');
    const collection = db.collection('messages');

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { 'parts.0.text': newText } }
    );

    return NextResponse.json({ message: 'Message updated' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
