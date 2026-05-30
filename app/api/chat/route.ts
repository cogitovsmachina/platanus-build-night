import { NextRequest } from 'next/server';
import { runOrchestrator } from '@/lib/orchestrator';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { directive } = await req.json();

    if (!directive) {
      return new Response(JSON.stringify({ error: "Directive is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const encoder = new TextEncoder();
    const generator = runOrchestrator(directive);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of generator) {
            controller.enqueue(encoder.encode(JSON.stringify(chunk) + '\n'));
          }
          controller.close();
        } catch (err: any) {
          controller.error(err);
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive'
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
