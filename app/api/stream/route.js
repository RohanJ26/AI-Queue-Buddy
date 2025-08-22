
import { onUpdate, offUpdate, snapshot } from '@/lib/store';

export const runtime = 'nodejs';

export async function GET() {
  console.log('SSE stream connection opened');
  
  const stream = new ReadableStream({
    start(controller) {
      function send(data) {
        console.log('SSE sending data:', data);
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      }
      
      const handler = (data) => {
        console.log('SSE handler called with:', data);
        send(data);
      };
      
      onUpdate(handler);
      
      // send initial
      const initialData = JSON.stringify(snapshot());
      console.log('SSE sending initial data:', initialData);
      send(initialData);
      
      const interval = setInterval(() => {
        const periodicData = JSON.stringify(snapshot());
        console.log('SSE periodic update:', periodicData);
        send(periodicData);
      }, 15000);
      
      controller.close = () => {
        console.log('SSE stream controller closing');
      };
      controller.error = () => {
        console.log('SSE stream controller error');
      };
      
      return () => {
        console.log('SSE cleanup function called');
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
