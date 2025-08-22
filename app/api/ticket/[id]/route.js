
import { getTicket, snapshot } from '@/lib/store';

export async function GET(_req, { params }) {
  const t = getTicket(params.id);
  if (!t) return new Response('Not found', { status: 404 });
  // include computed snapshot for position/eta
  const snap = snapshot();
  const fresh = snap.tickets.find(x => x.id === params.id);
  return Response.json({ ticket: fresh, disruptions: snap.disruptions });
}
