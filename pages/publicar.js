import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

export default function Publicar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState('venta');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const datos = {
      precio: e.target.precio.value,
      comuna: e.target.comuna.value,
      tipo: tipo,
      habitaciones: e.target.hab.value,
      banos: e.target.banos.value,
      metros: e.target.metros.value,
    };

    try {
      const res = await fetch('/api/propiedades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      if (res.ok) {
        alert("¡Propiedad publicada exitosamente!");
        router.push('/');
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.mensaje || "No se pudo publicar"));
      }
    } catch (err) {
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      <main className="max-w-2xl mx-auto py-12 px-6">
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[2.5rem] shadow-2xl space-y-6 border border-gray-50">
          <h1 className="text-3xl font-black text-[#1E3A8A] text-center mb-8">Publicar Propiedad</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <button type="button" onClick={() => setTipo('venta')} className={`p-4 rounded-xl font-bold transition-all ${tipo === 'venta' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>Venta</button>
            <button type="button" onClick={() => setTipo('arriendo')} className={`p-4 rounded-xl font-bold transition-all ${tipo === 'arriendo' ? 'bg-[#1E3A8A] text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>Arriendo</button>
          </div>

          <input name="precio" type="number" placeholder="Precio (CLP)" required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-blue-100 transition-all" />
          <input name="comuna" type="text" placeholder="Comuna (ej: Santiago)" required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 ring-blue-100 transition-all" />
          
          <div className="grid grid-cols-3 gap-4">
            <input name="hab" type="number" placeholder="Hab." required className="p-4 bg-gray-50 rounded-xl text-center outline-none focus:ring-2 ring-blue-100" />
            <input name="banos" type="number" placeholder="Baños" required className="p-4 bg-gray-50 rounded-xl text-center outline-none focus:ring-2 ring-blue-100" />
            <input name="metros" type="number" placeholder="m²" required className="p-4 bg-gray-50 rounded-xl text-center outline-none focus:ring-2 ring-blue-100" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#10B981] text-white p-5 rounded-2xl font-black text-xl shadow-xl hover:bg-green-600 transition-all transform active:scale-95">
            {loading ? "Publicando..." : "Publicar Ahora"}
          </button>
        </form>
      </main>
    </div>
  );
}