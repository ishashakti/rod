// src/app/page.tsx
import { fetchWooCommerce } from '@/lib/wp-client';
import Link from 'next/link';
import { Truck, Headphones, Car } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  images: { src: string }[];
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await fetchWooCommerce('products?per_page=4&orderby=date&order=desc');
    return products;
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* 1. Hero Section */}
        <section className="relative bg-white py-24 px-6 text-center border-b border-gray-200">
          <div className="absolute inset-0 z-0">
            <img
                src="/fondo-hero.jpg"
                alt="Fondo de carretera"
                className="w-full h-full object-cover"
            />
            {/* Capa oscura (overlay) para que el texto resalte */}
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md">
              Iluminamos tu camino, para que domines la carretera
            </h1>

            <div className="space-y-2 text-lg md:text-2xl text-gray-200 font-medium">
              <p>Tenemos los faros que tu vehículo necesita</p>
              <p className="text-gray-300 italic">Prepárate para ser el rey de la pista</p>
            </div>

            <div className="pt-4">
              <a
                  href="#contacto"
                  className="inline-block bg-[#B10808] hover:bg-[#8a0606] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg transition-transform transform hover:scale-105"
              >
                ¡Cotiza ya!
              </a>
            </div>
          </div>
        </section>
        <section className="max-w-7xl mx-auto py-16 px-6">


          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-600 mt-2">Lo que nos hace destacar en el camino</p>
          </div>

          {/* Las 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Columna 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="p-4 bg-red-50 text-[#B10808] rounded-full mb-4">
                <Truck size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Envíos garantizados</h3>
              <p className="text-gray-600 leading-relaxed">
                Envíamos a todo el territorio nacional, en tiempo record
              </p>
            </div>

            {/* Columna 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="p-4 bg-red-50 text-[#B10808] rounded-full mb-4">
                <Headphones size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Atención personalizada</h3>
              <p className="text-gray-600 leading-relaxed">
                De lunes a sabado
              </p>
            </div>

            {/* Columna 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="p-4 bg-red-50 text-[#B10808] rounded-full mb-4">
                <Car size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Productos de calidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Contamos con los mejores reemplazos de iluminación para tu vehículo
              </p>
            </div>

          </div>
        </section>
        {/* 2. Sección de Productos Destacados */}
        <section className="max-w-7xl mx-auto py-16 px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              Nuestros Productos
            </h2>
            <Link href="/productos" className="text-sm text-[#B10808] font-semibold hover:underline">
              Ver todo el catálogo &rarr;
            </Link>
          </div>

          {products.length === 0 ? (
              <p className="text-gray-500 text-center py-10">
                Cargando productos desde WooCommerce...
              </p>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
                    >
                      {product.images && product.images[0] ? (
                          <img
                              src={product.images[0].src}
                              alt={product.name}
                              className="w-full h-48 object-cover bg-gray-100"
                          />
                      ) : (
                          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                            Sin imagen
                          </div>
                      )}

                      <div className="p-4 flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-gray-800">{product.name}</h3>
                        </div>
                        <button className="w-full bg-[#B10808] hover:bg-[#8a0606] text-white font-semibold py-2 rounded-lg text-sm transition">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </section>
      </div>
  );
}