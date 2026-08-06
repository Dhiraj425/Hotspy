/* ==========================================================================
   BIGBASKET E-COMMERCE SUPERMARKET - CORE JAVASCRIPT APPLICATION ENGINE
   Instance: https://sbqmpnyzocgqdgjkjeta.supabase.co
   Interactive Banner Slider Engine & Admin Live Preview Banner Builder
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
    isFeatured: true
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
    isFeatured: true
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
    isFeatured: true
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
    isFeatured: false
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
    isFeatured: true
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
    isFeatured: false
  }
];

const INITIAL_BANNERS = [
  {
    id: 'ban_1',
    title: 'Organic Golden Spice Harvest',
    subtitle: 'Click to view exclusive banner-selected organic products!',
    badge: '🔥 EXCLUSIVE DEAL',
    ctaText: 'View Banner Collection',
    overlayImg: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
    productIds: ['prod_1', 'prod_2', 'prod_5']
  },
  {
    id: 'ban_2',
    title: 'Himalayan Herbal Tea Festival',
    subtitle: 'Up to 30% OFF on First Flush Green Tea & Wellness Blends',
    badge: '⚡ 30% OFF FESTIVAL',
    ctaText: 'Explore Teas Collection',
    overlayImg: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60',
    productIds: ['prod_3']
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
    comboPrice: 499,
    showOnHomepage: true
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-8492',
    customer_mobile: '9876543210',
    customer_name: 'Aarav Sharma',
    items: JSON.stringify([
      { name: 'Pure Organic Lakadong Turmeric Powder', price: 249, quantity: 1 },
      { name: 'Single-Origin Malabar Black Pepper Whole', price: 349, quantity: 1 }
    ]),
    shipping_address: JSON.stringify({ house_no: 'Flat 402, Royal Residency', street: 'Gomti Nagar Main Road', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010' }),
    subtotal: 598,
    total_amount: 598,
    status: 'Out for Delivery',
    shipped_remarks: 'Out for 10-Min Express Delivery via Rider Raju Sharma',
    date: '2026-08-06 16:30'
  }
];

class AppEngine {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('hotspy_products')) || INITIAL_PRODUCTS;
    this.banners = JSON.parse(localStorage.getItem('hotspy_banners')) || INITIAL_BANNERS;
    this.recipes = JSON.parse(localStorage.getItem('hotspy_recipes')) || INITIAL_RECIPES;
    this.cart = JSON.parse(localStorage.getItem('hotspy_cart')) || [];
    this.orders = JSON.parse(localStorage.getItem('hotspy_orders')) || INITIAL_ORDERS;
    this.userProfiles = JSON.parse(localStorage.getItem('hotspy_user_profiles')) || [
      { mobile: '9876543210', name: 'Aarav Sharma', password: 'password123', avatar: 'assets/turmeric.jpg', created_at: '2026-08-01' }
    ];
    this.userAddresses = JSON.parse(localStorage.getItem('hotspy_user_addresses')) || [
      { id: 'addr_1', user_mobile: '9876543210', full_name: 'Aarav Sharma', mobile: '9876543210', house_no: 'Flat 402, Royal Residency', street: 'Gomti Nagar Main Road', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010', address_type: 'Home', is_default: true }
    ];

    this.user = JSON.parse(sessionStorage.getItem('hotspy_auth_session')) || this.userProfiles[0];
    this.isAdminAuthenticated = sessionStorage.getItem('hotspy_admin_auth') === 'true';

    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.minDiscountFilter = 0;
    this.currentSlideIndex = 0;
    this.bannerSliderTimer = null;

    this.init();
  }

  async init() {
    this.updateCartUI();
    this.updateAuthStatusUI();

    window.addEventListener('hashchange', () => this.handleRouteHashChange());
    window.addEventListener('popstate', () => this.handleRouteHashChange());

    this.handleRouteHashChange();

    document.addEventListener('click', (e) => {
      const wrapper = document.querySelector('.profile-dropdown-wrapper');
      if (wrapper && !wrapper.contains(e.target)) {
        this.closeProfileDropdown();
      }
    });
  }

  handleRouteHashChange() {
    const hash = window.location.hash || '#/home';

    if (hash === '#/admin' || hash === '#admin') {
      this.renderAdminPageView();
    } else if (hash === '#/shop') {
      this.renderShopPageView();
    } else if (hash.startsWith('#/banner/')) {
      const title = decodeURIComponent(hash.replace('#/banner/', ''));
      this.renderBannerProductsPageView(title);
    } else if (hash.startsWith('#/category/')) {
      const catName = decodeURIComponent(hash.replace('#/category/', ''));
      this.renderCategoryProductsView(catName);
    } else if (hash.startsWith('#/tracking/')) {
      const orderId = decodeURIComponent(hash.replace('#/tracking/', ''));
      this.renderOrderTrackingPageView(orderId);
    } else if (hash === '#/tracking') {
      this.renderOrderTrackingPageView(null);
    } else if (hash === '#/categories') {
      this.renderCategoryPageView();
    } else if (hash === '#/combos') {
      this.renderComboPageView();
    } else if (hash === '#/profile') {
      this.renderCustomerProfilePageView('addresses');
    } else if (hash.startsWith('#/invoice/')) {
      const orderId = decodeURIComponent(hash.replace('#/invoice/', ''));
      this.renderOrderInvoicePageView(orderId);
    } else {
      this.renderHomePageView();
    }
  }

  showHomePage() { window.location.hash = '#/home'; }
  openShopPage() { window.location.hash = '#/shop'; }
  openBannerProductsPage(title, productIds = []) {
    this.currentBannerProductIds = productIds;
    window.location.hash = `#/banner/${encodeURIComponent(title)}`;
  }
  openCategoryPage() { window.location.hash = '#/categories'; }
  openCategoryProductsView(catName = 'Spices') { window.location.hash = `#/category/${encodeURIComponent(catName)}`; }
  openOrderTrackingPage(orderId = null) {
    if (orderId) window.location.hash = `#/tracking/${encodeURIComponent(orderId)}`;
    else window.location.hash = '#/tracking';
  }
  openComboPage() { window.location.hash = '#/combos'; }
  openCustomerProfilePage(tab = 'addresses') {
    if (!this.user) { this.openAuthModal('login'); return; }
    window.location.hash = '#/profile';
  }
  openOrderInvoicePage(orderId) { window.location.hash = `#/invoice/${encodeURIComponent(orderId)}`; }
  openAdminPage() { window.location.hash = '#/admin'; }

  toggleProfileDropdown(e) {
    if (e) e.stopPropagation();
    const card = document.getElementById('profileDropdownCard');
    if (!card) return;

    if (card.classList.contains('show')) this.closeProfileDropdown();
    else { this.renderProfileDropdownContent(); card.classList.add('show'); }
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

  hideAllPages() {
    if (this.bannerSliderTimer) clearInterval(this.bannerSliderTimer);
    document.querySelectorAll('.customer-view-element').forEach(el => {
      el.style.display = '';
    });

    const pages = [
      'homePageContent',
      'shopPageView',
      'bannerProductsPageView',
      'dedicatedCategoryPageView',
      'dedicatedCategoryProductsView',
      'dedicatedOrderTrackingPageView',
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

  // 1. HOMEPAGE RENDER & DYNAMIC BANNER SLIDER
  renderHomePageView() {
    this.hideAllPages();
    const home = document.getElementById('homePageContent');
    if (home) home.style.display = 'block';

    this.updateMobileNavActive('mobNavHome');

    // DYNAMIC BANNER SLIDER RENDER
    this.renderBannerSliderEngine();

    // Featured Products
    const featuredProds = this.products.filter(p => p.isFeatured);
    const grid = document.getElementById('homeProductGrid');
    if (grid) grid.innerHTML = this.renderProductCardsHTML(featuredProds);

    // Homepage Combos
    const hpCombos = this.recipes.filter(r => r.showOnHomepage);
    const combosSec = document.getElementById('homeCombosSection');
    const combosGrid = document.getElementById('homeCombosGrid');
    if (hpCombos.length > 0 && combosSec && combosGrid) {
      combosSec.style.display = 'block';
      combosGrid.innerHTML = hpCombos.map(r => `
        <div class="bb-product-card">
          <span class="bb-discount-pill" style="background:var(--accent-gold); color:var(--header-dark);">FEATURED COMBO</span>
          <div class="bb-card-img-wrap">
            <img src="${r.image}">
          </div>
          <h3 class="bb-card-title">${r.title}</h3>
          <p style="font-size:0.78rem; color:var(--text-muted); margin-bottom:0.5rem;">${r.description}</p>
          <div class="bb-price-row">
            <span class="bb-sale-price">₹${r.comboPrice}</span>
          </div>
          <button class="btn-primary" style="width:100%;" onclick="app.addComboToCart('${r.id}')">Add Combo</button>
        </div>
      `).join('');
    } else if (combosSec) {
      combosSec.style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  renderBannerSliderEngine() {
    const container = document.getElementById('homeBannersContainer');
    if (!container) return;

    if (this.banners.length === 0) {
      container.innerHTML = ``;
      return;
    }

    this.currentSlideIndex = 0;

    container.innerHTML = `
      <div class="slider-wrapper" id="bannerSliderWrapper" style="transform: translateX(0%);">
        ${this.banners.map((b, i) => `
          <div class="slide-item">
            <div style="position:relative; z-index:2; max-width:65%;">
              <span style="background:var(--primary); color:var(--header-dark); font-size:0.68rem; font-weight:900; padding:0.18rem 0.5rem; border-radius:var(--radius-full); text-transform:uppercase;">
                ${b.badge || '🔥 EXCLUSIVE DEAL'}
              </span>
              <h2 style="font-size:1.35rem; font-weight:800; margin:0.4rem 0 0.2rem; line-height:1.25;">${b.title}</h2>
              <p style="font-size:0.8rem; opacity:0.9; margin-bottom:0.75rem;">${b.subtitle || 'Click to view banner collection!'}</p>
              
              <button class="btn-primary" onclick="app.openBannerProductsPage('${b.title}', ${JSON.stringify(b.productIds || []).replace(/"/g, '&quot;')})" style="background:var(--primary); color:var(--header-dark); padding:0.45rem 0.85rem; font-size:0.8rem;">
                ${b.ctaText || 'View Banner Collection'} <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>

            ${b.overlayImg ? `<img src="${b.overlayImg}" class="slide-item-overlay-img">` : ''}
          </div>
        `).join('')}
      </div>

      ${this.banners.length > 1 ? `
        <div class="slider-arrow prev" onclick="app.prevBannerSlide()"><i class="fa-solid fa-chevron-left"></i></div>
        <div class="slider-arrow next" onclick="app.nextBannerSlide()"><i class="fa-solid fa-chevron-right"></i></div>
        
        <div class="slider-dots" id="bannerSliderDots">
          ${this.banners.map((_, i) => `
            <div class="slider-dot ${i === 0 ? 'active' : ''}" onclick="app.goToBannerSlide(${i})"></div>
          `).join('')}
        </div>
      ` : ''}
    `;

    if (this.banners.length > 1) {
      this.bannerSliderTimer = setInterval(() => this.nextBannerSlide(), 5000);
    }
  }

  nextBannerSlide() {
    if (this.banners.length <= 1) return;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.banners.length;
    this.updateBannerSliderPosition();
  }

  prevBannerSlide() {
    if (this.banners.length <= 1) return;
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.banners.length) % this.banners.length;
    this.updateBannerSliderPosition();
  }

  goToBannerSlide(index) {
    this.currentSlideIndex = index;
    this.updateBannerSliderPosition();
  }

  updateBannerSliderPosition() {
    const wrapper = document.getElementById('bannerSliderWrapper');
    if (wrapper) {
      wrapper.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
    }
    const dots = document.querySelectorAll('#bannerSliderDots .slider-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlideIndex);
    });
  }

  // 2. SHOP PAGE
  renderShopPageView() {
    this.hideAllPages();
    const page = document.getElementById('shopPageView');
    if (page) page.style.display = 'block';

    const grid = document.getElementById('shopProductGrid');
    if (grid) grid.innerHTML = this.renderProductCardsHTML(this.products);

    this.updateMobileNavActive('mobNavShop');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 3. BANNER COLLECTION PRODUCTS PAGE
  renderBannerProductsPageView(title) {
    this.hideAllPages();
    const page = document.getElementById('bannerProductsPageView');
    if (page) page.style.display = 'block';

    const titleEl = document.getElementById('bannerPageTitle');
    if (titleEl) titleEl.textContent = title || 'Promotional Collection';

    let list = this.products;
    if (this.currentBannerProductIds && this.currentBannerProductIds.length > 0) {
      list = this.products.filter(p => this.currentBannerProductIds.includes(p.id));
    }

    const grid = document.getElementById('bannerProductGrid');
    if (grid) grid.innerHTML = this.renderProductCardsHTML(list);

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 4. CATEGORIES DIRECTORY
  renderCategoryPageView() {
    this.hideAllPages();
    const page = document.getElementById('dedicatedCategoryPageView');
    if (page) page.style.display = 'block';

    this.updateMobileNavActive('mobNavCat');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  renderCategoryProductsView(catName = 'Spices') {
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

  // 5. LIVE ORDER TRACKING
  renderOrderTrackingPageView(specificOrderId = null) {
    if (!this.user) {
      this.openAuthModal('login');
      return;
    }

    this.hideAllPages();
    const page = document.getElementById('dedicatedOrderTrackingPageView');
    if (page) page.style.display = 'block';

    const listContainer = document.getElementById('orderListViewContainer');
    const detailContainer = document.getElementById('specificOrderTrackingContainer');

    if (specificOrderId) {
      if (listContainer) listContainer.style.display = 'none';
      if (detailContainer) {
        detailContainer.style.display = 'block';
        this.renderSpecific5StageOrderTracking(specificOrderId);
      }
    } else {
      if (detailContainer) detailContainer.style.display = 'none';
      if (listContainer) {
        listContainer.style.display = 'block';
        this.renderAllOrderCards();
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  renderAllOrderCards() {
    const grid = document.getElementById('allOrdersListCardsGrid');
    if (!grid || !this.user) return;

    const userOrders = this.orders.filter(o => o.customer_mobile === this.user.mobile);

    if (userOrders.length === 0) {
      grid.innerHTML = `
        <div style="background:white; padding:2rem; text-align:center; border-radius:var(--radius-md); border:1px solid var(--border-light);">
          <div style="font-size:2rem; color:var(--text-muted); margin-bottom:0.5rem;"><i class="fa-solid fa-basket-shopping"></i></div>
          <h3 style="font-size:1.1rem; color:var(--header-bg); margin-bottom:0.25rem;">No Active or Past Orders</h3>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-bottom:1rem;">Place your first organic grocery order today!</p>
          <button class="btn-primary" onclick="app.showHomePage()">Shop Now</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = userOrders.map(o => {
      let items = [];
      try { items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items; } catch(e) {}
      
      let badgeBg = 'var(--primary-light)';
      let badgeColor = 'var(--header-bg)';
      if (o.status === 'Delivered') {
        badgeBg = '#D1FAE5'; badgeColor = '#065F46';
      } else if (o.status === 'Out for Delivery') {
        badgeBg = '#FEF3C7'; badgeColor = '#92400E';
      }

      return `
        <div onclick="app.openOrderTrackingPage('${o.id}')" style="background:white; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1.15rem; cursor:pointer; box-shadow:var(--shadow-sm); transition:var(--transition-fast);" onmouseover="this.style.borderColor='var(--primary)'" onmouseout="this.style.borderColor='var(--border-light)'">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.55rem;">
            <div>
              <strong style="font-size:0.95rem; color:var(--header-bg);">${o.id}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${o.date || '2026-08-06'}</div>
            </div>
            <span style="background:${badgeBg}; color:${badgeColor}; font-size:0.75rem; font-weight:800; padding:0.25rem 0.65rem; border-radius:var(--radius-full);">
              ${o.status}
            </span>
          </div>

          <div style="margin-bottom:0.75rem;">
            <div style="font-size:0.82rem; font-weight:700; color:var(--text-main); margin-bottom:0.25rem;">
              Items (${(items || []).length}): ${(items || []).map(i => i.name).join(', ')}
            </div>
            ${o.shipped_remarks ? `
              <div style="font-size:0.75rem; color:var(--header-bg); font-weight:700; background:var(--bg-warm); padding:0.35rem 0.55rem; border-radius:4px; margin-top:0.35rem;">
                <i class="fa-solid fa-location-dot" style="color:var(--primary);"></i> Status Note: ${o.shipped_remarks}
              </div>
            ` : ''}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; pt-0.5rem; border-top:1px solid var(--border-subtle);">
            <div style="font-size:1.05rem; font-weight:800; color:var(--header-bg);">
              Total: ₹${o.total_amount}
            </div>
            <button class="btn-primary" style="padding:0.35rem 0.75rem; font-size:0.78rem;">
              View 5-Stage Live Details <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderSpecific5StageOrderTracking(orderId) {
    const container = document.getElementById('specificOrderTrackingContainer');
    if (!container) return;

    const order = this.orders.find(o => o.id === orderId);
    if (!order) { container.innerHTML = `<div>Order not found.</div>`; return; }

    let items = [];
    try { items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items; } catch(e) {}
    let addr = {};
    try { addr = typeof order.shipping_address === 'string' ? JSON.parse(order.shipping_address) : order.shipping_address; } catch(e) {}

    const stages = ['Placed', 'Accepted', 'Shipped', 'Out for Delivery', 'Delivered'];
    let currentStageIndex = stages.indexOf(order.status);
    if (currentStageIndex === -1) currentStageIndex = 3;

    const isDelivered = order.status === 'Delivered';

    container.innerHTML = `
      <div style="margin-bottom:1rem;">
        <button class="btn-secondary" onclick="app.openOrderTrackingPage()" style="padding:0.3rem 0.65rem; font-size:0.78rem;">
          <i class="fa-solid fa-arrow-left"></i> All My Orders List
        </button>
      </div>

      ${isDelivered ? `
        <div style="background:#D1FAE5; border:2px solid #10B981; color:#065F46; padding:1.5rem; border-radius:var(--radius-lg); margin-bottom:1.5rem; text-align:center; box-shadow:var(--shadow-md);">
          <div style="width:50px; height:50px; border-radius:50%; background:#10B981; color:white; display:flex; align-items:center; justify-content:center; font-size:1.5rem; margin:0 auto 0.5rem;">
            <i class="fa-solid fa-check"></i>
          </div>
          <h2 style="font-size:1.45rem; font-weight:800; margin-bottom:0.25rem;">Order Delivered Successfully! 🎉</h2>
          <p style="font-size:0.85rem; margin-bottom:0.85rem;">Thank you for shopping with bigbasket Organics!</p>
          <button class="btn-primary" onclick="app.openOrderInvoicePage('${order.id}')" style="background:#065F46;">
            <i class="fa-solid fa-file-invoice"></i> Download Tax Invoice
          </button>
        </div>
      ` : `
        <div style="background:var(--header-bg); color:white; padding:1.5rem; border-radius:var(--radius-lg); margin-bottom:1.5rem; text-align:center; box-shadow:var(--shadow-lg);">
          <span style="background:var(--primary); color:var(--header-dark); font-size:0.72rem; font-weight:900; padding:0.2rem 0.65rem; border-radius:var(--radius-full); text-transform:uppercase;">
            Live 5-Stage Status • ${order.id}
          </span>
          <h2 style="font-size:1.5rem; font-weight:800; margin:0.5rem 0 0.2rem;">${order.status}</h2>
          <p style="font-size:0.85rem; opacity:0.9;">Delivering to: ${addr.house_no || 'Flat 402, Royal Residency'}, ${addr.city || 'Lucknow'}</p>
        </div>
      `}

      <div style="background:white; padding:1.5rem; border-radius:var(--radius-md); border:1px solid var(--border-light); margin-bottom:1.5rem; box-shadow:var(--shadow-sm);">
        <h3 style="font-size:1.05rem; font-weight:800; color:var(--header-bg); margin-bottom:1.25rem;">5-Stage Live Delivery Progress</h3>

        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <div style="display:flex; align-items:flex-start; gap:0.85rem; opacity:${currentStageIndex >= 0 ? '1' : '0.5'};">
            <div style="width:32px; height:32px; border-radius:50%; background:${currentStageIndex >= 0 ? 'var(--header-bg)' : 'var(--border-light)'}; color:white; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:800; flex-shrink:0;">
              ${currentStageIndex > 0 ? '✓' : '1'}
            </div>
            <div>
              <strong style="font-size:0.9rem; color:var(--header-bg);">1. Order Placed</strong>
              <div style="font-size:0.78rem; color:var(--text-muted);">Payment Verified & Order Received in Store Database</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:0.85rem; opacity:${currentStageIndex >= 1 ? '1' : '0.5'};">
            <div style="width:32px; height:32px; border-radius:50%; background:${currentStageIndex >= 1 ? 'var(--header-bg)' : 'var(--border-light)'}; color:white; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:800; flex-shrink:0;">
              ${currentStageIndex > 1 ? '✓' : '2'}
            </div>
            <div>
              <strong style="font-size:0.9rem; color:var(--header-bg);">2. Order Accepted</strong>
              <div style="font-size:0.78rem; color:var(--text-muted);">Accepted by Supermarket Manager • 100% Stock Reserved</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:0.85rem; opacity:${currentStageIndex >= 2 ? '1' : '0.5'};">
            <div style="width:32px; height:32px; border-radius:50%; background:${currentStageIndex >= 2 ? 'var(--header-bg)' : 'var(--border-light)'}; color:white; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:800; flex-shrink:0;">
              ${currentStageIndex > 2 ? '✓' : '3'}
            </div>
            <div>
              <strong style="font-size:0.9rem; color:var(--header-bg);">3. Order Shipped & In Transit</strong>
              <div style="font-size:0.8rem; font-weight:700; color:var(--header-bg); background:var(--bg-warm); padding:0.35rem 0.65rem; border-radius:4px; margin-top:0.25rem;">
                <i class="fa-solid fa-truck" style="color:var(--primary);"></i> ${order.shipped_remarks || 'Dispatched via Express Courier from Regional Logistics Hub'}
              </div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:0.85rem; opacity:${currentStageIndex >= 3 ? '1' : '0.5'};">
            <div style="width:32px; height:32px; border-radius:50%; background:${currentStageIndex >= 3 ? 'var(--primary)' : 'var(--border-light)'}; color:${currentStageIndex >= 3 ? 'var(--header-dark)' : 'var(--text-muted)'}; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:800; flex-shrink:0;">
              ${currentStageIndex > 3 ? '✓' : '<i class="fa-solid fa-motorcycle"></i>'}
            </div>
            <div>
              <strong style="font-size:0.9rem; color:var(--header-bg);">4. Out for Delivery ⚡</strong>
              <div style="font-size:0.78rem; color:var(--text-muted);">Assigned to EV Rider Raju Sharma (Lucknow Delivery Belt)</div>
            </div>
          </div>

          <div style="display:flex; align-items:flex-start; gap:0.85rem; opacity:${currentStageIndex >= 4 ? '1' : '0.5'};">
            <div style="width:32px; height:32px; border-radius:50%; background:${currentStageIndex >= 4 ? '#10B981' : 'var(--border-light)'}; color:white; display:flex; align-items:center; justify-content:center; font-size:0.9rem; font-weight:800; flex-shrink:0;">
              ${currentStageIndex > 4 ? '✓' : '5'}
            </div>
            <div>
              <strong style="font-size:0.9rem; color:var(--header-bg);">5. Delivered Successfully</strong>
              <div style="font-size:0.78rem; color:var(--text-muted);">Handed over to customer at doorstep</div>
            </div>
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr; gap:1rem;">
        <div style="background:white; padding:1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-light);">
          <h3 style="font-size:0.95rem; font-weight:800; color:var(--header-bg); margin-bottom:0.65rem;">Ordered Products (${(items || []).length})</h3>
          ${(items || []).map(i => `
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:0.35rem 0; border-bottom:1px solid var(--border-subtle);">
              <span><strong>${i.name}</strong> × ${i.quantity}</span>
              <span style="font-weight:800; color:var(--header-bg);">₹${i.price * i.quantity}</span>
            </div>
          `).join('')}
          <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:800; color:var(--header-bg); margin-top:0.65rem; pt-0.5rem; border-top:2px solid var(--border-light);">
            <span>Grand Total</span>
            <span>₹${order.total_amount}</span>
          </div>
        </div>
      </div>
    `;
  }

  // 6. RECIPE COMBOS PAGE
  renderComboPageView() {
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
          </div>
          <button class="btn-primary" style="width:100%;" onclick="app.addComboToCart('${r.id}')">Add Combo</button>
        </div>
      `).join('');
    }

    this.updateMobileNavActive('mobNavOffers');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 7. CUSTOMER PROFILE PAGE
  renderCustomerProfilePageView(tab = 'addresses') {
    this.hideAllPages();
    const page = document.getElementById('customerProfilePageView');
    if (page) page.style.display = 'block';

    const avatar = document.getElementById('profileAvatarImg');
    const nameEl = document.getElementById('profileNameDisplay');
    const mobileEl = document.getElementById('profileMobileDisplay');

    if (avatar) avatar.src = this.user ? (this.user.avatar || 'assets/turmeric.jpg') : 'assets/turmeric.jpg';
    if (nameEl) nameEl.textContent = this.user ? this.user.name : 'Guest';
    if (mobileEl) mobileEl.textContent = this.user ? `📞 +91 ${this.user.mobile}` : '';

    this.switchProfileTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // 8. TAX INVOICE PAGE
  renderOrderInvoicePageView(orderId) {
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

  // 9. 100% EXCLUSIVE STANDALONE ADMIN PORTAL VIEW (#/admin)
  renderAdminPageView() {
    this.hideAllPages();

    // HIDE ALL CUSTOMER VIEW ELEMENTS COMPLETELY
    document.querySelectorAll('.customer-view-element').forEach(el => {
      el.style.display = 'none';
    });

    const storefront = document.getElementById('storefrontWrapper');
    const adminWrapper = document.getElementById('adminWrapper');
    const loginCard = document.getElementById('adminLoginCardContainer');
    const dashboard = document.getElementById('adminDashboardContainer');
    const headerLogoutBtn = document.getElementById('adminLogoutHeaderBtn');

    if (storefront) storefront.style.display = 'none';
    if (adminWrapper) adminWrapper.style.display = 'block';

    if (this.isAdminAuthenticated) {
      if (loginCard) loginCard.style.display = 'none';
      if (dashboard) dashboard.style.display = 'flex';
      if (headerLogoutBtn) headerLogoutBtn.style.display = 'inline-flex';
      this.switchAdminTab('orders');
    } else {
      if (dashboard) dashboard.style.display = 'none';
      if (loginCard) loginCard.style.display = 'block';
      if (headerLogoutBtn) headerLogoutBtn.style.display = 'none';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  verifyAdminSecurityKey() {
    const input = document.getElementById('adminPagePasskeyInput');
    const passkey = input ? input.value.trim() : '';

    if (passkey === 'admin123') {
      this.isAdminAuthenticated = true;
      sessionStorage.setItem('hotspy_admin_auth', 'true');
      this.showToast('Unlocked Supermarket Admin Portal!');
      this.renderAdminPageView();
    } else {
      this.showToast('Invalid Passcode! Key is admin123', 'error');
    }
  }

  lockAdminPortal() {
    this.isAdminAuthenticated = false;
    sessionStorage.removeItem('hotspy_admin_auth');
    this.showToast('Locked Admin Portal.');
    this.renderAdminPageView();
  }

  switchAdminTab(tab) {
    ['orders', 'products', 'addproduct', 'banners', 'combos'].forEach(t => {
      const sec = document.getElementById(`adminSection${t.charAt(0).toUpperCase() + t.slice(1)}`);
      const link = document.getElementById(`adminSidebar${t.charAt(0).toUpperCase() + t.slice(1)}`);
      if (sec) sec.style.display = (t.toLowerCase() === tab.toLowerCase()) ? 'block' : 'none';
      if (link) link.classList.toggle('active', t.toLowerCase() === tab.toLowerCase());
    });
    this.renderAdminTables();
    if (tab.toLowerCase() === 'banners') {
      this.updateBannerLivePreview();
    }
  }

  renderAdminTables() {
    const ordersTable = document.getElementById('adminOrdersTable');
    if (ordersTable) {
      ordersTable.innerHTML = this.orders.map(o => `
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.55rem;"><strong>${o.id}</strong></td>
          <td style="padding:0.55rem;">${o.customer_name}<br><span style="font-size:0.72rem; color:var(--text-muted);">+91 ${o.customer_mobile}</span></td>
          <td style="padding:0.55rem; font-weight:800; color:var(--header-bg);">₹${o.total_amount}</td>
          
          <td style="padding:0.55rem;">
            <select id="adminStatusSelect_${o.id}" style="padding:0.25rem 0.4rem; font-size:0.78rem; font-weight:700; border-radius:4px; border:1px solid var(--border-light); outline:none;">
              <option value="Placed" ${o.status === 'Placed' ? 'selected' : ''}>1. Placed</option>
              <option value="Accepted" ${o.status === 'Accepted' ? 'selected' : ''}>2. Accepted</option>
              <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>3. Shipped</option>
              <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>4. Out for Delivery</option>
              <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>5. Delivered</option>
            </select>
          </td>

          <td style="padding:0.55rem;">
            <input type="text" id="adminRemarksInput_${o.id}" value="${o.shipped_remarks || ''}" placeholder="e.g. In Transit via Kanpur Hub" style="padding:0.25rem 0.4rem; font-size:0.75rem; border:1px solid var(--border-light); border-radius:4px; width:180px;">
          </td>

          <td style="padding:0.55rem;">
            <button class="btn-primary" onclick="app.updateOrderStatusFromAdmin('${o.id}')" style="padding:0.25rem 0.55rem; font-size:0.72rem;">
              Save Status
            </button>
          </td>
        </tr>
      `).join('');
    }

    const prodTable = document.getElementById('adminProductTable');
    if (prodTable) {
      prodTable.innerHTML = this.products.map(p => `
        <tr style="border-bottom:1px solid var(--border-subtle);">
          <td style="padding:0.4rem;"><img src="${p.image}" style="width:32px; height:32px; object-fit:cover; border-radius:4px;"></td>
          <td style="padding:0.4rem;"><strong>${p.name}</strong></td>
          <td style="padding:0.4rem; font-weight:800; color:var(--header-bg);">₹${p.price}</td>
          
          <td style="padding:0.4rem;">
            <button class="btn-secondary" onclick="app.toggleProductFeatured('${p.id}')" style="padding:0.25rem 0.55rem; font-size:0.75rem; background:${p.isFeatured ? 'var(--primary)' : 'white'}; color:${p.isFeatured ? 'var(--header-dark)' : 'var(--text-main)'}; font-weight:800;">
              ${p.isFeatured ? '⭐ Featured on Homepage' : 'Standard (Shop Only)'}
            </button>
          </td>
        </tr>
      `).join('');
    }

    // RENDER EXISTING BANNERS TABLE IN ADMIN
    this.renderAdminBannersTable();

    const bannerPicker = document.getElementById('adminBannerProductsPicker');
    if (bannerPicker) {
      bannerPicker.innerHTML = this.products.map(p => `
        <label style="display:flex; align-items:center; gap:0.35rem; font-size:0.75rem; cursor:pointer;">
          <input type="checkbox" class="banner-prod-checkbox" value="${p.id}"> ${p.name.slice(0, 20)}...
        </label>
      `).join('');
    }

    const comboPicker = document.getElementById('adminComboProductsPicker');
    if (comboPicker) {
      comboPicker.innerHTML = this.products.map(p => `
        <label style="display:flex; align-items:center; gap:0.35rem; font-size:0.75rem; cursor:pointer;">
          <input type="checkbox" class="combo-prod-checkbox" value="${p.id}"> ${p.name.slice(0, 22)}...
        </label>
      `).join('');
    }
  }

  renderAdminBannersTable() {
    const table = document.getElementById('adminBannersListTable');
    if (!table) return;

    if (this.banners.length === 0) {
      table.innerHTML = `<tr><td colspan="5" style="padding:1rem; text-align:center; color:var(--text-muted);">No active banners. Create one below!</td></tr>`;
      return;
    }

    table.innerHTML = this.banners.map(b => `
      <tr style="border-bottom:1px solid var(--border-subtle);">
        <td style="padding:0.5rem;"><strong>${b.title}</strong></td>
        <td style="padding:0.5rem; font-size:0.78rem; color:var(--text-muted);">${b.subtitle || 'N/A'}</td>
        <td style="padding:0.5rem;"><span style="background:var(--primary); color:var(--header-dark); font-size:0.68rem; font-weight:800; padding:0.15rem 0.45rem; border-radius:10px;">${b.badge || 'DEAL'}</span></td>
        <td style="padding:0.5rem; font-weight:800;">${(b.productIds || []).length} Products</td>
        <td style="padding:0.5rem;">
          <button class="btn-primary" onclick="app.deleteBannerFromAdmin('${b.id}')" style="background:#DC2626; padding:0.25rem 0.55rem; font-size:0.72rem;">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </td>
      </tr>
    `).join('');
  }

  updateBannerLivePreview() {
    const box = document.getElementById('adminBannerLivePreviewBox');
    if (!box) return;

    const title = document.getElementById('adminBannerTitle').value.trim() || 'Your Banner Slide Title';
    const subtitle = document.getElementById('adminBannerSubtitle').value.trim() || 'Your subtitle / promotional offer description appears here.';
    const badge = document.getElementById('adminBannerBadge').value.trim() || '🔥 EXCLUSIVE DEAL';
    const ctaText = document.getElementById('adminBannerCtaText').value.trim() || 'Shop Collection';
    const imgUrl = document.getElementById('adminBannerImg').value.trim();

    box.innerHTML = `
      <div style="position:relative; z-index:2; max-width:65%;">
        <span style="background:var(--primary); color:var(--header-dark); font-size:0.65rem; font-weight:900; padding:0.15rem 0.45rem; border-radius:10px; text-transform:uppercase;">
          ${badge}
        </span>
        <h3 style="font-size:1.15rem; font-weight:800; margin:0.35rem 0 0.2rem; color:white;">${title}</h3>
        <p style="font-size:0.75rem; opacity:0.9; margin-bottom:0.65rem; color:white;">${subtitle}</p>
        <button style="background:var(--primary); color:var(--header-dark); border:none; padding:0.35rem 0.75rem; border-radius:var(--radius-sm); font-size:0.75rem; font-weight:800;">
          ${ctaText} <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      ${imgUrl ? `<img src="${imgUrl}" style="position:absolute; right:1rem; top:50%; transform:translateY(-50%); max-height:85%; max-width:140px; object-fit:contain; opacity:0.85; filter:drop-shadow(0 5px 10px rgba(0,0,0,0.3));">` : ''}
    `;
  }

  deleteBannerFromAdmin(bannerId) {
    this.banners = this.banners.filter(b => b.id !== bannerId);
    localStorage.setItem('hotspy_banners', JSON.stringify(this.banners));
    this.showToast('Deleted Banner slide!');
    this.renderAdminTables();
  }

  addNewProductFromAdmin() {
    const name = document.getElementById('adminNewProdName').value.trim();
    const category = document.getElementById('adminNewProdCategory').value;
    const price = parseInt(document.getElementById('adminNewProdPrice').value, 10);
    const mrp = parseInt(document.getElementById('adminNewProdMrp').value, 10);
    const badge = document.getElementById('adminNewProdBadge').value.trim() || 'NEW';
    const image = document.getElementById('adminNewProdImg').value.trim();
    const isFeatured = document.getElementById('adminNewProdFeatured').checked;

    if (!name || !price || !image) {
      this.showToast('Please fill all required product fields!', 'error');
      return;
    }

    const newProd = {
      id: `prod_${Date.now()}`,
      name: name,
      category: category,
      brand: 'HOTSPY ORGANICS',
      price: price,
      originalPrice: mrp || Math.round(price * 1.25),
      rating: 4.9,
      reviews: 12,
      image: image,
      badge: badge,
      discountPct: Math.round(((mrp - price) / mrp) * 100) || 20,
      origin: 'Lucknow Co-op',
      batchNo: 'HS-LKO-2026',
      isFeatured: isFeatured
    };

    this.products.unshift(newProd);
    localStorage.setItem('hotspy_products', JSON.stringify(this.products));

    this.showToast(`🎉 Added product "${name}" to Catalog!`);
    this.renderAdminTables();
    if (isFeatured) this.showHomePage();
    else this.openShopPage();
  }

  createNewBannerFromAdmin() {
    const title = document.getElementById('adminBannerTitle').value.trim();
    const subtitle = document.getElementById('adminBannerSubtitle').value.trim();
    const badge = document.getElementById('adminBannerBadge').value.trim() || '🔥 EXCLUSIVE DEAL';
    const ctaText = document.getElementById('adminBannerCtaText').value.trim() || 'View Collection';
    const overlayImg = document.getElementById('adminBannerImg').value.trim();
    
    const checkboxes = document.querySelectorAll('.banner-prod-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(c => c.value);

    if (!title) {
      this.showToast('Please enter a banner title!', 'error');
      return;
    }

    const newBanner = {
      id: `ban_${Date.now()}`,
      title: title,
      subtitle: subtitle,
      badge: badge,
      ctaText: ctaText,
      overlayImg: overlayImg,
      productIds: selectedIds
    };

    this.banners.unshift(newBanner);
    localStorage.setItem('hotspy_banners', JSON.stringify(this.banners));

    this.showToast(`🎉 Published Banner Slide "${title}"!`);
    this.renderAdminTables();
    this.showHomePage();
  }

  toggleProductFeatured(productId) {
    const p = this.products.find(item => item.id === productId);
    if (p) {
      p.isFeatured = !p.isFeatured;
      localStorage.setItem('hotspy_products', JSON.stringify(this.products));
      this.showToast(`Updated "${p.name}" featured state to: ${p.isFeatured}`);
      this.renderAdminTables();
    }
  }

  createNewComboFromAdmin() {
    const title = document.getElementById('adminComboTitle').value.trim();
    const price = parseInt(document.getElementById('adminComboPrice').value, 10);
    const showHp = document.getElementById('adminComboShowHomepage').checked;

    const checkboxes = document.querySelectorAll('.combo-prod-checkbox:checked');
    const selectedIds = Array.from(checkboxes).map(c => c.value);

    if (!title || !price || selectedIds.length === 0) {
      this.showToast('Please enter combo title, price, and pick at least 1 product!', 'error');
      return;
    }

    const firstProd = this.products.find(p => p.id === selectedIds[0]);

    const newCombo = {
      id: `rec_${Date.now()}`,
      title: title,
      comboPrice: price,
      productIds: selectedIds,
      showOnHomepage: showHp,
      image: firstProd ? firstProd.image : 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
      description: `Includes ${selectedIds.length} organic pairing products.`
    };

    this.recipes.unshift(newCombo);
    localStorage.setItem('hotspy_recipes', JSON.stringify(this.recipes));

    this.showToast(`🎉 Created Combo "${title}"!`);
    this.renderAdminTables();
    if (showHp) this.showHomePage();
    else this.openComboPage();
  }

  updateOrderStatusFromAdmin(orderId) {
    const select = document.getElementById(`adminStatusSelect_${orderId}`);
    const remarksInput = document.getElementById(`adminRemarksInput_${orderId}`);

    if (!select) return;
    const newStatus = select.value;
    const newRemarks = remarksInput ? remarksInput.value.trim() : '';

    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.shipped_remarks = newRemarks;
      localStorage.setItem('hotspy_orders', JSON.stringify(this.orders));
      this.showToast(`Updated ${orderId} status to "${newStatus}"!`);
      this.renderAdminTables();
    }
  }

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

  sortCategoryProducts() { this.renderCategoryProducts(); }
  filterCategoryDiscount(minDiscount) {
    this.minDiscountFilter = minDiscount === 'all' ? 0 : minDiscount;
    this.renderCategoryProducts();
  }
  filterCategory(cat) { this.openCategoryProductsView(cat); }

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
    ['mobNavHome', 'mobNavShop', 'mobNavCat', 'mobNavOffers', 'mobNavCart'].forEach(id => {
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
          <button onclick="app.openOrderTrackingPage('${o.id}')" style="background:var(--primary); color:var(--header-dark); border:none; padding:0.35rem 0.75rem; border-radius:4px; font-weight:800; font-size:0.78rem; cursor:pointer;">
            <i class="fa-solid fa-truck-fast"></i> Track 5-Stage Status
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
      status: 'Placed',
      shipped_remarks: 'Order Placed Successfully by Customer',
      date: new Date().toISOString().replace('T', ' ').slice(0, 16)
    };

    this.orders.unshift(newOrder);
    localStorage.setItem('hotspy_orders', JSON.stringify(this.orders));

    this.cart = [];
    this.saveCart();
    this.closeCartDrawer();
    this.showToast(`🎉 Order Placed! ID: ${newOrder.id}`);
    this.openOrderTrackingPage(newOrder.id);
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
