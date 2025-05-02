class CustomFetchService {
  BASE_URL = "http://192.168.0.100:3000";

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`);
    return response.json();
  }

  async post<T>(
    endpoint: string,
    body: any,
    extraHeaders: Record<string, string> = {}
  ): Promise<{ status: number; data: T | null }> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...extraHeaders,
    };

    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const status = response.status;

    if (status === 204) {
      return { status, data: null };
    }

    const text = await response.text();

    if (!text) {
      return { status, data: null };
    }

    const data = JSON.parse(text) as T;

    return { status, data };
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.BASE_URL}${endpoint}`, {
      method: "DELETE",
    });
    return response.json();
  }
}

export default CustomFetchService;
