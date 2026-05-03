import { Car, Phone, MapPin, Mail, Clock } from 'lucide-react';

type Page = 'home' | 'inventory' | 'contact';

type Props = {
  onNavigate: (page: Page) => void;
};

export default function Footer({ onNavigate }: Props) {
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <Car className="w-4 h-4 text-zinc-900" />
              </div>
              <span className="text-white font-bold text-base">AutoPrime</span>
            </div>
            <p className="text-sm leading-relaxed">
              Премиальный автосалон с широким выбором автомобилей от ведущих мировых производителей.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Навигация</h4>
            <ul className="space-y-2 text-sm">
              {([['Главная', 'home'], ['Автомобили', 'inventory'], ['Контакты', 'contact']] as [string, Page][]).map(([label, page]) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>+7 800 123-45-67</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>info@autoprime.ru</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Москва, ул. Автомобильная, 1</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Режим работы</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Пн–Пт: 9:00 – 20:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Сб–Вс: 10:00 – 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} AutoPrime. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
