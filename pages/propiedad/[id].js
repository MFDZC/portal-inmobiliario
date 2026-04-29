import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';

export default function Detalle() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[600px]">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[#10B981] font-black tracking-widest uppercase text-sm mb-4">Oportunidad Única</span>
            <h1 className="text-5xl font-black text-[#1E3A8A] leading-tight mb-6">Casa Moderna en sector exclusivo</h1>
            <p className="text-gray-500 text-xl mb-10 leading-relaxed">Ubicada en el corazón de la comuna, esta propiedad cuenta con terminaciones de lujo y una eficiencia energética de alto nivel.</p>
            
            <div className="bg-[#F3F4F6] p-8 rounded-[2.5rem] mb-10 flex justify-around">
               <div className="text-center"><p className="text-gray-400 font-bold uppercase text-xs">Mts²</p><p className="text-2xl font-black text-[#1E3A8A]">140</p></div>
               <div className="text-center border-l border-gray-200 pl-8"><p className="text-gray-400 font-bold uppercase text-xs">Precio</p><p className="text-2xl font-black text-[#10B981]">$150M</p></div>
            </div>

            <button className="bg-[#1E3A8A] text-white py-6 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-blue-200 transition-all">
              Contactar por WhatsApp
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}