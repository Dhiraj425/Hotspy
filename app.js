/* ==========================================================================
   BIGBASKET E-COMMERCE SUPERMARKET - CORE JAVASCRIPT APPLICATION ENGINE
   Supabase Instance: https://sbqmpnyzocgqdgjkjeta.supabase.co
   ========================================================================== */

const SUPABASE_URL = (typeof window !== 'undefined' && window.SUPABASE_URL) 
  ? window.SUPABASE_URL 
  : (typeof window !== 'undefined' && window.ENV && window.ENV.SUPABASE_URL ? window.ENV.SUPABASE_URL : "https://sbqmpnyzocgqdgjkjeta.supabase.co");

const SUPABASE_ANON_KEY = (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY) 
  ? window.SUPABASE_ANON_KEY 
  : (typeof window !== 'undefined' && window.ENV && window.ENV.SUPABASE_ANON_KEY ? window.ENV.SUPABASE_ANON_KEY : "https://sbqmpnyzocgqdgjkjeta.supabase.co");

// Default Supermarket Catalog Data
const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Pure Organic Lakadong Turmeric Powder',
    category: 'Spices',
    brand: 'HOTSPY ORGANICS',
    price: 249,
    originalPrice: 320,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
    badge: '22% OFF',
    origin: 'Lucknow Farm',
    batchNo: 'HS-LKO-2026',
    inStock: true,
    desc: 'High curcumin (7.5%+) organic Lakadong turmeric powder. Cold-processed to lock in essential oils.'
  },
  {
    id: 'prod_2',
    name: 'Single-Origin Malabar Black Pepper Whole',
    category: 'Spices',
    brand: 'HOTSPY ORGANICS',
    price: 349,
    originalPrice: 450,
    rating: 4.9,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=60',
    badge: '22% OFF',
    origin: 'Kerala Highlands',
    batchNo: 'HS-KRL-2026',
    inStock: true,
    desc: 'Bold TGSEB grade sun-dried black peppercorns with intense aroma and sharp heat.'
  },
  {
    id: 'prod_3',
    name: 'Himalayan Whole Leaf First Flush Green Tea',
    category: 'Teas',
    brand: 'HOTSPY TEAS',
    price: 399,
    originalPrice: 499,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60',
    badge: '20% OFF',
    origin: 'Himalayan Foothills',
    batchNo: 'HS-HIM-2026',
    inStock: true,
    desc: '100% Whole leaf loose green tea packed with antioxidants and delicate floral notes.'
  },
  {
    id: 'prod_4',
    name: 'Cold-Pressed Organic Mustard Oil (Kachi Ghani)',
    category: 'Oils & Grains',
    brand: 'HOTSPY STAPLES',
    price: 199,
    originalPrice: 260,
    rating: 4.9,
    reviews: 410,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&auto=format&fit=crop&q=60',
    badge: '23% OFF',
    origin: 'Lucknow Co-op',
    batchNo: 'HS-OIL-2026',
    inStock: true,
    desc: 'Traditional wood-pressed pungent mustard oil. 100% natural, unrefined, zero chemicals.'
  },
  {
    id: 'prod_5',
    name: 'Farm Fresh Organic Royal Green Cardamom (8mm+)',
    category: 'Spices',
    brand: 'HOTSPY ORGANICS',
    price: 499,
    originalPrice: 650,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&auto=format&fit=crop&q=60',
    badge: '23% OFF',
    origin: 'Idukki Kerala',
    batchNo: 'HS-CARD-2026',
    inStock: true,
    desc: 'Extra large 8mm+ pods with intense aromatic oil content. Handpicked from forest farms.'
  },
  {
    id: 'prod_6',
    name: 'Roasted Organic Flax Seeds & Chia Munch',
    category: 'Snacks',
    brand: 'HOTSPY BITES',
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    badge: '25% OFF',
    origin: 'Lucknow Belt',
    batchNo: 'HS-SNK-2026',
    inStock: true,
    desc: 'Crunchy lightly salted superfood mix packed with Omega-3 and dietary fiber.'
  }
];

const INITIAL_RECIPES = [
  {
    id: 'rec_1',
    title: '🌿 Golden Immunity Boost Pack',
    tag: 'Best Seller Combo',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
    description: 'Lakadong Turmeric Powder (250g) + Malabar Black Pepper Whole (100g) for maximum curcumin absorption!',
    productIds: ['prod_1', 'prod_2'],
    comboPrice: 499,
    displayLocation: 'dedicated_page'
  }
];

const BATCH_DATABASE = {
  'HS-LKO-2026': {
    farmer: 'Rameshwar Farmers Co-op (Lucknow)',
    location: 'Gomti Valley Organic Zone, UP',
    harvestDate: 'June 18, 2026',
    labResult: '100% Pure - Pesticide Residue 0.00%',
    soilType: 'Alluvial Organic Soil',
    certNo: 'NPOP/NAB/001492'
  }
};

// Main App Engine Class
class AppEngine {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('hotspy_products')) || INITIAL_PRODUCTS;
    this.recipes = JSON.parse(localStorage.getItem('hotspy_recipes')) || INITIAL_RECIPES;
    this.batchDatabase = JSON.parse(localStorage.getItem('hotspy_batch_database')) || BATCH_DATABASE;
    this.cart = JSON.parse(localStorage.getItem('hotspy_cart')) || [];
    this.wishlist = JSON.parse(localStorage.getItem('hotspy_wishlist')) || [];
    this.orders = JSON.parse(localStorage.getItem('hotspy_orders')) || [];
    this.userProfiles = JSON.parse(localStorage.getItem('hotspy_user_profiles')) || [
      { mobile: '9876543210', name: 'Aarav Sharma', password: 'password123', avatar: 'assets/turmeric.jpg', created_at: '2026-08-01' }
    ];
    this.userAddresses = JSON.parse(localStorage.getItem('hotspy_user_addresses')) || [
      { id: 'addr_1', user_mobile: '9876543210', full_name: 'Aarav Sharma', mobile: '9876543210', house_no: 'Flat 402, Royal Residency', street: 'Gomti Nagar Main Road', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010', address_type: 'Home', is_default: true }
    ];

    this.user = JSON.parse(sessionStorage.getItem('hotspy_auth_session')) || null;
    this.selectedCategory = 'All';
    this.searchQuery = '';

    // Initialize Supabase Client
    try {
      this.supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
    } catch(e) {
      this.supabase = null;
    }

    this.init();
  }

  async init() {
    this.renderProducts();
    this.updateCartUI();
    this.updateWishlistCount();
    this.updateAuthStatusUI();
    this.renderDedicatedCombos();
    
    // Attempt Supabase cloud fetches
    await this.fetchProductsFromSupabase();
    await this.fetchUserProfilesFromSupabase();
    await this.fetchUserAddressesFromSupabase();
    await this.fetchOrdersFromSupabase();
  }

  // --- CATALOG & SEARCH RENDERER ---
  renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let filtered = this.products;
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || (p.brand && p.brand.toLowerCase().includes(q)));
    }

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted); font-weight:700;">No products found matching your search. Try "Turmeric" or "Pepper"!</div>`;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const isWish = this.wishlist.includes(p.id);
      const cartItem = this.cart.find(c => c.id === p.id);
      const qtyInCart = cartItem ? cartItem.quantity : 0;

      return `
        <div class="product-card">
          <span class="discount-badge">${p.badge}</span>
          <button class="wishlist-heart-btn ${isWish ? 'active' : ''}" onclick="app.toggleWishlist('${p.id}')">
            <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
          </button>

          <div class="card-img-wrap" onclick="app.openQuickView('${p.id}')">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
          </div>

          <div class="card-brand">${p.brand || 'HOTSPY'}</div>
          <h3 class="card-title" onclick="app.openQuickView('${p.id}')">${p.name}</h3>

          <select class="pack-size-selector">
            <option value="250g">250 g - ₹${p.price}</option>
            <option value="500g">500 g - ₹${Math.round(p.price * 1.85)}</option>
            <option value="1kg">1 kg - ₹${Math.round(p.price * 3.5)}</option>
          </select>

          <div class="card-price-row">
            <span class="current-price">₹${p.price}</span>
            <span class="mrp-price">₹${p.originalPrice}</span>
          </div>

          <div class="card-action-btn-wrap">
            ${qtyInCart > 0 ? `
              <div class="quantity-stepper">
                <button class="stepper-btn" onclick="app.updateCartQty('${p.id}', -1)">-</button>
                <span class="stepper-val">${qtyInCart}</span>
                <button class="stepper-btn" onclick="app.updateCartQty('${p.id}', 1)">+</button>
              </div>
            ` : `
              <button class="add-btn" onclick="app.addToCart('${p.id}')">
                <i class="fa-solid fa-cart-plus"></i> ADD
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  filterCategory(cat) {
    this.selectedCategory = cat;
    document.querySelectorAll('.category-quick-card').forEach(card => {
      card.classList.toggle('active', card.textContent.trim().includes(cat));
    });
    this.renderProducts();
  }

  handleSearchInput(e) {
    this.searchQuery = e.target.value;
    this.renderProducts();
  }

  executeSearch() {
    this.renderProducts();
    window.location.href = '#store';
  }

  // --- CART & STEPPER CONTROLLER ---
  addToCart(productId, quantity = 1) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    const existing = this.cart.find(c => c.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        originalPrice: prod.originalPrice,
        image: prod.image,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`Added "${prod.name}" to your basket!`);
  }

  updateCartQty(productId, delta) {
    const item = this.cart.find(c => c.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(c => c.id !== productId);
    }

    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('hotspy_cart', JSON.stringify(this.cart));
    this.updateCartUI();
    this.renderProducts();
  }

  updateCartUI() {
    const badge = document.getElementById('cartBadge');
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    if (badge) badge.textContent = totalItems;

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotalEl = document.getElementById('cartSubtotal');
    const grandTotalEl = document.getElementById('cartGrandTotal');
    if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
    if (grandTotalEl) grandTotalEl.textContent = `₹${subtotal}`;

    // Free Shipping Progress Bar
    const bar = document.getElementById('freeShippingBar');
    if (bar) {
      const target = 999;
      const remaining = Math.max(0, target - subtotal);
      const pct = Math.min(100, Math.round((subtotal / target) * 100));

      bar.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span>${remaining > 0 ? `Add <strong>₹${remaining}</strong> more for <strong>FREE Express Delivery</strong>` : `🎉 <strong>Congratulations! FREE Express Delivery Unlocked!</strong>`}</span>
          <span style="font-weight:800;">${pct}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${pct}%;"></div>
        </div>
      `;
    }

    // Render Drawer Items
    const itemsBody = document.getElementById('cartDrawerItems');
    if (itemsBody) {
      if (this.cart.length === 0) {
        itemsBody.innerHTML = `<div style="text-align:center; padding:3rem 1rem; color:var(--text-muted); font-weight:700;">Your basket is empty. Browse supermarket staples to add items!</div>`;
      } else {
        itemsBody.innerHTML = this.cart.map(item => `
          <div class="cart-item-card">
            <img src="${item.image}">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">₹${item.price}</div>
              <div style="margin-top:0.4rem; display:flex; align-items:center; gap:0.5rem;">
                <div class="quantity-stepper" style="padding:0.15rem 0.4rem;">
                  <button class="stepper-btn" onclick="app.updateCartQty('${item.id}', -1)" style="width:22px; height:22px;">-</button>
                  <span class="stepper-val" style="font-size:0.85rem; padding:0 0.4rem;">${item.quantity}</span>
                  <button class="stepper-btn" onclick="app.updateCartQty('${item.id}', 1)" style="width:22px; height:22px;">+</button>
                </div>
                <button onclick="app.updateCartQty('${item.id}', -${item.quantity})" style="color:#EF4444; font-size:0.78rem; font-weight:700; cursor:pointer;">Remove</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  // --- WISHLIST ---
  toggleWishlist(productId) {
    if (this.wishlist.includes(productId)) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
      this.showToast('Removed item from your wishlist');
    } else {
      this.wishlist.push(productId);
      this.showToast('Added item to your wishlist ❤️');
    }
    localStorage.setItem('hotspy_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistCount();
    this.renderProducts();
  }

  updateWishlistCount() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) badge.textContent = this.wishlist.length;
  }

  // --- AUTH & USER PROFILE ---
  openAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.classList.add('open');
      this.switchAuthTab(type);
    }
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('open');
  }

  switchAuthTab(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabLogin = document.getElementById('authTabLogin');
    const tabSignup = document.getElementById('authTabSignup');

    if (type === 'login') {
      if (loginForm) loginForm.style.display = 'block';
      if (signupForm) signupForm.style.display = 'none';
      if (tabLogin) tabLogin.classList.add('active');
      if (tabSignup) tabSignup.classList.remove('active');
    } else {
      if (loginForm) loginForm.style.display = 'none';
      if (signupForm) signupForm.style.display = 'block';
      if (tabLogin) tabLogin.classList.remove('active');
      if (tabSignup) tabSignup.classList.add('active');
    }
  }

  async handleSignup() {
    const name = document.getElementById('signupName').value.trim();
    const mobile = document.getElementById('signupMobile').value.trim();
    const password = document.getElementById('signupPassword').value;

    if (!name || !mobile || !password) {
      this.showToast('Please fill all required fields!', 'error');
      return;
    }

    const newUser = { mobile, name, password, avatar: 'assets/turmeric.jpg', created_at: new Date().toISOString() };
    this.userProfiles.push(newUser);
    this.user = newUser;

    sessionStorage.setItem('hotspy_auth_session', JSON.stringify(newUser));
    localStorage.setItem('hotspy_user_profiles', JSON.stringify(this.userProfiles));

    this.closeAuthModal();
    this.updateAuthStatusUI();
    this.showToast(`Welcome ${name}! Your account is created.`);
    this.openCustomerProfilePage('addresses');

    if (this.supabase) {
      try {
        await this.supabase.from('customer_profiles').upsert({ mobile, name, password, avatar: 'assets/turmeric.jpg' });
      } catch(e) {}
    }
  }

  async handleLogin() {
    const mobile = document.getElementById('loginMobile').value.trim();
    const password = document.getElementById('loginPassword').value;

    let user = this.userProfiles.find(u => u.mobile === mobile);
    if (!user || user.password !== password) {
      this.showToast('Invalid Mobile Number or Password. Please try again.', 'error');
      return;
    }

    this.user = user;
    sessionStorage.setItem('hotspy_auth_session', JSON.stringify(user));

    this.closeAuthModal();
    this.updateAuthStatusUI();
    this.showToast(`Welcome back, ${user.name}!`);
    this.openCustomerProfilePage('addresses');
  }

  quickDemoLogin(role) {
    if (role === 'admin') {
      this.toggleAdminMode();
    } else {
      const demoUser = { mobile: '9876543210', name: 'Aarav Sharma', password: 'password123', avatar: 'assets/turmeric.jpg' };
      this.user = demoUser;
      sessionStorage.setItem('hotspy_auth_session', JSON.stringify(demoUser));
      this.closeAuthModal();
      this.updateAuthStatusUI();
      this.showToast('Logged in as Demo Customer (Aarav Sharma)!');
      this.openCustomerProfilePage('addresses');
    }
  }

  openProfileMenuModal() {
    const modal = document.getElementById('profileMenuModal');
    const headerBox = document.getElementById('profileMenuHeaderBox');
    const footerBox = document.getElementById('profileMenuFooterBox');

    if (headerBox) {
      if (this.user) {
        headerBox.innerHTML = `
          <img src="${this.user.avatar || 'assets/turmeric.jpg'}" style="width:48px; height:48px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-mint); flex-shrink:0;">
          <div style="flex:1;">
            <div style="font-weight:800; font-size:1.05rem; cursor:pointer; color:white;" onclick="app.openCustomerProfilePage('addresses'); app.closeProfileMenuModal();">
              ${this.user.name} <i class="fa-solid fa-chevron-right" style="font-size:0.75rem; color:var(--primary-mint);"></i>
            </div>
            <div style="font-size:0.78rem; opacity:0.85;">📞 +91 ${this.user.mobile}</div>
            <button onclick="app.openCustomerProfilePage('addresses'); app.closeProfileMenuModal();" style="background:var(--primary); color:white; border:none; padding:0.25rem 0.65rem; border-radius:var(--radius-sm); font-size:0.72rem; font-weight:800; margin-top:0.35rem; cursor:pointer;">
              <i class="fa-solid fa-id-card"></i> View Full Profile Page
            </button>
          </div>
        `;
      } else {
        headerBox.innerHTML = `
          <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; font-size:1.3rem; flex-shrink:0;">
            <i class="fa-solid fa-user"></i>
          </div>
          <div style="flex:1;">
            <div style="font-weight:800; font-size:1.05rem; color:white;">Guest Customer</div>
            <div style="font-size:0.78rem; opacity:0.85;">Login to access saved addresses & orders</div>
            <button onclick="app.openAuthModal('login'); app.closeProfileMenuModal();" style="background:var(--primary); color:white; border:none; padding:0.35rem 0.75rem; border-radius:var(--radius-sm); font-size:0.75rem; font-weight:800; margin-top:0.35rem; cursor:pointer;">
              <i class="fa-solid fa-right-to-bracket"></i> Login / Register
            </button>
          </div>
        `;
      }
    }

    if (footerBox) {
      if (this.user) {
        footerBox.innerHTML = `
          <button onclick="app.openLogoutConfirmModal();" style="width:100%; padding:0.5rem; background:#FEE2E2; color:#DC2626; border:none; border-radius:var(--radius-sm); font-weight:700; font-size:0.8rem; cursor:pointer;">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout Account
          </button>
        `;
      } else {
        footerBox.innerHTML = ``;
      }
    }

    if (modal) modal.classList.add('open');
  }

  closeProfileMenuModal() {
    const modal = document.getElementById('profileMenuModal');
    if (modal) modal.classList.remove('open');
  }

  openLogoutConfirmModal() {
    const modal = document.getElementById('logoutConfirmModal');
    if (modal) modal.classList.add('open');
  }

  closeLogoutConfirmModal() {
    const modal = document.getElementById('logoutConfirmModal');
    if (modal) modal.classList.remove('open');
  }

  confirmLogoutUser() {
    this.user = null;
    sessionStorage.removeItem('hotspy_auth_session');
    this.closeLogoutConfirmModal();
    this.closeProfileMenuModal();
    this.updateAuthStatusUI();
    this.showHomePage();
    this.showToast('Logged out successfully.');
  }

  updateAuthStatusUI() {
    const userBtn = document.getElementById('userAuthBtn');
    if (!userBtn) return;

    if (this.user) {
      userBtn.title = `Profile Menu (${this.user.name})`;
      userBtn.innerHTML = `<i class="fa-solid fa-circle-user" style="color:var(--primary);"></i>`;
    } else {
      userBtn.title = 'Account & Store Menu';
      userBtn.innerHTML = `<i class="fa-regular fa-user"></i>`;
    }
    userBtn.onclick = () => this.openProfileMenuModal();
  }

  // --- CUSTOMER PROFILE DASHBOARD & ADDRESSES ---
  openCustomerProfilePage(tab = 'addresses') {
    if (!this.user) {
      this.openAuthModal('login');
      return;
    }

    const homeContent = document.getElementById('homePageContent');
    const comboPageView = document.getElementById('dedicatedCombosPageView');
    const profilePageView = document.getElementById('customerProfilePageView');
    const invoicePageView = document.getElementById('orderInvoicePageView');

    if (homeContent) homeContent.style.display = 'none';
    if (comboPageView) comboPageView.style.display = 'none';
    if (invoicePageView) invoicePageView.style.display = 'none';
    if (profilePageView) profilePageView.style.display = 'block';

    const avatar = document.getElementById('profileAvatarImg');
    const nameEl = document.getElementById('profileNameDisplay');
    const mobileEl = document.getElementById('profileMobileDisplay');
    const ordersCount = document.getElementById('profileOrdersCount');
    const wishlistCount = document.getElementById('profileWishlistCount');

    if (avatar) avatar.src = this.user.avatar || 'assets/turmeric.jpg';
    if (nameEl) nameEl.textContent = this.user.name;
    if (mobileEl) mobileEl.textContent = `📞 +91 ${this.user.mobile}`;

    const myOrders = this.orders.filter(o => o.customer_mobile === this.user.mobile);
    if (ordersCount) ordersCount.textContent = myOrders.length;
    if (wishlistCount) wishlistCount.textContent = this.wishlist.length;

    this.switchProfileTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchProfileTab(tabName) {
    const secAddr = document.getElementById('profileSectionAddresses');
    const secOrders = document.getElementById('profileSectionOrders');
    const btnAddr = document.getElementById('profileTabAddrBtn');
    const btnOrders = document.getElementById('profileTabOrdersBtn');

    if (tabName === 'addresses') {
      if (secAddr) secAddr.style.display = 'block';
      if (secOrders) secOrders.style.display = 'none';
      if (btnAddr) btnAddr.classList.add('active');
      if (btnOrders) btnOrders.classList.remove('active');
      this.renderProfileAddresses();
    } else {
      if (secAddr) secAddr.style.display = 'none';
      if (secOrders) secOrders.style.display = 'block';
      if (btnAddr) btnAddr.classList.remove('active');
      if (btnOrders) btnOrders.classList.add('active');
      this.renderProfileOrders();
    }
  }

  renderProfileAddresses() {
    const grid = document.getElementById('profileAddressesGrid');
    if (!grid || !this.user) return;

    const userAddrs = this.userAddresses.filter(a => a.user_mobile === this.user.mobile);

    if (userAddrs.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-muted); background:var(--bg-warm); border-radius:var(--radius-md);">No saved delivery addresses. Click "+ Add New Delivery Address" to add your address!</div>`;
      return;
    }

    grid.innerHTML = userAddrs.map(a => `
      <div style="background:white; border:${a.is_default ? '2px solid var(--primary)' : '1px solid var(--border-light)'}; padding:1.25rem; border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <span style="background:var(--primary-light); color:var(--primary-deep); font-size:0.75rem; font-weight:800; padding:0.2rem 0.5rem; border-radius:4px;">${a.address_type || 'Home'}</span>
          ${a.is_default ? '<span style="color:var(--primary); font-size:0.75rem; font-weight:800;">✓ Default Address</span>' : ''}
        </div>
        <strong style="color:var(--primary-deep);">${a.full_name}</strong>
        <div style="font-size:0.85rem; color:var(--text-main); margin:0.35rem 0;">${a.house_no}, ${a.street}<br>${a.city}, ${a.state} - <strong>${a.pincode}</strong></div>
        <div style="font-size:0.8rem; color:var(--text-muted); font-weight:700;">📞 Mobile: +91 ${a.mobile}</div>
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding-top:0.5rem; border-top:1px solid var(--border-subtle);">
          <label style="font-size:0.8rem; font-weight:700; cursor:pointer;">
            <input type="radio" name="defaultAddrRadio" ${a.is_default ? 'checked' : ''} onchange="app.setDefaultAddress('${a.id}')"> Default Address
          </label>
          <button onclick="app.deleteAddress('${a.id}')" style="color:#EF4444; font-size:0.8rem; font-weight:700;">Delete</button>
        </div>
      </div>
    `).join('');
  }

  openAddAddressModal() {
    if (!this.user) return;
    document.getElementById('amAddrId').value = '';
    document.getElementById('amFullName').value = this.user.name;
    document.getElementById('amMobile').value = this.user.mobile;
    document.getElementById('amHouseNo').value = '';
    document.getElementById('amStreet').value = '';
    document.getElementById('amIsDefault').checked = true;

    const modal = document.getElementById('addressModal');
    if (modal) modal.classList.add('open');
  }

  closeAddressModal() {
    const modal = document.getElementById('addressModal');
    if (modal) modal.classList.remove('open');
  }

  async saveAddressFromForm() {
    if (!this.user) return;

    const fullName = document.getElementById('amFullName').value.trim();
    const mobile = document.getElementById('amMobile').value.trim();
    const houseNo = document.getElementById('amHouseNo').value.trim();
    const street = document.getElementById('amStreet').value.trim();
    const city = document.getElementById('amCity').value.trim();
    const state = document.getElementById('amState').value.trim();
    const pincode = document.getElementById('amPincode').value.trim();
    const isDefault = document.getElementById('amIsDefault').checked;

    if (isDefault) {
      this.userAddresses.forEach(a => {
        if (a.user_mobile === this.user.mobile) a.is_default = false;
      });
    }

    const newAddr = {
      id: `addr_${Date.now()}`,
      user_mobile: this.user.mobile,
      full_name: fullName,
      mobile: mobile,
      house_no: houseNo,
      street: street,
      city: city,
      state: state,
      pincode: pincode,
      address_type: 'Home',
      is_default: isDefault
    };

    this.userAddresses.push(newAddr);
    localStorage.setItem('hotspy_user_addresses', JSON.stringify(this.userAddresses));

    this.closeAddressModal();
    this.renderProfileAddresses();
    this.showToast('Delivery address saved!');

    if (this.supabase) {
      try {
        await this.supabase.from('customer_addresses').upsert(newAddr);
      } catch(e) {}
    }
  }

  setDefaultAddress(addrId) {
    if (!this.user) return;
    this.userAddresses.forEach(a => {
      if (a.user_mobile === this.user.mobile) a.is_default = (a.id === addrId);
    });
    localStorage.setItem('hotspy_user_addresses', JSON.stringify(this.userAddresses));
    this.renderProfileAddresses();
    this.showToast('Default delivery address updated!');
  }

  deleteAddress(addrId) {
    this.userAddresses = this.userAddresses.filter(a => a.id !== addrId);
    localStorage.setItem('hotspy_user_addresses', JSON.stringify(this.userAddresses));
    this.renderProfileAddresses();
    this.showToast('Deleted address.');
  }

  // --- CHECKOUT & ORDER INVOICE ---
  async checkout() {
    if (this.cart.length === 0) {
      this.showToast('Your basket is empty!', 'error');
      return;
    }

    if (!this.user) {
      this.openAuthModal('login');
      this.showToast('Please login with your mobile number to complete your order!', 'error');
      return;
    }

    const defaultAddr = this.userAddresses.find(a => a.user_mobile === this.user.mobile && a.is_default) || 
                        this.userAddresses.find(a => a.user_mobile === this.user.mobile) || {
                          full_name: this.user.name,
                          mobile: this.user.mobile,
                          house_no: 'Flat 402, Royal Residency',
                          street: 'Gomti Nagar Main Road',
                          city: 'Lucknow',
                          state: 'Uttar Pradesh',
                          pincode: '226010'
                        };

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_mobile: this.user.mobile,
      customer_name: this.user.name,
      items: JSON.stringify(this.cart),
      shipping_address: JSON.stringify(defaultAddr),
      subtotal: subtotal,
      total_amount: subtotal,
      payment_method: 'COD (Cash on Delivery)',
      status: 'Processing',
      date: new Date().toISOString().split('T')[0]
    };

    this.orders.unshift(newOrder);
    localStorage.setItem('hotspy_orders', JSON.stringify(this.orders));

    if (this.supabase) {
      try {
        await this.supabase.from('orders').insert({
          id: newOrder.id,
          customer_mobile: newOrder.customer_mobile,
          customer_name: newOrder.customer_name,
          items: newOrder.items,
          shipping_address: newOrder.shipping_address,
          subtotal: newOrder.subtotal,
          total_amount: newOrder.total_amount,
          payment_method: newOrder.payment_method,
          status: newOrder.status
        });
      } catch(e) {}
    }

    this.cart = [];
    this.saveCart();
    this.closeCartDrawer();
    this.showToast(`🎉 Order Placed! Order ID: ${newOrder.id}`);
    this.openOrderInvoicePage(newOrder.id);
  }

  openOrderInvoicePage(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    const homeContent = document.getElementById('homePageContent');
    const comboPageView = document.getElementById('dedicatedCombosPageView');
    const profilePageView = document.getElementById('customerProfilePageView');
    const invoicePageView = document.getElementById('orderInvoicePageView');
    const printableBox = document.getElementById('printableOrderInvoice');

    if (homeContent) homeContent.style.display = 'none';
    if (comboPageView) comboPageView.style.display = 'none';
    if (profilePageView) profilePageView.style.display = 'none';
    if (invoicePageView) invoicePageView.style.display = 'block';

    let items = [];
    try { items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items; } catch(e) {}

    let addr = {};
    try { addr = typeof order.shipping_address === 'string' ? JSON.parse(order.shipping_address) : order.shipping_address; } catch(e) {}

    if (printableBox) {
      printableBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:2px solid var(--primary);">
          <div>
            <h1 style="font-size:1.8rem; color:var(--primary-deep); margin:0;">BIGBASKET ORGANICS</h1>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">
              A TATA Enterprise • Online Supermarket & Organic Groceries<br>
              Support: care@bigbasket.com | +91 9876543210
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.3rem; font-weight:800; color:var(--primary-deep);">TAX INVOICE</div>
            <div style="font-size:0.85rem; font-weight:700; margin-top:0.25rem;">Invoice #: INV-${order.id}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Date: ${order.date || 'Today'}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-bottom:2rem; background:var(--bg-warm); padding:1.25rem; border-radius:var(--radius-md);">
          <div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--primary); text-transform:uppercase;">Customer Details:</div>
            <strong style="font-size:1rem; color:var(--primary-deep);">${order.customer_name}</strong><br>
            <span style="font-size:0.85rem; font-weight:700;">📞 Mobile: +91 ${order.customer_mobile}</span>
          </div>

          <div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--primary); text-transform:uppercase;">Delivery Address:</div>
            <div style="font-size:0.85rem; line-height:1.4;">
              ${addr.house_no ? `${addr.house_no}, ${addr.street}<br>${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>` : 'Lucknow, Uttar Pradesh - 226010'}
            </div>
          </div>
        </div>

        <table style="width:100%; border-collapse:collapse; margin-bottom:2rem;">
          <thead>
            <tr style="background:var(--primary-deep); color:white;">
              <th style="padding:0.75rem; text-align:left; font-size:0.8rem;">Item Details</th>
              <th style="padding:0.75rem; text-align:center; font-size:0.8rem;">Qty</th>
              <th style="padding:0.75rem; text-align:right; font-size:0.8rem;">Price</th>
              <th style="padding:0.75rem; text-align:right; font-size:0.8rem;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(items || []).map(item => `
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:0.75rem; display:flex; align-items:center; gap:0.65rem;">
                  <img src="${item.image}" style="width:36px; height:36px; border-radius:4px; object-fit:cover;">
                  <strong style="font-size:0.85rem; color:var(--primary-deep);">${item.name}</strong>
                </td>
                <td style="padding:0.75rem; text-align:center; font-weight:700;">${item.quantity}</td>
                <td style="padding:0.75rem; text-align:right;">₹${item.price}</td>
                <td style="padding:0.75rem; text-align:right; font-weight:800; color:var(--primary-deep);">₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display:flex; justify-content:flex-end;">
          <div style="width:260px; background:var(--bg-warm); padding:1rem; border-radius:var(--radius-sm);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
              <span>Subtotal</span>
              <strong>₹${order.total_amount}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
              <span>Delivery Fee</span>
              <strong style="color:var(--primary);">FREE</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding-top:0.65rem; border-top:2px solid var(--border-light); font-size:1.15rem; font-weight:800; color:var(--primary-deep);">
              <span>Grand Total</span>
              <span>₹${order.total_amount}</span>
            </div>
          </div>
        </div>
      `;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- DEDICATED COMBOS & RECIPES PAGE ---
  openComboPage() {
    const homeContent = document.getElementById('homePageContent');
    const comboPageView = document.getElementById('dedicatedCombosPageView');
    const profilePageView = document.getElementById('customerProfilePageView');
    const invoicePageView = document.getElementById('orderInvoicePageView');

    if (homeContent) homeContent.style.display = 'none';
    if (profilePageView) profilePageView.style.display = 'none';
    if (invoicePageView) invoicePageView.style.display = 'none';
    if (comboPageView) comboPageView.style.display = 'block';

    this.renderDedicatedCombos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderDedicatedCombos() {
    const grid = document.getElementById('dedicatedCombosGrid');
    if (!grid) return;

    grid.innerHTML = this.recipes.map(r => `
      <div class="product-card">
        <span class="discount-badge" style="background:var(--accent-gold); color:var(--primary-dark); font-weight:800;">SAVE ₹170</span>
        <div class="card-img-wrap">
          <img src="${r.image}">
        </div>
        <h3 class="card-title">${r.title}</h3>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:0.85rem;">${r.description}</p>
        
        <div class="card-price-row">
          <span class="current-price">₹${r.comboPrice}</span>
          <span class="mrp-price">₹669</span>
        </div>

        <button class="btn-primary" style="width:100%;" onclick="app.addComboToCart('${r.id}')">
          <i class="fa-solid fa-cart-plus"></i> Add Combo to Basket
        </button>
      </div>
    `).join('');
  }

  addComboToCart(recipeId) {
    const r = this.recipes.find(rec => rec.id === recipeId);
    if (!r) return;

    this.cart.push({
      id: r.id,
      name: r.title,
      price: r.comboPrice,
      originalPrice: 669,
      image: r.image,
      quantity: 1
    });

    this.saveCart();
    this.showToast(`Added "${r.title}" combo bundle to your basket!`);
    this.openCartDrawer();
  }

  showHomePage() {
    const homeContent = document.getElementById('homePageContent');
    const comboPageView = document.getElementById('dedicatedCombosPageView');
    const profilePageView = document.getElementById('customerProfilePageView');
    const invoicePageView = document.getElementById('orderInvoicePageView');

    if (homeContent) homeContent.style.display = 'block';
    if (comboPageView) comboPageView.style.display = 'none';
    if (profilePageView) profilePageView.style.display = 'none';
    if (invoicePageView) invoicePageView.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- TRACEABILITY ---
  verifyBatchFromInput() {
    const input = document.getElementById('traceBatchInput');
    const code = input ? input.value.trim() : '';
    this.verifyBatchCode(code);
  }

  verifyBatchCode(code) {
    const resultCard = document.getElementById('traceResultCard');
    const info = (this.batchDatabase && code) ? this.batchDatabase[code.toUpperCase().trim()] : null;

    if (!info) {
      this.showToast(`Batch "${code}" not found in master records. Try HS-LKO-2026`, 'error');
      return;
    }

    if (resultCard) {
      resultCard.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          <div><span style="font-size:0.75rem; font-weight:800; color:var(--primary);">Partner Farm:</span><br><strong>${info.farmer}</strong></div>
          <div><span style="font-size:0.75rem; font-weight:800; color:var(--primary);">Harvest Date:</span><br><strong>${info.harvestDate}</strong></div>
          <div><span style="font-size:0.75rem; font-weight:800; color:var(--primary);">Location:</span><br><strong>${info.location}</strong></div>
          <div><span style="font-size:0.75rem; font-weight:800; color:var(--primary);">Lab Result:</span><br><strong style="color:var(--primary);">${info.labResult}</strong></div>
        </div>
      `;
      resultCard.style.display = 'block';
    }
  }

  // --- ADMIN PANEL ---
  toggleAdminMode() {
    const storefront = document.getElementById('storefrontWrapper');
    const adminPanel = document.getElementById('adminWrapper');

    if (adminPanel.style.display === 'block') {
      adminPanel.style.display = 'none';
      storefront.style.display = 'block';
    } else {
      adminPanel.style.display = 'block';
      storefront.style.display = 'none';
      this.renderAdminTables();
    }
  }

  switchAdminTab(tab) {
    ['Products', 'Recipes', 'Traceability', 'Orders', 'Users'].forEach(t => {
      const sec = document.getElementById(`adminSection${t}`);
      if (sec) sec.style.display = (t.toLowerCase() === tab.toLowerCase()) ? 'block' : 'none';
    });
  }

  renderAdminTables() {
    const prodTable = document.getElementById('adminProductTable');
    if (prodTable) {
      prodTable.innerHTML = this.products.map(p => `
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.5rem;"><img src="${p.image}" style="width:36px; height:36px; object-fit:cover; border-radius:4px;"></td>
          <td style="padding:0.5rem;"><strong>${p.name}</strong></td>
          <td style="padding:0.5rem;">${p.category}</td>
          <td style="padding:0.5rem; font-weight:800; color:var(--primary-deep);">₹${p.price}</td>
          <td style="padding:0.5rem;"><span style="color:var(--primary); font-weight:700;">In Stock</span></td>
          <td style="padding:0.5rem;"><button onclick="app.showToast('Edit product options available in full dashboard')" style="color:var(--primary-deep); font-weight:700;">Edit</button></td>
        </tr>
      `).join('');
    }
  }

  // --- SUPABASE CLOUD FETCHERS ---
  async fetchProductsFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('products').select('*');
      if (error) return;
      if (data && data.length > 0) {
        this.products = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          originalPrice: item.original_price || item.price,
          rating: item.rating || 5.0,
          reviews: item.reviews || 0,
          image: item.image,
          badge: item.badge || '100% Organic',
          origin: item.origin || 'Lucknow Farm',
          batchNo: item.batch_no || 'HS-LKO-2026',
          inStock: item.in_stock !== false,
          desc: item.description || ''
        }));
        this.renderProducts();
      }
    } catch(e) {}
  }

  async fetchUserProfilesFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data } = await this.supabase.from('customer_profiles').select('*');
      if (data && data.length > 0) this.userProfiles = data;
    } catch(e) {}
  }

  async fetchUserAddressesFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data } = await this.supabase.from('customer_addresses').select('*');
      if (data && data.length > 0) this.userAddresses = data;
    } catch(e) {}
  }

  async fetchOrdersFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data } = await this.supabase.from('orders').select('*');
      if (data && data.length > 0) this.orders = data;
    } catch(e) {}
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--primary-mint);"></i> <span>${msg}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Instantiate App
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new AppEngine();
});
