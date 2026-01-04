import type{ Product } from "../types";

interface Props {
  products: Product[];
  totalAsset: number;
}

const DashboardStats = ({ products, totalAsset }: Props) => {
  const formatRupiah = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">📦</div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Jenis Produk</p>
          <h3 className="text-2xl font-bold">{products.length} Item</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">📊</div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Stok Unit</p>
          <h3 className="text-2xl font-bold">{products.reduce((acc, curr) => acc + curr.qty, 0)} Pcs</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4">
        <div className="p-3 bg-green-100 text-green-600 rounded-lg">💰</div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Estimasi Aset</p>
          <h3 className="text-2xl font-bold">{formatRupiah(totalAsset)}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;