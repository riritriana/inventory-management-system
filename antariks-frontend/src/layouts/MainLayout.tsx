import { Outlet, Link, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? "bg-blue-700 text-white shadow-lg" : "text-blue-100 hover:bg-blue-600 hover:text-white";

  return (
    <div className="flex min-h-screen bg-gray-200 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-2xl font-extrabold tracking-wider">ANTARIKS</h1>
          <p className="text-xs text-blue-300 mt-1">Inventory System</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/" className={`block px-4 py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive('/')}`}>
            <span>📦</span> Dashboard
          </Link>
          <Link to="/about" className={`block px-4 py-3 rounded-xl transition-all font-semibold flex items-center gap-3 ${isActive('/about')}`}>
            <span>ℹ️</span> Informasi
          </Link>
        </nav>
        <div className="p-6 border-t border-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">U</div>
            <div><p className="text-sm font-bold">User Admin</p><p className="text-xs text-blue-300">Online</p></div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto h-screen"><Outlet /></main>
    </div>
  );
};
export default MainLayout;