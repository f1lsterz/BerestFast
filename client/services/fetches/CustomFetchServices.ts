export const BASE_URL = "http://192.168.0.107:3000";

export const DEFAULT_HEADERS: { [key: string]: string } = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

class CustomFetchServices {
  private getHeaders(customHeaders: { [key: string]: string } = {}) {
    return { ...DEFAULT_HEADERS, ...customHeaders };
  }

  async get<T>(
    url: string,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    return this.request<T>(url, "GET", null, headers);
  }

  async post<T>(
    url: string,
    body: object,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    return this.request<T>(url, "POST", body, headers);
  }

  async patch<T>(
    url: string,
    body: object,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    return this.request<T>(url, "PATCH", body, headers);
  }

  async put<T>(
    url: string,
    body: object,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    return this.request<T>(url, "PUT", body, headers);
  }

  async delete<T>(
    url: string,
    headers: { [key: string]: string } = {}
  ): Promise<T> {
    return this.request<T>(url, "DELETE", null, headers);
  }

  private async request<T>(
    url: string,
    method: string,
    body: object | null = null,
    customHeaders: { [key: string]: string } = {}
  ): Promise<T> {
    const fullUrl = `${BASE_URL}/${url}`;
    const headers = this.getHeaders(customHeaders);

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }
}

export default new CustomFetchServices();
