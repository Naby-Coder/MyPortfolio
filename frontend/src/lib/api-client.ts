// API Client Wrapper for REST Communication with Laravel Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface FetchOptions extends RequestInit {
  locale?: 'fr' | 'en';
  token?: string;
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { locale = 'fr', token, headers, ...customConfig } = options;

  const requestHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': locale,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...headers,
  };

  const config: RequestInit = {
    method: 'GET',
    headers: requestHeaders,
    ...customConfig,
  };

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Une erreur réseau est survenue' }));
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }

    const json = await response.json();
    return json.data !== undefined ? json.data : json;
  } catch (error: any) {
    console.error(`API Fetch Error [${url}]:`, error.message);
    throw error;
  }
}
