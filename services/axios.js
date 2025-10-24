import axios from "axios";

console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor di richiesta: aggiunge il token automaticamente
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token && !config.headers?.skipAuth) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (_) {}
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor di risposta: gestisce errori globali (es. token scaduto)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const cfg = error.config || {};
    const skipAuthHeader = cfg.headers?.skipAuth; // usato da login/register

    if (status === 401) {
      // Non fare redirect per chiamate non autenticate (login/register)
      if (skipAuthHeader) {
        return Promise.reject(error);
      }

      console.warn("⚠️ Token scaduto o non valido — logout automatico.");
      try { localStorage.removeItem("token"); } catch (_) {}
      try { document.cookie = "token=; path=/; max-age=0; samesite=lax"; } catch (_) {}

      if (typeof window !== 'undefined' && window.location.pathname !== "/auth/login") {
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

