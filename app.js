/* ==========================================================================
   BIGBASKET E-COMMERCE SUPERMARKET - CORE JAVASCRIPT APPLICATION ENGINE
   Instance: https://sbqmpnyzocgqdgjkjeta.supabase.co
   ========================================================================== */

const SUPABASE_URL = (typeof window !== 'undefined' && window.SUPABASE_URL) 
  ? window.SUPABASE_URL 
  : (typeof window !== 'undefined' && window.ENV && window.ENV.SUPABASE_URL ? window.ENV.SUPABASE_URL : "https://sbqmpnyzocgqdgjkjeta.supabase.co");

const SUPABASE_ANON_KEY = (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY) 
  ? window.SUPABASE_ANON_KEY 
  : (typeof window !== 'undefined' && window.ENV && window.ENV.SUPABASE_ANON_KEY ? window.ENV.SUPABASE_ANON_KEY : "https://sbqmpnyzocgqdgjkjeta.supabase.co");

// Supermarket Catalog Data
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
    badge: '20% की छूट',
    discountPct: 22,
    origin: 'Lucknow Farm',
    batchNo: 'HS-LKO-2026',
    inStock: true
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
    badge: '22% की छूट',
    discountPct: 22,
    origin: 'Kerala Highlands',
    batchNo: 'HS-KRL-2026',
    inStock: true
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
    badge: '20% की छूट',
    discountPct: 20,
    origin: 'Himalayan Foothills',
    batchNo: 'HS-HIM-2026',
    inStock: true
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
    badge: '45% की छूट',
    discountPct: 45,
    origin: 'Lucknow Co-op',
    batchNo: 'HS-OIL-2026',
    inStock: true
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
    badge: '23% की छूट',
    discountPct: 23,
    origin: 'Idukki Kerala',
    batchNo: 'HS-CARD-2026',
    inStock: true
  },
  {
    id: 'prod_6',
    name: 'Roasted Organic Flax Seeds & Chia Munch',
    category: 'Organic',
    brand: 'HOTSPY BITES',
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    badge: '25% की छूट',
    discountPct: 25,
    origin: 'Lucknow Belt',
    batchNo: 'HS-SNK-2026',
    inStock: true
  }
];

const INITIAL_RECIPES = [
  {
    id: 'rec_1',
    title: '🌿 Golden Immunity Boost Combo',
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
    description: 'Lakadong Turmeric Powder (250g) + Malabar Black Pepper Whole (100g)',
    productIds: ['prod_1', 'prod_2'],
    comboPrice: 499
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
    this.minDiscountFilter = 0;

    try {
      this.supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
    } catch(e) {
      this.supabase = null;
    }

    this.init();
  }

  async init() {
    this.renderHomeProducts();
    this.updateCartUI();
    this.updateAuthStatusUI();

    window.addEventListener('hashchange', () => this.checkAdminRoute());
    this.checkAdminRoute();

    document.addEventListener('click', (e) => {
      const wrapper = document.querySelector('.profile-dropdown-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        this.closeProfileDropdown();
      }
    });
  }

  // --- LIVE ORDER TRACKING CONTROLLER ---
  openLiveTrackingModal() {
    const modal = document.getElementById('liveTrackingModal');
    if (modal) modal.classList.add('open');
  }

  closeLiveTrackingModal() {
    const modal = document.getElementById('liveTrackingModal');
    if (modal) modal.classList.remove('open');
  }

  toggleProfileDropdown(e) {
    if (e) e.stopPropagation();
    const card = document.getElementById('profileDropdownCard');
    if (!card) return;

    if (card.classList.contains('show')) {
      this.closeProfileDropdown();
    } else {
      this.renderProfileDropdownContent();
      card.classList.add('show');
    }
  }

  closeProfileDropdown() {
    const card = document.getElementById('profileDropdownCard');
    if (card) card.classList.remove('show');
  }

  renderProfileDropdownContent() {
    const headerBox = document.getElementById('dropdownHeaderBox');
    const footerBox = document.getElementById('dropdownFooterBox');

    if (headerBox) {
      if (this.user) {
        headerBox.innerHTML = `
          <img src="${this.user.avatar || 'assets/turmeric.jpg'}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid var(--primary); flex-shrink:0;">
          <div style="flex:1; overflow:hidden;">
            <div style="font-weight:800; font-size:0.9rem; color:white; cursor:pointer;" onclick="app.openCustomerProfilePage('addresses'); app.closeProfileDropdown();">
              ${this.user.name} <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;"></i>
            </div>
            <div style="font-size:0.72rem; opacity:0.85;">📞 +91 ${this.user.mobile}</div>
          </div>
        `;
      } else {
        headerBox.innerHTML = `
          <div style="width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; font-size:1.1rem;">
            <i class="fa-regular fa-circle-user"></i>
          </div>
          <div style="flex:1;">
            <div style="font-weight:800; font-size:0.88rem; color:white;">Guest Customer</div>
            <button onclick="app.openAuthModal('login'); app.closeProfileDropdown();" style="background:var(--primary); color:var(--header-dark); border:none; padding:0.2rem 0.55rem; border-radius:var(--radius-sm); font-size:0.7rem; font-weight:800; margin-top:0.2rem; cursor:pointer;">
              Login / Register
            </button>
          </div>
        `;
      }
    }

    if (footerBox) {
      if (this.user) {
        footerBox.innerHTML = `
          <button onclick="app.openLogoutConfirmModal(); app.closeProfileDropdown();" style="width:100%; padding:0.4rem; background:#FEE2E2; color:#DC2626; border:none; border-radius:var(--radius-sm); font-weight:700; font-size:0.78rem; cursor:pointer;">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
          </button>
        `;
      } else {
        footerBox.innerHTML = ``;
      }
    }
  }

  // --- STRICT PAGE SWITCHER ---
  hideAllPages() {
    const pages = [
      'homePageContent',
      'dedicatedCategoryPageView',
      'dedicatedCategoryProductsView',
      'dedicatedTraceabilityPageView',
      'dedicatedCombosPageView',
      'customerProfilePageView',
      'orderInvoicePageView',
      'adminWrapper'
    ];
    pages.forEach(p => {
      const el = document.getElementById(p);
      if (el) el.style.display = 'none';
    });
    const storefront = document.getElementById('storefrontWrapper');
    if (storefront) storefront.style.display = 'block';
  }

  // 1. STANDALONE HOMEPAGE
  showHomePage() {
    this.hideAllPages();
    const home = document.getElementById('homePageContent');
    if (home) home.style.display = 'block';

    this.updateMobileNavActive('mobNavHome');
    this.renderHomeProducts();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  renderHomeProducts() {
    const grid = document.getElementById('homeProductGrid');
    if (!grid) return;
    grid.innerHTML = this.renderProductCardsHTML(this.products);
  }

  // 2A. STANDALONE DEDICATED CATEGORY DIRECTORY PAGE
  openCategoryPage() {
    this.hideAllPages();
    const page = document.getElementById('dedicatedCategoryPageView');
    if (page) page.style.display = 'block';

    this.updateMobileNavActive('mobNavCat');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 2B. SPECIFIC CATEGORY PRODUCTS VIEW
  openCategoryProductsView(catName = 'Spices') {
    this.hideAllPages();
    const page = document.getElementById('dedicatedCategoryProductsView');
    if (page) page.style.display = 'block';

    this.selectedCategory = catName;
    const bread = document.getElementById('specificCatBreadcrumb');
    const title = document.getElementById('specificCatTitle');
    if (bread) bread.textContent = `Home / Categories / ${catName}`;
    if (title) title.textContent = `${catName} Storefront`;

    this.renderCategoryProducts();
    this.updateMobileNavActive('mobNavCat');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  renderCategoryProducts() {
    const grid = document.getElementById('categoryProductGrid');
    if (!grid) return;

    let filtered = this.products;
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (this.minDiscountFilter > 0) {
      filtered = filtered.filter(p => (p.discountPct || 20) >= this.minDiscountFilter);
    }

    const sortVal = document.getElementById('catSortSelect') ? document.getElementById('catSortSelect').value : 'relevance';
    if (sortVal === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortVal === 'discount') {
      filtered.sort((a, b) => (b.discountPct || 0) - (a.discountPct || 0));
    }

    grid.innerHTML = this.renderProductCardsHTML(filtered);
  }

  sortCategoryProducts() {
    this.renderCategoryProducts();
  }

  filterCategoryDiscount(minDiscount) {
    this.minDiscountFilter = minDiscount === 'all' ? 0 : minDiscount;
    this.renderCategoryProducts();
  }

  // 3. STANDALONE DEDICATED FARM TRACEABILITY PAGE
  openTraceabilityPage() {
    this.hideAllPages();
    const page = document.getElementById('dedicatedTraceabilityPageView');
    if (page) page.style.display = 'block';

    this.updateMobileNavActive('mobNavOrganic');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 4. STANDALONE DEDICATED RECIPE COMBOS PAGE
  openComboPage() {
    this.hideAllPages();
    const page = document.getElementById('dedicatedCombosPageView');
    if (page) page.style.display = 'block';

    const grid = document.getElementById('dedicatedCombosGrid');
    if (grid) {
      grid.innerHTML = this.recipes.map(r => `
        <div class="bb-product-card">
          <span class="bb-discount-pill" style="background:var(--accent-gold); color:var(--header-dark);">SAVE ₹170</span>
          <div class="bb-card-img-wrap">
            <img src="${r.image}">
          </div>
          <h3 class="bb-card-title">${r.title}</h3>
          <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.5rem;">${r.description}</p>
          <div class="bb-price-row">
            <span class="bb-sale-price">₹${r.comboPrice}</span>
            <span class="bb-mrp-price">₹669</span>
          </div>
          <button class="btn-primary" style="width:100%;" onclick="app.addComboToCart('${r.id}')">Add Combo</button>
        </div>
      `).join('');
    }

    this.updateMobileNavActive('mobNavOffers');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 5. STANDALONE DEDICATED CUSTOMER PROFILE PAGE
  openCustomerProfilePage(tab = 'addresses') {
    if (!this.user) {
      this.openAuthModal('login');
      return;
    }

    this.hideAllPages();
    const page = document.getElementById('customerProfilePageView');
    if (page) page.style.display = 'block';

    const avatar = document.getElementById('profileAvatarImg');
    const nameEl = document.getElementById('profileNameDisplay');
    const mobileEl = document.getElementById('profileMobileDisplay');

    if (avatar) avatar.src = this.user.avatar || 'assets/turmeric.jpg';
    if (nameEl) nameEl.textContent = this.user.name;
    if (mobileEl) mobileEl.textContent = `📞 +91 ${this.user.mobile}`;

    this.switchProfileTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 6. STANDALONE DEDICATED ORDER TAX INVOICE PAGE
  openOrderInvoicePage(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;

    this.hideAllPages();
    const page = document.getElementById('orderInvoicePageView');
    if (page) page.style.display = 'block';

    const printableBox = document.getElementById('printableOrderInvoice');
    let items = [];
    try { items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items; } catch(e) {}
    let addr = {};
    try { addr = typeof order.shipping_address === 'string' ? JSON.parse(order.shipping_address) : order.shipping_address; } catch(e) {}

    if (printableBox) {
      printableBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; border-bottom:2px solid var(--header-bg); padding-bottom:1rem;">
          <div>
            <h1 style="font-size:1.5rem; color:var(--header-bg); margin:0;">bigbasket ORGANICS</h1>
            <div style="font-size:0.8rem; color:var(--text-muted);">A TATA Enterprise • Online Supermarket</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.15rem; font-weight:800; color:var(--header-bg);">TAX INVOICE</div>
            <div style="font-size:0.8rem; font-weight:700;">Invoice #: INV-${order.id}</div>
          </div>
        </div>

        <div style="margin-bottom:1.25rem; background:var(--bg-warm); padding:1rem; border-radius:var(--radius-md);">
          <strong>Customer: ${order.customer_name}</strong> (📞 +91 ${order.customer_mobile})<br>
          <span style="font-size:0.82rem;">Delivery: ${addr.house_no}, ${addr.street}, ${addr.city} - ${addr.pincode}</span>
        </div>

        <table style="width:100%; border-collapse:collapse; margin-bottom:1.5rem; font-size:0.85rem;">
          <thead>
            <tr style="background:var(--header-bg); color:white;">
              <th style="padding:0.5rem; text-align:left;">Item</th>
              <th style="padding:0.5rem; text-align:center;">Qty</th>
              <th style="padding:0.5rem; text-align:right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(items || []).map(item => `
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:0.5rem;"><strong>${item.name}</strong></td>
                <td style="padding:0.5rem; text-align:center;">${item.quantity}</td>
                <td style="padding:0.5rem; text-align:right; font-weight:800;">₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="text-align:right; font-size:1.1rem; font-weight:800; color:var(--header-bg);">
          Grand Total: ₹${order.total_amount}
        </div>
      `;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 7. STANDALONE ADMIN PANEL
  checkAdminRoute() {
    if (window.location.hash === '#admin') {
      this.openAdminAuthModal();
    }
  }

  openAdminAuthModal() {
    const modal = document.getElementById('adminAuthModal');
    if (modal) modal.classList.add('open');
  }

  closeAdminAuthModal() {
    const modal = document.getElementById('adminAuthModal');
    if (modal) modal.classList.remove('open');
    if (window.location.hash === '#admin') {
      window.location.hash = '';
    }
  }

  verifyAdminSecurityKey() {
    const passkeyInput = document.getElementById('adminPasskeyInput');
    const passkey = passkeyInput ? passkeyInput.value : '';
    
    if (passkey === 'admin123') {
      this.closeAdminAuthModal();
      this.openAdminMode();
      this.showToast('Unlocked Admin Management Suite!');
    } else {
      this.showToast('Invalid Admin Security Key!', 'error');
    }
  }

  openAdminMode() {
    this.hideAllPages();
    const storefront = document.getElementById('storefrontWrapper');
    const adminPanel = document.getElementById('adminWrapper');
    if (adminPanel) adminPanel.style.display = 'block';
    if (storefront) storefront.style.display = 'none';
    this.renderAdminTables();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  closeAdminMode() {
    this.showHomePage();
  }

  // PRODUCT CARD HTML GENERATOR
  renderProductCardsHTML(productsList) {
    if (productsList.length === 0) {
      return `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-muted);">No products found matching criteria.</div>`;
    }

    return productsList.map(p => {
      const cartItem = this.cart.find(c => c.id === p.id);
      const qtyInCart = cartItem ? cartItem.quantity : 0;

      return `
        <div class="bb-product-card">
          <span class="bb-discount-pill">${p.badge}</span>
          
          <div class="bb-card-img-wrap">
            <img src="${p.image}" alt="${p.name}">
            
            ${qtyInCart > 0 ? '' : `
              <button class="bb-square-add-btn" onclick="app.addToCart('${p.id}')" title="Add to Basket">
                <i class="fa-solid fa-plus"></i>
              </button>
            `}
          </div>

          <div class="bb-card-brand">${p.brand || 'HOTSPY'}</div>
          <h3 class="bb-card-title">${p.name}</h3>

          <select class="bb-pack-size-select">
            <option value="250g">250 g - ₹${p.price}</option>
            <option value="500g">500 g - ₹${Math.round(p.price * 1.85)}</option>
            <option value="1kg">1 kg - ₹${Math.round(p.price * 3.5)}</option>
          </select>

          <div class="bb-price-row">
            <span class="bb-sale-price">₹${p.price}</span>
            <span class="bb-mrp-price">₹${p.originalPrice}</span>
          </div>

          ${qtyInCart > 0 ? `
            <div class="bb-stepper-control">
              <button class="bb-stepper-btn" onclick="app.updateCartQty('${p.id}', -1)">-</button>
              <span class="bb-stepper-val">${qtyInCart}</span>
              <button class="bb-stepper-btn" onclick="app.updateCartQty('${p.id}', 1)">+</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  filterCategory(cat) {
    this.openCategoryProductsView(cat);
  }

  handleSearchInput(e) {
    this.searchQuery = e.target.value;
    if (this.searchQuery) {
      this.openCategoryProductsView('All');
    }
  }

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
    this.showToast(`Added "${prod.name}" to Basket!`);
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
    const activeCatView = document.getElementById('dedicatedCategoryProductsView');
    if (activeCatView && activeCatView.style.display === 'block') {
      this.renderCategoryProducts();
    } else {
      this.renderHomeProducts();
    }
  }

  updateCartUI() {
    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const mobileBadge = document.getElementById('mobileCartBadge');
    const headerCartBadge = document.getElementById('headerCartBadge');

    if (mobileBadge) mobileBadge.textContent = totalItems;
    if (headerCartBadge) headerCartBadge.textContent = totalItems;

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotalEl = document.getElementById('cartGrandTotal');
    if (grandTotalEl) grandTotalEl.textContent = `₹${subtotal}`;

    const bar = document.getElementById('freeShippingBar');
    if (bar) {
      const target = 999;
      const remaining = Math.max(0, target - subtotal);
      bar.innerHTML = remaining > 0 
        ? `Add <strong>₹${remaining}</strong> more for <strong>FREE Express Delivery</strong>`
        : `🎉 <strong>FREE Express Delivery Unlocked!</strong>`;
    }

    const itemsBody = document.getElementById('cartDrawerItems');
    if (itemsBody) {
      if (this.cart.length === 0) {
        itemsBody.innerHTML = `<div style="text-align:center; padding:3rem 1rem; color:var(--text-muted); font-weight:700;">Your basket is empty.</div>`;
      } else {
        itemsBody.innerHTML = this.cart.map(item => `
          <div style="display:flex; gap:0.75rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border-subtle);">
            <img src="${item.image}" style="width:50px; height:50px; object-fit:cover; border-radius:4px;">
            <div style="flex:1;">
              <div style="font-size:0.85rem; font-weight:700; color:var(--text-main);">${item.name}</div>
              <div style="font-size:0.88rem; font-weight:800; color:var(--header-bg);">₹${item.price}</div>
              <div style="margin-top:0.35rem; display:flex; align-items:center; gap:0.5rem;">
                <div class="bb-stepper-control" style="padding:0.1rem 0.35rem;">
                  <button class="bb-stepper-btn" onclick="app.updateCartQty('${item.id}', -1)" style="width:20px; height:20px;">-</button>
                  <span class="bb-stepper-val" style="font-size:0.8rem; padding:0 0.35rem;">${item.quantity}</span>
                  <button class="bb-stepper-btn" onclick="app.updateCartQty('${item.id}', 1)" style="width:20px; height:20px;">+</button>
                </div>
                <button onclick="app.updateCartQty('${item.id}', -${item.quantity})" style="color:#EF4444; font-size:0.75rem; font-weight:700;">Remove</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  updateMobileNavActive(activeId) {
    ['mobNavHome', 'mobNavCat', 'mobNavOffers', 'mobNavOrganic', 'mobNavCart'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', id === activeId);
    });
  }

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

    if (!name || !mobile || !password) return;

    const newUser = { mobile, name, password, avatar: 'assets/turmeric.jpg', created_at: new Date().toISOString() };
    this.userProfiles.push(newUser);
    this.user = newUser;

    sessionStorage.setItem('hotspy_auth_session', JSON.stringify(newUser));
    localStorage.setItem('hotspy_user_profiles', JSON.stringify(this.userProfiles));

    this.closeAuthModal();
    this.updateAuthStatusUI();
    this.showToast(`Welcome ${name}! Account created.`);
    this.openCustomerProfilePage('addresses');
  }

  async handleLogin() {
    const mobile = document.getElementById('loginMobile').value.trim();
    const password = document.getElementById('loginPassword').value;

    let user = this.userProfiles.find(u => u.mobile === mobile);
    if (!user || user.password !== password) {
      this.showToast('Invalid Mobile Number or Password.', 'error');
      return;
    }

    this.user = user;
    sessionStorage.setItem('hotspy_auth_session', JSON.stringify(user));

    this.closeAuthModal();
    this.updateAuthStatusUI();
    this.showToast(`Welcome back, ${user.name}!`);
    this.openCustomerProfilePage('addresses');
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
    this.closeProfileDropdown();
    this.updateAuthStatusUI();
    this.showHomePage();
    this.showToast('Logged out successfully.');
  }

  updateAuthStatusUI() {
    const userBtn = document.getElementById('userAuthBtn');
    if (!userBtn) return;

    if (this.user) {
      userBtn.innerHTML = `<i class="fa-solid fa-circle-user" style="color:var(--primary);"></i>`;
    } else {
      userBtn.innerHTML = `<i class="fa-regular fa-circle-user"></i>`;
    }
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
      grid.innerHTML = `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">No saved addresses. Click "+ Add Address"!</div>`;
      return;
    }

    grid.innerHTML = userAddrs.map(a => `
      <div style="background:white; border:${a.is_default ? '2px solid var(--header-bg)' : '1px solid var(--border-light)'}; padding:1rem; border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
          <span style="background:var(--primary-light); color:var(--header-bg); font-size:0.72rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:4px;">${a.address_type || 'Home'}</span>
          ${a.is_default ? '<span style="color:var(--header-bg); font-size:0.75rem; font-weight:800;">✓ Default</span>' : ''}
        </div>
        <strong style="color:var(--header-bg); font-size:0.92rem;">${a.full_name}</strong>
        <div style="font-size:0.82rem; color:var(--text-main); margin:0.25rem 0;">${a.house_no}, ${a.street}<br>${a.city}, ${a.state} - <strong>${a.pincode}</strong></div>
        <div style="font-size:0.78rem; color:var(--text-muted); font-weight:700;">📞 +91 ${a.mobile}</div>
      </div>
    `).join('');
  }

  renderProfileOrders() {
    const grid = document.getElementById('profileOrdersGrid');
    if (!grid || !this.user) return;

    const myOrders = this.orders.filter(o => o.customer_mobile === this.user.mobile);
    if (myOrders.length === 0) {
      grid.innerHTML = `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">No past orders found.</div>`;
      return;
    }

    grid.innerHTML = myOrders.map(o => `
      <div style="background:white; border:1px solid var(--border-light); padding:1rem; border-radius:var(--radius-md);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <strong>Order ID: ${o.id}</strong>
          <span style="background:var(--primary-light); color:var(--header-bg); font-size:0.72rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:4px;">${o.status}</span>
        </div>
        <div style="font-size:1.1rem; font-weight:800; color:var(--header-bg); margin-bottom:0.5rem;">Total: ₹${o.total_amount}</div>
        <div style="display:flex; gap:0.5rem;">
          <button onclick="app.openOrderInvoicePage('${o.id}')" style="background:var(--header-bg); color:white; border:none; padding:0.35rem 0.75rem; border-radius:4px; font-weight:700; font-size:0.78rem; cursor:pointer;">
            <i class="fa-solid fa-file-invoice"></i> View Tax Invoice
          </button>
          <button onclick="app.openLiveTrackingModal()" style="background:var(--primary); color:var(--header-dark); border:none; padding:0.35rem 0.75rem; border-radius:4px; font-weight:800; font-size:0.78rem; cursor:pointer;">
            <i class="fa-solid fa-truck-fast"></i> Track Delivery
          </button>
        </div>
      </div>
    `).join('');
  }

  checkout() {
    if (this.cart.length === 0) return;
    if (!this.user) {
      this.openAuthModal('login');
      return;
    }

    const defaultAddr = this.userAddresses.find(a => a.user_mobile === this.user.mobile && a.is_default) || {
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
      status: 'Out for Express Delivery',
      date: new Date().toISOString().split('T')[0]
    };

    this.orders.unshift(newOrder);
    localStorage.setItem('hotspy_orders', JSON.stringify(this.orders));

    this.cart = [];
    this.saveCart();
    this.closeCartDrawer();
    this.showToast(`🎉 Order Placed! ID: ${newOrder.id}`);
    this.openLiveTrackingModal();
  }

  addComboToCart(recipeId) {
    const r = this.recipes.find(rec => rec.id === recipeId);
    if (!r) return;
    this.cart.push({ id: r.id, name: r.title, price: r.comboPrice, originalPrice: 669, image: r.image, quantity: 1 });
    this.saveCart();
    this.showToast(`Added "${r.title}" to Basket!`);
  }

  openCartDrawer() {
    const drawer = document.getElementById('cartDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cartDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
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
          <td style="padding:0.4rem;"><img src="${p.image}" style="width:30px; height:30px; object-fit:cover; border-radius:4px;"></td>
          <td style="padding:0.4rem;"><strong>${p.name}</strong></td>
          <td style="padding:0.4rem; font-weight:800; color:var(--header-bg);">₹${p.price}</td>
          <td style="padding:0.4rem;"><span style="color:var(--header-bg); font-weight:700;">In Stock</span></td>
        </tr>
      `).join('');
    }
  }

  verifyBatchFromInput() {
    const input = document.getElementById('traceBatchInput');
    const code = input ? input.value.trim() : '';
    const resultCard = document.getElementById('traceResultCard');
    const info = (this.batchDatabase && code) ? this.batchDatabase[code.toUpperCase()] : null;

    if (!info) {
      this.showToast(`Batch "${code}" not found. Try HS-LKO-2026`, 'error');
      return;
    }

    if (resultCard) {
      resultCard.innerHTML = `
        <div style="font-size:0.85rem;">
          <strong>Farm:</strong> ${info.farmer}<br>
          <strong>Harvest Date:</strong> ${info.harvestDate}<br>
          <strong>Lab Result:</strong> <span style="color:var(--header-bg); font-weight:800;">${info.labResult}</span>
        </div>
      `;
      resultCard.style.display = 'block';
    }
  }

  showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--primary);"></i> <span>${msg}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new AppEngine();
});
