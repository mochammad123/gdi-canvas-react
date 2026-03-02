export const env = {
  VITE_APP_NAME: window?.__ENV__?.VITE_APP_NAME || 'Default App Name',
  VITE_BASE_API_URL: window?.__ENV__?.VITE_BASE_API_URL || '',
  VITE_ENVIRONTMENT: window?.__ENV__?.VITE_ENVIRONTMENT || 'DEVELOPMENT',
  VITE_DOCUMENTATION_URL: window?.__ENV__?.VITE_DOCUMENTATION_URL || 'http://dokumentasi.co.id/knitto/ui',
  VITE_USE_MOCK_API: window?.__ENV__?.VITE_USE_MOCK_API || 'true',
};
