import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import CarDetailPage from './pages/CarDetailPage';
import ContactPage from './pages/ContactPage';
import type { Car } from './lib/supabase';

type Page = 'home' | 'inventory' | 'contact';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedCar(null);
  };

  const handleNavigate = (target: Page) => {
    setPage(target);
    setSelectedCar(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <Navbar currentPage={page} onNavigate={handleNavigate} />

      <main className="flex-1">
        {selectedCar ? (
          <CarDetailPage car={selectedCar} onBack={handleBack} />
        ) : page === 'home' ? (
          <HomePage onNavigate={handleNavigate} onCarSelect={handleCarSelect} />
        ) : page === 'inventory' ? (
          <InventoryPage onCarSelect={handleCarSelect} />
        ) : (
          <ContactPage />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
