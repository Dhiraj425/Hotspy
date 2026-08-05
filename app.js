/* ==========================================================================
   HOTSPY ORGANICS - CORE JAVASCRIPT APPLICATION ENGINE
   Features: Storefront Catalog, Popup Auth, Traceability, Slide-out Cart,
             Product Detail Modal, Active Highlighting WYSIWYG, 4-Column Badges,
             Full-Width Marquee Announcement, Dynamic Max 4 Tabs Manager,
             Recipe Pairings & Combo Bundles Manager with Discount Combo Cart Items & Supabase Sync
   ========================================================================== */

const SUPABASE_URL = (typeof window !== 'undefined' && window.SUPABASE_URL) 
  ? window.SUPABASE_URL 
  : (typeof window !== 'undefined' && window.ENV && window.ENV.SUPABASE_URL ? window.ENV.SUPABASE_URL : "https://nmzwenbwgccwaokywthe.supabase.co");

const SUPABASE_ANON_KEY = (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY) 
  ? window.SUPABASE_ANON_KEY 
  : (typeof window !== 'undefined' && window.ENV && window.ENV.SUPABASE_ANON_KEY ? window.ENV.SUPABASE_ANON_KEY : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tendlbmJ3Z2Njd2Fva3l3dGhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MDgwOTUsImV4cCI6MjEwMTQ4NDA5NX0.Q2a1fMkQpIm3niHsHvp8CmpVHHhRb1NVH5kszDFi48E");

// --- DEFAULT GLOBAL BADGES & ANNOUNCEMENT STATE ---
const DEFAULT_GLOBAL_SETTINGS = {
  marquee: '🌿 100% Certified Organic • Direct Farm Harvest • Free Shipping Over ₹999 • Lab Tested Pesticide 0.00% • 15,000+ Happy Indian Homes',
  badges: [
    { icon: 'fa-truck', title: 'Free Shipping', sub: '₹999+', link: '#store' },
    { icon: 'fa-rotate-left', title: '100% Purity', sub: 'Guarantee', link: '#traceability' },
    { icon: 'fa-tree', title: 'Plants 1 Tree', sub: 'Lucknow Co-op', link: '#hero' },
    { icon: 'fa-shield-halved', title: '0.00% Pesticides', sub: 'Lab Certified', link: '#traceability' }
  ]
};

// --- INITIAL DEFAULT CATALOG DATA WITH VISUAL FORMATTING & CUSTOM TABS ---
const INITIAL_PRODUCTS = [
  {
    id: 'prod_1',
    name: 'Pure Lakadong Turmeric Powder',
    category: 'Spices',
    price: 349,
    originalPrice: 420,
    rating: 4.9,
    reviews: 142,
    image: 'assets/turmeric.jpg',
    badge: '100% Organic',
    origin: 'Lucknow Organic Farm, UP',
    batchNo: 'HS-LKO-2026',
    inStock: true,
    customMarquee: '',
    customTabs: [
      { title: '🌱 Ingredients & Source', content: '<b>100% Pure Organic Lakadong Turmeric Rhizomes.</b><br>Sourced directly from <i>Rameshwar Farmer Cooperative, Lucknow, UP</i>.' },
      { title: '🔬 Lab Certificate & Usage', content: '<b>Lab Test Certificate:</b> #NPOP/NAB/001492.<br><b>Curcumin:</b> 7.8% High Bioavailability.<br><i>Usage:</i> Mix 1/2 tsp in warm milk daily.' }
    ],
    desc: '<ul><li><b>100% Pesticide-Free & Certified Organic</b></li><li>Sourced directly from <i>Rameshwar Farmer Co-op, Lucknow</i></li><li>Supercharged with <b>7.8% Natural Curcumin</b> for maximum immunity</li><li>Cold-milled under 30°C to preserve natural volatile oils</li></ul>'
  },
  {
    id: 'prod_2',
    name: 'Himalayan Whole Leaf Green Tea',
    category: 'Tea',
    price: 499,
    originalPrice: 599,
    rating: 4.8,
    reviews: 98,
    image: 'assets/greentea.jpg',
    badge: 'Zero Pesticides',
    origin: 'High Altitude Himalayan Gardens',
    batchNo: 'HS-HIM-1044',
    inStock: true,
    customMarquee: '',
    customTabs: [
      { title: '🌱 Ingredients & Source', content: '<b>100% First-Flush Whole Green Tea Leaves.</b><br>Harvested at 6,000 ft altitude in <i>Kangra Valley, Himachal Pradesh</i>.' },
      { title: '🍵 Steeping Guide', content: '<b>Steeping:</b> Steep 1 tsp in 85°C warm water for 3 minutes.<br><b>Rich in EGCG Antioxidants</b> for morning detoxification.' }
    ],
    desc: '<ul><li><b>First-Flush Unfermented Whole Green Tea Leaves</b></li><li>Harvested at 6,000 ft altitude in <i>Kangra Valley, Himachal</i></li><li>High in <u>EGCG Antioxidants</u> for daily detoxification</li><li>Natural aroma with zero artificial flavors</li></ul>'
  },
  {
    id: 'prod_3',
    name: 'Organic Stone-Ground Multigrain Atta',
    category: 'Flours',
    price: 299,
    originalPrice: 350,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
    badge: 'Stone Ground',
    origin: 'Tarai Fertile Plains',
    batchNo: 'HS-TAR-3088',
    inStock: true,
    customMarquee: '',
    customTabs: [
      { title: '🌾 Blend Ratios', content: '<b>70% Organic Wheat, 10% Chana, 10% Ragi, 10% Bajra.</b><br>Traditional Cold-Pressed Stone Chakki Milled.' },
      { title: '🍞 Storage Info', content: '<b>Shelf Life:</b> 6 Months.<br>Keep in airtight glass or stainless steel container.' }
    ],
    desc: '<ul><li><b>Traditional Cold-Pressed Stone Chakki Milled</b></li><li>Blend of <i>Organic Wheat, Roasted Chana, Ragi & Bajra</i></li><li>Rich in <u>Dietary Fiber</u> for superior digestion</li><li>Zero preservatives or chemical bleaching agents</li></ul>'
  },
  {
    id: 'prod_4',
    name: 'Wild Single-Origin Black Pepper',
    category: 'Spices',
    price: 399,
    originalPrice: 480,
    rating: 5.0,
    reviews: 84,
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    badge: 'Direct Farm',
    origin: 'Wayanad Forest Belt, Kerala',
    batchNo: 'HS-KER-9901',
    inStock: true,
    customMarquee: '',
    customTabs: [
      { title: '🌱 Origin & Grade', content: '<b>Tellicherry Extra Bold (TGSEB).</b><br>Sourced from <i>Wayanad Indigenous Spice Growers Co-op, Kerala</i>.' },
      { title: '⚡ Bioavailability Boost', content: '<b>6.4% Verified Piperine.</b><br>Boosts nutrient & curcumin absorption by up to <u>2000%</u>.' }
    ],
    desc: '<ul><li><b>Tellicherry Extra Bold Sun-Cured Peppercorns</b></li><li>Sourced from <i>Wayanad Indigenous Spice Co-op, Kerala</i></li><li>Contains <b>6.4% Verified Piperine</b> content</li><li>Boosts nutrient absorption by up to <u>2000%</u></li></ul>'
  }
];

const INITIAL_RECIPES = [
  {
    id: 'rec_1',
    title: 'Immunity Golden Turmeric Milk',
    tag: 'Immunity Boost',
    image: 'assets/turmeric.jpg',
    desc: 'Warm soothing Ayurvedic elixir featuring high-curcumin Lakadong turmeric and tellicherry black pepper for 2000% enhanced absorption.',
    productIds: ['prod_1', 'prod_4'],
    comboPrice: 649,
    displayLocation: 'homepage'
  },
  {
    id: 'rec_2',
    title: 'Himalayan Herbal Detox Brew',
    tag: 'Morning Detox',
    image: 'assets/greentea.jpg',
    desc: 'Whole leaf green tea blended with fresh mint and a touch of raw organic honey for natural revitalization.',
    productIds: ['prod_2'],
    comboPrice: 449,
    displayLocation: 'homepage'
  }
];

const BATCH_DATABASE = {
  'HS-LKO-2026': {
    farmer: 'Rameshwar Farmer Cooperative',
    location: 'Lucknow Agri Belt, Uttar Pradesh',
    harvestDate: 'June 18, 2026',
    labResult: '100% Pure - Pesticide Residue 0.00%',
    soilType: 'Alluvial Organic Rich',
    certNo: 'NPOP/NAB/001492'
  },
  'HS-HIM-1044': {
    farmer: 'Devbhumi Herbal Organic Society',
    location: 'Kangra Valley, Himachal Pradesh',
    harvestDate: 'May 28, 2026',
    labResult: 'Grade A+ Antioxidant High',
    soilType: 'Mountain Terrace Virgin Soil',
    certNo: 'USDA-ORG-8821'
  },
  'HS-KER-9901': {
    farmer: 'Western Ghats Spice Growers',
    location: 'Wayanad High Ranges, Kerala',
    harvestDate: 'July 02, 2026',
    labResult: 'Piperine Content 6.4% Verified',
    soilType: 'Red Loam Rainfed',
    certNo: 'JAIVIK-BHARAT-9032'
  }
};

// --- APP STATE ENGINE ---
class AppEngine {
  constructor() {
    this.products = JSON.parse(localStorage.getItem('hotspy_products')) || INITIAL_PRODUCTS;
    this.recipes = JSON.parse(localStorage.getItem('hotspy_recipes')) || INITIAL_RECIPES;
    this.batchDatabase = JSON.parse(localStorage.getItem('hotspy_batch_database')) || BATCH_DATABASE;
    this.globalSettings = JSON.parse(localStorage.getItem('hotspy_global_settings')) || DEFAULT_GLOBAL_SETTINGS;
    this.cart = JSON.parse(localStorage.getItem('hotspy_cart')) || [];
    this.wishlist = JSON.parse(localStorage.getItem('hotspy_wishlist')) || [];
    this.orders = JSON.parse(localStorage.getItem('hotspy_orders')) || [
      { id: 'ORD-9821', customer_mobile: '9876543210', customer_name: 'Aarav Sharma', total_amount: 848, subtotal: 848, shipping_fee: 0, items: JSON.stringify([{ id:'prod_1', name:'Pure Himalayan Cardamom', price:499, quantity:1, image:'assets/turmeric.jpg'}, { id:'prod_2', name:'Single-Origin Black Pepper', price:349, quantity:1, image:'assets/turmeric.jpg'}]), shipping_address: JSON.stringify({ full_name:'Aarav Sharma', mobile:'9876543210', house_no:'Flat 402', street:'Gomti Nagar Main Road', city:'Lucknow', state:'Uttar Pradesh', pincode:'226010', landmark:'Near Cyber Tower', address_type:'Home'}), date: '2026-08-04', status: 'Delivered', payment_method: 'COD', payment_status: 'Paid' },
      { id: 'ORD-9822', customer_mobile: '9876543210', customer_name: 'Aarav Sharma', total_amount: 499, subtotal: 499, shipping_fee: 0, items: JSON.stringify([{ id:'prod_1', name:'Pure Himalayan Cardamom', price:499, quantity:1, image:'assets/turmeric.jpg'}]), shipping_address: JSON.stringify({ full_name:'Aarav Sharma', mobile:'9876543210', house_no:'Flat 402', street:'Gomti Nagar Main Road', city:'Lucknow', state:'Uttar Pradesh', pincode:'226010', landmark:'Near Cyber Tower', address_type:'Home'}), date: '2026-08-05', status: 'Shipped', payment_method: 'UPI', payment_status: 'Paid' }
    ];
    this.userProfiles = [
      { mobile: '9876543210', name: 'Aarav Sharma', password: 'password123', avatar: 'assets/turmeric.jpg', created_at: '2026-08-01' }
    ];
    this.userAddresses = [
      { id: 'addr_1', user_mobile: '9876543210', full_name: 'Aarav Sharma', mobile: '9876543210', house_no: 'Flat 402, Royal Residency', street: 'Gomti Nagar Main Road', city: 'Lucknow', state: 'Uttar Pradesh', pincode: '226010', landmark: 'Near Cyber Tower', address_type: 'Home', is_default: true }
    ];
    this.user = null;
    this.currentDetailProduct = null;
    this.currentDetailTabIndex = 0;
    this.detailQty = 1;
    this.editingProductTabs = [];
    this.editingRecipeTabs = [];
    
    // Supabase JS Client
    this.supabase = (typeof window.supabase !== 'undefined') ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

    this.currentCurrency = 'INR';
    this.currencyRates = { INR: { symbol: '₹', rate: 1 }, USD: { symbol: '$', rate: 0.012 }, EUR: { symbol: '€', rate: 0.011 } };
    
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.sortBy = 'featured';

    this.init();
  }

  async init() {
    this.renderProducts();
    this.renderHomepageRecipes();
    this.updateNavComboPageLink();
    this.updateCartUI();
    this.updateWishlistCount();
    this.updateAuthStatusUI();
    this.setupEventListeners();
    this.setupAdminCharts();
    this.renderAdminTables();
    this.setupEditorListeners();
    this.loadAdminGlobalSettingsUI();
    
    // Fetch Live Data from Supabase Cloud
    await this.fetchProductsFromSupabase();
    await this.fetchRecipesFromSupabase();
    await this.fetchBatchesFromSupabase();
    await this.fetchUserProfilesFromSupabase();
    await this.fetchUserAddressesFromSupabase();
    await this.fetchOrdersFromSupabase();
  }

  // --- VISUAL WYSIWYG EDITOR COMMAND EXECUTOR ---
  execWysiwyg(command, value = null, targetEditorId = 'pmDescEditor') {
    const editor = document.getElementById(targetEditorId);
    if (!editor) return;

    editor.focus();
    document.execCommand(command, false, value);
    this.updateWysiwygToolbarState();
  }

  updateWysiwygToolbarState() {
    try {
      const boldBtn = document.getElementById('fmtBtnBold');
      const italicBtn = document.getElementById('fmtBtnItalic');
      const underlineBtn = document.getElementById('fmtBtnUnderline');
      const listBtn = document.getElementById('fmtBtnList');

      if (boldBtn) boldBtn.classList.toggle('active', document.queryCommandState('bold'));
      if (italicBtn) italicBtn.classList.toggle('active', document.queryCommandState('italic'));
      if (underlineBtn) underlineBtn.classList.toggle('active', document.queryCommandState('underline'));
      if (listBtn) listBtn.classList.toggle('active', document.queryCommandState('insertUnorderedList'));
    } catch (e) {
      // Ignored
    }
  }

  setupEditorListeners() {
    const editor = document.getElementById('pmDescEditor');
    if (editor) {
      ['keyup', 'mouseup', 'click', 'focus', 'input'].forEach(evt => {
        editor.addEventListener(evt, () => this.updateWysiwygToolbarState());
      });
    }
    document.addEventListener('selectionchange', () => {
      const active = document.activeElement;
      if (active && active.id === 'pmDescEditor') {
        this.updateWysiwygToolbarState();
      }
    });
  }

  // --- GLOBAL BADGES & MARQUEE ANNOUNCEMENT MANAGER ---
  loadAdminGlobalSettingsUI() {
    const marqueeInput = document.getElementById('adminMarqueeInput');
    if (marqueeInput) marqueeInput.value = this.globalSettings.marquee || '';

    const badges = this.globalSettings.badges || DEFAULT_GLOBAL_SETTINGS.badges;
    for (let i = 1; i <= 4; i++) {
      const b = badges[i - 1] || {};
      const selectEl = document.getElementById(`badgeIconSelect${i}`);
      const customInput = document.getElementById(`badgeIcon${i}`);
      const titleEl = document.getElementById(`badgeTitle${i}`);
      const subEl = document.getElementById(`badgeSub${i}`);

      if (titleEl) titleEl.value = b.title || '';
      if (subEl) subEl.value = b.sub || '';

      if (selectEl) {
        const optionExists = Array.from(selectEl.options).some(opt => opt.value === b.icon);
        if (optionExists) {
          selectEl.value = b.icon;
          if (customInput) {
            customInput.style.display = 'none';
            customInput.value = b.icon;
          }
        } else {
          selectEl.value = 'custom';
          if (customInput) {
            customInput.style.display = 'block';
            customInput.value = b.icon || 'fa-check';
          }
        }
      }
      this.updateBadgeIconPreview(i);
    }
  }

  updateBadgeIconPreview(badgeNum) {
    const selectEl = document.getElementById(`badgeIconSelect${badgeNum}`);
    const customInput = document.getElementById(`badgeIcon${badgeNum}`);
    const previewEl = document.getElementById(`badgePreview${badgeNum}`);
    if (!selectEl || !previewEl) return;

    let iconClass = selectEl.value;
    if (iconClass === 'custom') {
      if (customInput) customInput.style.display = 'block';
      iconClass = customInput ? customInput.value : 'fa-check';
    } else {
      if (customInput) {
        customInput.style.display = 'none';
        customInput.value = iconClass;
      }
    }

    previewEl.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
  }

  saveGlobalBadgesAndAnnouncement() {
    const marquee = document.getElementById('adminMarqueeInput').value;
    const newBadges = [];

    for (let i = 1; i <= 4; i++) {
      const selectEl = document.getElementById(`badgeIconSelect${i}`);
      const customInput = document.getElementById(`badgeIcon${i}`);
      
      let icon = 'fa-check';
      if (selectEl) {
        icon = (selectEl.value === 'custom') ? (customInput ? customInput.value : 'fa-check') : selectEl.value;
      }

      const title = document.getElementById(`badgeTitle${i}`).value || 'Organic';
      const sub = document.getElementById(`badgeSub${i}`).value || 'Guaranteed';
      newBadges.push({ icon, title, sub, link: '#store' });
    }

    this.globalSettings = { marquee, badges: newBadges };
    localStorage.setItem('hotspy_global_settings', JSON.stringify(this.globalSettings));
    this.showToast('Updated Global Announcement & 4 Trust Badges!');
  }

  renderDetailTrustBadges() {
    const grid = document.getElementById('detailTrustGrid');
    if (!grid) return;

    const badges = (this.globalSettings.badges && this.globalSettings.badges.length > 0) 
      ? this.globalSettings.badges.slice(0, 4) 
      : DEFAULT_GLOBAL_SETTINGS.badges;

    grid.innerHTML = badges.map(b => `
      <div class="trust-badge-item">
        <div class="trust-badge-icon"><i class="fa-solid ${b.icon}"></i></div>
        <div class="trust-badge-title">${b.title}</div>
        <div class="trust-badge-sub">${b.sub}</div>
      </div>
    `).join('');
  }

  // --- DYNAMIC MAX 4 TABS EDITOR IN ADMIN MODAL ---
  renderAdminCustomTabsForm(tabs = []) {
    const container = document.getElementById('adminCustomTabsContainer');
    if (!container) return;

    this.editingProductTabs = tabs.slice(0, 4);

    if (this.editingProductTabs.length === 0) {
      this.editingProductTabs = [
        { title: '🌱 Ingredients & Source', content: '100% Organic Sourced Ingredients' },
        { title: '🔬 Lab Certificate & Usage', content: 'Pesticide 0.00% Lab Tested' }
      ];
    }

    container.innerHTML = this.editingProductTabs.map((tab, idx) => `
      <div class="admin-tab-editor-box" data-tab-index="${idx}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:0.8rem; color:var(--primary-dark);">Tab #${idx + 1} Title & Content</strong>
          <button type="button" onclick="app.deleteAdminCustomTab(${idx})" style="color:#EF4444; font-size:0.75rem; font-weight:700;">
            <i class="fa-solid fa-trash-can"></i> Delete Tab
          </button>
        </div>
        <input type="text" id="adminTabTitle_${idx}" class="form-control" style="font-weight:700; font-size:0.82rem;" placeholder="Tab Title (e.g. 🌱 Ingredients)" value="${tab.title}">
        
        <!-- Toolbar for this tab's editor -->
        <div class="rich-text-toolbar" style="padding:0.2rem 0.4rem;">
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('bold', null, 'pmTabEditor_${idx}')"><b>B</b></button>
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('italic', null, 'pmTabEditor_${idx}')"><i>I</i></button>
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('underline', null, 'pmTabEditor_${idx}')"><u>U</u></button>
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('insertUnorderedList', null, 'pmTabEditor_${idx}')">• List</button>
        </div>

        <div id="pmTabEditor_${idx}" class="wysiwyg-editor" contenteditable="true" style="min-height:75px; max-height:140px;">${tab.content}</div>
      </div>
    `).join('');
  }

  addAdminCustomTab() {
    if (this.editingProductTabs.length >= 4) {
      this.showToast('Maximum 4 Custom Tabs allowed per product!', 'error');
      return;
    }
    this.syncCurrentAdminTabsState();
    this.editingProductTabs.push({ title: `Tab #${this.editingProductTabs.length + 1}`, content: 'Type tab content here...' });
    this.renderAdminCustomTabsForm(this.editingProductTabs);
  }

  deleteAdminCustomTab(index) {
    this.syncCurrentAdminTabsState();
    this.editingProductTabs.splice(index, 1);
    this.renderAdminCustomTabsForm(this.editingProductTabs);
  }

  syncCurrentAdminTabsState() {
    const updated = [];
    const container = document.getElementById('adminCustomTabsContainer');
    if (!container) return;

    const boxes = container.querySelectorAll('.admin-tab-editor-box');
    boxes.forEach((box, idx) => {
      const titleInput = document.getElementById(`adminTabTitle_${idx}`);
      const contentEditor = document.getElementById(`pmTabEditor_${idx}`);
      updated.push({
        title: titleInput ? titleInput.value : `Tab #${idx+1}`,
        content: contentEditor ? contentEditor.innerHTML : ''
      });
    });
    this.editingProductTabs = updated;
  }

  // --- DYNAMIC MAX 4 TABS EDITOR FOR RECIPE COMBOS IN ADMIN MODAL ---
  renderAdminRecipeCustomTabsForm(tabs = []) {
    const container = document.getElementById('adminRecipeCustomTabsContainer');
    if (!container) return;

    this.editingRecipeTabs = tabs.slice(0, 4);

    if (this.editingRecipeTabs.length === 0) {
      this.editingRecipeTabs = [
        { title: '🌱 Combo Package Info', content: '100% Organic Certified Sourced Combo' },
        { title: '🔬 Purity & Guarantee', content: 'Pesticide 0.00% Lab Tested' }
      ];
    }

    container.innerHTML = this.editingRecipeTabs.map((tab, idx) => `
      <div class="admin-recipe-tab-editor-box" data-tab-index="${idx}" style="background:white; border:1px solid var(--border-light); border-radius:var(--radius-sm); padding:0.65rem; display:flex; flex-direction:column; gap:0.5rem;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:0.8rem; color:var(--primary-dark);">Combo Tab #${idx + 1} Title & Content</strong>
          <button type="button" onclick="app.deleteAdminRecipeCustomTab(${idx})" style="color:#EF4444; font-size:0.75rem; font-weight:700;">
            <i class="fa-solid fa-trash-can"></i> Delete Tab
          </button>
        </div>
        <input type="text" id="adminRecipeTabTitle_${idx}" class="form-control" style="font-weight:700; font-size:0.82rem;" placeholder="Tab Title (e.g. 🌱 Combo Info)" value="${tab.title}">
        
        <!-- Toolbar for this tab's editor -->
        <div class="rich-text-toolbar" style="padding:0.2rem 0.4rem;">
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('bold', null, 'rmTabEditor_${idx}')"><b>B</b></button>
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('italic', null, 'rmTabEditor_${idx}')"><i>I</i></button>
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('underline', null, 'rmTabEditor_${idx}')"><u>U</u></button>
          <button type="button" class="fmt-btn" onmousedown="event.preventDefault(); app.execWysiwyg('insertUnorderedList', null, 'rmTabEditor_${idx}')">• List</button>
        </div>

        <div id="rmTabEditor_${idx}" class="wysiwyg-editor" contenteditable="true" style="min-height:75px; max-height:140px;">${tab.content}</div>
      </div>
    `).join('');
  }

  addAdminRecipeCustomTab() {
    if (this.editingRecipeTabs.length >= 4) {
      this.showToast('Maximum 4 Custom Tabs allowed per recipe combo!', 'error');
      return;
    }
    this.syncCurrentAdminRecipeTabsState();
    this.editingRecipeTabs.push({ title: `Tab #${this.editingRecipeTabs.length + 1}`, content: 'Type tab content here...' });
    this.renderAdminRecipeCustomTabsForm(this.editingRecipeTabs);
  }

  deleteAdminRecipeCustomTab(index) {
    this.syncCurrentAdminRecipeTabsState();
    this.editingRecipeTabs.splice(index, 1);
    this.renderAdminRecipeCustomTabsForm(this.editingRecipeTabs);
  }

  syncCurrentAdminRecipeTabsState() {
    const updated = [];
    const container = document.getElementById('adminRecipeCustomTabsContainer');
    if (!container) return;

    const boxes = container.querySelectorAll('.admin-recipe-tab-editor-box');
    boxes.forEach((box, idx) => {
      const titleInput = document.getElementById(`adminRecipeTabTitle_${idx}`);
      const contentEditor = document.getElementById(`rmTabEditor_${idx}`);
      updated.push({
        title: titleInput ? titleInput.value : `Tab #${idx+1}`,
        content: contentEditor ? contentEditor.innerHTML : ''
      });
    });
    this.editingRecipeTabs = updated;
  }

  // --- STOREFRONT RECIPE PAIRINGS & COMBO ENGINE ---
  renderHomepageRecipes() {
    const grid = document.getElementById('recipeHomepageGrid');
    if (!grid) return;

    const homepageRecipes = this.recipes.filter(r => (r.displayLocation || 'homepage') === 'homepage');

    if (homepageRecipes.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-muted);">No homepage recipe combos configured.</div>`;
      return;
    }

    grid.innerHTML = homepageRecipes.map(recipe => {
      const prods = (recipe.productIds || []).map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
      const originalTotal = prods.reduce((sum, p) => sum + (p.price || 0), 0);
      const comboPrice = recipe.comboPrice || originalTotal;
      const discountPct = (originalTotal > comboPrice) ? Math.round(((originalTotal - comboPrice) / originalTotal) * 100) : 0;

      return `
        <div class="recipe-card">
          <div class="recipe-header-img" style="background-image: url('${recipe.image || 'assets/turmeric.jpg'}');">
            <span class="recipe-tag"><i class="fa-solid fa-fire-flame-curved"></i> ${recipe.tag || 'Recipe Bundle'}</span>
            ${discountPct > 0 ? `<span class="badge-tag" style="background:#FEF3C7; color:#B45309; font-weight:800; font-size:0.75rem; position:relative; z-index:2;">Save ${discountPct}% OFF</span>` : ''}
          </div>
          <div class="recipe-body">
            <h3 class="recipe-title">${recipe.title}</h3>
            <p class="recipe-desc">${recipe.desc}</p>
            
            <div style="font-size:0.75rem; font-weight:700; color:var(--primary); text-transform:uppercase; margin-bottom:0.35rem;">Included Products in Combo:</div>
            <ul class="ingredient-list">
              ${prods.map(p => `<li class="ingredient-item"><i class="fa-solid fa-check-double"></i> ${p.name} (${this.formatPrice(p.price)})</li>`).join('')}
            </ul>

            <div style="display:flex; justify-content:space-between; align-items:baseline; margin: 0.75rem 0;">
              <div>
                <span style="font-size:0.78rem; text-decoration:line-through; color:var(--text-light); margin-right:0.4rem;">${this.formatPrice(originalTotal)}</span>
                <span style="font-family:var(--font-heading); font-size:1.4rem; font-weight:800; color:var(--primary-dark);">${this.formatPrice(comboPrice)}</span>
              </div>
              ${discountPct > 0 ? `<span style="font-size:0.75rem; font-weight:800; color:var(--accent-earth);">${discountPct}% Bundle Discount</span>` : ''}
            </div>

            <div style="display:flex; gap:0.5rem; margin-top:auto;">
              <button class="btn-secondary" style="flex:1; padding:0.6rem; font-size:0.82rem;" onclick="app.openComboDetailModal('${recipe.id}')">
                <i class="fa-solid fa-eye"></i> Details
              </button>
              <button class="add-recipe-spices-btn" style="flex:2;" onclick="app.addRecipeComboToCart('${recipe.id}')">
                <i class="fa-solid fa-cart-plus"></i> Add Combo (${this.formatPrice(comboPrice)})
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  updateNavComboPageLink() {
    const navItem = document.getElementById('navComboPageItem');
    if (navItem) navItem.style.display = 'inline-block';
    this.renderDedicatedCombos();
  }

  // --- FULL PAGE DEDICATED COMBOS CATALOG RENDERER ---
  renderDedicatedCombos() {
    const grid = document.getElementById('dedicatedCombosGrid');
    if (!grid) return;

    const dedicatedRecipes = this.recipes.filter(r => r.displayLocation === 'dedicated_page');

    if (dedicatedRecipes.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; color:var(--text-muted);">No dedicated combo packages currently active.</div>`;
      return;
    }

    grid.innerHTML = dedicatedRecipes.map(recipe => {
      const prods = (recipe.productIds || []).map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
      const originalTotal = prods.reduce((sum, p) => sum + (p.price || 0), 0);
      const comboPrice = recipe.comboPrice || originalTotal;
      const discountPct = (originalTotal > comboPrice) ? Math.round(((originalTotal - comboPrice) / originalTotal) * 100) : 0;

      return `
        <div class="product-card" onclick="app.openComboDetailModal('${recipe.id}')">
          <div class="card-image-wrap">
            <img src="${recipe.image || 'assets/turmeric.jpg'}" alt="${recipe.title}" loading="lazy">
            <div class="product-badge-group">
              <span class="badge-tag badge-gold"><i class="fa-solid fa-fire"></i> ${recipe.tag || 'Exclusive Combo'}</span>
              ${discountPct > 0 ? `<span class="badge-tag" style="background:#FEF3C7; color:#B45309; font-weight:800;">Save ${discountPct}% OFF</span>` : ''}
            </div>
            <button class="quick-view-overlay-btn" onclick="event.stopPropagation(); app.openComboDetailModal('${recipe.id}')">
              <i class="fa-solid fa-eye"></i> View Full Details
            </button>
          </div>
          <div class="product-info">
            <div class="product-cat">Combo Package • ${prods.length} Products Included</div>
            <h3 class="product-name">${recipe.title}</h3>
            
            <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.65rem;">
              ${recipe.desc ? recipe.desc.substring(0, 75) + '...' : 'Handcrafted organic combo bundle.'}
            </div>

            <div style="font-size:0.72rem; font-weight:700; color:var(--primary); text-transform:uppercase; margin-bottom:0.25rem;">Includes:</div>
            <div style="font-size:0.78rem; font-weight:600; color:var(--text-main); margin-bottom:0.75rem;">
              ${prods.map(p => p.name).join(' + ')}
            </div>

            <div class="product-bottom-row">
              <div class="product-price-wrap">
                <span class="original-price">${this.formatPrice(originalTotal)}</span>
                <span class="current-price">${this.formatPrice(comboPrice)}</span>
              </div>
              <button class="add-cart-btn" onclick="event.stopPropagation(); app.addRecipeComboToCart('${recipe.id}')">
                <i class="fa-solid fa-cart-plus"></i> Add Combo
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  openComboPage() {
    const homeContent = document.getElementById('homePageContent');
    const comboPageView = document.getElementById('dedicatedCombosPageView');
    if (!comboPageView) return;

    if (homeContent) homeContent.style.display = 'none';
    comboPageView.style.display = 'block';

    this.renderDedicatedCombos();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showHomePage() {
    const homeContent = document.getElementById('homePageContent');
    const comboPageView = document.getElementById('dedicatedCombosPageView');

    if (comboPageView) comboPageView.style.display = 'none';
    if (homeContent) homeContent.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- RICH FULL DETAIL MODAL FOR RECIPE COMBOS ---
  openComboDetailModal(recipeId) {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const prods = (recipe.productIds || []).map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
    const originalTotal = prods.reduce((sum, p) => sum + (p.price || 0), 0);
    const comboPrice = recipe.comboPrice || originalTotal;
    const discountPct = (originalTotal > comboPrice) ? Math.round(((originalTotal - comboPrice) / originalTotal) * 100) : 0;

    document.getElementById('comboDetailImage').src = recipe.image || 'assets/turmeric.jpg';
    document.getElementById('comboDetailTag').textContent = recipe.tag || 'Exclusive Combo';
    document.getElementById('comboDetailDiscountBadge').textContent = `Save ${discountPct}% OFF`;
    document.getElementById('comboDetailTitle').textContent = recipe.title;
    document.getElementById('comboDetailOriginalPrice').textContent = this.formatPrice(originalTotal);
    document.getElementById('comboDetailPrice').textContent = this.formatPrice(comboPrice);

    // Marquee Header
    const marqueeContent = document.getElementById('comboDetailMarqueeContent');
    if (marqueeContent) marqueeContent.textContent = this.globalSettings.marquee || DEFAULT_GLOBAL_SETTINGS.marquee;

    // Render 4 Trust Badges
    const trustGrid = document.getElementById('comboDetailTrustGrid');
    if (trustGrid) {
      const badges = (this.globalSettings.badges && this.globalSettings.badges.length > 0) 
        ? this.globalSettings.badges.slice(0, 4) 
        : DEFAULT_GLOBAL_SETTINGS.badges;

      trustGrid.innerHTML = badges.map(b => `
        <div class="trust-badge-item">
          <div class="trust-badge-icon"><i class="fa-solid ${b.icon}"></i></div>
          <div class="trust-badge-title">${b.title}</div>
          <div class="trust-badge-sub">${b.sub}</div>
        </div>
      `).join('');
    }

    // Rich Description
    const descBox = document.getElementById('comboDetailDescriptionBox');
    if (descBox) descBox.innerHTML = recipe.desc || 'Exclusive organic recipe combo package.';

    // 2-Column Products Grid
    const prodsGrid = document.getElementById('comboDetailProductsGrid');
    if (prodsGrid) {
      prodsGrid.innerHTML = prods.map(p => `
        <div class="combo-product-item-card">
          <img src="${p.image}" class="combo-product-item-img" alt="${p.name}">
          <div class="combo-product-item-info">
            <span style="font-size:0.7rem; color:var(--primary); font-weight:700;">${p.category}</span>
            <strong style="font-size:0.9rem; color:var(--primary-deep);">${p.name}</strong>
            <span style="font-size:0.85rem; font-weight:800; color:var(--primary-dark); margin-top:0.25rem;">${this.formatPrice(p.price)}</span>
          </div>
        </div>
      `).join('');
    }

    // Render Custom Tabs (e.g. 🌱 Combo Details, 🔬 Purity & Usage)
    const tabsHeader = document.getElementById('comboDetailTabsHeader');
    const tabsBody = document.getElementById('comboDetailTabsBody');

    const comboTabs = (recipe.customTabs && recipe.customTabs.length > 0)
      ? recipe.customTabs
      : [
          { title: '🌱 Combo Package Info', content: `<b>${recipe.title}</b><br>${recipe.desc}<br><br>Includes <b>${prods.length} products</b>: ${prods.map(p => p.name).join(', ')}.` },
          { title: '🔬 Purity & Guarantee', content: '<b>100% Pesticide Free 0.00% Lab Tested.</b><br>Sourced directly from Lucknow Agri Cooperatives and Western Ghats Indigenous Farmers.' }
        ];

    if (tabsHeader && tabsBody) {
      tabsHeader.innerHTML = comboTabs.map((t, idx) => `
        <button class="custom-tab-btn ${idx === 0 ? 'active' : ''}" onclick="app.switchComboDetailTab(${idx})">
          ${t.title}
        </button>
      `).join('');
      tabsBody.innerHTML = comboTabs[0] ? comboTabs[0].content : '';
      this.currentComboTabs = comboTabs;
    }

    const buyBtn = document.getElementById('comboDetailAddToCartBtn');
    if (buyBtn) {
      buyBtn.onclick = () => {
        this.addRecipeComboToCart(recipe.id);
        this.closeComboDetailModal();
      };
    }

    const modal = document.getElementById('comboDetailModal');
    if (modal) modal.classList.add('open');
  }

  switchComboDetailTab(idx) {
    if (!this.currentComboTabs || !this.currentComboTabs[idx]) return;

    document.querySelectorAll('#comboDetailTabsHeader .custom-tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
    });

    const bodyEl = document.getElementById('comboDetailTabsBody');
    if (bodyEl) bodyEl.innerHTML = this.currentComboTabs[idx].content;
  }

  closeComboDetailModal() {
    const modal = document.getElementById('comboDetailModal');
    if (modal) modal.classList.remove('open');
  }

  // --- ADD COMBO BUNDLE TO CART AT DISCOUNTED OFFER PRICE ---
  addRecipeComboToCart(recipeId) {
    const recipe = this.recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const prods = (recipe.productIds || []).map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
    const originalSum = prods.reduce((sum, p) => sum + (p.price || 0), 0);
    const finalComboPrice = recipe.comboPrice || originalSum;

    const comboCartItem = {
      id: recipe.id,
      name: `🎁 Combo: ${recipe.title}`,
      category: 'Combo Bundle',
      price: finalComboPrice,
      originalPrice: originalSum,
      image: recipe.image || (prods[0] ? prods[0].image : 'assets/turmeric.jpg'),
      quantity: 1,
      inStock: true
    };

    const existing = this.cart.find(item => item.id === comboCartItem.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push(comboCartItem);
    }

    this.saveCart();
    this.showToast(`Added "${recipe.title}" combo package to your cart!`);
    this.openCartDrawer();
  }

  // --- ADMIN RECIPE COMBOS MANAGER ---
  renderAdminRecipesTable() {
    const body = document.getElementById('adminRecipesTable');
    if (!body) return;

    body.innerHTML = this.recipes.map(r => {
      const prods = (r.productIds || []).map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
      const originalTotal = prods.reduce((sum, p) => sum + (p.price || 0), 0);
      const comboPrice = r.comboPrice || originalTotal;
      const discountPct = (originalTotal > comboPrice) ? Math.round(((originalTotal - comboPrice) / originalTotal) * 100) : 0;

      return `
        <tr>
          <td><img src="${r.image}" style="width:44px; height:44px; border-radius:6px; object-fit:cover;"></td>
          <td><strong>${r.title}</strong><br><span style="font-size:0.75rem; color:var(--text-light);">${r.id}</span></td>
          <td><span class="badge-tag badge-gold" style="font-size:0.7rem;">${r.tag}</span></td>
          <td>${prods.length} Products<br><span style="font-size:0.72rem; color:var(--primary); font-weight:700;">${prods.map(p => p.name).join(', ')}</span></td>
          <td><span style="text-decoration:line-through; color:var(--text-light);">${this.formatPrice(originalTotal)}</span></td>
          <td><strong style="color:var(--primary-dark); font-size:0.95rem;">${this.formatPrice(comboPrice)}</strong></td>
          <td><span class="badge-tag" style="background:#FEF3C7; color:#B45309; font-weight:800;">${discountPct}% OFF</span></td>
          <td><span class="badge-tag badge-organic" style="font-size:0.7rem;">${r.displayLocation === 'dedicated_page' ? '⭐ Dedicated Page' : '🏠 Homepage'}</span></td>
          <td>
            <div style="display:flex; gap:0.5rem;">
              <button onclick="app.openEditRecipeModal('${r.id}')" style="color:var(--primary-dark); font-weight:700;" title="Edit Recipe Combo">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button onclick="app.deleteRecipeCombo('${r.id}')" style="color:#EF4444; font-weight:700;" title="Delete Recipe Combo">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openAddRecipeModal() {
    document.getElementById('rmRecipeId').value = '';
    document.getElementById('rmTitle').value = '';
    document.getElementById('rmTag').value = 'Immunity Boost';
    document.getElementById('rmImage').value = 'assets/turmeric.jpg';
    document.getElementById('rmDesc').value = '';
    document.getElementById('rmComboPrice').value = '';
    document.getElementById('rmDisplayLocation').value = 'homepage';
    
    document.getElementById('recipeModalTitle').textContent = 'Create New Recipe Pairing Combo';
    this.renderRecipeProductCheckboxList([]);
    this.calculateRecipeDiscountLive();

    this.renderAdminRecipeCustomTabsForm([
      { title: '🌱 Combo Package Info', content: 'Handcrafted organic recipe bundle.' },
      { title: '🔬 Purity & Guarantee', content: '100% Pesticide Free 0.00% Lab Tested.' }
    ]);

    const modal = document.getElementById('recipeModal');
    if (modal) modal.classList.add('open');
  }

  openEditRecipeModal(recipeId) {
    const r = this.recipes.find(rec => rec.id === recipeId);
    if (!r) return;

    document.getElementById('rmRecipeId').value = r.id;
    document.getElementById('rmTitle').value = r.title || '';
    document.getElementById('rmTag').value = r.tag || 'Immunity Boost';
    document.getElementById('rmImage').value = r.image || 'assets/turmeric.jpg';
    document.getElementById('rmDesc').value = r.desc || '';
    document.getElementById('rmComboPrice').value = r.comboPrice || '';
    document.getElementById('rmDisplayLocation').value = r.displayLocation || 'homepage';

    document.getElementById('recipeModalTitle').textContent = `Edit Combo: ${r.title}`;
    this.renderRecipeProductCheckboxList(r.productIds || []);
    this.calculateRecipeDiscountLive();

    this.renderAdminRecipeCustomTabsForm(r.customTabs || []);

    const modal = document.getElementById('recipeModal');
    if (modal) modal.classList.add('open');
  }

  closeRecipeModal() {
    const modal = document.getElementById('recipeModal');
    if (modal) modal.classList.remove('open');
  }

  renderRecipeProductCheckboxList(selectedIds = [], query = '') {
    const container = document.getElementById('rmProductCheckboxList');
    if (!container) return;

    const filtered = this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
      container.innerHTML = `<div style="font-size:0.78rem; color:var(--text-light); padding:0.4rem;">No matching catalog products found.</div>`;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const isChecked = selectedIds.includes(p.id);
      return `
        <label style="display:flex; align-items:center; gap:0.5rem; padding:0.35rem 0.2rem; border-bottom:1px solid var(--border-subtle); cursor:pointer; font-size:0.82rem;">
          <input type="checkbox" class="rm-product-checkbox" value="${p.id}" ${isChecked ? 'checked' : ''} onchange="app.calculateRecipeDiscountLive()">
          <img src="${p.image}" style="width:28px; height:28px; border-radius:4px; object-fit:cover;">
          <span style="font-weight:700; flex:1;">${p.name}</span>
          <span style="font-weight:800; color:var(--primary-dark);">₹${p.price}</span>
        </label>
      `;
    }).join('');
  }

  filterRecipeProductList(query) {
    const selectedIds = Array.from(document.querySelectorAll('.rm-product-checkbox:checked')).map(cb => cb.value);
    this.renderRecipeProductCheckboxList(selectedIds, query);
  }

  calculateRecipeDiscountLive() {
    const checkedBoxes = document.querySelectorAll('.rm-product-checkbox:checked');
    const selectedIds = Array.from(checkedBoxes).map(cb => cb.value);

    const prods = selectedIds.map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
    const originalTotal = prods.reduce((sum, p) => sum + (p.price || 0), 0);

    const comboPriceInput = document.getElementById('rmComboPrice');
    const comboPrice = parseFloat(comboPriceInput.value) || originalTotal;

    const discountPct = (originalTotal > 0 && originalTotal > comboPrice) 
      ? Math.round(((originalTotal - comboPrice) / originalTotal) * 100) 
      : 0;

    const totalDisplay = document.getElementById('rmOriginalTotalDisplay');
    const discountDisplay = document.getElementById('rmDiscountDisplay');

    if (totalDisplay) totalDisplay.textContent = `Original Total: ₹${originalTotal}`;
    if (discountDisplay) discountDisplay.textContent = `${discountPct}% OFF`;
  }

  async saveRecipeFromForm() {
    try {
      const id = document.getElementById('rmRecipeId').value;
      const title = document.getElementById('rmTitle').value || 'Organic Combo Package';
      const tag = document.getElementById('rmTag').value || 'Special Combo';
      const image = document.getElementById('rmImage').value || 'assets/turmeric.jpg';
      const desc = document.getElementById('rmDesc').value || 'Exclusive organic recipe combo bundle.';
      const comboPriceInput = document.getElementById('rmComboPrice').value;
      const displayLocation = document.getElementById('rmDisplayLocation').value || 'homepage';

      const selectedIds = Array.from(document.querySelectorAll('.rm-product-checkbox:checked')).map(cb => cb.value);

      if (selectedIds.length === 0) {
        this.showToast('Please select at least 1 product for this combo!', 'error');
        return;
      }

      const prods = selectedIds.map(pid => this.products.find(p => p.id === pid)).filter(Boolean);
      const originalSum = prods.reduce((sum, p) => sum + (p.price || 0), 0);
      const comboPrice = parseFloat(comboPriceInput) || originalSum;

      // Read custom tabs from recipe form
      this.syncCurrentAdminRecipeTabsState();
      const customTabs = this.editingRecipeTabs;

      let targetRecipe;

      if (id) {
        targetRecipe = this.recipes.find(r => r.id === id);
        if (targetRecipe) {
          Object.assign(targetRecipe, { title, tag, image, desc, productIds: selectedIds, comboPrice, displayLocation, customTabs });
          this.showToast(`Updated recipe combo "${title}"!`);
        }
      } else {
        targetRecipe = {
          id: `rec_${Date.now()}`,
          title,
          tag,
          image,
          desc,
          productIds: selectedIds,
          comboPrice,
          displayLocation,
          customTabs
        };
        this.recipes.unshift(targetRecipe);
        this.showToast(`Added new recipe combo "${title}"!`);
      }

      this.saveRecipes();
      await this.saveRecipesToSupabase(targetRecipe);
      this.closeRecipeModal();
    } catch (err) {
      console.error('Recipe save error:', err);
      this.showToast('Saved recipe combo locally!');
      this.closeRecipeModal();
    }
  }

  async deleteRecipeCombo(recipeId) {
    const r = this.recipes.find(rec => rec.id === recipeId);
    if (!r) return;

    if (confirm(`Are you sure you want to delete "${r.title}"?`)) {
      this.recipes = this.recipes.filter(rec => rec.id !== recipeId);
      this.saveRecipes();
      if (this.supabase) {
        await this.supabase.from('recipe_combos').delete().eq('id', recipeId);
      }
      this.showToast(`Deleted "${r.title}".`);
    }
  }

  saveRecipes() {
    localStorage.setItem('hotspy_recipes', JSON.stringify(this.recipes));
    this.renderHomepageRecipes();
    this.updateNavComboPageLink();
    this.renderAdminRecipesTable();
  }

  async fetchRecipesFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('recipe_combos').select('*');
      if (error) return;
      if (data && data.length > 0) {
        this.recipes = data.map(r => {
          let parsedTabs = [];
          if (r.custom_tabs) {
            try {
              parsedTabs = typeof r.custom_tabs === 'string' ? JSON.parse(r.custom_tabs) : r.custom_tabs;
            } catch(e) {}
          }
          return {
            id: r.id,
            title: r.title,
            tag: r.tag || 'Immunity Boost',
            image: r.image || 'assets/turmeric.jpg',
            desc: r.description || r.desc || '',
            productIds: r.product_ids ? (typeof r.product_ids === 'string' ? JSON.parse(r.product_ids) : r.product_ids) : [],
            comboPrice: r.combo_price || 0,
            displayLocation: r.display_location || 'homepage',
            customTabs: parsedTabs
          };
        });
        this.saveRecipes();
      }
    } catch (err) {
      console.log('Supabase fetch recipes note:', err);
    }
  }

  async saveRecipesToSupabase(recipe) {
    if (!this.supabase) return;
    try {
      const payload = {
        id: recipe.id,
        title: recipe.title,
        tag: recipe.tag,
        image: recipe.image,
        description: recipe.desc,
        product_ids: JSON.stringify(recipe.productIds || []),
        combo_price: recipe.comboPrice,
        display_location: recipe.displayLocation
      };

      if (recipe.customTabs !== undefined) payload.custom_tabs = JSON.stringify(recipe.customTabs);

      const { error } = await this.supabase.from('recipe_combos').upsert(payload);
      if (error) {
        console.log('Supabase recipe upsert note:', error.message);
        if (error.message && error.message.includes('custom_tabs')) {
          delete payload.custom_tabs;
          await this.supabase.from('recipe_combos').upsert(payload);
        }
      }
    } catch (err) {
      console.log('Supabase save recipe note:', err);
    }
  }

  // --- ADMIN SIDEBAR TAB SWITCHER ---
  switchAdminTab(tabName, event) {
    if (event) event.preventDefault();

    document.querySelectorAll('.admin-menu-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.tab === tabName) link.classList.add('active');
    });

    const secDash = document.getElementById('adminSectionDashboard');
    const secProd = document.getElementById('adminSectionProducts');
    const secRec = document.getElementById('adminSectionRecipes');
    const secOrd = document.getElementById('adminSectionOrders');
    const pageTitle = document.getElementById('adminPageTitle');
    const pageSub = document.getElementById('adminPageSub');

    if (tabName === 'dashboard') {
      secDash.style.display = 'block';
      secProd.style.display = 'block';
      if (secRec) secRec.style.display = 'block';
      secOrd.style.display = 'block';
      pageTitle.textContent = 'Executive Control Center';
      pageSub.textContent = 'Real-time sales analytics and live catalog management engine.';
    } else if (tabName === 'products') {
      secDash.style.display = 'none';
      secProd.style.display = 'block';
      if (secRec) secRec.style.display = 'none';
      secOrd.style.display = 'none';
      pageTitle.textContent = 'Product Catalog Manager';
      pageSub.textContent = 'Add, edit, delete, and control stock status of your organic catalog.';
    } else if (tabName === 'recipes') {
      secDash.style.display = 'none';
      secProd.style.display = 'none';
      if (secRec) secRec.style.display = 'block';
      const secTrace = document.getElementById('adminSectionTraceability');
      if (secTrace) secTrace.style.display = 'none';
      secOrd.style.display = 'none';
      pageTitle.textContent = 'Recipe Pairings & Combo Bundles Manager';
      pageSub.textContent = 'Create recipe pairings, choose combo products, set offer prices, and calculate discount % live.';
      this.renderAdminRecipesTable();
    } else if (tabName === 'traceability') {
      secDash.style.display = 'none';
      secProd.style.display = 'none';
      if (secRec) secRec.style.display = 'none';
      const secTrace = document.getElementById('adminSectionTraceability');
      if (secTrace) secTrace.style.display = 'block';
      secOrd.style.display = 'none';
      pageTitle.textContent = 'Farm Traceability & Batch Records';
      pageSub.textContent = 'Manage purity certificates, harvest dates, and partner farm origins for your batch codes.';
      this.renderAdminBatchTable();
    } else if (tabName === 'orders') {
      secDash.style.display = 'none';
      secProd.style.display = 'none';
      if (secRec) secRec.style.display = 'none';
      const secTrace = document.getElementById('adminSectionTraceability');
      if (secTrace) secTrace.style.display = 'none';
      secOrd.style.display = 'block';
      pageTitle.textContent = 'Customer Orders Management';
      pageSub.textContent = 'Track incoming customer orders and change fulfillment status in real-time.';
    }
  }

  // --- SUPABASE SYNC METHODS WITH LOCAL MERGE PROTECTION ---
  async fetchProductsFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('products').select('*');
      if (error) {
        console.log('Supabase products fetch note:', error);
        return;
      }
      if (data && data.length > 0) {
        this.products = data.map(item => {
          const existingLocal = this.products.find(p => p.id === item.id) || {};
          
          let parsedTabs = existingLocal.customTabs || [];
          if (item.custom_tabs) {
            try {
              parsedTabs = typeof item.custom_tabs === 'string' ? JSON.parse(item.custom_tabs) : item.custom_tabs;
            } catch(e) {}
          }
          if (!parsedTabs || parsedTabs.length === 0) {
            parsedTabs = existingLocal.customTabs || [
              { title: '🌱 Ingredients & Source', content: '100% Organic Certified Sourced' },
              { title: '🔬 Lab Certificate & Usage', content: 'Pesticide 0.00% Lab Tested' }
            ];
          }

          return {
            id: item.id,
            name: item.name || existingLocal.name,
            category: item.category || existingLocal.category,
            price: item.price || existingLocal.price,
            originalPrice: item.original_price || item.price || existingLocal.originalPrice,
            rating: item.rating || existingLocal.rating || 5.0,
            reviews: item.reviews || existingLocal.reviews || 0,
            image: item.image || existingLocal.image,
            badge: item.badge || existingLocal.badge || '100% Organic',
            origin: item.origin || existingLocal.origin || 'Lucknow Farm',
            batchNo: item.batch_no || existingLocal.batchNo || 'HS-LKO-2026',
            inStock: item.in_stock !== false,
            customMarquee: item.custom_marquee !== undefined ? item.custom_marquee : (existingLocal.customMarquee || ''),
            customTabs: parsedTabs,
            desc: item.description || existingLocal.desc || ''
          };
        });
        this.saveProducts(false);
      }
    } catch (err) {
      console.log('Supabase products fetch note:', err);
    }
  }

  async fetchOrdersFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) return;
      if (data && data.length > 0) {
        this.orders = data.map(o => ({
          id: o.id,
          customer: o.customer_name,
          total: o.total_amount,
          itemsCount: o.items_count,
          date: o.created_at ? o.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          status: o.status || 'Pending'
        }));
        this.saveOrders(false);
        this.renderAdminTables();
      }
    } catch (err) {
      console.log('Supabase orders fetch note:', err);
    }
  }

  async saveProductsToSupabase(product) {
    if (!this.supabase) return;
    try {
      const payload = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        badge: product.badge,
        origin: product.origin,
        batch_no: product.batchNo,
        in_stock: product.inStock,
        description: product.desc
      };
      
      if (product.customMarquee !== undefined) payload.custom_marquee = product.customMarquee;
      if (product.customTabs !== undefined) payload.custom_tabs = JSON.stringify(product.customTabs);

      const { error } = await this.supabase.from('products').upsert(payload);
      if (error) {
        console.log('Supabase upsert note:', error.message);
        // Fallback retry if custom columns do not exist in remote schema yet
        if (error.message && (error.message.includes('custom_tabs') || error.message.includes('custom_marquee'))) {
          delete payload.custom_marquee;
          delete payload.custom_tabs;
          await this.supabase.from('products').upsert(payload);
        }
      }
    } catch (err) {
      console.log('Supabase save product note:', err);
    }
  }

  saveProducts(syncSupabase = true) {
    localStorage.setItem('hotspy_products', JSON.stringify(this.products));
    this.renderProducts();
    this.renderAdminTables();
    const countEl = document.getElementById('adminTotalProducts');
    if (countEl) countEl.textContent = this.products.length;
  }

  renderAdminTables() {
    const tableProd = document.getElementById('adminProductTable');
    if (tableProd) {
      tableProd.innerHTML = this.products.map(p => `
        <tr>
          <td><img src="${p.image}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;"></td>
          <td><strong>${p.name}</strong><br><span style="font-size:0.75rem; color:var(--text-light);">${p.id}</span></td>
          <td>${p.category}</td>
          <td><strong>${this.formatPrice(p.price)}</strong></td>
          <td><span class="badge-tag ${p.inStock ? 'badge-organic' : ''}" style="${!p.inStock ? 'background:#FEE2E2; color:#DC2626;' : ''}">${p.inStock ? 'In Stock' : 'Out of Stock'}</span></td>
          <td>
            <div style="display:flex; gap:0.5rem;">
              <button onclick="app.toggleProductStock('${p.id}')" style="color:var(--primary);" title="Toggle Stock"><i class="fa-solid fa-rotate"></i></button>
              <button onclick="app.openEditProductModal('${p.id}')" style="color:var(--primary-dark);" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
              <button onclick="app.deleteProduct('${p.id}')" style="color:#EF4444;" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    this.renderAdminRecipesTable();
    this.renderAdminBatchTable();
    this.renderAdminUsersTable();
    this.renderAdminOrdersTable();
  }

  renderAdminOrdersTable() {
    const body = document.getElementById('adminOrdersTable');
    if (!body) return;

    if (this.orders.length === 0) {
      body.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No customer orders placed yet.</td></tr>`;
      return;
    }

    body.innerHTML = this.orders.map(o => {
      let items = [];
      try {
        items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
      } catch(e) {}

      const custName = o.customer_name || o.customer || 'Customer';
      const totalAmt = o.total_amount || o.total || 0;

      return `
        <tr>
          <td><strong style="color:var(--primary-dark); font-family:var(--font-heading);">${o.id}</strong></td>
          <td><strong>${custName}</strong><br><span style="font-size:0.75rem; color:var(--text-light);">${o.customer_mobile ? '+91 ' + o.customer_mobile : ''}</span></td>
          <td>${items ? items.length : 1} Items</td>
          <td><strong style="color:var(--primary-deep);">${this.formatPrice(totalAmt)}</strong></td>
          <td>${o.created_at ? new Date(o.created_at).toLocaleDateString() : o.date}</td>
          <td><span class="badge-tag badge-organic">${o.status || 'Pending'}</span></td>
          <td>
            <button onclick="app.openOrderInvoicePage('${o.id}')" class="btn-secondary" style="padding:0.3rem 0.65rem; font-size:0.75rem;">
              <i class="fa-solid fa-receipt"></i> View Invoice
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  saveCart() {
    localStorage.setItem('hotspy_cart', JSON.stringify(this.cart));
    this.updateCartUI();
  }

  saveWishlist() {
    localStorage.setItem('hotspy_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistCount();
  }

  saveOrders(syncLocal = true) {
    localStorage.setItem('hotspy_orders', JSON.stringify(this.orders));
    const countOrders = document.getElementById('adminTotalOrders');
    const revEl = document.getElementById('adminRevenueVal');
    if (countOrders) countOrders.textContent = this.orders.length;
    
    const totalRev = this.orders.reduce((sum, o) => sum + (o.total || 0), 0);
    if (revEl) revEl.textContent = this.formatPrice(totalRev || 148900);
  }

  // --- PRODUCT CRUD OPERATIONS ---
  openAddProductModal() {
    const modal = document.getElementById('productModal');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productModalTitle');
    const editor = document.getElementById('pmDescEditor');
    
    if (form) form.reset();
    document.getElementById('pmProductId').value = '';
    document.getElementById('pmCustomMarquee').value = '';
    if (editor) editor.innerHTML = '';
    if (title) title.textContent = 'Add New Organic Product';
    this.updateWysiwygToolbarState();

    this.renderAdminCustomTabsForm([
      { title: '🌱 Ingredients & Source', content: '100% Organic Certified Sourced' },
      { title: '🔬 Lab Certificate & Usage', content: 'Pesticide 0.00% Lab Tested' }
    ]);

    if (modal) modal.classList.add('open');
  }

  openEditProductModal(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    document.getElementById('pmProductId').value = prod.id;
    document.getElementById('pmName').value = prod.name;
    document.getElementById('pmCategory').value = prod.category;
    document.getElementById('pmPrice').value = prod.price;
    document.getElementById('pmOriginalPrice').value = prod.originalPrice;
    document.getElementById('pmBadge').value = prod.badge;
    document.getElementById('pmOrigin').value = prod.origin;
    document.getElementById('pmBatchNo').value = prod.batchNo;
    document.getElementById('pmImage').value = prod.image;
    document.getElementById('pmCustomMarquee').value = prod.customMarquee || '';
    
    const editor = document.getElementById('pmDescEditor');
    if (editor) editor.innerHTML = prod.desc || '';

    const title = document.getElementById('productModalTitle');
    if (title) title.textContent = `Edit Product: ${prod.name}`;

    this.updateWysiwygToolbarState();

    // Render Admin Custom Tabs Form for this product
    this.renderAdminCustomTabsForm(prod.customTabs || []);

    const modal = document.getElementById('productModal');
    if (modal) modal.classList.add('open');
  }

  closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.classList.remove('open');
  }

  async saveProductFromForm() {
    const id = document.getElementById('pmProductId').value;
    const name = document.getElementById('pmName').value;
    const category = document.getElementById('pmCategory').value;
    const price = parseFloat(document.getElementById('pmPrice').value);
    const originalPrice = parseFloat(document.getElementById('pmOriginalPrice').value);
    const badge = document.getElementById('pmBadge').value;
    const origin = document.getElementById('pmOrigin').value;
    const batchNo = document.getElementById('pmBatchNo').value;
    const image = document.getElementById('pmImage').value || 'assets/turmeric.jpg';
    const customMarquee = document.getElementById('pmCustomMarquee').value || '';
    
    const editor = document.getElementById('pmDescEditor');
    const desc = editor ? editor.innerHTML : '';

    // Read custom tabs from form
    this.syncCurrentAdminTabsState();
    const customTabs = this.editingProductTabs;

    let targetProd;

    if (id) {
      targetProd = this.products.find(p => p.id === id);
      if (targetProd) {
        Object.assign(targetProd, { name, category, price, originalPrice, badge, origin, batchNo, image, customMarquee, customTabs, desc });
        this.showToast(`Updated product "${name}"!`);
      }
    } else {
      targetProd = {
        id: `prod_${Date.now()}`,
        name,
        category,
        price,
        originalPrice,
        rating: 5.0,
        reviews: 1,
        image,
        badge,
        origin,
        batchNo,
        customMarquee,
        customTabs,
        inStock: true,
        desc
      };
      this.products.unshift(targetProd);
      this.showToast(`Added new product "${name}" to catalog!`);
    }

    this.saveProducts();
    await this.saveProductsToSupabase(targetProd);
    this.closeProductModal();
  }

  async deleteProduct(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    if (confirm(`Are you sure you want to delete "${prod.name}" from the catalog?`)) {
      this.products = this.products.filter(p => p.id !== productId);
      this.saveProducts();
      if (this.supabase) {
        await this.supabase.from('products').delete().eq('id', productId);
      }
      this.showToast(`Deleted "${prod.name}" from catalog.`);
    }
  }

  async toggleProductStock(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    prod.inStock = !prod.inStock;
    this.saveProducts();
    await this.saveProductsToSupabase(prod);
    this.showToast(`Stock updated for "${prod.name}" (${prod.inStock ? 'In Stock' : 'Out of Stock'})`);
  }

  promptSupabaseConfig() {
    this.showToast("Supabase Cloud Sync active! (nmzwenbwgccwaokywthe.supabase.co)");
  }

  // --- MOBILE NAV CONTROLLER ---
  toggleMobileNav() {
    const menu = document.getElementById('mobileNavMenu');
    const icon = document.getElementById('hamburgerIcon');
    if (!menu) return;

    menu.classList.toggle('open');
    if (menu.classList.contains('open')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  }

  closeMobileNav() {
    const menu = document.getElementById('mobileNavMenu');
    const icon = document.getElementById('hamburgerIcon');
    if (menu && menu.classList.contains('open')) {
      menu.classList.remove('open');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  }

  // --- CURRENCY FORMATTER ---
  formatPrice(priceINR) {
    const curr = this.currencyRates[this.currentCurrency];
    const converted = Math.round(priceINR * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  }

  // --- PRODUCT CATALOG RENDERER ---
  renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    let filtered = this.products.filter(p => {
      const matchCat = this.selectedCategory === 'All' || p.category === this.selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (this.sortBy === 'price-low') filtered.sort((a,b) => a.price - b.price);
    else if (this.sortBy === 'price-high') filtered.sort((a,b) => b.price - a.price);
    else if (this.sortBy === 'rating') filtered.sort((a,b) => b.rating - a.rating);

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem;">
          <i class="fa-solid fa-leaf" style="font-size: 3rem; color: var(--primary); margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.4rem;">No Organic Products Found</h3>
          <p style="color: var(--text-muted);">Try adjusting your search query or filter chips.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const isWish = this.wishlist.includes(p.id);
      return `
        <div class="product-card" onclick="app.openQuickView('${p.id}')">
          <div class="card-image-wrap">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <div class="product-badge-group">
              <span class="badge-tag badge-organic"><i class="fa-solid fa-seedling"></i> ${p.badge}</span>
              ${!p.inStock ? '<span class="badge-tag" style="background:#FEE2E2; color:#DC2626;">Out of Stock</span>' : ''}
            </div>
            <button class="wishlist-btn ${isWish ? 'active' : ''}" onclick="event.stopPropagation(); app.toggleWishlist('${p.id}')">
              <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <button class="quick-view-overlay-btn" onclick="event.stopPropagation(); app.openQuickView('${p.id}')">
              <i class="fa-solid fa-eye"></i> View Details
            </button>
          </div>
          <div class="product-info">
            <div class="product-cat">${p.category} • ${p.batchNo}</div>
            <h3 class="product-name">${p.name}</h3>
            <div class="product-rating">
              <i class="fa-solid fa-star"></i>
              <span style="font-weight:700;">${p.rating}</span>
              <span class="rating-count">(${p.reviews} reviews)</span>
            </div>
            <div class="product-bottom-row">
              <div class="product-price-wrap">
                <span class="original-price">${this.formatPrice(p.originalPrice)}</span>
                <span class="current-price">${this.formatPrice(p.price)}</span>
              </div>
              <button class="add-cart-btn" onclick="event.stopPropagation(); app.addToCart('${p.id}')" ${!p.inStock ? 'disabled style="opacity:0.5;"' : ''}>
                <i class="fa-solid fa-cart-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- CART OPERATIONS ---
  addToCart(productId, quantity = 1) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;
    if (!prod.inStock) {
      this.showToast(`"${prod.name}" is currently out of stock`, 'error');
      return;
    }

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ ...prod, quantity });
    }

    this.saveCart();
    this.showToast(`Added "${prod.name}" to your cart!`);
  }

  updateCartQty(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cart = this.cart.filter(i => i.id !== productId);
    }
    this.saveCart();
  }

  updateCartUI() {
    const countBadge = document.getElementById('cartBadge');
    const drawerItems = document.getElementById('cartDrawerItems');
    const subtotalEl = document.getElementById('cartSubtotal');
    const grandTotalEl = document.getElementById('cartGrandTotal');
    const freeShippingBar = document.getElementById('freeShippingBar');

    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (countBadge) countBadge.textContent = totalCount;

    if (drawerItems) {
      if (this.cart.length === 0) {
        drawerItems.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem;">
            <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; color: var(--border-light); margin-bottom: 1rem;"></i>
            <h4 style="font-size: 1.1rem; color: var(--text-muted);">Your organic basket is empty</h4>
            <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 0.5rem;">Add fresh spices, teas or flours to start!</p>
          </div>
        `;
      } else {
        drawerItems.innerHTML = this.cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--primary-dark);">
                ${this.formatPrice(item.price)}
              </div>
              <div class="cart-item-qty-row">
                <div class="qty-control">
                  <button class="qty-btn" onclick="app.updateCartQty('${item.id}', -1)">-</button>
                  <span class="qty-val">${item.quantity}</span>
                  <button class="qty-btn" onclick="app.updateCartQty('${item.id}', 1)">+</button>
                </div>
                <button onclick="app.updateCartQty('${item.id}', -${item.quantity})" style="color:#EF4444; font-size:0.8rem; font-weight:600;">Remove</button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }

    if (subtotalEl) subtotalEl.textContent = this.formatPrice(subtotal);
    if (grandTotalEl) grandTotalEl.textContent = this.formatPrice(subtotal);

    if (freeShippingBar) {
      const threshold = 999;
      if (subtotal >= threshold) {
        freeShippingBar.innerHTML = `<i class="fa-solid fa-truck-fast"></i> You unlocked <strong>FREE Express Shipping</strong>!`;
      } else {
        const remaining = threshold - subtotal;
        freeShippingBar.innerHTML = `<i class="fa-solid fa-truck"></i> Add <strong>${this.formatPrice(remaining)}</strong> more for FREE Shipping!`;
      }
    }
  }

  // --- WISHLIST ---
  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      this.showToast('Removed item from wishlist');
    } else {
      this.wishlist.push(productId);
      this.showToast('Saved item to your wishlist!');
    }
    this.saveWishlist();
    this.renderProducts();
  }

  updateWishlistCount() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) badge.textContent = this.wishlist.length;
  }

  // --- ADMIN FARM TRACEABILITY BATCH MANAGER ---
  renderAdminBatchTable() {
    const body = document.getElementById('adminBatchTable');
    if (!body) return;

    const entries = Object.entries(this.batchDatabase || {});
    if (entries.length === 0) {
      body.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No batch traceability records found. Click "+ Add New Batch Record" to create one!</td></tr>`;
      return;
    }

    body.innerHTML = entries.map(([code, b]) => `
      <tr>
        <td><strong style="color:var(--primary-dark); font-family:var(--font-heading);">${code}</strong></td>
        <td><strong>${b.farmer}</strong></td>
        <td>${b.location}</td>
        <td>${b.harvestDate}</td>
        <td><span class="badge-tag badge-organic" style="font-size:0.72rem;">${b.labResult}</span></td>
        <td>${b.soilType || 'Organic Fertile'}</td>
        <td><span style="font-size:0.75rem; color:var(--text-light); font-weight:700;">${b.certNo || 'NPOP/NAB/001492'}</span></td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button onclick="app.openEditBatchModal('${code}')" style="color:var(--primary-dark); font-weight:700;" title="Edit Batch Record">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="app.deleteBatchRecord('${code}')" style="color:#EF4444; font-weight:700;" title="Delete Batch Record">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  openAddBatchModal() {
    document.getElementById('bmOriginalCode').value = '';
    document.getElementById('bmCode').value = '';
    document.getElementById('bmFarmer').value = '';
    document.getElementById('bmLocation').value = '';
    document.getElementById('bmHarvestDate').value = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('bmLabResult').value = '100% Pure - Pesticide Residue 0.00%';
    document.getElementById('bmSoilType').value = 'Alluvial Organic Rich';
    document.getElementById('bmCertNo').value = 'NPOP/NAB/001492';

    document.getElementById('batchModalTitle').textContent = 'Add Farm Traceability Batch';
    const modal = document.getElementById('batchModal');
    if (modal) modal.classList.add('open');
  }

  openEditBatchModal(code) {
    const b = this.batchDatabase[code];
    if (!b) return;

    document.getElementById('bmOriginalCode').value = code;
    document.getElementById('bmCode').value = code;
    document.getElementById('bmFarmer').value = b.farmer || '';
    document.getElementById('bmLocation').value = b.location || '';
    document.getElementById('bmHarvestDate').value = b.harvestDate || '';
    document.getElementById('bmLabResult').value = b.labResult || '';
    document.getElementById('bmSoilType').value = b.soilType || '';
    document.getElementById('bmCertNo').value = b.certNo || '';

    document.getElementById('batchModalTitle').textContent = `Edit Batch: ${code}`;
    const modal = document.getElementById('batchModal');
    if (modal) modal.classList.add('open');
  }

  closeBatchModal() {
    const modal = document.getElementById('batchModal');
    if (modal) modal.classList.remove('open');
  }

  async saveBatchFromForm() {
    const origCode = document.getElementById('bmOriginalCode').value.toUpperCase().trim();
    const code = document.getElementById('bmCode').value.toUpperCase().trim();
    const farmer = document.getElementById('bmFarmer').value.trim() || 'Rameshwar Farmer Cooperative';
    const location = document.getElementById('bmLocation').value.trim() || 'Lucknow Agri Belt, Uttar Pradesh';
    const harvestDate = document.getElementById('bmHarvestDate').value.trim() || 'June 18, 2026';
    const labResult = document.getElementById('bmLabResult').value.trim() || '100% Pure - Pesticide Residue 0.00%';
    const soilType = document.getElementById('bmSoilType').value.trim() || 'Alluvial Organic Rich';
    const certNo = document.getElementById('bmCertNo').value.trim() || 'NPOP/NAB/001492';

    if (!code) {
      this.showToast('Please enter a Batch Code!', 'error');
      return;
    }

    if (origCode && origCode !== code) {
      delete this.batchDatabase[origCode];
    }

    const batchObj = { farmer, location, harvestDate, labResult, soilType, certNo };
    this.batchDatabase[code] = batchObj;

    this.saveBatches();
    await this.saveBatchToSupabase(code, batchObj);
    this.closeBatchModal();
    this.showToast(`Saved Farm Traceability Batch "${code}"!`);
  }

  async deleteBatchRecord(code) {
    if (confirm(`Are you sure you want to delete Batch Record "${code}"?`)) {
      delete this.batchDatabase[code];
      this.saveBatches();
      if (this.supabase) {
        await this.supabase.from('farm_traceability').delete().eq('batch_code', code);
      }
      this.showToast(`Deleted batch record "${code}".`);
    }
  }

  saveBatches() {
    localStorage.setItem('hotspy_batch_database', JSON.stringify(this.batchDatabase));
    this.renderAdminBatchTable();
  }

  async fetchBatchesFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('farm_traceability').select('*');
      if (error) return;
      if (data && data.length > 0) {
        data.forEach(b => {
          this.batchDatabase[b.batch_code.toUpperCase()] = {
            farmer: b.farmer_name,
            location: b.location,
            harvestDate: b.harvest_date,
            labResult: b.lab_result,
            soilType: b.soil_type,
            certNo: b.cert_no
          };
        });
        this.saveBatches();
      }
    } catch (err) {
      console.log('Supabase fetch batches note:', err);
    }
  }

  async saveBatchToSupabase(code, b) {
    if (!this.supabase) return;
    try {
      await this.supabase.from('farm_traceability').upsert({
        batch_code: code,
        farmer_name: b.farmer,
        location: b.location,
        harvest_date: b.harvestDate,
        lab_result: b.labResult,
        soil_type: b.soilType,
        cert_no: b.certNo
      });
    } catch (err) {
      console.log('Supabase save batch note:', err);
    }
  }

  // --- MOBILE NUMBER AUTH SYSTEM (SIGNUP & LOGIN) ---
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
    const nameInput = document.getElementById('signupName');
    const mobileInput = document.getElementById('signupMobile');
    const passInput = document.getElementById('signupPassword');

    const name = nameInput ? nameInput.value.trim() : '';
    const mobile = mobileInput ? mobileInput.value.trim() : '';
    const password = passInput ? passInput.value : '';

    if (!name || !mobile || !password) {
      this.showToast('Please fill all required signup fields!', 'error');
      return;
    }

    const existing = this.userProfiles.find(u => u.mobile === mobile);
    if (existing) {
      this.showToast('Account with this Mobile Number already exists! Please Login.', 'error');
      this.switchAuthTab('login');
      return;
    }

    const newUser = {
      mobile,
      name,
      password,
      avatar: 'assets/turmeric.jpg',
      created_at: new Date().toISOString()
    };

    this.userProfiles.push(newUser);
    this.user = newUser;

    this.closeAuthModal();
    this.updateAuthStatusUI();
    this.showToast(`Welcome ${name}! Your account has been created.`);
    this.openCustomerProfilePage('addresses');

    if (this.supabase) {
      try {
        await this.supabase.from('customer_profiles').upsert({
          mobile,
          name,
          password,
          avatar: 'assets/turmeric.jpg'
        });
      } catch(e) {}
    }
  }

  async handleLogin() {
    const mobileInput = document.getElementById('loginMobile');
    const passInput = document.getElementById('loginPassword');

    const mobile = mobileInput ? mobileInput.value.trim() : '';
    const password = passInput ? passInput.value : '';

    if (!mobile || !password) {
      this.showToast('Please enter Mobile Number and Password!', 'error');
      return;
    }

    let user = this.userProfiles.find(u => u.mobile === mobile);

    if (!user && this.supabase) {
      try {
        const { data } = await this.supabase.from('customer_profiles').select('*').eq('mobile', mobile).single();
        if (data) {
          user = data;
          this.userProfiles.push(data);
        }
      } catch(e) {}
    }

    if (!user || user.password !== password) {
      this.showToast('Invalid Mobile Number or Password. Please try again.', 'error');
      return;
    }

    this.user = user;
    this.closeAuthModal();
    this.updateAuthStatusUI();
    this.showToast(`Welcome back, ${user.name}!`);
    this.openCustomerProfilePage('addresses');
  }

  logoutUser() {
    this.user = null;
    this.updateAuthStatusUI();
    this.showHomePage();
    this.showToast('Logged out successfully.');
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
            <button onclick="app.openCustomerProfilePage('addresses'); app.closeProfileMenuModal();" style="background:var(--primary-mint); color:var(--primary-deep); border:none; padding:0.3rem 0.65rem; border-radius:var(--radius-sm); font-size:0.72rem; font-weight:800; margin-top:0.35rem; cursor:pointer;">
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
            <button onclick="app.openAuthModal('login'); app.closeProfileMenuModal();" style="background:var(--primary-mint); color:var(--primary-deep); border:none; padding:0.35rem 0.75rem; border-radius:var(--radius-sm); font-size:0.75rem; font-weight:800; margin-top:0.35rem; cursor:pointer;">
              <i class="fa-solid fa-right-to-bracket"></i> Login / Register
            </button>
          </div>
        `;
      }
    }

    if (footerBox) {
      if (this.user) {
        footerBox.innerHTML = `
          <button onclick="app.logoutUser(); app.closeProfileMenuModal();" style="width:100%; padding:0.5rem; background:#FEE2E2; color:#DC2626; border:none; border-radius:var(--radius-sm); font-weight:700; font-size:0.8rem; cursor:pointer;">
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

  updateAuthStatusUI() {
    const userBtn = document.getElementById('userAuthBtn');
    if (!userBtn) return;

    if (this.user) {
      userBtn.title = `Profile Menu (${this.user.name})`;
      userBtn.innerHTML = `<i class="fa-solid fa-circle-user" style="color:var(--primary-mint);"></i>`;
    } else {
      userBtn.title = 'Account & Store Menu';
      userBtn.innerHTML = `<i class="fa-regular fa-user"></i>`;
    }
    userBtn.onclick = () => this.openProfileMenuModal();
  }

  quickDemoLogin(role) {
    if (role === 'admin') {
      this.toggleAdminMode();
    } else {
      const demoUser = {
        mobile: '9876543210',
        name: 'Aarav Sharma',
        password: 'password123',
        avatar: 'assets/turmeric.jpg'
      };
      if (!this.userProfiles.some(u => u.mobile === demoUser.mobile)) {
        this.userProfiles.push(demoUser);
      }
      this.user = demoUser;
      this.closeAuthModal();
      this.updateAuthStatusUI();
      this.showToast('Logged in as Demo Customer (Aarav Sharma)!');
      this.openCustomerProfilePage('addresses');
    }
  }

  // --- CUSTOMER PROFILE DASHBOARD ENGINE ---
  openCustomerProfilePage(tab = 'addresses') {
    if (!this.user) {
      this.openAuthModal();
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
    if (mobileEl) mobileEl.innerHTML = `<i class="fa-solid fa-phone" style="font-size:0.8rem; color:var(--primary);"></i> +91 ${this.user.mobile}`;

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
      grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-muted); background:white; border-radius:var(--radius-md); border:1px solid var(--border-light);">No saved delivery addresses found. Click "+ Add New Delivery Address" to add your address!</div>`;
      return;
    }

    grid.innerHTML = userAddrs.map(a => `
      <div class="admin-card" style="background:white; border:${a.is_default ? '2px solid var(--primary)' : '1px solid var(--border-light)'}; padding:1.25rem; border-radius:var(--radius-md); position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem;">
          <span class="badge-tag ${a.address_type === 'Home' ? 'badge-organic' : 'badge-gold'}">${a.address_type === 'Home' ? '🏠 Home' : '🏢 Work'}</span>
          ${a.is_default ? '<span class="badge-tag badge-gold" style="font-weight:800;">✓ Default Address</span>' : ''}
        </div>

        <strong style="font-size:1.05rem; color:var(--primary-deep); display:block; margin-bottom:0.25rem;">${a.full_name}</strong>
        <div style="font-size:0.85rem; color:var(--text-main); margin-bottom:0.35rem; line-height:1.5;">
          ${a.house_no}, ${a.street}<br>
          ${a.landmark ? 'Landmark: ' + a.landmark + '<br>' : ''}
          ${a.city}, ${a.state} - <strong>${a.pincode}</strong>
        </div>
        <div style="font-size:0.82rem; color:var(--text-muted); font-weight:700; margin-bottom:1rem;">
          📞 Mobile: +91 ${a.mobile}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.5rem; border-top:1px solid var(--border-subtle);">
          <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.8rem; font-weight:700; cursor:pointer;">
            <input type="radio" name="defaultAddressRadio" ${a.is_default ? 'checked' : ''} onchange="app.setDefaultAddress('${a.id}')"> Set as Default
          </label>
          <div style="display:flex; gap:0.65rem;">
            <button onclick="app.openEditAddressModal('${a.id}')" style="color:var(--primary-dark); font-weight:700; font-size:0.8rem;">
              <i class="fa-solid fa-pen-to-square"></i> Edit
            </button>
            <button onclick="app.deleteAddress('${a.id}')" style="color:#EF4444; font-weight:700; font-size:0.8rem;">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </div>
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
    document.getElementById('amCity').value = 'Lucknow';
    document.getElementById('amState').value = 'Uttar Pradesh';
    document.getElementById('amPincode').value = '226010';
    document.getElementById('amLandmark').value = '';
    document.getElementById('amType').value = 'Home';
    document.getElementById('amIsDefault').checked = true;

    document.getElementById('addressModalTitle').textContent = 'Add New Delivery Address';
    const modal = document.getElementById('addressModal');
    if (modal) modal.classList.add('open');
  }

  openEditAddressModal(addrId) {
    const a = this.userAddresses.find(addr => addr.id === addrId);
    if (!a) return;

    document.getElementById('amAddrId').value = a.id;
    document.getElementById('amFullName').value = a.full_name;
    document.getElementById('amMobile').value = a.mobile;
    document.getElementById('amHouseNo').value = a.house_no;
    document.getElementById('amStreet').value = a.street;
    document.getElementById('amCity').value = a.city;
    document.getElementById('amState').value = a.state;
    document.getElementById('amPincode').value = a.pincode;
    document.getElementById('amLandmark').value = a.landmark || '';
    document.getElementById('amType').value = a.address_type || 'Home';
    document.getElementById('amIsDefault').checked = !!a.is_default;

    document.getElementById('addressModalTitle').textContent = 'Edit Delivery Address';
    const modal = document.getElementById('addressModal');
    if (modal) modal.classList.add('open');
  }

  closeAddressModal() {
    const modal = document.getElementById('addressModal');
    if (modal) modal.classList.remove('open');
  }

  async saveAddressFromForm() {
    if (!this.user) return;

    const id = document.getElementById('amAddrId').value;
    const fullName = document.getElementById('amFullName').value.trim();
    const mobile = document.getElementById('amMobile').value.trim();
    const houseNo = document.getElementById('amHouseNo').value.trim();
    const street = document.getElementById('amStreet').value.trim();
    const city = document.getElementById('amCity').value.trim();
    const state = document.getElementById('amState').value.trim();
    const pincode = document.getElementById('amPincode').value.trim();
    const landmark = document.getElementById('amLandmark').value.trim();
    const addressType = document.getElementById('amType').value;
    const isDefault = document.getElementById('amIsDefault').checked;

    if (!fullName || !mobile || !houseNo || !street || !city || !state || !pincode) {
      this.showToast('Please fill all required address fields!', 'error');
      return;
    }

    if (isDefault) {
      this.userAddresses.forEach(a => {
        if (a.user_mobile === this.user.mobile) a.is_default = false;
      });
    }

    let addrObj;
    if (id) {
      addrObj = this.userAddresses.find(a => a.id === id);
      if (addrObj) {
        Object.assign(addrObj, { full_name: fullName, mobile, house_no: houseNo, street, city, state, pincode, landmark, address_type: addressType, is_default: isDefault });
      }
    } else {
      addrObj = {
        id: `addr_${Date.now()}`,
        user_mobile: this.user.mobile,
        full_name: fullName,
        mobile,
        house_no: houseNo,
        street,
        city,
        state,
        pincode,
        landmark,
        address_type: addressType,
        is_default: isDefault
      };
      this.userAddresses.push(addrObj);
    }

    this.closeAddressModal();
    this.renderProfileAddresses();
    this.showToast('Delivery address saved & synced!');

    if (this.supabase) {
      try {
        await this.supabase.from('customer_addresses').upsert({
          id: addrObj.id,
          user_mobile: addrObj.user_mobile,
          full_name: addrObj.full_name,
          mobile: addrObj.mobile,
          house_no: addrObj.house_no,
          street: addrObj.street,
          city: addrObj.city,
          state: addrObj.state,
          pincode: addrObj.pincode,
          landmark: addrObj.landmark,
          address_type: addrObj.address_type,
          is_default: addrObj.is_default
        });
      } catch(e) {}
    }
  }

  async setDefaultAddress(addrId) {
    if (!this.user) return;
    this.userAddresses.forEach(a => {
      if (a.user_mobile === this.user.mobile) {
        a.is_default = (a.id === addrId);
      }
    });
    this.renderProfileAddresses();
    this.showToast('Updated default delivery address!');

    if (this.supabase) {
      try {
        const userAddrs = this.userAddresses.filter(a => a.user_mobile === this.user.mobile);
        for (const a of userAddrs) {
          await this.supabase.from('customer_addresses').update({ is_default: a.is_default }).eq('id', a.id);
        }
      } catch(e) {}
    }
  }

  async deleteAddress(addrId) {
    if (confirm('Are you sure you want to delete this delivery address?')) {
      this.userAddresses = this.userAddresses.filter(a => a.id !== addrId);
      this.renderProfileAddresses();
      if (this.supabase) {
        await this.supabase.from('customer_addresses').delete().eq('id', addrId);
      }
      this.showToast('Deleted delivery address.');
    }
  }

  openChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.classList.add('open');
  }

  closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) modal.classList.remove('open');
  }

  async saveNewPassword() {
    if (!this.user) return;
    const curr = document.getElementById('cpCurrentPass').value;
    const newP = document.getElementById('cpNewPass').value;
    const confP = document.getElementById('cpConfirmPass').value;

    if (curr !== this.user.password) {
      this.showToast('Current password does not match!', 'error');
      return;
    }
    if (newP !== confP) {
      this.showToast('New password and confirm password do not match!', 'error');
      return;
    }

    this.user.password = newP;
    this.closeChangePasswordModal();
    this.showToast('Password updated successfully!');

    if (this.supabase) {
      try {
        await this.supabase.from('customer_profiles').update({ password: newP }).eq('mobile', this.user.mobile);
      } catch(e) {}
    }
  }

  // --- ORDER INVOICE PAGE & HISTORY ---
  renderProfileOrders() {
    const grid = document.getElementById('profileOrdersGrid');
    if (!grid || !this.user) return;

    const myOrders = this.orders.filter(o => o.customer_mobile === this.user.mobile);

    if (myOrders.length === 0) {
      grid.innerHTML = `<div style="text-align:center; padding:3rem; background:white; border-radius:var(--radius-md); border:1px solid var(--border-light); color:var(--text-muted);">You haven't placed any orders yet. Explore our organic catalog to place your first order!</div>`;
      return;
    }

    grid.innerHTML = myOrders.map(o => {
      let items = [];
      try {
        items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
      } catch(e) {}

      return `
        <div class="admin-card" style="background:white; padding:1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-light); cursor:pointer;" onclick="app.openOrderInvoicePage('${o.id}')">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border-subtle);">
            <div>
              <strong style="color:var(--primary-deep); font-size:1.05rem;">Order #${o.id}</strong>
              <span style="font-size:0.8rem; color:var(--text-muted); margin-left:0.5rem;">• Date: ${o.date || 'Today'}</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <span class="badge-tag badge-organic">${o.status}</span>
              <strong style="font-size:1.1rem; color:var(--primary-dark);">${this.formatPrice(o.total_amount || o.total || 0)}</strong>
            </div>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
            <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
              ${(items || []).slice(0, 4).map(item => `
                <div style="display:flex; align-items:center; gap:0.4rem; background:var(--bg-warm); padding:0.25rem 0.5rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
                  <img src="${item.image || 'assets/turmeric.jpg'}" style="width:32px; height:32px; border-radius:4px; object-fit:cover;">
                  <span style="font-size:0.78rem; font-weight:700;">${item.name} (x${item.quantity})</span>
                </div>
              `).join('')}
            </div>

            <button class="btn-gold" style="padding:0.45rem 1rem; font-size:0.8rem;">
              View Invoice & Tracking <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
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
    try {
      items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
    } catch(e) {}

    let addr = {};
    try {
      addr = typeof order.shipping_address === 'string' ? JSON.parse(order.shipping_address) : order.shipping_address;
    } catch(e) {}

    const subtotal = order.subtotal || order.total_amount || order.total || 0;
    const grandTotal = order.total_amount || order.total || 0;

    if (printableBox) {
      printableBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:2px solid var(--primary-mint);">
          <div>
            <h1 style="font-size:1.8rem; color:var(--primary-deep); margin:0;">HOTSPY ORGANICS</h1>
            <div style="font-size:0.82rem; color:var(--text-muted); margin-top:0.25rem;">
              Hotspy Global (OPC) Private Limited<br>
              Lucknow, Uttar Pradesh, India • GSTIN: 09AAACH1234F1Z5<br>
              Support: care@hotspyorganics.com | +91 9876543210
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.3rem; font-weight:800; color:var(--primary-dark);">OFFICIAL TAX INVOICE</div>
            <div style="font-size:0.85rem; font-weight:700; color:var(--text-main); margin-top:0.25rem;">Invoice #: INV-${order.id}</div>
            <div style="font-size:0.8rem; color:var(--text-muted);">Date: ${order.created_at ? new Date(order.created_at).toLocaleDateString() : order.date}</div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem; margin-bottom:2rem; background:var(--bg-warm); padding:1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-light);">
          <div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--primary); text-transform:uppercase; margin-bottom:0.35rem;">Customer Details:</div>
            <strong style="font-size:1rem; color:var(--primary-deep);">${order.customer_name || 'Aarav Sharma'}</strong><br>
            <span style="font-size:0.85rem; color:var(--text-main); font-weight:700;">📞 Mobile: +91 ${order.customer_mobile || '9876543210'}</span>
          </div>

          <div>
            <div style="font-size:0.75rem; font-weight:800; color:var(--primary); text-transform:uppercase; margin-bottom:0.35rem;">Delivery Address:</div>
            <div style="font-size:0.85rem; color:var(--text-main); line-height:1.4;">
              ${addr.house_no ? `${addr.house_no}, ${addr.street}<br>${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>` : 'Lucknow, Uttar Pradesh - 226010'}
            </div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; background:#F0FDF4; padding:0.85rem 1.25rem; border-radius:var(--radius-sm); border:1px solid var(--primary-mint);">
          <div>
            <span style="font-size:0.78rem; font-weight:700; color:var(--primary-dark);">Payment Method:</span>
            <strong style="margin-left:0.35rem; font-size:0.85rem; color:var(--primary-deep);">${order.payment_method || 'COD (Cash on Delivery)'}</strong>
          </div>
          <div>
            <span style="font-size:0.78rem; font-weight:700; color:var(--primary-dark);">Fulfillment Status:</span>
            <span class="badge-tag badge-organic" style="margin-left:0.35rem;">${order.status}</span>
          </div>
        </div>

        <table style="width:100%; border-collapse:collapse; margin-bottom:2rem;">
          <thead>
            <tr style="background:var(--primary-deep); color:white;">
              <th style="padding:0.75rem; text-align:left; font-size:0.8rem;">Item Details</th>
              <th style="padding:0.75rem; text-align:center; font-size:0.8rem;">Qty</th>
              <th style="padding:0.75rem; text-align:right; font-size:0.8rem;">Unit Price</th>
              <th style="padding:0.75rem; text-align:right; font-size:0.8rem;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${(items || []).map(item => `
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:0.75rem; display:flex; align-items:center; gap:0.65rem;">
                  <img src="${item.image || 'assets/turmeric.jpg'}" style="width:36px; height:36px; border-radius:4px; object-fit:cover;">
                  <div>
                    <strong style="font-size:0.85rem; color:var(--primary-deep);">${item.name}</strong><br>
                    <span style="font-size:0.72rem; color:var(--text-muted);">${item.category || 'Organic Pantry'}</span>
                  </div>
                </td>
                <td style="padding:0.75rem; text-align:center; font-weight:700;">${item.quantity}</td>
                <td style="padding:0.75rem; text-align:right;">₹${item.price}</td>
                <td style="padding:0.75rem; text-align:right; font-weight:800; color:var(--primary-dark);">₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display:flex; justify-content:flex-end;">
          <div style="width:280px; background:var(--bg-warm); padding:1rem; border-radius:var(--radius-sm); border:1px solid var(--border-light);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
              <span>Subtotal</span>
              <strong>₹${subtotal}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.85rem;">
              <span>Shipping Fee</span>
              <strong style="color:var(--primary);">FREE</strong>
            </div>
            <div style="display:flex; justify-content:space-between; padding-top:0.65rem; border-top:2px solid var(--border-light); font-size:1.15rem; font-weight:800; color:var(--primary-deep);">
              <span>Grand Total</span>
              <span>₹${grandTotal}</span>
            </div>
          </div>
        </div>
      `;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- ADMIN CUSTOMERS & USERS MANAGER ---
  renderAdminUsersTable() {
    const body = document.getElementById('adminUsersTable');
    if (!body) return;

    if (this.userProfiles.length === 0) {
      body.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No registered customers found yet. New registered users will appear here live!</td></tr>`;
      return;
    }

    body.innerHTML = this.userProfiles.map(u => {
      const userOrders = this.orders.filter(o => o.customer_mobile === u.mobile);
      const totalSpent = userOrders.reduce((sum, o) => sum + (o.total_amount || o.total || 0), 0);

      return `
        <tr>
          <td><img src="${u.avatar || 'assets/turmeric.jpg'}" style="width:38px; height:38px; border-radius:50%; object-fit:cover; border:2px solid var(--primary-mint);"></td>
          <td><strong>${u.name}</strong></td>
          <td><span style="font-weight:700; color:var(--primary-dark);">+91 ${u.mobile}</span></td>
          <td>${u.created_at ? new Date(u.created_at).toLocaleDateString() : 'August 2026'}</td>
          <td><span class="badge-tag badge-gold" style="font-weight:800;">${userOrders.length} Orders</span></td>
          <td><strong style="color:var(--primary-deep);">${this.formatPrice(totalSpent)}</strong></td>
          <td>
            <button onclick="app.openAdminCustomerDetailModal('${u.mobile}')" class="btn-secondary" style="padding:0.3rem 0.75rem; font-size:0.75rem;">
              <i class="fa-solid fa-eye"></i> View Profile & History
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  openAdminCustomerDetailModal(mobile) {
    const user = this.userProfiles.find(u => u.mobile === mobile);
    if (!user) return;

    const content = document.getElementById('adminCustomerDetailContent');
    const userOrders = this.orders.filter(o => o.customer_mobile === mobile);
    const userAddrs = this.userAddresses.filter(a => a.user_mobile === mobile);
    const totalSpent = userOrders.reduce((sum, o) => sum + (o.total_amount || o.total || 0), 0);

    if (content) {
      content.innerHTML = `
        <div style="padding:1rem;">
          <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid var(--border-light);">
            <img src="${user.avatar || 'assets/turmeric.jpg'}" style="width:64px; height:64px; border-radius:50%; object-fit:cover; border:3px solid var(--primary-mint);">
            <div>
              <h2 style="font-size:1.35rem; color:var(--primary-deep); margin:0;">${user.name}</h2>
              <span style="font-size:0.9rem; font-weight:700; color:var(--primary-dark);">📞 Mobile: +91 ${user.mobile}</span>
              <div style="font-size:0.78rem; color:var(--text-muted); margin-top:0.2rem;">Joined: ${user.created_at ? new Date(user.created_at).toLocaleDateString() : 'August 2026'} • Total Spent: <strong>₹${totalSpent}</strong></div>
            </div>
          </div>

          <div style="margin-bottom:1.5rem;">
            <h4 style="font-size:1rem; color:var(--primary-deep); margin-bottom:0.75rem;"><i class="fa-solid fa-location-dot"></i> Saved Delivery Addresses (${userAddrs.length})</h4>
            ${userAddrs.length === 0 ? '<div style="font-size:0.8rem; color:var(--text-muted);">No delivery address added yet.</div>' : `
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
                ${userAddrs.map(a => `
                  <div style="background:var(--bg-warm); padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-light); font-size:0.82rem;">
                    <strong>${a.full_name} (${a.address_type})</strong> ${a.is_default ? '<span style="color:var(--primary); font-weight:800;">[Default]</span>' : ''}<br>
                    ${a.house_no}, ${a.street}<br>
                    ${a.city}, ${a.state} - <strong>${a.pincode}</strong>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div>
            <h4 style="font-size:1rem; color:var(--primary-deep); margin-bottom:0.75rem;"><i class="fa-solid fa-bag-shopping"></i> Complete Order History (${userOrders.length})</h4>
            ${userOrders.length === 0 ? '<div style="font-size:0.8rem; color:var(--text-muted);">No orders placed yet.</div>' : `
              <div style="display:flex; flex-direction:column; gap:0.65rem; max-height:220px; overflow-y:auto;">
                ${userOrders.map(o => `
                  <div style="background:white; border:1px solid var(--border-light); padding:0.65rem; border-radius:var(--radius-sm); display:flex; justify-content:space-between; align-items:center;">
                    <div>
                      <strong>Order #${o.id}</strong> • <span style="font-size:0.78rem; color:var(--text-muted);">${o.date || 'Today'}</span><br>
                      <span class="badge-tag badge-organic" style="font-size:0.7rem;">${o.status}</span>
                    </div>
                    <strong style="color:var(--primary-dark); font-size:1rem;">₹${o.total_amount || o.total || 0}</strong>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        </div>
      `;
    }

    const modal = document.getElementById('adminCustomerDetailModal');
    if (modal) modal.classList.add('open');
  }

  closeAdminCustomerDetailModal() {
    const modal = document.getElementById('adminCustomerDetailModal');
    if (modal) modal.classList.remove('open');
  }

  async fetchUserProfilesFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('customer_profiles').select('*');
      if (error) return;
      if (data && data.length > 0) {
        this.userProfiles = data;
        if (this.user) {
          const updated = this.userProfiles.find(u => u.mobile === this.user.mobile);
          if (updated) this.user = updated;
        }
      }
    } catch (err) {
      console.log('Supabase fetch profiles note:', err);
    }
  }

  async fetchUserAddressesFromSupabase() {
    if (!this.supabase) return;
    try {
      const { data, error } = await this.supabase.from('customer_addresses').select('*');
      if (error) return;
      if (data && data.length > 0) {
        this.userAddresses = data;
      }
    } catch (err) {
      console.log('Supabase fetch addresses note:', err);
    }
  }

  // --- BATCH TRACEABILITY LOOKUP ---
  verifyBatchCode(code) {
    const resultCard = document.getElementById('traceResultCard');
    const inputEl = document.getElementById('traceBatchInput');
    if (inputEl) inputEl.value = code;

    const info = (this.batchDatabase && code) ? this.batchDatabase[code.toUpperCase().trim()] : null;
    if (!info) {
      this.showToast(`Batch "${code}" not found in master records. Try HS-LKO-2026`, 'error');
      return;
    }

    if (resultCard) {
      resultCard.innerHTML = `
        <div class="trace-result-grid">
          <div class="trace-info-box">
            <span class="trace-info-label"><i class="fa-solid fa-tractor"></i> Partner Farm</span>
            <span class="trace-info-val">${info.farmer}</span>
          </div>
          <div class="trace-info-box">
            <span class="trace-info-label"><i class="fa-solid fa-location-dot"></i> Region</span>
            <span class="trace-info-val">${info.location}</span>
          </div>
          <div class="trace-info-box">
            <span class="trace-info-label"><i class="fa-solid fa-calendar-check"></i> Harvest Date</span>
            <span class="trace-info-val">${info.harvestDate}</span>
          </div>
          <div class="trace-info-box">
            <span class="trace-info-label"><i class="fa-solid fa-flask"></i> Purity Status</span>
            <span class="trace-info-val" style="color:var(--primary);">${info.labResult}</span>
          </div>
        </div>
        <div class="trace-timeline">
          <div class="timeline-step">
            <div class="timeline-dot">1</div> Sown & Grown Naturally
          </div>
          <div class="timeline-step">
            <div class="timeline-dot">2</div> Cold-Processed & Milled
          </div>
          <div class="timeline-step">
            <div class="timeline-dot">3</div> Lab Tested Purity 0.00%
          </div>
          <div class="timeline-step">
            <div class="timeline-dot">4</div> Delivered to Your Home
          </div>
        </div>
      `;
      resultCard.classList.add('active');
    }
  }

  // --- CHECKOUT SIMULATION WITH REAL SUPABASE SYNC ---
  async checkout() {
    if (this.cart.length === 0) {
      this.showToast('Your cart is empty!', 'error');
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
                          pincode: '226010',
                          address_type: 'Home'
                        };

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_mobile: this.user.mobile,
      customer_name: this.user.name,
      items: JSON.stringify(this.cart),
      shipping_address: JSON.stringify(defaultAddr),
      subtotal: subtotal,
      discount: 0,
      shipping_fee: 0,
      total_amount: subtotal,
      payment_method: 'COD (Cash on Delivery)',
      payment_status: 'Paid',
      status: 'Processing',
      date: new Date().toISOString().split('T')[0]
    };

    this.orders.unshift(newOrder);
    this.saveOrders();

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
          payment_status: newOrder.payment_status,
          status: newOrder.status
        });
      } catch (err) {
        console.log('Order Supabase note:', err);
      }
    }

    this.cart = [];
    this.saveCart();
    this.closeCartDrawer();
    this.renderAdminTables();

    this.showToast(`🎉 Order Placed! Order ID: ${newOrder.id}. Thank you for supporting organic farmers!`);
    this.openOrderInvoicePage(newOrder.id);
  }

  // --- MODAL CONTROLLERS ---
  openAuthModal(defaultTab = 'login') {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.classList.add('open');
      this.switchAuthTab(defaultTab);
    }
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('open');
  }

  switchAuthTab(tab) {
    const loginBtn = document.getElementById('tabLoginBtn');
    const signupBtn = document.getElementById('tabSignupBtn');
    const loginForm = document.getElementById('formLogin');
    const signupForm = document.getElementById('formSignup');

    if (tab === 'login') {
      loginBtn.classList.add('active');
      signupBtn.classList.remove('active');
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    } else {
      signupBtn.classList.add('active');
      loginBtn.classList.remove('active');
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
    }
  }

  quickDemoLogin(role) {
    if (role === 'customer') {
      this.user = { name: 'Aarav Sharma', email: 'aarav@hotspy.com', role: 'customer' };
      this.showToast('Logged in as Customer (Aarav Sharma)');
    } else if (role === 'admin') {
      this.user = { name: 'Admin - Hotspy Global', email: 'admin@hotspyorganics.com', role: 'admin' };
      this.showToast('Logged in as Store Administrator');
    }
    localStorage.setItem('hotspy_user', JSON.stringify(this.user));
    this.updateAuthStatusUI();
    this.closeAuthModal();
  }

  logout() {
    this.user = null;
    localStorage.removeItem('hotspy_user');
    this.updateAuthStatusUI();
    this.showToast('Logged out successfully');
  }

  updateAuthStatusUI() {
    const btn = document.getElementById('userAuthBtn');
    if (!btn) return;

    if (this.user) {
      btn.innerHTML = `<i class="fa-solid fa-user-check" style="color:var(--primary);"></i> ${this.user.name.split(' ')[0]}`;
      btn.onclick = () => {
        if (confirm(`Logged in as ${this.user.name}. Do you want to logout?`)) {
          this.logout();
        }
      };
    } else {
      btn.innerHTML = `<i class="fa-regular fa-user"></i>`;
      btn.onclick = () => this.openAuthModal('login');
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById('cartDrawerBackdrop');
    if (drawer) drawer.classList.add('open');
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cartDrawerBackdrop');
    if (drawer) drawer.classList.remove('open');
  }

  // --- ADMIN PANEL & CHARTS ---
  toggleAdminMode() {
    const storefront = document.getElementById('storefrontWrapper');
    const adminPanel = document.getElementById('adminWrapper');
    const toggleBtn = document.getElementById('adminModeBtn');

    if (adminPanel.classList.contains('active')) {
      adminPanel.classList.remove('active');
      storefront.style.display = 'block';
      toggleBtn.innerHTML = `<i class="fa-solid fa-sliders"></i> Admin Panel`;
    } else {
      adminPanel.classList.add('active');
      storefront.style.display = 'none';
      toggleBtn.innerHTML = `<i class="fa-solid fa-store"></i> Store View`;
      this.setupAdminCharts();
      this.renderAdminTables();
    }
  }

  setupAdminCharts() {
    const canvas = document.getElementById('salesChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const data = [12000, 19000, 15000, 24000, 32000, 48000];
    const labels = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const stepX = (canvas.width - 60) / (data.length - 1);
    const maxVal = 50000;

    data.forEach((val, i) => {
      const x = 40 + i * stepX;
      const y = canvas.height - 30 - (val / maxVal) * (canvas.height - 60);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    data.forEach((val, i) => {
      const x = 40 + i * stepX;
      const y = canvas.height - 30 - (val / maxVal) * (canvas.height - 60);
      ctx.fillStyle = '#064E3B';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#6B7280';
      ctx.font = '12px Plus Jakarta Sans';
      ctx.fillText(labels[i], x - 10, canvas.height - 10);
    });
  }

  // --- QUICK VIEW PRODUCT DETAIL MODAL ---
  openQuickView(productId) {
    const prod = this.products.find(p => p.id === productId);
    if (!prod) return;

    this.currentDetailProduct = prod;
    this.currentDetailTabIndex = 0;
    this.detailQty = 1;

    const img = document.getElementById('detailImage');
    const title = document.getElementById('detailTitle');
    const cat = document.getElementById('detailCategory');
    const price = document.getElementById('detailPrice');
    const origPrice = document.getElementById('detailOriginalPrice');
    const origin = document.getElementById('detailOrigin');
    const batch = document.getElementById('detailBatchNo');
    const rating = document.getElementById('detailRating');
    const qtyVal = document.getElementById('detailQtyVal');

    if (img) img.src = prod.image;
    if (title) title.textContent = prod.name;
    if (cat) cat.textContent = `${prod.category} • ${prod.badge}`;
    if (price) price.textContent = this.formatPrice(prod.price);
    if (origPrice) origPrice.textContent = this.formatPrice(prod.originalPrice);
    if (origin) origin.textContent = prod.origin;
    if (batch) batch.textContent = prod.batchNo;
    if (rating) rating.textContent = `${prod.rating} (${prod.reviews} reviews)`;
    if (qtyVal) qtyVal.textContent = '1';

    // Marquee Header inside Modal
    const marqueeContainer = document.getElementById('detailMarqueeContainer');
    const marqueeContent = document.getElementById('detailMarqueeContent');
    const marqueeText = prod.customMarquee && prod.customMarquee.trim() ? prod.customMarquee : this.globalSettings.marquee;

    if (marqueeContent) marqueeContent.textContent = marqueeText;
    if (marqueeContainer) marqueeContainer.style.display = marqueeText ? 'flex' : 'none';

    // 4-Column Badges
    this.renderDetailTrustBadges();

    // Description text
    const descBox = document.getElementById('detailDescriptionBox');
    if (descBox) descBox.innerHTML = prod.desc || 'No description provided.';

    // Custom Tabs Renderer
    this.renderDetailCustomTabs(prod.customTabs || []);

    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.add('open');
  }

  renderDetailCustomTabs(tabs = []) {
    const headerEl = document.getElementById('detailTabsHeader');
    const bodyEl = document.getElementById('detailTabsBody');
    if (!headerEl || !bodyEl) return;

    if (!tabs || tabs.length === 0) {
      headerEl.style.display = 'none';
      bodyEl.style.display = 'none';
      return;
    }

    headerEl.style.display = 'flex';
    bodyEl.style.display = 'block';

    headerEl.innerHTML = tabs.map((tab, idx) => `
      <button class="custom-tab-btn ${idx === 0 ? 'active' : ''}" onclick="app.switchDetailTab(${idx})">
        ${tab.title}
      </button>
    `).join('');

    bodyEl.innerHTML = tabs[0] ? tabs[0].content : '';
  }

  switchDetailTab(idx) {
    if (!this.currentDetailProduct || !this.currentDetailProduct.customTabs) return;
    const tabs = this.currentDetailProduct.customTabs;
    if (!tabs[idx]) return;

    document.querySelectorAll('.custom-tab-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === idx);
    });

    const bodyEl = document.getElementById('detailTabsBody');
    if (bodyEl) bodyEl.innerHTML = tabs[idx].content;
  }

  closeQuickViewModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) modal.classList.remove('open');
  }

  changeDetailQty(delta) {
    this.detailQty = Math.max(1, this.detailQty + delta);
    const qtyVal = document.getElementById('detailQtyVal');
    if (qtyVal) qtyVal.textContent = this.detailQty;
  }

  addDetailToCart() {
    if (!this.currentDetailProduct) return;
    this.addToCart(this.currentDetailProduct.id, this.detailQty);
    this.closeQuickViewModal();
    this.openCartDrawer();
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'circle-exclamation'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Global App Instance
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new AppEngine();
});
