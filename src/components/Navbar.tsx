import { useState, useEffect } from 'react';
import { Car, Phone, Menu, X } from 'lucide-react';

type Page = 'home' | 'inventory' | 'contact';

type Props = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
};

export default function Navbar({ currentPage, onNavigate }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links: { label: string; page: Page }[] = [
    { label: 'Главная', page: 'home' },
    { label: 'Автомобили', page: 'inventory' },
    { label: 'Контакты', page: 'contact' },
  ];

  const handleNav = (page: Page) => {
    onNavigate(page);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentPage !== 'home'
          ? 'bg-zinc-900 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center group-hover:bg-amber-400 transition-colors">
              <Car className="w-5 h-5 text-zinc-900" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              AutoPrime
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(({ label, page }) => (
              <button
                key={page}
                onClick={() => handleNav(page)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'text-amber-400'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+7800123456"
              className="flex items-center gap-2 text-zinc-300 hover:text-white text-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              +7 800 123-45-67
            </a>
            <button
              onClick={() => handleNav('inventory')}
              className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Подобрать авто
            </button>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-4 py-4 space-y-3">
          {links.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`block w-full text-left text-sm font-medium py-2 transition-colors ${
                currentPage === page ? 'text-amber-400' : 'text-zinc-300'
              }`}
            >
              {label}
            </button>
          ))}
          <a
            href="tel:+7800123456"
            className="flex items-center gap-2 text-zinc-300 text-sm py-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            +7 800 123-45-67
          </a>
        </div>
      )}
    </header>
  );
}
