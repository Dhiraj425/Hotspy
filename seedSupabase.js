const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = "https://nmzwenbwgccwaokywthe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tendlbmJ3Z2Njd2Fva3l3dGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDgwOTUsImV4cCI6MjEwMTQ4NDA5NX0.Q2a1fMkQpIm3niHsHvp8CmpVHHhRb1NVH5kszDFi48E";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Pure Lakadong Turmeric Powder',
    category: 'Spices',
    price: 349,
    original_price: 420,
    rating: 4.9,
    reviews: 142,
    image: 'assets/turmeric.jpg',
    badge: '100% Organic',
    origin: 'Lucknow Organic Farm, UP',
    batch_no: 'HS-LKO-2026',
    in_stock: true,
    description: 'Hand-picked organic turmeric roots from our pesticide-free farms in Uttar Pradesh. Supercharged with 7.8% natural curcumin for maximum anti-inflammatory benefits.'
  },
  {
    id: 'prod_2',
    name: 'Himalayan Whole Leaf Green Tea',
    category: 'Tea',
    price: 499,
    original_price: 599,
    rating: 4.8,
    reviews: 98,
    image: 'assets/greentea.jpg',
    badge: 'Zero Pesticides',
    origin: 'High Altitude Himalayan Gardens',
    batch_no: 'HS-HIM-1044',
    in_stock: true,
    description: 'First-flush unfermented whole green tea leaves carefully sun-dried to preserve fresh natural aromas, polyphenols, and essential minerals.'
  },
  {
    id: 'prod_3',
    name: 'Organic Stone-Ground Multigrain Atta',
    category: 'Flours',
    price: 299,
    original_price: 350,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    badge: 'Stone Ground',
    origin: 'Tarai Fertile Plains',
    batch_no: 'HS-TAR-3088',
    in_stock: true,
    description: 'Traditional cold-pressed chaki flour combining organic wheat, roasted chana, ragi, and bajra for superior digestion and high dietary fiber.'
  },
  {
    id: 'prod_4',
    name: 'Wild Single-Origin Black Pepper',
    category: 'Spices',
    price: 399,
    original_price: 480,
    rating: 5.0,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    badge: 'Direct Farm',
    origin: 'Wayanad Forest Belt, Kerala',
    batch_no: 'HS-KER-9901',
    in_stock: true,
    description: 'Sun-cured bold black pepper corns harvested by indigenous farming co-ops in Kerala. Intense aroma with natural essential oils.'
  }
];

const FARM_BATCHES = [
  {
    batch_no: 'HS-LKO-2026',
    farmer_name: 'Rameshwar Farmer Cooperative',
    location: 'Lucknow Agri Belt, Uttar Pradesh',
    harvest_date: 'June 18, 2026',
    lab_result: '100% Pure - Pesticide Residue 0.00%',
    soil_type: 'Alluvial Organic Rich',
    cert_no: 'NPOP/NAB/001492'
  },
  {
    batch_no: 'HS-HIM-1044',
    farmer_name: 'Devbhumi Herbal Organic Society',
    location: 'Kangra Valley, Himachal Pradesh',
    harvest_date: 'May 28, 2026',
    lab_result: 'Grade A+ Antioxidant High',
    soil_type: 'Mountain Terrace Virgin Soil',
    cert_no: 'USDA-ORG-8821'
  },
  {
    batch_no: 'HS-KER-9901',
    farmer_name: 'Western Ghats Spice Growers',
    location: 'Wayanad High Ranges, Kerala',
    harvest_date: 'July 02, 2026',
    lab_result: 'Piperine Content 6.4% Verified',
    soil_type: 'Red Loam Rainfed',
    cert_no: 'JAIVIK-BHARAT-9032'
  }
];

async function seedData() {
  console.log('Seeding products table...');
  const { data: pData, error: pErr } = await supabase.from('products').upsert(PRODUCTS);
  if (pErr) console.error('Products seed result:', pErr.message);
  else console.log('Products seeded successfully!');

  console.log('Seeding farm_batches table...');
  const { data: bData, error: bErr } = await supabase.from('farm_batches').upsert(FARM_BATCHES);
  if (bErr) console.error('Farm batches seed result:', bErr.message);
  else console.log('Farm batches seeded successfully!');
}

seedData();
