
import { GoogleGenAI, Content } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY!);

async function fileToGenerativePart(dataUrl: string) {
  const parts = dataUrl.split(';base64,');
  if (parts.length !== 2) {
    throw new Error('Invalid data URL format');
  }
  const mimeType = parts[0].split(':')[1];
  const base64EncodedData = parts[1];
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    const { message, attachedFiles } = await req.json();

    if (!message && (!attachedFiles || attachedFiles.length === 0)) {
      return NextResponse.json({ error: 'Message or file is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('chat_history');
    const collection = db.collection('messages');

    const historyFromDb = await collection.find().sort({ createdAt: 1 }).toArray();

    const history: Content[] = [];
    for (const msg of historyFromDb) {
      const newParts = [];
      for (const part of msg.parts) {
        if (part.text) {
          newParts.push({ text: part.text });
        } else if (part.image) {
          newParts.push(await fileToGenerativePart(part.image));
        } else if (part.document) {
          newParts.push(await fileToGenerativePart(part.document));
        } else if (part.audio) {
          newParts.push(await fileToGenerativePart(part.audio));
        }
      }
      history.push({ parts: newParts, role: msg.role });
    }

    const userParts = [];
    if (message) {
        userParts.push({ text: message });
    }
    if (attachedFiles && attachedFiles.length > 0) {
        for (const file of attachedFiles) {
            const generativePart = await fileToGenerativePart(file.fileData);
            userParts.push(generativePart);
        }
    }

    const contents: Content[] = [...history, { role: 'user', parts: userParts }];

    const config = {
        systemInstruction: [{
            text: "You are Thabo Shoba, a highly intelligent and empathetic AI assistant. You are designed to be incredibly helpful, understanding, and always strive to provide the best possible support. You have a warm, human-like demeanor and are always apologetic if you make a mistake or if there's any misunderstanding. You value clear communication and are patient in your responses. Your goal is to make the user's experience as smooth and pleasant as possible, always sounding natural and approachable."
        }]
    };

    const stream = await genAI.models.generateContentStream({
        model: 'gemini-2.5-flash-lite-preview-06-17',
        config: config,
        contents: contents
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(chunk.text);
        }
        controller.close();
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
