import type {
  Bodega,
  CreateBodegaPayload,
  CreateLibroPayload,
  Libro,
} from '@app/shared';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

type RequestOptions = RequestInit & {
  noContent?: boolean;
};

async function request<T>(url: string, init?: RequestOptions): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
      ...init,
    });
  } catch {
    throw new ApiError(0, 'No se pudo conectar al servidor');
  }

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
    throw new ApiError(response.status, message);
  }

  if (init?.noContent || response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 400) {
      return `Error de validación: ${error.message}`;
    }

    if (error.status === 404) {
      return 'El recurso no existe';
    }

    if (error.status === 0) {
      return 'No se pudo conectar al servidor';
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Error inesperado';
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

export function updateBodega(id: string, payload: Partial<CreateBodegaPayload>): Promise<Bodega> {
  return request<Bodega>(`/api/bodegas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteBodega(id: string): Promise<void> {
  return request<void>(`/api/bodegas/${id}`, {
    method: 'DELETE',
    noContent: true,
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

export function updateLibro(id: string, payload: Partial<CreateLibroPayload>): Promise<Libro> {
  return request<Libro>(`/api/libros/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteLibro(id: string): Promise<void> {
  return request<void>(`/api/libros/${id}`, {
    method: 'DELETE',
    noContent: true,
  });
}
