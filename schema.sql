-- ==========================================================================
-- HOTSPY ORGANICS - SUPABASE DATABASE SCHEMA & RLS POLICIES
-- Paste this script into your Supabase Dashboard -> SQL Editor and click RUN
-- ==========================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    rating NUMERIC DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    image TEXT NOT NULL,
    badge TEXT,
    origin TEXT,
    batch_no TEXT,
    in_stock BOOLEAN DEFAULT true,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. FARM BATCHES TABLE
CREATE TABLE IF NOT EXISTS public.farm_batches (
    batch_no TEXT PRIMARY KEY,
    farmer_name TEXT NOT NULL,
    location TEXT NOT NULL,
    harvest_date TEXT NOT NULL,
    lab_result TEXT NOT NULL,
    soil_type TEXT,
    cert_no TEXT NOT NULL
);

-- 3. CUSTOMER ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    total_amount NUMERIC NOT NULL,
    items_count INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================================
-- INSERT INITIAL SEED DATA
-- ==========================================================================

INSERT INTO public.products (id, name, category, price, original_price, rating, reviews, image, badge, origin, batch_no, in_stock, description)
VALUES
('prod_1', 'Pure Lakadong Turmeric Powder', 'Spices', 349, 420, 4.9, 142, 'assets/turmeric.jpg', '100% Organic', 'Lucknow Organic Farm, UP', 'HS-LKO-2026', true, 'Hand-picked organic turmeric roots supercharged with 7.8% natural curcumin.'),
('prod_2', 'Himalayan Whole Leaf Green Tea', 'Tea', 499, 599, 4.8, 98, 'assets/greentea.jpg', 'Zero Pesticides', 'High Altitude Himalayan Gardens', 'HS-HIM-1044', true, 'First-flush unfermented whole green tea leaves rich in antioxidants.'),
('prod_3', 'Organic Stone-Ground Multigrain Atta', 'Flours', 299, 350, 4.9, 210, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80', 'Stone Ground', 'Tarai Fertile Plains', 'HS-TAR-3088', true, 'Traditional cold-pressed chaki flour combining organic wheat, chana, ragi, and bajra.'),
('prod_4', 'Wild Single-Origin Black Pepper', 'Spices', 399, 480, 5.0, 84, 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80', 'Direct Farm', 'Wayanad Forest Belt, Kerala', 'HS-KER-9901', true, 'Sun-cured bold black pepper corns harvested by indigenous farming co-ops in Kerala.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.farm_batches (batch_no, farmer_name, location, harvest_date, lab_result, soil_type, cert_no)
VALUES
('HS-LKO-2026', 'Rameshwar Farmer Cooperative', 'Lucknow Agri Belt, Uttar Pradesh', 'June 18, 2026', '100% Pure - Pesticide Residue 0.00%', 'Alluvial Organic Rich', 'NPOP/NAB/001492'),
('HS-HIM-1044', 'Devbhumi Herbal Organic Society', 'Kangra Valley, Himachal Pradesh', 'May 28, 2026', 'Grade A+ Antioxidant High', 'Mountain Terrace Virgin Soil', 'USDA-ORG-8821'),
('HS-KER-9901', 'Western Ghats Spice Growers', 'Wayanad High Ranges, Kerala', 'July 02, 2026', 'Piperine Content 6.4% Verified', 'Red Loam Rainfed', 'JAIVIK-BHARAT-9032')
ON CONFLICT (batch_no) DO NOTHING;

-- ==========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Read Batches" ON public.farm_batches FOR SELECT USING (true);
CREATE POLICY "Public Read Write Orders" ON public.orders FOR ALL USING (true);
