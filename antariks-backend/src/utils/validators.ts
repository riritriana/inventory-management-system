import { z } from 'zod';

// Aturan Validasi Produk
export const productSchema = z.object({
  product_name: z.string()
    .trim()
    .min(3, { message: "Nama produk minimal 3 huruf asli (tanpa spasi)" }),
    
  // HAPUS bagian dalam kurung z.number() biar tidak error
  amount: z.number()
    .gt(0, { message: "Harga harus lebih dari 0" }),
    
  qty: z.number()
    .nonnegative({ message: "Stok tidak boleh negatif" }),
});
