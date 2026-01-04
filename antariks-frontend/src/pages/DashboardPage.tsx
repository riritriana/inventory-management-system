import { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../services/api';
import type { Product } from '../types'; 
import DashboardStats from '../components/DashboardStats';
import ProductModal from '../components/ProductModal';

const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  
  // --- STATE PAGINATION (BARU) ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Kita batasi 5 produk per halaman
  // -------------------------------
  
  const [modalData, setModalData] = useState<{ product_name: string; amount: string; qty: string }>({
    product_name: '', amount: '', qty: ''
  });

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Gagal load data", error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Reset ke halaman 1 kalau user melakukan pencarian (Search)
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleDelete = async (id: number) => {
    if (confirm('Hapus produk ini?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Gagal hapus:", error);
        alert("Gagal menghapus data");
      }
    }
  };

  const handleSave = async (data: { product_name: string; amount: number; qty: number }) => {
    setIsSaving(true);
    try {
      if (editId) await updateProduct(editId, data);
      else await createProduct(data);
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) { 
      console.error("Gagal simpan:", error);
      alert("Gagal menyimpan data"); 
    } finally { 
      setIsSaving(false); 
    }
  };

  const openAdd = () => {
    setEditId(null);
    setModalData({ product_name: '', amount: '', qty: '' });
    setIsModalOpen(true);
  };

  const openEdit = (item: Product) => {
    setEditId(item.id);
    setModalData({ product_name: item.product_name, amount: String(item.amount), qty: String(item.qty) });
    setIsModalOpen(true);
  };

  const formatRupiah = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  // --- LOGIKA UTAMA PAGINATION ---
  
  // 1. Filter dulu (Pencarian)
  const filtered = products.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  // 2. Hitung Matematika Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // 3. Potong Data (Slice) - Ini yang akan ditampilkan di tabel
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  
  // 4. Hitung Total Halaman
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // 5. Hitung Total Aset (Dari semua data, bukan cuma yang tampil)
  const totalAsset = products.reduce((acc, curr) => acc + (Number(curr.amount) * curr.qty), 0);

  // -------------------------------

  return (
    <div className="max-w-6xl mx-auto pb-10"> {/* Tambah pb-10 biar tombol bawah gak mepet */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Produk</h1>
        <button onClick={openAdd} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-700 transition">+ Tambah</button>
      </div>

      <DashboardStats products={products} totalAsset={totalAsset} />

      <div className="bg-white shadow rounded-xl overflow-hidden border border-gray-100">
        <div className="p-5 border-b bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="font-bold text-gray-700">Daftar Inventory ({filtered.length} Item)</h2>
          <input 
            type="text" 
            placeholder="Cari produk..." 
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none" 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-4 border-b">No</th>
                <th className="p-4 border-b">Nama Produk</th>
                <th className="p-4 border-b">Harga</th>
                <th className="p-4 border-b">Qty</th>
                <th className="p-4 border-b">Total</th>
                <th className="p-4 border-b text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                    {/* Nomor urut disesuaikan dengan halaman (misal hal 2 mulai dari no 6) */}
                    <td className="p-4 text-gray-500 font-medium">{indexOfFirstItem + index + 1}</td>
                    <td className="p-4 font-bold text-gray-800">{item.product_name}</td>
                    <td className="p-4 text-gray-600">{formatRupiah(Number(item.amount))}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${item.qty < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {item.qty} pcs
                      </span>
                    </td>
                    <td className="p-4 font-bold text-blue-600">{formatRupiah(Number(item.amount) * item.qty)}</td>
                    <td className="p-4 text-center space-x-2">
                      <button onClick={() => openEdit(item)} className="text-yellow-600 hover:text-yellow-700 font-bold text-sm transition">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-700 font-bold text-sm transition">Hapus</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 italic">Data tidak ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- TOMBOL PAGINATION DI BAWAH --- */}
        {filtered.length > itemsPerPage && (
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filtered.length)} dari {filtered.length} data
            </span>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ← Sebelumnya
              </button>
              
              {/* Info Halaman (Page 1 of 3) */}
              <div className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm font-bold">
                {currentPage} / {totalPages}
              </div>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        )}
        {/* ---------------------------------- */}
        
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSave} initialData={modalData} isSaving={isSaving} title={editId ? 'Edit Produk' : 'Tambah Produk'} />
    </div>
  );
};

export default DashboardPage;