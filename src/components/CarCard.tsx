import { Fuel, Gauge, Settings, Calendar } from 'lucide-react';
import type { Car } from '../lib/supabase';

type Props = {
  car: Car;
  onClick: () => void;
};

const fuelLabels: Record<string, string> = {
  petrol: 'Бензин',
  diesel: 'Дизель',
  electric: 'Электро',
  hybrid: 'Гибрид',
};

const transmissionLabels: Record<string, string> = {
  automatic: 'Автомат',
  manual: 'Механика',
};

export default function CarCard({ car, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-zinc-100"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={car.image_url}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {car.featured && (
          <span className="absolute top-3 left-3 bg-amber-500 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full">
            Хит продаж
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-zinc-900 text-lg leading-tight">
              {car.make} {car.model}
            </h3>
            <p className="text-zinc-500 text-sm">{car.year} год</p>
          </div>
          <div className="text-right">
            <p className="text-amber-600 font-bold text-xl">
              {car.price.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Gauge className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            {car.mileage.toLocaleString('ru-RU')} км
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Fuel className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            {fuelLabels[car.fuel_type] ?? car.fuel_type}
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Settings className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            {transmissionLabels[car.transmission] ?? car.transmission}
          </div>
          <div className="flex items-center gap-1.5 text-zinc-600 text-xs">
            <Calendar className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
            {car.power} л.с.
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-100">
          <span className="inline-block text-amber-600 font-semibold text-sm group-hover:underline">
            Подробнее &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}
