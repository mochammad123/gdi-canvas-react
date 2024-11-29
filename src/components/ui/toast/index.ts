import ToastProvider from './toast-provider';
import { useToast } from './toast-service';

export default ToastProvider;
export { useToast };

/**
 * Cara menggunakan:
 *   1. Bungkus halaman yang ingin dipasangkan toast dengan <ToastProvider>.
 *      Beri property position untuk mengatur posisi toast.
 *      Beri property duration untuk mengatur durasi toast.
 *      property position dan duration berfisat opsional.
 *
 *   2. Gunakan fungsi toast.open("tipe_toast", "pesan") dari useToast() untuk membuat toast.
 *      tipe_toast adalah success, error, warning, info.
 *      pesan adalah string.
 *
 */
