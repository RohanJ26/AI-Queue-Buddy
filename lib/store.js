
import { EventEmitter } from 'events';
import { randomUUID } from 'crypto';

// Singleton-like module state
const emitter = global.__queue_emitter || new EventEmitter();
if (!global.__queue_emitter) global.__queue_emitter = emitter;

const state = global.__queue_state || {
  tickets: [], // {id, name, joinedAt, status, eta, position}
  disruptions: null, // { message, delayMinutes }
  lastUpdated: Date.now()
};
if (!global.__queue_state) global.__queue_state = state;

function broadcast() {
  state.lastUpdated = Date.now();
  emitter.emit('update', JSON.stringify(snapshot()));
}

export function snapshot() {
  // recompute positions & simple ETA
  const active = state.tickets.filter(t => t.status === 'waiting');
  active.forEach((t, idx) => t.position = idx + 1);
  const avgPerPerson = 3; // minutes per ticket (demo)
  active.forEach((t, idx) => {
    const base = (idx) * avgPerPerson;
    const extra = state.disruptions?.delayMinutes || 0;
    t.eta = new Date(Date.now() + (base + extra)*60000).toISOString();
  });
  return {
    tickets: state.tickets,
    disruptions: state.disruptions,
    serverTime: Date.now()
  };
}

export function join(name='Guest') {
  const id = randomUUID();
  state.tickets.push({ id, name, joinedAt: Date.now(), status: 'waiting', position: 0, eta: null });
  broadcast();
  return { id };
}

export function getTicket(id) {
  return state.tickets.find(t => t.id === id);
}

export function completeNext() {
  const next = state.tickets.find(t => t.status === 'waiting');
  if (next) next.status = 'completed';
  broadcast();
  return next;
}

export function skip(id) {
  const t = getTicket(id);
  if (t && t.status === 'waiting') {
    t.status = 'skipped';
    broadcast();
  }
}

export function setDisruption(message, delayMinutes=10) {
  state.disruptions = { message, delayMinutes, at: Date.now() };
  broadcast();
}

export function clearDisruption() {
  state.disruptions = null;
  broadcast();
}

export function onUpdate(fn) { emitter.on('update', fn); }
export function offUpdate(fn) { emitter.off('update', fn); }
