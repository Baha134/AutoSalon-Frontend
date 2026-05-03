import { useEffect, useState } from 'react';
import { ArrowRight, Shield, Award, Headphones, TrendingUp } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Car } from '../lib/supabase';
import CarCard from '../components/CarCard';

type Page = 'home' | 'inventory' | 'contact';

type Props = {
  onNavigate: (page: Page) => void;
  onCarSelect: (car: Car) => void;
};

const stats = [
  { value: '500+', label: 'Автомобилей в наличии' },
  { value: '12 лет', label: 'На рынке' },
  { value: '8 000+', label: 'Довольных клиентов' },
  { value: '100%', label: 'Легальные сделки' },
];

const features = [
  {
    icon: Shield,
    title: 'Юридическая чистота',
    desc: 'Все автомобили проверены юридически. Никаких залогов и ограничений.',
  },
  {
    icon: Award,
    title: 'Гарантия качества',
    desc: 'Каждый автомобиль проходит 150-точечную техническую проверку.',
  },
  {
    icon: Headphones,
    title: 'Поддержка 24/7',
    desc: 'Наши менеджеры готовы помочь с выбором в любое время.',
  },
  {
    icon: TrendingUp,
    title: 'Трейд-ин',
    desc: 'Обменяйте ваш автомобиль на новый с доплатой по выгодному курсу.',
  },
];

export default function HomePage({ onNavigate, onCarSelect }: Props) {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('cars')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .limit(6)
      .then(({ data }) => {
        if (data) setFeaturedCars(data);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/40 to-zinc-900/90" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 border border-amber-500/30">
            Премиальный автосалон
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
            Найдите автомобиль{' '}
            <span className="text-amber-400">вашей мечты</span>
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Более 500 автомобилей премиум-класса в наличии. Официальная гарантия,
            юридическая чистота, выгодные условия трейд-ин и кредита.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('inventory')}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              Смотреть каталог
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all border border-white/20"
            >
              Связаться с нами
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-amber-400">{s.value}</div>
                  <div className="text-zinc-400 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Избранное</span>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mt-1">Хиты продаж</h2>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="hidden sm:flex items-center gap-2 text-amber-600 font-semibold text-sm hover:gap-3 transition-all"
            >
              Все автомобили <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} onClick={() => onCarSelect(car)} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <button
              onClick={() => onNavigate('inventory')}
              className="text-amber-600 font-semibold text-sm flex items-center gap-2 mx-auto"
            >
              Все автомобили <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Наши преимущества</span>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mt-1">Почему AutoPrime?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(f => (
              <div key={f.title} className="text-center group">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-amber-100 transition-colors">
                  <f.icon className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-zinc-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Не нашли подходящий автомобиль?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Оставьте заявку и мы подберём автомобиль под ваши требования и бюджет.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-amber-500/30"
          >
            Получить консультацию
          </button>
        </div>
      </section>
    </div>
  );
}
