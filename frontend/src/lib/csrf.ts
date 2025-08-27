// CSRF token management for API requests
class CSRFManager {
  private token: string | null = null;

  // Get CSRF token from cookies
  async getToken(): Promise<string | null> {
    if (this.token) {
      return this.token;
    }

    try {
      // Fetch CSRF token from backend
      const response = await fetch('/api/v1/csrf-token', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.csrfToken;
        return this.token;
      }
    } catch (error) {
      console.warn('Failed to fetch CSRF token:', error);
    }

    return null;
  }

  // Clear stored token
  clearToken(): void {
    this.token = null;
  }

  // Get token for headers
  async getTokenHeader(): Promise<Record<string, string>> {
    const token = await this.getToken();
    return token ? { 'X-CSRF-Token': token } : {};
  }
}

export const csrfManager = new CSRFManager();
