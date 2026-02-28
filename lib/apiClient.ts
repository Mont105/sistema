import type { Bodega, CreateBodegaPayload, CreateLibroPayload, Libro } from '@app/shared';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const body = (await response.json()) as { message?: string | string[] };
      if (Array.isArray(body.message)) {
        message = body.message.join(', ');
      } else if (body.message) {
        message = body.message;
      }
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getBodegas(): Promise<Bodega[]> {
  return request<Bodega[]>('/api/bodegas');
}

export function createBodega(payload: CreateBodegaPayload): Promise<Bodega> {
  return request<Bodega>('/api/bodegas', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getLibros(): Promise<Libro[]> {
  return request<Libro[]>('/api/libros');
}

export function createLibro(payload: CreateLibroPayload): Promise<Libro> {
  return request<Libro>('/api/libros', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
