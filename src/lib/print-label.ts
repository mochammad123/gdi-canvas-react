const DEFAULT_PRINT_SERVER_URL = 'http://localhost:8080';

export interface APIResponse<T = unknown> {
  message: string;
  result: T;
}

export interface PrintLabelPayload {
  templateName: string;
  printerName?: string;
  data?: Record<string, unknown>[];
}

export type PrintResponse = APIResponse<null | unknown>;

export interface PrinterListData {
  default: string;
  printers: string[];
}

export type PrinterListResponse = PrinterListData;

export interface ServerStatusData {
  status: string;
  service: string;
  default_printer: string;
  templates: string[];
  endpoints?: string[];
}

export type ServerStatusResponse = ServerStatusData;

/**
 * Cek apakah Golang GDI Print Server sedang aktif di localhost:8080
 */
export async function checkPrintServer(baseUrl = DEFAULT_PRINT_SERVER_URL): Promise<ServerStatusData> {
  const res = await fetch(`${baseUrl}/`, { method: 'GET' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Print server merespon dengan status ${res.status}`);
  }
  return (data.result as ServerStatusData) || (data as ServerStatusData);
}

/**
 * Mengambil daftar printer yang terpasang di sistem
 */
export async function getInstalledPrinters(baseUrl = DEFAULT_PRINT_SERVER_URL): Promise<PrinterListData> {
  const res = await fetch(`${baseUrl}/api/printers`, { method: 'GET' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Gagal mengambil daftar printer: ${res.statusText}`);
  }
  return (data.result as PrinterListData) || (data as PrinterListData);
}

/**
 * Mengambil daftar file template JSON yang ada di folder template/
 */
export async function getAvailableTemplates(baseUrl = DEFAULT_PRINT_SERVER_URL): Promise<string[]> {
  const res = await fetch(`${baseUrl}/api/templates`, { method: 'GET' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Gagal mengambil daftar template: ${res.statusText}`);
  }
  if (Array.isArray(data.result)) return data.result;
  if (Array.isArray(data.templates)) return data.templates;
  return [];
}

/**
 * Mengirim perintah cetak label / dokumen ke Golang GDI Print Server
 */
export async function printLabel(payload: PrintLabelPayload, baseUrl = DEFAULT_PRINT_SERVER_URL): Promise<APIResponse<unknown>> {
  const res = await fetch(`${baseUrl}/api/print`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      TemplateName: payload.templateName,
      PrinterName: payload.printerName || '',
      Data: payload.data || [{}],
    }),
  });

  const data: APIResponse<unknown> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Gagal mencetak (${res.status})`);
  }

  return data;
}

/**
 * Mengambil gambar preview (Base64 PNG) dari Golang GDI Print Server sebelum mencetak
 */
export async function previewLabel(payload: PrintLabelPayload, baseUrl = DEFAULT_PRINT_SERVER_URL): Promise<string[]> {
  const res = await fetch(`${baseUrl}/api/preview`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      TemplateName: payload.templateName,
      PrinterName: payload.printerName || '',
      Data: payload.data || [{}],
    }),
  });

  const data: APIResponse<string[]> = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `Gagal membuat preview (${res.status})`);
  }

  return data.result || [];
}

export const previewDocument = previewLabel;

export type PrintDocumentPayload = PrintLabelPayload;
export const printDocument = printLabel;
