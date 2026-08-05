const SUPABASE_URL = "https://nmzwenbwgccwaokywthe.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tendlbmJ3Z2Njd2Fva3l3dGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDgwOTUsImV4cCI6MjEwMTQ4NDA5NX0.Q2a1fMkQpIm3niHsHvp8CmpVHHhRb1NVH5kszDFi48E";

async function testSelect() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
    }
  });
  const data = await res.json();
  console.log('SELECT Products Status:', res.status);
  console.log('Products Count:', data.length);
  console.log('Products Data:', JSON.stringify(data, null, 2));
}

testSelect();
