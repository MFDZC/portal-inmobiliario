import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold text-[#1E3A8A]">
        Chile<span className="text-[#10B981]">Prop</span>
      </Link>
      <div className="space-x-4">
        <Link href="/publicar" className="btn-primary">Publicar Gratis</Link>
      </div>
    </nav>
  );
}