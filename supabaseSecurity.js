/* ==========================================================================
   HOTSPY ORGANICS - SUPABASE SECURITY & RLS ARCHITECTURE GUIDE
   ========================================================================== */

/**
 * 🔒 SECURITY ARCHITECTURE BEST PRACTICES:
 * 
 * 1. ANON KEY vs SERVICE ROLE KEY:
 *    - `SUPABASE_ANON_KEY`: Safe for Browser / Mobile App. Used with Row Level Security (RLS).
 *    - `SUPABASE_SERVICE_ROLE_KEY`: HIGHLY SENSITIVE SECRET. Never put in client code!
 *      Only use in server-side API endpoints or serverless edge functions.
 * 
 * 2. SQL ROW LEVEL SECURITY (RLS) POLICIES TO PASTE IN SUPABASE SQL EDITOR:
 * 
 * -- Enable RLS on Products Table
 * ALTER TABLE products ENABLE ROW LEVEL SECURITY;
 * 
 * -- Policy 1: Allow anyone (Public & Customers) to view/read active products
 * CREATE POLICY "Public can view products" 
 * ON products FOR SELECT 
 * USING (true);
 * 
 * -- Policy 2: Allow ONLY authenticated Admins to insert, update, or delete products
 * CREATE POLICY "Admins can manage products" 
 * ON products FOR ALL 
 * USING (auth.jwt() ->> 'role' = 'admin');
 * 
 * -- Enable RLS on Orders Table
 * ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
 * 
 * -- Policy 3: Customers can only view their OWN orders
 * CREATE POLICY "Users can view own orders" 
 * ON orders FOR SELECT 
 * USING (auth.uid() = customer_id);
 */

// Secure environment helper for Node server or serverless functions
class SupabaseSecurity {
  static getClientConfig() {
    return {
      // In production, these can be loaded from process.env or window.env
      url: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
      anonKey: process.env.SUPABASE_ANON_KEY || 'public-anon-key'
    };
  }

  static getServerAdminConfig() {
    // ONLY ACCESSIBLE ON SECURE SERVER / BACKEND
    if (typeof window !== 'undefined') {
      throw new Error('SECURITY ALERT: Attempted to access Service Role Key from client browser!');
    }
    return {
      url: process.env.SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
    };
  }
}

if (typeof module !== 'undefined') {
  module.exports = SupabaseSecurity;
}
