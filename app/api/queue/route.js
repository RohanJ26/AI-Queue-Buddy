import { join, snapshot, completeNext, setDisruption, clearDisruption } from '@/lib/store';

export async function GET() {
  return Response.json(snapshot());
}

export async function POST(req) {
  const body = await req.json();
  const action = body?.action || 'join';
  if (action === 'join') {
    const { name } = body;
    const result = join(name || 'Guest');
    return Response.json(result);
  }
  if (action === 'complete') {
    const result = completeNext();
    return Response.json({ completed: result?.id || null });
  }
  if (action === 'disrupt') {
    const { message, delayMinutes } = body;
    setDisruption(message || 'Unexpected delay', delayMinutes || 10);
    return Response.json({ ok: true });
  }
  if (action === 'clearDisruption') {
    clearDisruption();
    return Response.json({ ok: true });
  }
  return new Response('Invalid action', { status: 400 });
}
