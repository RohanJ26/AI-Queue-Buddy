
import { onUpdate, offUpdate, snapshot } from '@/lib/store';

export const runtime = 'nodejs';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      function send(data) {
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      }
      const handler = (data) => send(data);
      onUpdate(handler);
      // send initial
      send(JSON.stringify(snapshot()));
      const interval = setInterval(() => send(JSON.stringify(snapshot())), 15000);
      controller.close = () => {}; // no-op
      controller.error = () => {};
      return () => {
        offUpdate(handler);
        clearInterval(interval);
      };
    }
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}
