/*
  # Auto Dealership Schema

  1. New Tables
    - `cars`
      - `id` (uuid, primary key)
      - `make` (text) - Brand name (Toyota, BMW, etc.)
      - `model` (text) - Model name
      - `year` (integer)
      - `price` (numeric)
      - `mileage` (integer) - km
      - `fuel_type` (text) - petrol, diesel, electric, hybrid
      - `transmission` (text) - manual, automatic
      - `body_type` (text) - sedan, suv, coupe, etc.
      - `color` (text)
      - `engine` (text) - engine description
      - `power` (integer) - horsepower
      - `description` (text)
      - `image_url` (text)
      - `images` (text[]) - additional images
      - `status` (text) - available, sold, reserved
      - `featured` (boolean)
      - `created_at` (timestamptz)

    - `inquiries`
      - `id` (uuid, primary key)
      - `car_id` (uuid, FK to cars)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `message` (text)
      - `created_at` (timestamptz)

  2. Security
    - RLS enabled on both tables
    - Public read on cars (available only)
    - Public insert on inquiries
    - No public write on cars
*/

CREATE TABLE IF NOT EXISTS cars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price numeric NOT NULL,
  mileage integer DEFAULT 0,
  fuel_type text NOT NULL DEFAULT 'petrol',
  transmission text NOT NULL DEFAULT 'automatic',
  body_type text NOT NULL DEFAULT 'sedan',
  color text NOT NULL DEFAULT '',
  engine text NOT NULL DEFAULT '',
  power integer DEFAULT 0,
  description text DEFAULT '',
  image_url text DEFAULT '',
  images text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'available',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id uuid REFERENCES cars(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view available cars"
  ON cars FOR SELECT
  TO anon, authenticated
  USING (status = 'available');

CREATE POLICY "Public can submit inquiries"
  ON inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Seed data
INSERT INTO cars (make, model, year, price, mileage, fuel_type, transmission, body_type, color, engine, power, description, image_url, featured, status) VALUES
('BMW', 'X5', 2023, 8500000, 12000, 'petrol', 'automatic', 'suv', 'Черный', '3.0L Turbo', 340, 'Роскошный внедорожник BMW X5 в идеальном состоянии. Полный привод, панорамная крыша, кожаный салон, система навигации. Один владелец, полная сервисная история.', 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800', true, 'available'),
('Mercedes-Benz', 'E-Class', 2022, 6200000, 28000, 'petrol', 'automatic', 'sedan', 'Белый', '2.0L Turbo', 258, 'Представительский седан Mercedes-Benz E-Class. Комфортный и стильный автомобиль с богатой комплектацией. AMG-пакет, адаптивная подвеска, Burmester аудиосистема.', 'https://images.pexels.com/photos/1104768/pexels-photo-1104768.jpeg?auto=compress&cs=tinysrgb&w=800', true, 'available'),
('Audi', 'Q8', 2023, 9800000, 5000, 'diesel', 'automatic', 'suv', 'Серый', '3.0L TDI', 286, 'Флагманский кроссовер Audi Q8 с пробегом от нового. Quattro полный привод, виртуальная приборная панель, матричные фары, массаж сидений.', 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800', true, 'available'),
('Toyota', 'Land Cruiser', 2021, 7400000, 45000, 'diesel', 'automatic', 'suv', 'Белый', '4.5L V8 Diesel', 272, 'Легендарный Toyota Land Cruiser 300. Надежность и проходимость. Подходит для любых условий, богатая комплектация, 7 мест.', 'https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg?auto=compress&cs=tinysrgb&w=800', false, 'available'),
('Porsche', 'Cayenne', 2022, 11200000, 18000, 'petrol', 'automatic', 'suv', 'Синий', '3.0L Turbo', 340, 'Спортивный внедорожник Porsche Cayenne. Идеальное сочетание динамики и комфорта. Пневматическая подвеска, спортивный выхлоп, PDCC система.', 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800', true, 'available'),
('Tesla', 'Model S', 2023, 8900000, 8000, 'electric', 'automatic', 'sedan', 'Красный', 'Dual Motor Electric', 670, 'Tesla Model S Plaid - быстрейший серийный автомобиль. 0-100 км/ч за 2.1 сек. Автопилот, 560 км запаса хода, обновления по воздуху.', 'https://images.pexels.com/photos/13861/pexels-photo-13861.jpg?auto=compress&cs=tinysrgb&w=800', true, 'available'),
('Volkswagen', 'Tiguan', 2022, 3800000, 32000, 'petrol', 'automatic', 'suv', 'Серебристый', '2.0L TSI', 190, 'Семейный кроссовер Volkswagen Tiguan. Просторный салон, высокая надежность, экономичный двигатель. Идеален для города и загородных поездок.', 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800', false, 'available'),
('Hyundai', 'Tucson', 2023, 3200000, 5000, 'hybrid', 'automatic', 'suv', 'Зеленый', '1.6L Hybrid', 230, 'Новый Hyundai Tucson Hybrid. Современный дизайн, экономичный гибридный привод. Богатая комплектация, гарантия производителя.', 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800', false, 'available'),
('BMW', '5 Series', 2021, 5600000, 52000, 'diesel', 'automatic', 'sedan', 'Черный', '3.0L Diesel', 265, 'BMW 5 серии - бизнес-седан премиум класса. Динамичный и комфортный. Полный привод xDrive, адаптивный круиз-контроль, проекционный дисплей.', 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800', false, 'available'),
('Range Rover', 'Sport', 2022, 10500000, 22000, 'petrol', 'automatic', 'suv', 'Коричневый', '5.0L V8', 525, 'Range Rover Sport SVR - эксклюзивный спортивный внедорожник. V8 525 л.с., карбоновые вставки, массаж и вентиляция сидений, панорамная крыша.', 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800', true, 'available');
