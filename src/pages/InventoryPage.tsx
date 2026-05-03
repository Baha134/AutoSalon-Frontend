import { useEffect, useState, useCallback } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Car } from '../lib/supabase';
import CarCard from '../components/CarCard';

type Props = {
  onCarSelect: (car: Car) => void;
};

type Filters = {
  search: string;
  make: string;
  body_type: string;
  fuel_type: string;
  transmission: string;
  priceMin: string;
  priceMax: string;
};

const emptyFilters: Filters = {
  search: '',
  make: '',
  body_type: '',
  fuel_type: '',
  transmission: '',
  priceMin: '',
  priceMax: '',
};

const bodyTypeLabels: Record<string, string> = {
  suv: 'Внедорожник',
  sedan: 'Седан',
  coupe: 'Купе',
  hatchback: 'Хэтчбек',
  wagon: 'Универсал',
};

const fuelLabels: Record<string, string> = {
  petrol: 'Бензин',
  diesel: 'Дизель',
  electric: 'Электро',
  hybrid: 'Гибрид',
};

export default function InventoryPage({ onCarSelect }: Props) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [showFilters, setShowFilters] = useState(false);
  const [makes, setMakes] = useState<string[]>([]);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    let query = supabase.from('cars').select('*').eq('status', 'available').order('featured', { ascending: false });

    if (filters.make) query = query.eq('make', filters.make);
    if (filters.body_type) query = query.eq('body_type', filters.body_type);
    if (filters.fuel_type) query = query.eq('fuel_type', filters.fuel_type);
    if (filters.transmission) query = query.eq('transmission', filters.transmission);
    if (filters.priceMin) query = query.gte('price', Number(filters.priceMin));
    if (filters.priceMax) query = query.lte('price', Number(filters.priceMax));

    const { data } = await query;
    if (data) {
      const filtered = filters.search
        ? data.filter(c =>
            `${c.make} ${c.model}`.toLowerCase().includes(filters.search.toLowerCase())
          )
        : data;
      setCars(filtered);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  useEffect(() => {
    supabase
      .from('cars')
      .select('make')
      .eq('status', 'available')
      .then(({ data }) => {
        if (data) {
          const unique = [...new Set(data.map(c => c.make))].sort();
          setMakes(unique);
        }
      });
  }, []);

  const hasActiveFilters = Object.entries(filters).some(([k, v]) => k !== 'search' && v !== '');

  const clearFilters = () => setFilters(emptyFilters);

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-zinc-900">Каталог автомобилей</h1>
          <p className="text-zinc-500 mt-2">Найдите идеальный автомобиль из нашего обширного каталога</p>
        </div>

        {/* Search + Filter toggle */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Поиск по марке или модели..."
              value={filters.search}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-zinc-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-amber-500 border-amber-500 text-zinc-900'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Фильтры
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-zinc-900 rounded-full" />
            )}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1 block">Марка</label>
                <select
                  value={filters.make}
                  onChange={e => setFilters({ ...filters, make: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Все</option>
                  {makes.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1 block">Кузов</label>
                <select
                  value={filters.body_type}
                  onChange={e => setFilters({ ...filters, body_type: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Все</option>
                  {Object.entries(bodyTypeLabels).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1 block">Топливо</label>
                <select
                  value={filters.fuel_type}
                  onChange={e => setFilters({ ...filters, fuel_type: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Все</option>
                  {Object.entries(fuelLabels).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1 block">КПП</label>
                <select
                  value={filters.transmission}
                  onChange={e => setFilters({ ...filters, transmission: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value="">Все</option>
                  <option value="automatic">Автомат</option>
                  <option value="manual">Механика</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1 block">Цена от (₽)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.priceMin}
                  onChange={e => setFilters({ ...filters, priceMin: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-zinc-600 mb-1 block">Цена до (₽)</label>
                <input
                  type="number"
                  placeholder="999999999"
                  value={filters.priceMax}
                  onChange={e => setFilters({ ...filters, priceMax: e.target.value })}
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-4 flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                Сбросить фильтры
              </button>
            )}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <p className="text-zinc-500 text-sm mb-6">
            Найдено автомобилей: <span className="font-semibold text-zinc-900">{cars.length}</span>
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-zinc-400 text-lg font-medium">Автомобили не найдены</p>
            <p className="text-zinc-400 text-sm mt-2">Попробуйте изменить параметры поиска</p>
            {hasActiveFilters && (
              <button onClick={clearFilters} className="mt-4 text-amber-600 font-semibold text-sm">
                Сбросить фильтры
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map(car => (
              <CarCard key={car.id} car={car} onClick={() => onCarSelect(car)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
