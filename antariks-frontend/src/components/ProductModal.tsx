import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { product_name: string; amount: number; qty: number }) => void;
  initialData: { product_name: string; amount: string; qty: string } | null;
  isSaving: boolean;
  title: string;
}

const ProductModal = ({ isOpen, onClose, onSubmit, initialData, isSaving, title }: Props) => {
  const [form, setForm] = useState<{ product_name: string; amount: string; qty: string }>({
    product_name: '',
    amount: '',
    qty: ''
  });

  // State untuk menampung pesan error
  const [errors, setErrors] = useState<{ product_name?: string; amount?: string; qty?: string }>({});

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData });
    } else {
      setForm({ product_name: '', amount: '', qty: '' });
    }
    setErrors({}); // Reset error saat modal dibuka
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // Fungsi Validasi
  const validate = () => {
    const newErrors: { product_name?: string; amount?: string; qty?: string } = {};

    // 1. Validasi Nama (Minimal 3 huruf ASLI)
    if (!form.product_name.trim()) {
      newErrors.product_name = "Nama produk wajib diisi";
    } else if (form.product_name.trim().length < 3) { 
      newErrors.product_name = "Nama produk minimal 3 huruf asli (tanpa spasi)";
    }

    // 2. Validasi Harga (Harus Angka & Lebih dari 0)
    const amountNum = Number(form.amount);
    if (!form.amount) {
      newErrors.amount = "Harga wajib diisi";
    } else if (amountNum <= 0) {
      newErrors.amount = "Harga harus lebih besar dari 0";
    }

    // 3. Validasi Qty (Harus Angka & Tidak Boleh Minus)
    const qtyNum = Number(form.qty);
    if (form.qty === '') {
      newErrors.qty = "Stok wajib diisi";
    } else if (qtyNum < 0) {
      newErrors.qty = "Stok tidak boleh negatif";
    }

    setErrors(newErrors);
    // Kalau object errors kosong, berarti VALID (return true)
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cek validasi dulu sebelum kirim ke backend
    if (validate()) {
      onSubmit({ 
        product_name: form.product_name, 
        amount: Number(form.amount), 
        qty: Number(form.qty) 
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-2xl">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
{/* Input Nama Produk */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk</label>
            <input 
              type="text" 
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${errors.product_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
              value={form.product_name} 
              onChange={(e) => {
                // LOGIKA OTOMATIS KAPITAL
                const val = e.target.value;
                // Ambil huruf pertama jadikan besar + sisa hurufnya
                const capitalized = val.charAt(0).toUpperCase() + val.slice(1);
                
                setForm({ ...form, product_name: capitalized });
              }} 
              placeholder="Contoh: Laptop Gaming"
            />
            {errors.product_name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.product_name}</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Harga (Rp)</label>
              <input 
                type="number" 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${errors.amount ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                value={form.amount} 
                onChange={(e) => setForm({ ...form, amount: e.target.value })} 
                placeholder="0"
              />
              {errors.amount && <p className="text-red-500 text-xs mt-1 ml-1">{errors.amount}</p>}
            </div>

            {/* Input Qty */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stok (Qty)</label>
              <input 
                type="number" 
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition ${errors.qty ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                value={form.qty} 
                onChange={(e) => setForm({ ...form, qty: e.target.value })} 
                placeholder="0"
              />
              {errors.qty && <p className="text-red-500 text-xs mt-1 ml-1">{errors.qty}</p>}
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={isSaving} 
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-blue-300 shadow-lg"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan Data'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;