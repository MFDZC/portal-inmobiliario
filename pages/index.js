import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

export default function Home() {
  const [propiedades, setPropiedades] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [errorBBDD, setErrorBord] = useState(false); // Nuevo estado para capturar el fallo de la API

  const cargarPropiedades = async (termino = '') => {
    setCargando(true);
    setErrorBord(false);
    try {
      const res = await fetch(`/api/propiedades?q=${termino}`);
      
      // Si la API responde con error 500 (lo que vemos en tus capturas), capturamos el fallo
      if (!res.ok) {
        console.error("La API devolvió un error:", res.status);
        setErrorBord(true);
        setPropiedades([]);
        return;
      }

      const data = await res.json();
      setPropiedades(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fallo crítico de conexión:", error);
      setErrorBord(true);
      setPropiedades([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPropiedades();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <section className="h-[400px] flex items-center justify-center bg-[#1E3A8A]">
        <div className="text-center px-4 w-full">
          <h1 className="text-5xl font-black text-white mb-8">Encuentra tu hogar</h1>
          <div className="max-w-4xl mx-auto bg-white p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="¿Qué comuna buscas?" 
              className="flex-[2] p-4 text-gray-700 outline-none text-lg rounded-2xl bg-gray-50"
            />
            <button 
              onClick={() => cargarPropiedades(busqueda)} 
              className="bg-[#10B981] hover:bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all"
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto py-16 px-6">
        {cargando ? (
          <p className="text-center text-gray-400">Sincronizando...</p>
        ) : errorBBDD ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-500 text-xl font-bold">Error de conexión con la base de datos</p>
            <p className="text-red-400">Asegúrate de haber ejecutado "npx prisma db push"</p>
          </div>
        ) : propiedades.length === 0 ? (
          <p className="text-center text-gray-400 text-xl py-20">No hay propiedades publicadas aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {propiedades.map(p => <Card key={p.id} propiedad={p} />)}
          </div>
        )}
      </main>
    </div>
  );
}