import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: err } = await supabase.from('inquiries').insert({
      car_id: null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    });

    setLoading(false);
    if (err) {
      setError('Произошла ошибка. Попробуйте ещё раз.');
    } else {
      setSuccess(true);
    }
  };

  const contacts = [
    { icon: Phone, label: 'Телефон', value: '+7 800 123-45-67', href: 'tel:+7800123456' },
    { icon: Mail, label: 'Email', value: 'info@autoprime.ru', href: 'mailto:info@autoprime.ru' },
    { icon: MapPin, label: 'Адрес', value: 'Москва, ул. Автомобильная, 1', href: '#' },
  ];

  const schedule = [
    { days: 'Понедельник — Пятница', hours: '9:00 — 20:00' },
    { days: 'Суббота', hours: '10:00 — 18:00' },
    { days: 'Воскресенье', hours: '10:00 — 17:00' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <span className="text-amber-600 text-sm font-semibold uppercase tracking-wider">Свяжитесь с нами</span>
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mt-2">Контакты</h1>
          <p className="text-zinc-500 mt-3 max-w-xl mx-auto">
            Оставьте заявку или свяжитесь с нами напрямую. Мы ответим в течение 15 минут в рабочее время.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm">
              <h2 className="font-bold text-zinc-900 text-xl mb-6">Наши контакты</h2>
              <div className="space-y-5">
                {contacts.map(c => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <c.icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs font-medium">{c.label}</p>
                      <p className="text-zinc-900 font-semibold">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-amber-500" />
                <h2 className="font-bold text-zinc-900 text-xl">Режим работы</h2>
              </div>
              <div className="space-y-3">
                {schedule.map(s => (
                  <div key={s.days} className="flex justify-between items-center py-2 border-b border-zinc-50 last:border-0">
                    <span className="text-zinc-600 text-sm">{s.days}</span>
                    <span className="font-semibold text-zinc-900 text-sm">{s.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-8 text-white">
              <h2 className="font-bold text-xl mb-2">Приехать к нам</h2>
              <p className="text-zinc-400 text-sm mb-4">Москва, ул. Автомобильная, 1</p>
              <div className="bg-zinc-800 rounded-xl h-36 flex items-center justify-center">
                <p className="text-zinc-500 text-sm">Карта</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm">
            {success ? (
              <div className="text-center py-10">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">Заявка отправлена!</h3>
                <p className="text-zinc-500">Наш менеджер свяжется с вами в ближайшее время.</p>
                <button
                  onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                  className="mt-6 text-amber-600 font-semibold text-sm"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-zinc-900 text-xl mb-6">Оставить заявку</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Имя *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Ваше имя"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Телефон</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 000 000-00-00"
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1.5">Сообщение *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Расскажите, какой автомобиль вас интересует..."
                      className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-zinc-900 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    {loading ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
