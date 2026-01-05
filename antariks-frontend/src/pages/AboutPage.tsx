const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      
      {/* 1. Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Tentang Aplikasi</h1>
        <p className="text-gray-500 mt-2 text-lg">Inventory Management System </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 2. Kartu Developer (Personal Branding) */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-1">Developed by</h2>
            <h3 className="text-4xl font-extrabold mb-4">Riri Triana</h3> {/* GANTI DENGAN NAMA ASLIMU */}
            <p className="text-blue-100 text-lg mb-6">Fullstack Developer Candidate</p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-lg">📧</span>
                <span className="font-medium">riritriana21@gmail.com</span> {/* GANTI EMAIL */}
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 p-2 rounded-lg">🐙</span>
                <span className="font-medium">https://github.com/riritriana</span> {/* GANTI GITHUB */}
              </div>
            </div>
          </div>
          
          {/* Hiasan Background */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
        </div>

        {/* 3. Tech Stack (Pamer Skill) */}
        <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span>🛠️</span> Teknologi yang Digunakan
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-blue-600 text-sm uppercase tracking-wider mb-3">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Axios', 'React Router'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 text-sm uppercase tracking-wider mb-3">Backend</h4>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'CORS'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Fitur List */}
      <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">✨ Fitur Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Dashboard Statistik', desc: 'Ringkasan total produk dan aset secara real-time.' },
            { title: 'Manajemen Produk', desc: 'Fitur lengkap Create, Read, Update, dan Delete (CRUD).' },
            { title: 'Pencarian Cepat', desc: 'Filter data produk secara instan tanpa reload.' },
            { title: 'Validasi Data', desc: 'Mencegah input kosong dan format yang salah.' },
            { title: 'Responsive Design', desc: 'Tampilan rapi di layar desktop maupun tablet.' },
            { title: 'Type Safety', desc: 'Kode aman dan minim bug berkat TypeScript.' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-blue-50 transition-colors">
              <h4 className="font-bold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutPage;