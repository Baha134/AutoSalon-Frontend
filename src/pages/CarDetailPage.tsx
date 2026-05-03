import { useState } from 'react';
import {
  ArrowLeft,
  Fuel,
  Gauge,
  Settings,
  Calendar,
  Palette,
  Zap,
  Car,
  Phone,
} from 'lucide-react';
import type { Car as CarType } from '../lib/supabase';
import InquiryModal from '../components/InquiryModal';

type Props = {
  car: CarType;
  onBack: () => void;
};

const fuelLabels: Record<string, string> = {
  petrol: 'Бензин',
  diesel: 'Дизель',
  electric: 'Электро',
  hybrid: 'Гибрид',
};

const transmissionLabels: Record<string, string> = {
  automatic: 'Автоматическая',
  manual: 'Механическая',
};

const bodyTypeLabels: Record<string, string> = {
  suv: 'Внедорожник',
  sedan: 'Седан',
  coupe: 'Купе',
  hatchback: 'Хэтчбек',
  wagon: 'Универсал',
};

export default function CarDetailPage({ car, onBack }: Props) {
  const [showModal, setShowModal] = useState(false);

  const specs = [
    { icon: Calendar, label: 'Год выпуска', value: String(car.year) },
    { icon: Gauge, label: 'Пробег', value: `${car.mileage.toLocaleString('ru-RU')} км` },
    { icon: Fuel, label: 'Топливо', value: fuelLabels[car.fuel_type] ?? car.fuel_type },
    { icon: Settings, label: 'КПП', value: transmissionLabels[car.transmission] ?? car.transmission },
    { icon: Car, label: 'Кузов', value: bodyTypeLabels[car.body_type] ?? car.body_type },
    { icon: Palette, label: 'Цвет', value: car.color },
    { icon: Zap, label: 'Двигатель', value: car.engine },
    { icon: Zap, label: 'Мощность', value: `${car.power} л.с.` },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад к каталогу
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-zinc-100">
              <img
                src={car.image_url}
                alt={`${car.make} ${car.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            {car.featured && (
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-4 py-2 rounded-xl">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Хит продаж
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="mb-2">
              <span className="text-zinc-500 text-sm font-medium">{car.make}</span>
            </div>
            <h1 className="text-4xl font-black text-zinc-900 mb-1">
              {car.make} {car.model}
            </h1>
            <p className="text-zinc-500 mb-6">{car.year} год &bull; {car.color}</p>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
              <p className="text-zinc-500 text-sm mb-1">Стоимость</p>
              <p className="text-4xl font-black text-zinc-900">
                {car.price.toLocaleString('ru-RU')} <span className="text-2xl">₽</span>
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                Оставить заявку
              </button>
              <a
                href="tel:+7800123456"
                className="w-full flex items-center justify-center gap-2 border-2 border-zinc-200 hover:border-zinc-300 text-zinc-700 font-semibold py-4 rounded-xl text-base transition-colors"
              >
                <Phone className="w-5 h-5" />
                Позвонить: +7 800 123-45-67
              </a>
            </div>

            {/* Specs grid */}
            <div>
              <h2 className="font-bold text-zinc-900 mb-4 text-lg">Характеристики</h2>
              <div className="grid grid-cols-2 gap-3">
                {specs.map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-3.5 border border-zinc-100">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                      <s.icon className="w-3.5 h-3.5" />
                      {s.label}
                    </div>
                    <p className="text-zinc-900 font-semibold text-sm">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {car.description && (
          <div className="mt-10 bg-white rounded-2xl p-8 border border-zinc-100">
            <h2 className="font-bold text-zinc-900 text-xl mb-4">Описание</h2>
            <p className="text-zinc-600 leading-relaxed">{car.description}</p>
          </div>
        )}
      </div>

      {showModal && <InquiryModal car={car} onClose={() => setShowModal(false)} />}
    </div>
  );
}
