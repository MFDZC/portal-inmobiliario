import Link from 'next/link';

export default function Card({ propiedad }) {
  return (
    <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={propiedad.img} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
          alt="Propiedad"
        />
        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md text-[#1E3A8A] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
          {propiedad.tipo}
        </div>
      </div>

      <div className="p-8 flex-grow">
        <h3 className="text-3xl font-black text-[#1E3A8A] mb-2">
          ${propiedad.precio.toLocaleString('es-CL')}
        </h3>
        <p className="text-gray-400 font-medium flex items-center mb-6">
          <span className="text-[#10B981] mr-2 text-xl">📍</span> {propiedad.comuna}, Chile
        </p>

        <div className="flex justify-between items-center py-5 border-t border-gray-50">
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-300 uppercase">Dorm.</p>
              <p className="text-sm font-bold text-slate-700">{propiedad.hab}</p>
            </div>
            <div className="text-center border-l border-gray-100 pl-6">
              <p className="text-[10px] font-bold text-gray-300 uppercase">Baños</p>
              <p className="text-sm font-bold text-slate-700">{propiedad.banos}</p>
            </div>
          </div>
          
          <Link href={`/propiedad/${propiedad.id}`} className="bg-[#F3F4F6] group-hover:bg-[#1E3A8A] p-4 rounded-2xl transition-all duration-300">
            <span className="text-[#1E3A8A] group-hover:text-white font-bold text-sm">Ver más →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}