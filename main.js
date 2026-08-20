/* ============================================
   MAIN.JS — FlexTools Pro
   Version: 2.1 | Fixed duplicate declarations
   ============================================ */

'use strict';

// Unregister any service worker that might cache and intercept routing
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => reg.unregister());
    });
}

/* ============================================
   CURRENCY DATA
   ============================================ */
const currencyData = {
    // Major Global
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "CHF": "Swiss Franc",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "NZD": "New Zealand Dollar",
    "CNY": "Chinese Yuan",
    "HKD": "Hong Kong Dollar",
    "SGD": "Singapore Dollar",
    "SEK": "Swedish Krona",
    "NOK": "Norwegian Krone",
    "DKK": "Danish Krone",
    "KRW": "South Korean Won",
    "INR": "Indian Rupee",

    // Africa
    "NGN": "Nigerian Naira",
    "GHS": "Ghanaian Cedi",
    "ZAR": "South African Rand",
    "KES": "Kenyan Shilling",
    "EGP": "Egyptian Pound",
    "MAD": "Moroccan Dirham",
    "TZS": "Tanzanian Shilling",
    "UGX": "Ugandan Shilling",
    "ETB": "Ethiopian Birr",
    "XOF": "West African CFA Franc",
    "XAF": "Central African CFA Franc",
    "AOA": "Angolan Kwanza",
    "MZN": "Mozambican Metical",
    "ZMW": "Zambian Kwacha",
    "BWP": "Botswana Pula",
    "NAD": "Namibian Dollar",
    "RWF": "Rwandan Franc",
    "DZD": "Algerian Dinar",
    "TND": "Tunisian Dinar",
    "LYD": "Libyan Dinar",
    "SDG": "Sudanese Pound",
    "SOS": "Somali Shilling",
    "MGA": "Malagasy Ariary",
    "MUR": "Mauritian Rupee",
    "SCR": "Seychellois Rupee",
    "GMD": "Gambian Dalasi",
    "SLL": "Sierra Leonean Leone",
    "LRD": "Liberian Dollar",
    "GNF": "Guinean Franc",
    "MWK": "Malawian Kwacha",
    "ZWL": "Zimbabwean Dollar",
    "SZL": "Swazi Lilangeni",
    "LSL": "Lesotho Loti",
    "CVE": "Cape Verdean Escudo",
    "STN": "São Tomé Príncipe Dobra",
    "DJF": "Djiboutian Franc",
    "ERN": "Eritrean Nakfa",
    "KMF": "Comorian Franc",

    // Middle East
    "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",
    "QAR": "Qatari Riyal",
    "KWD": "Kuwaiti Dinar",
    "BHD": "Bahraini Dinar",
    "OMR": "Omani Rial",
    "JOD": "Jordanian Dinar",
    "LBP": "Lebanese Pound",
    "ILS": "Israeli Shekel",
    "IRR": "Iranian Rial",
    "IQD": "Iraqi Dinar",
    "SYP": "Syrian Pound",
    "YER": "Yemeni Rial",

    // Europe
    "RUB": "Russian Ruble",
    "TRY": "Turkish Lira",
    "PLN": "Polish Zloty",
    "CZK": "Czech Koruna",
    "HUF": "Hungarian Forint",
    "RON": "Romanian Leu",
    "BGN": "Bulgarian Lev",
    "HRK": "Croatian Kuna",
    "RSD": "Serbian Dinar",
    "UAH": "Ukrainian Hryvnia",
    "GEL": "Georgian Lari",
    "AMD": "Armenian Dram",
    "AZN": "Azerbaijani Manat",
    "KZT": "Kazakhstani Tenge",
    "MDL": "Moldovan Leu",
    "ALL": "Albanian Lek",
    "MKD": "Macedonian Denar",
    "BAM": "Bosnian Mark",
    "ISK": "Icelandic Króna",

    // Americas
    "BRL": "Brazilian Real",
    "MXN": "Mexican Peso",
    "ARS": "Argentine Peso",
    "CLP": "Chilean Peso",
    "COP": "Colombian Peso",
    "PEN": "Peruvian Sol",
    "UYU": "Uruguayan Peso",
    "PYG": "Paraguayan Guaraní",
    "BOB": "Bolivian Boliviano",
    "VES": "Venezuelan Bolívar",
    "CRC": "Costa Rican Colón",
    "GTQ": "Guatemalan Quetzal",
    "HNL": "Honduran Lempira",
    "NIO": "Nicaraguan Córdoba",
    "PAB": "Panamanian Balboa",
    "DOP": "Dominican Peso",
    "JMD": "Jamaican Dollar",
    "TTD": "Trinidad & Tobago Dollar",
    "BBD": "Barbadian Dollar",
    "BSD": "Bahamian Dollar",
    "BZD": "Belizean Dollar",
    "GYD": "Guyanese Dollar",
    "SRD": "Surinamese Dollar",
    "HTG": "Haitian Gourde",
    "CUP": "Cuban Peso",

    // Asia Pacific
    "IDR": "Indonesian Rupiah",
    "MYR": "Malaysian Ringgit",
    "THB": "Thai Baht",
    "VND": "Vietnamese Dong",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "BDT": "Bangladeshi Taka",
    "LKR": "Sri Lankan Rupee",
    "NPR": "Nepalese Rupee",
    "MMK": "Myanmar Kyat",
    "KHR": "Cambodian Riel",
    "LAK": "Laotian Kip",
    "TWD": "Taiwan Dollar",
    "MNT": "Mongolian Tögrög",
    "KGS": "Kyrgyzstani Som",
    "TJS": "Tajikistani Somoni",
    "UZS": "Uzbekistani Som",
    "TMT": "Turkmenistani Manat",
    "AFN": "Afghan Afghani",
    "MVR": "Maldivian Rufiyaa",
    "BTN": "Bhutanese Ngultrum",
    "FJD": "Fijian Dollar",
    "PGK": "Papua New Guinean Kina",
    "WST": "Samoan Tala",
    "TOP": "Tongan Paʻanga",
    "VUV": "Vanuatu Vatu",
    "SBD": "Solomon Islands Dollar",
    "KPW": "North Korean Won",

    // Caribbean & Pacific
    "XCD": "East Caribbean Dollar",
    "AWG": "Aruban Florin",
    "ANG": "Netherlands Antillean Guilder",

    // Precious Metals & Special
    "XAU": "Gold (Troy Ounce)",
    "XAG": "Silver (Troy Ounce)"
};

function detectDefaultCurrency() {
    const lang   = navigator.language || navigator.languages?.[0] || 'en-US';
    const region = lang.split('-')[1]?.toUpperCase() || '';

    const regionToCurrency = {
        // Africa
        'NG': 'NGN', 'GH': 'GHS', 'ZA': 'ZAR', 'KE': 'KES',
        'EG': 'EGP', 'MA': 'MAD', 'TZ': 'TZS', 'UG': 'UGX',
        'ET': 'ETB', 'RW': 'RWF', 'CM': 'XAF', 'SN': 'XOF',
        'CI': 'XOF', 'DZ': 'DZD', 'TN': 'TND', 'LY': 'LYD',
        'AO': 'AOA', 'MZ': 'MZN', 'ZM': 'ZMW', 'BW': 'BWP',
        'NA': 'NAD', 'MW': 'MWK', 'MU': 'MUR', 'SC': 'SCR',
        'GM': 'GMD', 'CV': 'CVE', 'KM': 'KMF',

        // Middle East
        'AE': 'AED', 'SA': 'SAR', 'QA': 'QAR', 'KW': 'KWD',
        'BH': 'BHD', 'OM': 'OMR', 'JO': 'JOD', 'LB': 'LBP',
        'IL': 'ILS', 'IR': 'IRR', 'IQ': 'IQD', 'YE': 'YER',

        // Europe
        'GB': 'GBP', 'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR',
        'ES': 'EUR', 'NL': 'EUR', 'BE': 'EUR', 'PT': 'EUR',
        'GR': 'EUR', 'AT': 'EUR', 'IE': 'EUR', 'FI': 'EUR',
        'SE': 'SEK', 'NO': 'NOK', 'DK': 'DKK', 'CH': 'CHF',
        'RU': 'RUB', 'TR': 'TRY', 'PL': 'PLN', 'CZ': 'CZK',
        'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN', 'RS': 'RSD',
        'UA': 'UAH', 'GE': 'GEL', 'AM': 'AMD', 'AZ': 'AZN',
        'IS': 'ISK', 'AL': 'ALL', 'MD': 'MDL',

        // Americas
        'US': 'USD', 'CA': 'CAD', 'BR': 'BRL', 'MX': 'MXN',
        'AR': 'ARS', 'CL': 'CLP', 'CO': 'COP', 'PE': 'PEN',
        'UY': 'UYU', 'PY': 'PYG', 'BO': 'BOB', 'CR': 'CRC',
        'GT': 'GTQ', 'HN': 'HNL', 'NI': 'NIO', 'DO': 'DOP',
        'JM': 'JMD', 'TT': 'TTD', 'BB': 'BBD', 'GY': 'GYD',

        // Asia Pacific
        'IN': 'INR', 'AU': 'AUD', 'NZ': 'NZD', 'JP': 'JPY',
        'CN': 'CNY', 'KR': 'KRW', 'SG': 'SGD', 'ID': 'IDR',
        'MY': 'MYR', 'TH': 'THB', 'VN': 'VND', 'PH': 'PHP',
        'PK': 'PKR', 'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR',
        'TW': 'TWD', 'MN': 'MNT', 'KZ': 'KZT', 'UZ': 'UZS',
        'AF': 'AFN', 'MV': 'MVR', 'FJ': 'FJD',
        'HK': 'HKD'
    };

    return regionToCurrency[region] || 'USD';
}

/* ============================================
   INIT ON LOAD
   ============================================ */
window.addEventListener('load', () => {

    // Populate currency dropdowns
    const fromS = document.getElementById('fromCurrency');
    const toS   = document.getElementById('toCurrency');
    if (fromS && toS) {
        for (const [code, name] of Object.entries(currencyData)) {
            fromS.add(new Option(`${code} — ${name}`, code));
            toS.add(new Option(`${code} — ${name}`, code));
        }
        fromS.value = "USD";
        toS.value   = detectDefaultCurrency();
    }

    // Populate crypto-to-currency dropdown
    const toCryptoSelect = document.getElementById('toCryptoCurrency');
    if (toCryptoSelect) {
        for (const [code, name] of Object.entries(currencyData)) {
            toCryptoSelect.add(new Option(`${code} — ${name}`, code));
        }
        toCryptoSelect.value = detectDefaultCurrency();
    }

    // Copyright year
    const yearEl = document.getElementById('ft-current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // (visibility reveal happens after routing completes below)

    // Pull-to-refresh
    if (typeof initRefresher === 'function') initRefresher();

    // ---- ROUTING ON LOAD — runs last so nothing overrides it ----
    // ---- ROUTING ON LOAD — runs last so nothing overrides it ----
    requestAnimationFrame(() => {
        const rawPath = window.location.pathname;
        const toolId  = rawPath.replace(/^\//, '').replace(/\/$/, '').trim();
        const toolEl  = toolId ? document.getElementById(toolId) : null;

        if (toolId && toolEl) {
            showTool(toolId, null, true, true);
        } else {
            showTool('home', null, true, true);
        }

        // NOW reveal the content — correct tool is already showing.
        // Sidebar was never hidden so it stays exactly as it was.
        document.documentElement.classList.remove('ft-booting');
    });

});

/* ============================================
   ROUTING — showTool
   ============================================ */
    function showTool(id, btn, isBoot = false, isRefresh = false) {
    if (!id) return;

    // Update URL
    const newPath = id === 'home' ? '/' : `/${id}`;
    window.history.replaceState({ tool: id }, '', newPath);

    // Update page title
    const title = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.title = `${title} | FlexTools Pro`;

    // Hide all tool cards
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));

    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    // Show target section
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        if (!isBoot) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Highlight nav item
    if (btn) {
        btn.classList.add('active');
    } else {
        const autoBtn = document.querySelector(`a[href="${id}"]`) ||
                        document.querySelector(`[onclick*="'${id}'"]`);
        if (autoBtn) autoBtn.classList.add('active');
    }

    // Init doc editor lazily the first time its section becomes active
        if (id === 'doc-editor') {
        initDocEditor();
        checkForDocDraft();
    }

    // Close mobile sidebar on tool select
    if (!isBoot && window.innerWidth <= 900) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const trigger = document.getElementById('menu-trigger');
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) { overlay.classList.remove('active'); overlay.style.display = 'none'; }
        if (trigger) trigger.classList.remove('open');
        document.body.style.overflow = 'auto';
    }

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
}

/* ============================================
   SIDEBAR TOGGLE
   ============================================ */
function toggleSidebar(forceClose = false) {
    const sb  = document.getElementById('sidebar');
    const ov  = document.querySelector('.sidebar-overlay');
    const btn = document.getElementById('menu-trigger');
    const isOpen = sb && sb.classList.contains('open');

    if (forceClose || isOpen) {
        if (sb)  sb.classList.remove('open');
        if (ov)  { ov.classList.remove('active'); ov.style.display = 'none'; }
        if (btn) btn.classList.remove('open');
        document.body.style.overflow = 'auto';
    } else {
        if (sb)  sb.classList.add('open');
        if (ov)  { ov.classList.add('active'); ov.style.display = 'block'; }
        if (btn) btn.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    updatePageMeta(id); // ADD THIS LINE
}

/* ============================================
   ACCORDION CATEGORIES
   ============================================ */
function toggleCategory(header) {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.chevron');

    document.querySelectorAll('.group-content').forEach(other => {
        if (other !== content) {
            other.classList.remove('show');
            const c = other.parentElement.querySelector('.chevron');
            if (c) c.style.transform = 'rotate(0deg)';
        }
    });

    content.classList.toggle('show');
    if (chevron) {
        chevron.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

/* ============================================
   FAQ TOGGLE
   ============================================ */
function toggleFaq(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
}

/* ============================================
   BROWSER BACK/FORWARD
   ============================================ */
window.onpopstate = function(event) {
    const path   = window.location.pathname.replace(/^\//, '').replace(/\/$/, '').trim();
    const toolId = (event.state && event.state.tool) ? event.state.tool : path;
    showTool(toolId || 'home', null, true);
};

/* ============================================
   UTILITY — TASK HANDLER
   ============================================ */
async function processTask(toolName, callback) {
    const btn = event.currentTarget;
    const original = btn.innerHTML;
    try {
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner"></span> Processing...`;
        await callback();
        showStatus(`✅ ${toolName} complete!`, 'success');
    } catch (err) {
        console.error(err);
        showStatus(`❌ ${toolName} failed: ${err.message}`, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = original;
    }
}

function showStatus(message, type) {
    const toast = document.createElement('div');
    toast.className = `status-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

function triggerDownload(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 10000);
}

function loadImage(file) {
    return new Promise((res, rej) => {
        const img = new Image();
        img.onload = () => res(img);
        img.onerror = rej;
        img.src = URL.createObjectURL(file);
    });
}

/* ============================================
   CURRENCY CONVERTER
   ============================================ */
async function convertCurrency() {
    const amt  = document.getElementById('currAmount').value;
    const from = document.getElementById('fromCurrency').value;
    const to   = document.getElementById('toCurrency').value;
    const res  = document.getElementById('currResult');
    if (!amt || !from || !to) return;

    res.innerHTML = `<span class="spinner"></span> Fetching rates...`;
    res.style.display = 'flex';

    try {
        const r    = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await r.json();
        if (data.result === 'success') {
            const rate   = data.rates[to];
            const result = (parseFloat(amt) * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            res.innerHTML = `${amt} ${from} = <span style="color:#22c55e; margin-left:6px;">${result} ${to}</span>`;
            res.classList.add('has-result');
        } else {
            res.innerHTML = 'Could not fetch rates. Try again.';
        }
    } catch {
        res.innerHTML = 'Network error. Check your connection.';
    }
}

/* ============================================
   CRYPTO CONVERTER
   ============================================ */
async function convertCrypto() {
    const amt  = document.getElementById('cryptoAmount').value;
    const from = document.getElementById('fromCrypto').value;
    const to   = document.getElementById('toCryptoCurrency').value.toLowerCase();
    const res  = document.getElementById('cryptoResult');
    if (!amt) return;

    res.innerHTML = `<span class="spinner"></span> Fetching crypto rates...`;
    res.style.display = 'flex';

    try {
        const r    = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`);
        const data = await r.json();
        if (data[from] && data[from][to] !== undefined) {
            const rate   = data[from][to];
            const result = (parseFloat(amt) * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            res.innerHTML = `${amt} ${from.toUpperCase()} = <span style="color:#22c55e; margin-left:6px;">${result} ${to.toUpperCase()}</span>`;
            res.classList.add('has-result');
        } else {
            res.innerHTML = 'Could not fetch crypto rates. Try again later.';
        }
    } catch {
        res.innerHTML = 'Network error. Check your connection.';
    }
}

/* ============================================
   UNIT CONVERTER
   ============================================ */
function convertUnits() {
    const val       = parseFloat(document.getElementById('unitValue').value);
    const type      = document.getElementById('unitType').value;
    const resultBox = document.getElementById('unitResult');

    if (isNaN(val)) { resultBox.innerHTML = 'Please enter a valid number.'; return; }

    const conversions = {
        mToFt:     [val * 3.28084,  'ft'],
        ftToM:     [val / 3.28084,  'm'],
        kgToLb:    [val * 2.20462,  'lb'],
        lbToKg:    [val / 2.20462,  'kg'],
        cToF:      [(val * 9/5) + 32, '°F'],
        fToC:      [(val - 32) * 5/9, '°C'],
        mbToGb:    [val / 1024,     'GB'],
        gbToMb:    [val * 1024,     'MB'],
        kmToMiles: [val * 0.621371, 'miles'],
        milesToKm: [val / 0.621371, 'km']
    };

    const [result, unit] = conversions[type] || [0, ''];
    resultBox.innerHTML = `<small>Result</small>${result.toFixed(4)} ${unit}`;
    resultBox.classList.add('has-result');
}

/* ============================================
   VAT CALCULATOR
   ============================================ */
function updateVatRate() {
    const sel  = document.getElementById('vatCountry');
    const rate = document.getElementById('vatRate');
    if (sel && rate) rate.value = sel.value;
}

function calculateVAT() {
    const amount    = parseFloat(document.getElementById('vatAmount').value);
    const rate      = parseFloat(document.getElementById('vatRate').value);
    const action    = document.getElementById('vatAction').value;
    const resultBox = document.getElementById('vatResult');

    if (isNaN(amount) || isNaN(rate)) { resultBox.innerHTML = 'Please enter a valid amount and VAT rate.'; return; }

    const fmt = n => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    if (action === 'add') {
        const vatAmt = amount * (rate / 100);
        const total  = amount + vatAmt;
        resultBox.innerHTML = `<small>VAT Amount (${rate}%)</small>${fmt(vatAmt)}<div style="font-size:0.85rem;color:#64748b;margin-top:8px;font-weight:600;">Total (Inclusive): ${fmt(total)}</div>`;
    } else {
        const base   = amount / (1 + rate / 100);
        const vatAmt = amount - base;
        resultBox.innerHTML = `<small>VAT Amount (${rate}%)</small>${fmt(vatAmt)}<div style="font-size:0.85rem;color:#64748b;margin-top:8px;font-weight:600;">Base Price (Exclusive): ${fmt(base)}</div>`;
    }
    resultBox.classList.add('has-result');
}

/* ============================================
   PERCENTAGE CALCULATOR
   ============================================ */
function calculatePercentage() {
    const type      = document.getElementById('percentType').value;
    const x         = parseFloat(document.getElementById('percentX').value);
    const y         = parseFloat(document.getElementById('percentY').value);
    const resultBox = document.getElementById('percentResult');

    if (isNaN(x) || isNaN(y)) { resultBox.innerHTML = 'Please enter valid numbers.'; return; }

    const fmt = n => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const ops = {
        basic:       [(x / 100) * y,          `${x}% of ${y} =`,         false],
        findPercent: [(x / y) * 100,           `${x} is this % of ${y}:`, true],
        increase:    [y + (y * (x / 100)),     `${y} increased by ${x}% =`, false],
        decrease:    [y - (y * (x / 100)),     `${y} decreased by ${x}% =`, false]
    };

    const [result, label, isPercent] = ops[type];
    resultBox.innerHTML = `<small>${label}</small>${fmt(result)}${isPercent ? '%' : ''}`;
    resultBox.classList.add('has-result');
}

/* ============================================
   BMI CALCULATOR
   ============================================ */
function calculateBMI() {
    const weight    = parseFloat(document.getElementById('bmiWeight').value);
    const heightCm  = parseFloat(document.getElementById('bmiHeight').value);
    const resultBox = document.getElementById('bmiResult');

    if (isNaN(weight) || isNaN(heightCm) || heightCm <= 0) {
        resultBox.innerHTML = 'Please enter valid weight and height.'; return;
    }

    const bmi = weight / Math.pow(heightCm / 100, 2);
    const categories = [
        [18.5, 'Underweight',    '#f59e0b'],
        [25,   'Healthy Weight', '#22c55e'],
        [30,   'Overweight',     '#f97316'],
        [Infinity, 'Obese',      '#ef4444']
    ];
    const [, category, color] = categories.find(([limit]) => bmi < limit);

    resultBox.innerHTML = `<small>Your BMI</small>${bmi.toFixed(1)}<div style="font-size:0.85rem;color:${color};margin-top:8px;font-weight:700;">Category: ${category}</div>`;
    resultBox.classList.add('has-result');
}

/* ============================================
   INCOME TAX CALCULATOR
   ============================================ */
function calculateIncomeTax() {
    const country   = document.getElementById('taxCountry').value;
    const salary    = parseFloat(document.getElementById('taxSalary').value);
    const resultBox = document.getElementById('taxResult');

    if (isNaN(salary) || salary <= 0) {
        resultBox.innerHTML = 'Please enter a valid salary.';
        return;
    }

    const brackets = {
        nigeria:     [[300000,0.07],[300000,0.11],[500000,0.15],[500000,0.19],[1600000,0.21],[Infinity,0.24]],
        ghana:       [[4824,0],[1320,0.05],[1560,0.10],[36000,0.175],[196740,0.25],[Infinity,0.30]],
        kenya:       [[288000,0.10],[100000,0.25],[Infinity,0.30]],
        southafrica: [[237100,0.18],[133500,0.26],[184200,0.31],[Infinity,0.36]],
        ethiopia:    [[7200,0],[7800,0.10],[16800,0.15],[28800,0.20],[42000,0.25],[Infinity,0.35]],
        tanzania:    [[2040000,0],[4320000,0.08],[6480000,0.20],[8640000,0.25],[Infinity,0.30]],
        uganda:      [[2820000,0],[5040000,0.10],[Infinity,0.30]],
        rwanda:      [[360000,0],[1200000,0.20],[Infinity,0.30]],
        egypt:       [[15000,0],[15000,0.10],[30000,0.15],[30000,0.20],[Infinity,0.25]],
        morocco:     [[30000,0],[50000,0.10],[60000,0.20],[80000,0.30],[180000,0.34],[Infinity,0.38]],
        senegal:     [[630000,0],[1500000,0.20],[4000000,0.30],[Infinity,0.40]],
        cameroon:    [[2000000,0],[3000000,0.11],[5000000,0.165],[Infinity,0.385]],
        uk:          [[12570,0],[37700,0.20],[99730,0.40],[Infinity,0.45]],
        germany:     [[10908,0],[52882,0.14],[277825,0.42],[Infinity,0.45]],
        france:      [[10777,0],[27478,0.11],[78570,0.30],[168994,0.41],[Infinity,0.45]],
        netherlands: [[37149,0.0915],[73031,0.3693],[Infinity,0.495]],
        spain:       [[12450,0.19],[7750,0.24],[15000,0.30],[24800,0.37],[Infinity,0.45]],
        italy:       [[15000,0.23],[13000,0.25],[27000,0.35],[Infinity,0.43]],
        sweden:      [[614000,0.32],[Infinity,0.52]],
        norway:      [[198349,0.221],[Infinity,0.476]],
        denmark:     [[Infinity,0.37]],
        ireland:     [[40000,0.20],[Infinity,0.40]],
        portugal:    [[7479,0.1325],[5137,0.18],[5025,0.23],[7073,0.26],[31502,0.3288],[Infinity,0.48]],
        poland:      [[120000,0.12],[Infinity,0.32]],
        usa:         [[11600,0.10],[35550,0.12],[53375,0.22],[100125,0.24],[89075,0.32],[185950,0.35],[Infinity,0.37]],
        canada:      [[53359,0.15],[53360,0.205],[64533,0.26],[70246,0.29],[Infinity,0.33]],
        brazil:      [[22847.76,0],[33919.80,0.075],[45012.60,0.15],[55976.16,0.225],[Infinity,0.275]],
        mexico:      [[8952.49,0.0192],[75984.55,0.064],[Infinity,0.35]],
        argentina:   [[173834.61,0.05],[173834.61,0.09],[260751.91,0.12],[Infinity,0.35]],
        colombia:    [[41654000,0],[Infinity,0.39]],
        india:       [[250000,0],[250000,0.05],[500000,0.20],[Infinity,0.30]],
        australia:   [[18200,0],[26800,0.19],[80000,0.325],[105000,0.37],[Infinity,0.45]],
        newzealand:  [[14000,0.105],[34000,0.175],[48000,0.30],[70000,0.33],[Infinity,0.39]],
        singapore:   [[20000,0],[10000,0.02],[10000,0.035],[40000,0.07],[40000,0.115],[40000,0.15],[40000,0.18],[Infinity,0.22]],
        pakistan:    [[600000,0],[400000,0.05],[700000,0.10],[700000,0.15],[2600000,0.20],[Infinity,0.25]],
        bangladesh:  [[300000,0],[100000,0.05],[300000,0.10],[400000,0.15],[Infinity,0.20]],
        philippines: [[250000,0],[150000,0.15],[500000,0.20],[500000,0.25],[3600000,0.30],[Infinity,0.35]],
        indonesia:   [[60000000,0.05],[190000000,0.15],[250000000,0.25],[Infinity,0.30]],
        uae:         [[Infinity,0]],
        saudiarabia: [[Infinity,0]],
        israel:      [[75480,0.10],[13560,0.14],[59760,0.20],[93840,0.31],[133560,0.35],[Infinity,0.47]],
        turkey:      [[110000,0.15],[170000,0.20],[880000,0.27],[2000000,0.35],[Infinity,0.40]]
    };

    const countryBrackets = brackets[country];
    if (!countryBrackets) {
        resultBox.innerHTML = 'Tax data not available for this country yet.';
        return;
    }

    let tax = 0;
    let remaining = salary;

    for (const [limit, rate] of countryBrackets) {
        if (remaining <= 0) break;
        const taxable = Math.min(remaining, limit);
        tax += taxable * rate;
        remaining -= taxable;
    }

    const takeHome     = salary - tax;
    const effectiveRate = salary > 0 ? ((tax / salary) * 100).toFixed(1) : 0;
    const fmt = n => n.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const zeroTaxCountries = ['uae', 'saudiarabia'];
    if (zeroTaxCountries.includes(country)) {
        resultBox.innerHTML = `
            <small>Estimated Annual Tax</small>
            ${fmt(0)}
            <div style="font-size:0.85rem;color:#16a34a;margin-top:8px;font-weight:600;">
                ✅ This country has no personal income tax.
                Take-Home: ${fmt(salary)} (100% of salary)
            </div>
            <div style="font-size:0.75rem;color:#94a3b8;margin-top:6px;">
                Note: This is an estimate. Actual tax may vary based on
                individual allowances and reliefs.
            </div>
        `;
        resultBox.classList.add('has-result');
        return;
    }

    resultBox.innerHTML = `
        <small>Estimated Annual Tax</small>
        ${fmt(tax)}
        <div style="font-size:0.85rem;color:#64748b;margin-top:8px;font-weight:600;">
            Take-Home: ${fmt(takeHome)} · Effective Rate: ${effectiveRate}%
        </div>
        <div style="font-size:0.75rem;color:#94a3b8;margin-top:6px;">
            Note: This is an estimate based on standard tax bands.
            Actual tax may vary based on allowances, reliefs and
            deductions specific to your situation.
        </div>
    `;
    resultBox.classList.add('has-result');
}

/* ============================================
   IMAGE TO WORD — OCR TOOL (v2 — with rotate + paragraph fix)
   ============================================ */

let ocrOriginalImage = null;
let ocrCurrentRotation = 0;

function previewOCRImage() {
    const input = document.getElementById('imageToWordInput');
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const img = new Image();
    img.onload = () => {
        ocrOriginalImage = img;
        ocrCurrentRotation = 0;
        drawRotatedPreview();
        document.getElementById('ocrPreviewWrapper').style.display = 'block';
    };
    img.src = URL.createObjectURL(file);
}

function rotateOCRImage(degrees) {
    ocrCurrentRotation = (ocrCurrentRotation + degrees + 360) % 360;
    drawRotatedPreview();
}

function drawRotatedPreview() {
    if (!ocrOriginalImage) return;

    const canvas = document.getElementById('ocrPreviewCanvas');
    const ctx = canvas.getContext('2d');
    const isSideways = (ocrCurrentRotation === 90 || ocrCurrentRotation === 270);

    canvas.width = isSideways ? ocrOriginalImage.height : ocrOriginalImage.width;
    canvas.height = isSideways ? ocrOriginalImage.width : ocrOriginalImage.height;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((ocrCurrentRotation * Math.PI) / 180);
    ctx.drawImage(
        ocrOriginalImage,
        -ocrOriginalImage.width / 2,
        -ocrOriginalImage.height / 2
    );
    ctx.restore();
}

function getFinalRotatedCanvas() {
    // Produces the actual full-resolution rotated canvas used for OCR
    const isSideways = (ocrCurrentRotation === 90 || ocrCurrentRotation === 270);
    const canvas = document.createElement('canvas');
    canvas.width = isSideways ? ocrOriginalImage.height : ocrOriginalImage.width;
    canvas.height = isSideways ? ocrOriginalImage.width : ocrOriginalImage.height;
    const ctx = canvas.getContext('2d');

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((ocrCurrentRotation * Math.PI) / 180);
    ctx.drawImage(
        ocrOriginalImage,
        -ocrOriginalImage.width / 2,
        -ocrOriginalImage.height / 2
    );
    ctx.restore();

    return canvas;
}

function startImageToWordConversion() {
    if (!ocrOriginalImage) {
        alert('Please select an image first.');
        return;
    }

    if (typeof Tesseract === 'undefined') {
        alert('OCR engine failed to load. Please refresh the page and try again.');
        return;
    }

    const btn = document.getElementById('extractBtn');
    btn.disabled = true;
    btn.textContent = 'Processing...';

    runOCR().finally(() => {
        btn.disabled = false;
        btn.textContent = 'Extract Text';
    });
}

async function runOCR() {
    const progressDiv = document.getElementById('ocrProgress');
    const previewArea = document.getElementById('wordPreviewArea');
    const textArea = document.getElementById('wordExtractedText');
    const langSelect = document.getElementById('ocrLanguage');
    const language = langSelect ? langSelect.value : 'eng';

    progressDiv.style.display = 'block';
    progressDiv.textContent = '🔄 Preparing image...';

    try {
        // Step 1: Get the rotated version of the image
        const rotatedCanvas = getFinalRotatedCanvas();

        // Step 2: Preprocess — grayscale + contrast threshold
        const ctx = rotatedCanvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, rotatedCanvas.width, rotatedCanvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            const value = gray > 150 ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
        }
        ctx.putImageData(imageData, 0, 0);

        // Step 3: Run OCR — request word-level position data
        progressDiv.textContent = '🔄 Reading text from image (this can take 10-30 seconds)...';

        const result = await Tesseract.recognize(rotatedCanvas, language, {
            logger: (m) => {
                if (m.status === 'recognizing text') {
                    const pct = Math.round(m.progress * 100);
                    progressDiv.textContent = `🔄 Reading text... ${pct}%`;
                }
            }
        });

        // Step 4: Rebuild proper lines and paragraphs using word position data
        const cleanText = rebuildTextWithLayout(result.data);

        progressDiv.style.display = 'none';
        previewArea.style.display = 'block';

        if (!cleanText.trim()) {
            textArea.value = '';
            textArea.placeholder = 'No readable text was found. Try rotating the image or using a clearer, well-lit photo.';
            return;
        }

        textArea.value = cleanText;

    } catch (err) {
        console.error('[OCR] Error:', err);
        progressDiv.style.display = 'none';
        previewArea.style.display = 'block';
        textArea.value = '';
        textArea.placeholder = 'Something went wrong: ' + err.message;
    }
}

/* Rebuilds text with real line breaks and paragraph breaks
   based on the actual vertical position of each word on the
   page, instead of Tesseract's raw flattened text output. */
function rebuildTextWithLayout(ocrData) {
    if (!ocrData.words || ocrData.words.length === 0) {
        return sanitizeText(ocrData.text || '');
    }

    // Sort words top-to-bottom, then left-to-right
    const words = ocrData.words
        .filter(w => w.text && w.text.trim().length > 0)
        .sort((a, b) => {
            const yDiff = a.bbox.y0 - b.bbox.y0;
            if (Math.abs(yDiff) > 10) return yDiff; // different line
            return a.bbox.x0 - b.bbox.x0; // same line, sort left to right
        });

    let lines = [];
    let currentLine = [];
    let lastY = null;
    let lastLineHeight = null;

    words.forEach(word => {
        const y = word.bbox.y0;
        const height = word.bbox.y1 - word.bbox.y0;

        if (lastY === null) {
            currentLine.push(word);
        } else if (Math.abs(y - lastY) <= (lastLineHeight || height) * 0.6) {
            // Same line
            currentLine.push(word);
        } else {
            // New line — record gap size to detect paragraph breaks later
            const gap = y - lastY;
            lines.push({ words: currentLine, gapBefore: gap, lineHeight: lastLineHeight || height });
            currentLine = [word];
        }

        lastY = y;
        lastLineHeight = height;
    });
    if (currentLine.length) {
        lines.push({ words: currentLine, gapBefore: 0, lineHeight: lastLineHeight });
    }

    // Build final text — insert an extra blank line where the
    // vertical gap is noticeably larger than a normal line gap
    let output = '';
    lines.forEach((line, idx) => {
        const lineText = line.words.map(w => w.text).join(' ');

        if (idx > 0) {
            const normalGap = line.lineHeight * 1.5;
            if (line.gapBefore > normalGap * 1.8) {
                output += '\n\n'; // paragraph break
            } else {
                output += '\n'; // normal line break
            }
        }

        output += lineText;
    });

    return sanitizeText(output);
}

function sanitizeText(rawText) {
    return rawText
        .replace(/<[^>]*>/g, '')
        .replace(/[\u0000-\u001F\u007F]/g, '\n')
        .replace(/[^\x20-\x7E\u00A0-\u024F\u1E00-\u1EFF\n]/g, '')
        .replace(/[ \t]{2,}/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

function downloadProcessedWord() {
    const text = document.getElementById('wordExtractedText').value;
    if (!text.trim()) {
        alert('No text to download yet.');
        return;
    }
    const htmlContent = text.split('\n\n').map(para =>
        `<p>${para.split('\n').join('<br>')}</p>`
    ).join('');

    const blob = new Blob(
        ['<html><head><meta charset="utf-8"></head><body>' + htmlContent + '</body></html>'],
        { type: 'application/msword' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.doc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyExtractedTextToClipboard() {
    const text = document.getElementById('wordExtractedText').value;
    if (!text.trim()) {
        alert('No text to copy yet.');
        return;
    }
    navigator.clipboard.writeText(text).then(() => {
        alert('Text copied to clipboard!');
    }).catch(() => {
        alert('Could not copy automatically. Please select and copy the text manually.');
    });
}

/* ============================================
   IMAGE COMPRESSOR
   ============================================ */
let currentSourceImg = null;
let isProcessing     = false;

async function initCompressor() {
    const input = document.getElementById('compressInput');
    if (!input || !input.files[0]) return;
    currentSourceImg = await loadImage(input.files[0]);
    document.getElementById('compressPreviewArea').style.display = 'block';
    compressImage();
}

function compressImage() {
    const pct = document.getElementById('compressQuality').value;
    document.getElementById('qualityValue').textContent = pct + '%';
    if (!currentSourceImg || isProcessing) return;

    requestAnimationFrame(() => {
        isProcessing = true;
        const canvas = document.getElementById('previewCanvas');
        const ctx    = canvas.getContext('2d');
        canvas.width  = currentSourceImg.width;
        canvas.height = currentSourceImg.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentSourceImg, 0, 0);
        const estimatedKB = (currentSourceImg.src.length * (pct / 100) / 1024).toFixed(1);
        document.getElementById('sizeComparison').textContent = `Estimated size: ~${estimatedKB} KB`;
        isProcessing = false;
    });
}

async function downloadCompressedImage() {
    const pct    = document.getElementById('compressQuality').value;
    const canvas = document.createElement('canvas');
    canvas.width  = currentSourceImg.width;
    canvas.height = currentSourceImg.height;
    canvas.getContext('2d').drawImage(currentSourceImg, 0, 0);
    canvas.toBlob(blob => triggerDownload(blob, 'FlexTools_Compressed.jpg'), 'image/jpeg', pct / 100);
}

/* ============================================
   IMAGE RESIZER
   ============================================ */
async function resizeImage() {
    await processTask('Image Resize', async () => {
        const file  = document.getElementById('resizerInput').files[0];
        const width = parseInt(document.getElementById('resizeWidth').value);
        if (!file || !width) throw new Error('Please select a file and enter a width.');
        const img    = await loadImage(file);
        const canvas = document.createElement('canvas');
        const scale  = width / img.width;
        canvas.width  = width;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(b => triggerDownload(b, 'FlexTools_Resized.jpg'), 'image/jpeg');
    });
}

/* ============================================
   FILE FORMAT CONVERTER
   ============================================ */
async function convertFile() {
    await processTask('File Conversion', async () => {
        const file   = document.getElementById('fileConvInput').files[0];
        const format = document.getElementById('fileToFormat').value;
        if (!file) throw new Error('Please select a file.');

        let workingFile = file;
        const isHeic = /heic|heif/i.test(file.type) || /\.hei[cf]$/i.test(file.name);

        if (isHeic) {
            if (typeof heic2any === 'undefined') {
                throw new Error('HEIC support library failed to load. Refresh the page and try again.');
            }
            workingFile = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
        }

        let img;
        try {
            img = await loadImage(workingFile);
        } catch (e) {
            throw new Error('This image format could not be read by your browser. Try JPG, PNG, WebP, GIF, or an iPhone HEIC photo.');
        }

        const canvas = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        const ext = format.split('/')[1];

        canvas.toBlob(b => {
            if (!b) { showStatus('❌ Could not convert to this format. Try a different output option.', 'error'); return; }
            triggerDownload(b, `FlexTools_Converted.${ext}`);
        }, format, 0.95);
    });
}

/* ============================================
   PDF EDITOR — Complete Consolidated Version
   Bake-on-commit model + drag-and-drop placement
   + re-editable click-to-edit text
   ============================================ */

let pdfBytes         = null;
let pdfDoc           = null;
let pdfPageImages    = {};   // current (edited) state per page
let pdfPageOriginals = {};   // untouched original render per page
let pageUndoStacks   = {};   // undo history per page
let currentPDFPage   = 1;
let totalPDFPages    = 1;
let currentPDFTool   = 'text';
let isPointerDown    = false;
let dragStrokePoints = [];
let isBold           = false;
let currentHighlightColor = '#FFE500';
let signCanvas, signCtx, isSignDrawing = false;
let pdfTextItemsByPage = {};
let layerCounter = 0;
const PDF_RENDER_SCALE = 2.2;

/* ---- Drag-and-drop placement ghost ---- */
let placementGhost = null;
let placementType  = null;
let placementData  = null;

/* ---- Baking helpers ---- */
function getBakedContext(pageNum) {
    const canvas = document.createElement('canvas');
    const base   = pdfPageImages[pageNum];
    canvas.width  = base.naturalWidth  || base.width;
    canvas.height = base.naturalHeight || base.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    return { canvas, ctx };
}

function bakeEdit(pageNum, drawFn) {
    if (!pageUndoStacks[pageNum]) pageUndoStacks[pageNum] = [];
    pageUndoStacks[pageNum].push(pdfPageImages[pageNum].src);
    if (pageUndoStacks[pageNum].length > 30) pageUndoStacks[pageNum].shift();

    const { canvas, ctx } = getBakedContext(pageNum);
    drawFn(ctx, canvas);

    const newImg = new Image();
    newImg.src = canvas.toDataURL('image/png');
    pdfPageImages[pageNum] = newImg;

    if (pageNum === currentPDFPage) {
        newImg.onload = () => drawPDFPreview();
        if (newImg.complete) drawPDFPreview();
    }
}

function undoPDFAction() {
    const stack = pageUndoStacks[currentPDFPage];
    if (!stack || !stack.length) { showStatus('Nothing to undo.', 'error'); return; }
    const prevSrc = stack.pop();
    const img = new Image();
    img.onload = () => { pdfPageImages[currentPDFPage] = img; drawPDFPreview(); };
    img.src = prevSrc;
    const list = document.getElementById('layerList');
    if (list && list.lastElementChild) list.lastElementChild.remove();
}

function clearAllPDFEdits() {
    if (!pageUndoStacks[currentPDFPage]) pageUndoStacks[currentPDFPage] = [];
    pageUndoStacks[currentPDFPage].push(pdfPageImages[currentPDFPage].src);

    const img = new Image();
    img.onload = () => { pdfPageImages[currentPDFPage] = img; drawPDFPreview(); };
    img.src = pdfPageOriginals[currentPDFPage].src;

    const list = document.getElementById('layerList');
    if (list) list.innerHTML = '';
    showStatus('✅ Page edits cleared.', 'success');
}

/* ---- Tool selection ---- */
function selectPDFTool(tool) {
    currentPDFTool = tool;
    cancelDragPlacement();

    document.querySelectorAll('.pdf-tool-btn').forEach(btn => {
        btn.style.background  = '#fff';
        btn.style.borderColor = '#e2e8f0';
        btn.style.color       = '#475569';
    });
    const activeBtn = document.getElementById('tool' + tool.charAt(0).toUpperCase() + tool.slice(1));
    if (activeBtn) {
        activeBtn.style.background  = '#eef2ff';
        activeBtn.style.borderColor = '#6366f1';
        activeBtn.style.color       = '#4f46e5';
    }

    ['textOptions','edittextOptions','drawOptions','highlightOptions','signOptions','eraserOptions','imageOptions']
        .forEach(p => { const el = document.getElementById(p); if (el) el.style.display = 'none'; });
    const panel = document.getElementById(tool + 'Options');
    if (panel) panel.style.display = 'block';

    const canvas = document.getElementById('pdfCanvas');
    if (canvas) canvas.style.cursor = (tool === 'eraser') ? 'cell' : 'crosshair';

    if (tool === 'sign') initSignaturePad();
    if (tool === 'edittext') loadPDFTextOverlay(currentPDFPage);
    else clearPDFTextOverlay();
}

function togglePDFBold() {
    isBold = !isBold;
    const btn = document.getElementById('pdfBoldBtn');
    if (btn) {
        btn.style.background  = isBold ? '#eef2ff' : '#fff';
        btn.style.borderColor = isBold ? '#6366f1' : '#e2e8f0';
        btn.style.color       = isBold ? '#4f46e5' : '#475569';
    }
}

function setHighlightColor(color) {
    currentHighlightColor = color;
    document.querySelectorAll('#highlightOptions button').forEach(b => b.style.border = '2px solid #ccc');
    event.target.style.border = '2px solid #6366f1';
}

/* ---- Sharp text rendering (all placed/edited text) ---- */
function detectTextDirection(text) { return /[\u0590-\u08FF]/.test(text); }

async function renderTextToImageData(text, font, size, color, bold) {
    if (document.fonts && document.fonts.load) {
        try { await document.fonts.load(`${bold ? 'bold ' : ''}${size}px "${font}"`); } catch (e) {}
    }
    const RENDER_SCALE = 3;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const isRTL = detectTextDirection(text);
    const weight = bold ? 'bold' : 'normal';

    ctx.font = `${weight} ${size * RENDER_SCALE}px "${font}", Arial, sans-serif`;
    const metrics = ctx.measureText(text);
    const padding = 8 * RENDER_SCALE;
    canvas.width  = Math.ceil(metrics.width) + padding * 2;
    canvas.height = Math.ceil(size * RENDER_SCALE * 1.4) + padding * 2;

    ctx.font = `${weight} ${size * RENDER_SCALE}px "${font}", Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.direction = isRTL ? 'rtl' : 'ltr';
    ctx.textAlign = isRTL ? 'right' : 'left';
    const x = isRTL ? canvas.width - padding : padding;
    ctx.fillText(text, x, padding);

    return {
        dataUrl: canvas.toDataURL('image/png'),
        width:  canvas.width  / RENDER_SCALE,
        height: canvas.height / RENDER_SCALE
    };
}

/* ============================================
   DRAG-AND-DROP PLACEMENT (text, image, signature)
   ============================================ */
function startDragPlacement(type, previewDataUrl, width, height) {
    cancelDragPlacement();

    const container = document.getElementById('pdfViewContainer');
    if (!container) return;

    placementType = type;
    placementData = { dataUrl: previewDataUrl, width, height };

    const ghost = document.createElement('div');
    ghost.id = 'placementGhost';
    ghost.style.cssText = `
        position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
        cursor:grab; z-index:50; border:2px dashed #6366f1;
        background:rgba(99,102,241,0.08); touch-action:none;
        display:flex; align-items:center; justify-content:center;
    `;
    ghost.style.width  = width + 'px';
    ghost.style.height = height + 'px';
    ghost.innerHTML = `<img src="${previewDataUrl}" style="max-width:100%;max-height:100%;pointer-events:none;">`;

    container.appendChild(ghost);
    placementGhost = ghost;
    makeGhostDraggable(ghost);
    showDragConfirmBar();
}

function makeGhostDraggable(ghost) {
    let dragging = false;
    let offsetX = 0, offsetY = 0;

    const onDown = (e) => {
        dragging = true;
        ghost.style.cursor = 'grabbing';
        const point = e.touches ? e.touches[0] : e;
        const rect = ghost.getBoundingClientRect();
        offsetX = point.clientX - rect.left;
        offsetY = point.clientY - rect.top;
        e.preventDefault();
    };

    const onMove = (e) => {
        if (!dragging) return;
        const point = e.touches ? e.touches[0] : e;
        const containerRect = document.getElementById('pdfViewContainer').getBoundingClientRect();
        let x = point.clientX - containerRect.left - offsetX;
        let y = point.clientY - containerRect.top - offsetY;
        x = Math.max(0, Math.min(x, containerRect.width  - ghost.offsetWidth));
        y = Math.max(0, Math.min(y, containerRect.height - ghost.offsetHeight));
        ghost.style.left = x + 'px';
        ghost.style.top  = y + 'px';
        ghost.style.transform = 'none';
        e.preventDefault();
    };

    const onUp = () => { dragging = false; ghost.style.cursor = 'grab'; };

    ghost.addEventListener('mousedown', onDown);
    ghost.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    ghost._cleanup = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);
    };
}

function showDragConfirmBar() {
    let bar = document.getElementById('dragConfirmBar');
    if (bar) bar.remove();

    bar = document.createElement('div');
    bar.id = 'dragConfirmBar';
    bar.style.cssText = `
        position:absolute; bottom:10px; left:50%; transform:translateX(-50%);
        display:flex; gap:8px; z-index:60; background:#0f172a; padding:8px;
        border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.3);
    `;
    bar.innerHTML = `
        <button onclick="confirmDragPlacement()" style="padding:8px 16px;background:#16a34a;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;">✅ Place Here</button>
        <button onclick="cancelDragPlacement()" style="padding:8px 16px;background:#dc2626;color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;">✕ Cancel</button>
    `;
    document.getElementById('pdfViewContainer').appendChild(bar);
}

function confirmDragPlacement() {
    if (!placementGhost || !placementData) return;

    const container = document.getElementById('pdfViewContainer');
    const canvas = document.getElementById('pdfCanvas');
    const containerRect = container.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const ghostLeft = parseFloat(placementGhost.style.left) || 0;
    const ghostTop  = parseFloat(placementGhost.style.top)  || 0;

    const relLeft = (canvasRect.left - containerRect.left);
    const relTop  = (canvasRect.top  - containerRect.top);
    const scaleX = canvas.width  / canvasRect.width;
    const scaleY = canvas.height / canvasRect.height;

    const x = (ghostLeft - relLeft) * scaleX;
    const y = (ghostTop  - relTop)  * scaleY;
    const w = placementGhost.offsetWidth  * scaleX;
    const h = placementGhost.offsetHeight * scaleY;

    const img = new Image();
    img.src = placementData.dataUrl;
    img.onload = () => {
        bakeEdit(currentPDFPage, (ctx) => ctx.drawImage(img, x, y, w, h));
        const label = placementType === 'text' ? 'Text placed' : (placementType === 'sign' ? 'Signature placed' : 'Image placed');
        addLayerToList(label);
        showStatus('✅ Placed on PDF!', 'success');
        const doc = document.getElementById('pdfTextToAdd');
        if (placementType === 'text' && doc) doc.value = '';
        cancelDragPlacement();
    };
}

function cancelDragPlacement() {
    if (placementGhost) {
        placementGhost._cleanup?.();
        placementGhost.remove();
        placementGhost = null;
    }
    const bar = document.getElementById('dragConfirmBar');
    if (bar) bar.remove();
    placementType = null;
    placementData = null;
}

/* ---- Text tool: renders text then hands off to drag placement ---- */
async function armTextPlacement() {
    const text  = document.getElementById('pdfTextToAdd')?.value.trim();
    const color = document.getElementById('pdfTextColor')?.value || '#000000';
    const size  = parseInt(document.getElementById('pdfFontSize')?.value || 20);
    const font  = document.getElementById('pdfFontFamily')?.value || 'Arial';

    if (!text) { showStatus('❌ Type your text first, then tap this button.', 'error'); return; }

    const rendered = await renderTextToImageData(text, font, size, color, isBold);
    startDragPlacement('text', rendered.dataUrl, rendered.width, rendered.height);
    showStatus('👆 Drag the text to position it, then tap "Place Here"', 'success');
}

/* ---- Image tool: loads file then hands off to drag placement ---- */
function loadPDFImage(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        const w = parseInt(document.getElementById('pdfImgWidth')?.value || 150);
        const h = parseInt(document.getElementById('pdfImgHeight')?.value || 100);
        startDragPlacement('image', e.target.result, w, h);
        showStatus('👆 Drag the image to position it, then tap "Place Here"', 'success');
    };
    reader.readAsDataURL(file);
    input.value = '';
}

/* ---- Click-to-edit existing PDF text (re-editable, no revert) ---- */
async function loadPDFTextOverlay(pageNum) {
    if (currentPDFTool !== 'edittext') return;
    const overlay = document.getElementById('pdfTextOverlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    overlay.style.touchAction = 'manipulation';

    const page     = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: PDF_RENDER_SCALE });
    const canvas   = document.getElementById('pdfCanvas');
    overlay.style.width  = canvas.clientWidth + 'px';
    overlay.style.height = canvas.clientHeight + 'px';
    const scaleX = canvas.clientWidth  / canvas.width;
    const scaleY = canvas.clientHeight / canvas.height;

    if (!pdfTextItemsByPage[pageNum]) {
        const textContent = await page.getTextContent();
        pdfTextItemsByPage[pageNum] = textContent.items.map(item => ({
            str: item.str, transform: item.transform, width: item.width
        }));
    }

    pdfTextItemsByPage[pageNum].forEach((item, index) => {
        if (!item.str || !item.str.trim()) return;

        const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
        const fontHeight = Math.hypot(tx[2], tx[3]);
        const left = tx[4];
        const top  = tx[5] - fontHeight;
        const width  = item.width * viewport.scale;

        const span = document.createElement('div');
        span.className = 'pdf-text-span';
        span.dataset.lastCommittedText = item.str;
        span.textContent = item.str;
        span.style.left     = (left * scaleX) + 'px';
        span.style.top      = (top  * scaleY) + 'px';
        span.style.width    = (width * scaleX) + 'px';
        span.style.height   = (fontHeight * scaleY) + 'px';
        span.style.fontSize = (fontHeight * scaleY) + 'px';
        span.style.lineHeight = (fontHeight * scaleY) + 'px';
        span.style.fontFamily = 'Arial, sans-serif';

        span.style.touchAction = 'manipulation';
        span.onpointerup = (e) => {
            e.stopPropagation();
            startInlineTextEdit(span, item, viewport, pageNum, index);
        };
        overlay.appendChild(span);
    });
}

function clearPDFTextOverlay() {
    const overlay = document.getElementById('pdfTextOverlay');
    if (overlay) { overlay.innerHTML = ''; overlay.style.pointerEvents = 'none'; }
}

function startInlineTextEdit(span, item, viewport, pageNum, itemIndex) {
    if (span.classList.contains('pdf-text-span-editing')) return;
    span.classList.add('pdf-text-span-editing');
    span.contentEditable = true;
    span.focus();
    const range = document.createRange();
    range.selectNodeContents(span);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    const controlsBar = createInlineEditControls(span);

    const commit = async () => {
        const newText = span.textContent.trim();
        span.contentEditable = false;
        span.classList.remove('pdf-text-span-editing');
        if (controlsBar) controlsBar.remove();

        if (newText === '' || newText === span.dataset.lastCommittedText) {
            span.textContent = span.dataset.lastCommittedText;
            return;
        }

        const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
        const fontHeight = Math.hypot(tx[2], tx[3]);
        const left = tx[4];
        const top  = tx[5] - fontHeight;
        const width = item.width * viewport.scale;

        const chosenFont  = span.dataset.chosenFont  || 'Arial';
        const chosenSize  = parseInt(span.dataset.chosenSize)  || Math.round(fontHeight * 0.85);
        const chosenColor = span.dataset.chosenColor || '#000000';

        const rendered = await renderTextToImageData(newText, chosenFont, chosenSize, chosenColor, false);
        const img = new Image();
        img.src = rendered.dataUrl;
        await new Promise(r => img.onload = r);

        const padX = 6, padY = 6;
        bakeEdit(pageNum, (ctx) => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(left - padX, top - padY, width + padX * 2, fontHeight + padY * 2);
            ctx.drawImage(img, left, top, rendered.width, rendered.height);
        });

        span.dataset.lastCommittedText = newText;
        span.textContent = newText;
        span.style.touchAction = 'manipulation';
        span.onpointerup = (e) => {
            e.stopPropagation();
            startInlineTextEdit(span, item, viewport, pageNum, itemIndex);
        };

        addLayerToList(`Edited: "${newText}"`);
        showStatus('✅ Text updated — click it again anytime to edit further', 'success');
    };

    span.onblur = (e) => {
        if (controlsBar && controlsBar.contains(e.relatedTarget)) return;
        commit();
    };
    span.onkeydown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); span.blur(); }
        if (e.key === 'Escape') { if (controlsBar) controlsBar.remove(); span.textContent = span.dataset.lastCommittedText; span.blur(); }
    };
}

function createInlineEditControls(span) {
    const overlay = document.getElementById('pdfTextOverlay');
    if (!overlay) return null;

    const bar = document.createElement('div');
    bar.className = 'pdf-inline-edit-controls';
    bar.style.cssText = `
        position:absolute; left:${span.style.left}; top:calc(${span.style.top} - 42px);
        display:flex; gap:4px; background:#0f172a; padding:6px; border-radius:8px;
        z-index:20; pointer-events:auto; box-shadow:0 4px 12px rgba(0,0,0,0.25); white-space:nowrap;
    `;

    bar.innerHTML = `
        <select tabindex="-1" style="font-size:11px;padding:3px;border-radius:4px;border:none;">
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times</option>
            <option value="Courier New">Courier</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Noto Sans Arabic">Arabic</option>
        </select>
        <select tabindex="-1" style="font-size:11px;padding:3px;border-radius:4px;border:none;width:44px;">
            <option value="10">10</option><option value="12">12</option>
            <option value="14">14</option><option value="16">16</option>
            <option value="18">18</option><option value="20" selected>20</option>
            <option value="24">24</option><option value="28">28</option>
            <option value="32">32</option>
        </select>
        <input tabindex="-1" type="color" value="#000000" style="width:26px;height:24px;padding:0;border:none;border-radius:4px;cursor:pointer;">
    `;

    const [fontSel, sizeSel, colorInput] = bar.children;
    const parsedHeight = parseFloat(span.style.height) || 20;
    sizeSel.value = String(Math.round(parsedHeight));

    span.dataset.chosenFont  = fontSel.value;
    span.dataset.chosenSize  = sizeSel.value;
    span.dataset.chosenColor = colorInput.value;

    fontSel.onchange   = () => { span.dataset.chosenFont  = fontSel.value; };
    sizeSel.onchange   = () => { span.dataset.chosenSize  = sizeSel.value; };
    colorInput.oninput = () => { span.dataset.chosenColor = colorInput.value; };

    [fontSel, sizeSel, colorInput].forEach(el => {
        el.addEventListener('mousedown', e => e.stopPropagation());
    });

    overlay.appendChild(bar);
    return bar;
}

/* ---- Signature pad ---- */
function initSignaturePad() {
    signCanvas = document.getElementById('signatureCanvas');
    if (!signCanvas) return;
    signCtx = signCanvas.getContext('2d');
    signCtx.lineWidth = 2; signCtx.lineCap = 'round'; signCtx.lineJoin = 'round';

    const start = (x, y) => { isSignDrawing = true; signCtx.beginPath(); signCtx.moveTo(x, y); };
    const move  = (x, y) => { if (!isSignDrawing) return; signCtx.strokeStyle = document.getElementById('signColor')?.value || '#000080'; signCtx.lineTo(x, y); signCtx.stroke(); };
    const end   = () => { isSignDrawing = false; };

    signCanvas.onpointerdown = e => { const r = signCanvas.getBoundingClientRect(); start(e.clientX - r.left, e.clientY - r.top); };
    signCanvas.onpointermove = e => { const r = signCanvas.getBoundingClientRect(); move(e.clientX - r.left, e.clientY - r.top); };
    signCanvas.onpointerup   = end;
    signCanvas.onpointerleave = end;
}

function clearSignature() { if (signCtx && signCanvas) signCtx.clearRect(0, 0, signCanvas.width, signCanvas.height); }

function placeSignatureOnPDF() {
    if (!signCanvas) return;
    const dataUrl = signCanvas.toDataURL();
    startDragPlacement('sign', dataUrl, 200, 80);
    showStatus('👆 Drag your signature to position it, then tap "Place Here"', 'success');
}

/* ---- Init & render ---- */
async function initPDFEditor() {
    const file = document.getElementById('pdfEditInput').files[0];
    if (!file) return;

    pdfPageImages = {}; pdfPageOriginals = {}; pageUndoStacks = {};
    pdfTextItemsByPage = {}; currentPDFPage = 1; layerCounter = 0;
    cancelDragPlacement();

    const list = document.getElementById('layerList');
    if (list) list.innerHTML = '';

    document.getElementById('pdfControls').style.display      = 'block';
    document.getElementById('pdfViewContainer').style.display = 'block';
    document.getElementById('pdfDownloadBtn').style.display   = 'block';
    document.getElementById('layerContainer').style.display   = 'block';

    try {
        pdfBytes = await file.arrayBuffer();
        pdfDoc   = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
        totalPDFPages = pdfDoc.numPages;

        const info = document.getElementById('pdfPageInfo');
        if (info) { info.textContent = `✅ ${totalPDFPages} page${totalPDFPages > 1 ? 's' : ''} loaded`; info.style.display = 'block'; }
        const nav = document.getElementById('pdfPageNav');
        if (nav) nav.style.display = totalPDFPages > 1 ? 'block' : 'none';

        await renderPDFPage(currentPDFPage);
        showStatus('✅ PDF loaded. Select a tool and start editing.', 'success');
    } catch (err) {
        console.error('PDF load error:', err);
        showStatus('❌ Could not load PDF: ' + (err.message || 'unknown error'), 'error');
    }
}

async function renderPDFPage(pageNum) {
    const page     = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: PDF_RENDER_SCALE });
    const canvas   = document.getElementById('pdfCanvas');
    const ctx      = canvas.getContext('2d');
    canvas.width  = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;

    if (!pdfPageOriginals[pageNum]) {
        const origImg = new Image();
        origImg.src = canvas.toDataURL('image/png');
        pdfPageOriginals[pageNum] = origImg;
    }
    if (!pdfPageImages[pageNum]) {
        const img = new Image();
        img.src = pdfPageOriginals[pageNum].src;
        pdfPageImages[pageNum] = img;
    }

    updatePageLabel();
    drawPDFPreview();
    attachCanvasEvents();
    if (currentPDFTool === 'edittext') loadPDFTextOverlay(pageNum);
}

function updatePageLabel() {
    const label = document.getElementById('pdfPageLabel');
    if (label) label.textContent = `Page ${currentPDFPage} of ${totalPDFPages}`;
}

async function changePDFPage(dir) {
    const next = currentPDFPage + dir;
    if (next < 1 || next > totalPDFPages) return;
    cancelDragPlacement();
    currentPDFPage = next;
    if (!pdfPageImages[currentPDFPage]) {
        await renderPDFPage(currentPDFPage);
    } else {
        updatePageLabel();
        drawPDFPreview();
        if (currentPDFTool === 'edittext') loadPDFTextOverlay(currentPDFPage);
        else clearPDFTextOverlay();
    }
}

function drawPDFPreview() {
    const canvas = document.getElementById('pdfCanvas');
    const base   = pdfPageImages[currentPDFPage];
    if (!canvas || !base) return;
    const ctx = canvas.getContext('2d');
    if (base.complete) {
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    } else {
        base.onload = () => ctx.drawImage(base, 0, 0, canvas.width, canvas.height);
    }
}

/* ---- Unified pointer events (draw/highlight/eraser only) ---- */
function getCanvasCoords(e) {
    const canvas = document.getElementById('pdfCanvas');
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
}

function attachCanvasEvents() {
    const canvas = document.getElementById('pdfCanvas');
    if (!canvas) return;
    canvas.onpointerdown  = onPDFPointerDown;
    canvas.onpointermove  = onPDFPointerMove;
    canvas.onpointerup    = onPDFPointerUp;
    canvas.onpointerleave = onPDFPointerUp;
}

function onPDFPointerDown(e) {
    if (currentPDFTool === 'edittext') return; // let overlay spans handle their own touches
    if (['draw', 'highlight', 'eraser'].includes(currentPDFTool)) {
        isPointerDown = true;
        dragStrokePoints = [getCanvasCoords(e)];
    }
}

function onPDFPointerMove(e) {
    if (!isPointerDown) return;
    const point = getCanvasCoords(e);
    dragStrokePoints.push(point);

    const canvas = document.getElementById('pdfCanvas');
    const ctx    = canvas.getContext('2d');
    if (currentPDFTool === 'eraser') {
        const size = parseInt(document.getElementById('eraserSize')?.value || 30);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(point.x - size/2, point.y - size/2, size, size);
    } else {
        const color = currentPDFTool === 'draw'
            ? (document.getElementById('drawColor')?.value || '#000000')
            : currentHighlightColor;
        const size = currentPDFTool === 'draw'
            ? parseInt(document.getElementById('drawSize')?.value || 3)
            : parseInt(document.getElementById('highlightSize')?.value || 20);
        ctx.save();
        ctx.globalAlpha = currentPDFTool === 'highlight' ? 0.35 : 1;
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        const prev = dragStrokePoints[dragStrokePoints.length - 2] || point;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        ctx.restore();
    }
}

function onPDFPointerUp() {
    if (!isPointerDown) return;
    isPointerDown = false;
    if (!dragStrokePoints.length) return;

    const pageNum = currentPDFPage;
    const tool = currentPDFTool;
    dragStrokePoints = [];

    const canvas = document.getElementById('pdfCanvas');
    const currentSnapshot = canvas.toDataURL('image/png');

    if (!pageUndoStacks[pageNum]) pageUndoStacks[pageNum] = [];
    pageUndoStacks[pageNum].push(pdfPageImages[pageNum].src);

    const bakedImg = new Image();
    bakedImg.src = currentSnapshot;
    pdfPageImages[pageNum] = bakedImg;

    const label = tool === 'eraser' ? 'Erased area' : (tool === 'highlight' ? 'Highlight' : 'Drawing');
    addLayerToList(label);
}

function addLayerToList(label) {
    layerCounter++;
    const list = document.getElementById('layerList');
    if (!list) return;
    const li = document.createElement('li');
    li.style.cssText = 'background:#f1f5f9;padding:8px 12px;border-radius:8px;font-size:0.8rem;';
    li.textContent = `${layerCounter}. ${label}`;
    list.appendChild(li);
}

/* ---- Download final PDF ---- */
async function downloadEditedPDF() {
    try {
        const { PDFDocument } = PDFLib;
        const doc = await PDFDocument.load(pdfBytes);
        const pages = doc.getPages();

        for (let pageNum = 1; pageNum <= totalPDFPages; pageNum++) {
            const finalImg = pdfPageImages[pageNum] || pdfPageOriginals[pageNum];
            if (!finalImg) continue;

            const dataUrl = finalImg.src;
            const isPng = dataUrl.startsWith('data:image/png');
            const b64   = dataUrl.split(',')[1];
            const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
            const embedded = isPng ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);

            const page = pages[pageNum - 1];
            const { width, height } = page.getSize();
            page.drawImage(embedded, { x: 0, y: 0, width, height });
        }

        const outBytes = await doc.save();
        triggerDownload(new Blob([outBytes], { type: 'application/pdf' }), 'FlexTools_Edited.pdf');
        showStatus('✅ PDF downloaded!', 'success');
    } catch (err) {
        console.error('PDF download error:', err);
        showStatus('❌ Download failed: ' + (err.message || 'unknown error'), 'error');
    }
}

    /* ============================================
   MULTI-SCRIPT TEXT RENDERING
   Renders text via canvas (correct shaping for
   Arabic, Hebrew, Hindi, CJK etc.) then embeds
   as an image into the PDF for accurate display.
   ============================================ */
function detectTextDirection(text) {
    // Arabic/Hebrew unicode ranges = RTL
    return /[\u0590-\u08FF]/.test(text);
}

async function renderTextToImageData(text, font, size, color, bold) {
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d');
    const isRTL  = detectTextDirection(text);
    const weight = bold ? 'bold' : 'normal';

    ctx.font = `${weight} ${size * 3}px "${font}"`;
    const metrics = ctx.measureText(text);
    const padding = 10;

    canvas.width  = Math.ceil(metrics.width) + padding * 2;
    canvas.height = Math.ceil(size * 3 * 1.4) + padding * 2;

    ctx.font = `${weight} ${size * 3}px "${font}"`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'top';
    ctx.direction = isRTL ? 'rtl' : 'ltr';
    ctx.textAlign = isRTL ? 'right' : 'left';

    const x = isRTL ? canvas.width - padding : padding;
    ctx.fillText(text, x, padding);

    return {
        dataUrl: canvas.toDataURL('image/png'),
        width: canvas.width / 3,
        height: canvas.height / 3
    };
}

/* ============================================
   MERGE PDF — Single, Range, All Pages
   ============================================ */
async function mergePDFs() {
    const files = document.getElementById('mergeInput').files;

    if (!files || files.length < 2) {
        showStatus('❌ Please select at least 2 PDF files to merge.', 'error');
        return;
    }

    const btn = document.querySelector('#pdf-merge .btn-action');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Merging...';

    try {
        const { PDFDocument } = PDFLib;
        const mergedPdf = await PDFDocument.create();

        for (let i = 0; i < files.length; i++) {
            const fileBytes = await files[i].arrayBuffer();
            const pdf = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedBytes = await mergedPdf.save();
        const blob = new Blob([mergedBytes], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FlexTools_Merged.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showStatus('✅ PDFs merged and downloaded!', 'success');

    } catch (err) {
        console.error('Merge error:', err);
        showStatus('❌ Merge failed: ' + (err.message || 'One of the files may be corrupted or password-protected.'), 'error');
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
}

/* ============================================
   SPLIT PDF — Single, Range, All Pages
   ============================================ */
async function previewSplitPDF() {
    const file = document.getElementById('splitInput').files[0];
    if (!file) return;
    try {
        const bytes  = await file.arrayBuffer();
        const pdf    = await PDFLib.PDFDocument.load(bytes);
        const total  = pdf.getPageCount();
        const label  = document.getElementById('splitPageCount');
        if (label) {
            label.textContent = `✅ PDF loaded — ${total} page${total > 1 ? 's' : ''} detected`;
            label.style.display = 'block';
        }
        const pageInput = document.getElementById('splitPage');
        const fromInput = document.getElementById('splitFrom');
        const toInput   = document.getElementById('splitTo');
        if (pageInput) pageInput.max = total;
        if (fromInput) fromInput.max = total;
        if (toInput)   { toInput.max = total; toInput.value = Math.min(3, total); }
    } catch (err) {
        showStatus('❌ Could not read PDF. File may be corrupted.', 'error');
    }
}

function toggleSplitMode() {
    const mode        = document.getElementById('splitMode').value;
    const singleInput = document.getElementById('splitSingleInput');
    const rangeInput  = document.getElementById('splitRangeInput');
    if (singleInput) singleInput.style.display = mode === 'single' ? 'block' : 'none';
    if (rangeInput)  rangeInput.style.display  = mode === 'range'  ? 'block' : 'none';
}

async function splitPDF() {
    const file   = document.getElementById('splitInput').files[0];
    const mode   = document.getElementById('splitMode').value;
    const result = document.getElementById('splitResult');

    if (!file) { showStatus('❌ Please select a PDF file.', 'error'); return; }

    result.style.display    = 'flex';
    result.style.background = '#f8fafc';
    result.style.borderColor = '#e2e8f0';
    result.innerHTML = '<span class="spinner"></span> Processing...';

    try {
        const bytes  = await file.arrayBuffer();
        const srcDoc = await PDFLib.PDFDocument.load(bytes);
        const total  = srcDoc.getPageCount();

        if (mode === 'single') {
            const pageNum = parseInt(document.getElementById('splitPage').value) - 1;
            if (pageNum < 0 || pageNum >= total) {
                result.innerHTML = `❌ Invalid page number. PDF has ${total} pages.`;
                return;
            }
            const newDoc = await PDFLib.PDFDocument.create();
            const [page] = await newDoc.copyPages(srcDoc, [pageNum]);
            newDoc.addPage(page);
            const outBytes = await newDoc.save();
            triggerDownload(new Blob([outBytes], { type: 'application/pdf' }), `FlexTools_Page_${pageNum + 1}.pdf`);
            result.innerHTML = `✅ Page ${pageNum + 1} extracted and downloaded.`;

        } else if (mode === 'range') {
            const from = parseInt(document.getElementById('splitFrom').value) - 1;
            const to   = parseInt(document.getElementById('splitTo').value) - 1;

            if (from < 0 || to >= total || from > to) {
                result.innerHTML = `❌ Invalid page range. PDF has ${total} pages.`;
                return;
            }

            const newDoc   = await PDFLib.PDFDocument.create();
            const indices  = Array.from({ length: to - from + 1 }, (_, i) => from + i);
            const pages    = await newDoc.copyPages(srcDoc, indices);
            pages.forEach(p => newDoc.addPage(p));
            const outBytes = await newDoc.save();
            triggerDownload(
                new Blob([outBytes], { type: 'application/pdf' }),
                `FlexTools_Pages_${from + 1}_to_${to + 1}.pdf`
            );
            result.innerHTML = `✅ Pages ${from + 1} to ${to + 1} extracted (${indices.length} pages) and downloaded.`;

        } else if (mode === 'all') {
            result.innerHTML = `<span class="spinner"></span> Splitting ${total} pages...`;
            for (let i = 0; i < total; i++) {
                const newDoc   = await PDFLib.PDFDocument.create();
                const [page]   = await newDoc.copyPages(srcDoc, [i]);
                newDoc.addPage(page);
                const outBytes = await newDoc.save();
                triggerDownload(
                    new Blob([outBytes], { type: 'application/pdf' }),
                    `FlexTools_Page_${i + 1}_of_${total}.pdf`
                );
                await new Promise(r => setTimeout(r, 300));
            }
            result.innerHTML = `✅ All ${total} pages split and downloaded as individual PDF files.`;
        }

        result.style.background  = '#f0fdf4';
        result.style.borderColor = '#22c55e';
        result.classList.add('has-result');
        showStatus('✅ Split complete!', 'success');

    } catch (err) {
        console.error(err);
        result.innerHTML = '❌ Failed to split PDF. Please try again.';
        result.style.background  = '#fef2f2';
        result.style.borderColor = '#fecaca';
        showStatus('❌ Split failed.', 'error');
    }
}


/* ============================================
   PDF TO JPG
   ============================================ */
async function convertPDFtoJPG() {
    await processTask('PDF to JPG', async () => {
        const file    = document.getElementById('pdfToJpgInput').files[0];
        const pageNum = parseInt(document.getElementById('pdfToJpgPage').value);
        if (!file) throw new Error('Please select a PDF file.');

        const bytes       = await file.arrayBuffer();
        const pdf         = await pdfjsLib.getDocument({ data: bytes }).promise;
        const page        = await pdf.getPage(pageNum);
        const viewport    = page.getViewport({ scale: 1.5 });
        const canvas      = document.getElementById('pdfToJpgCanvas');
        const ctx         = canvas.getContext('2d');
        canvas.width      = viewport.width;
        canvas.height     = viewport.height;
        await page.render({ canvasContext: ctx, viewport }).promise;

        document.getElementById('pdfToJpgResult').style.display = 'block';
        showStatus('✅ Page rendered. Click Download to save.', 'success');
    });
}

function downloadPDFasJPG() {
    const canvas = document.getElementById('pdfToJpgCanvas');
    canvas.toBlob(blob => triggerDownload(blob, 'FlexTools_Page.jpg'), 'image/jpeg', 0.92);
}

/* ============================================
   IMAGE TO PDF
   ============================================ */
async function downloadPDF() {
    await processTask('Image to PDF', async () => {
        const file = document.getElementById('pdfImageInput').files[0];
        if (!file) throw new Error('Please select an image file.');
        const { jsPDF } = window.jspdf;
        const imgData = await new Promise((res, rej) => {
            const r = new FileReader();
            r.onload  = e => res(e.target.result);
            r.onerror = rej;
            r.readAsDataURL(file);
        });
        const doc = new jsPDF();
        doc.addImage(imgData, 'JPEG', 10, 10, 190, 0);
        doc.save('FlexTools_Image.pdf');
    });
}

/* ============================================
   DOC EDITOR — Complete Consolidated Version
   With error-checked uploads + fillable templates
   ============================================ */

function getDocEditor() {
    return document.getElementById('docEditorArea');
}

function initDocEditor() {
    var editor = getDocEditor();
    if (editor && typeof updateDocWordCount === 'function') {
        updateDocWordCount();
    }
    initDocImageSystem();
}

function applyDocFormat(command, value = null) {
    const editor = getDocEditor();
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, value);
    updateDocWordCount();
}

function applyRealFontSize(size) {
    const editor = getDocEditor();
    if (!editor) return;
    editor.focus();
    document.execCommand('fontSize', false, '7');
    editor.querySelectorAll('font[size="7"]').forEach(el => {
        el.removeAttribute('size');
        el.style.fontSize = size + 'px';
    });
    updateDocWordCount();
}

function updateDocWordCount() {
    const editor = getDocEditor();
    if (!editor) return;
    const text  = editor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const span  = document.getElementById('docWordCount');
    if (span) span.textContent = `${words.toLocaleString()} words · ${chars.toLocaleString()} characters`;
}

function toggleFindReplace() {
    const bar = document.getElementById('findReplaceBar');
    if (!bar) return;
    bar.style.display = bar.style.display === 'none' ? 'block' : 'none';
    if (bar.style.display === 'block') document.getElementById('findText')?.focus();
}

function doFindReplace() {
    const find    = document.getElementById('findText')?.value;
    const replace = document.getElementById('replaceText')?.value || '';
    const editor  = getDocEditor();
    if (!find || !editor) return;

    const html    = editor.innerHTML;
    const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex   = new RegExp(escaped, 'gi');
    const count   = (html.match(regex) || []).length;
    editor.innerHTML = html.replace(regex, replace);
    updateDocWordCount();
    showStatus(`✅ Replaced ${count} instance${count !== 1 ? 's' : ''} of "${find}"`, 'success');
}

async function importWordFile(input) {
    const file = input.files[0];
    if (!file) return;

    if (typeof mammoth === 'undefined') {
        showStatus('❌ Document import library failed to load. Refresh and try again.', 'error');
        return;
    }

    try {
        const buffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
        const editor = getDocEditor();
        if (editor) {
            editor.innerHTML = result.value;
            updateDocWordCount();
            showStatus('✅ Document imported successfully.', 'success');
        }
    } catch (err) {
        console.error('Word import error:', err);
        showStatus('❌ Could not read Word document: ' + (err.message || 'unknown error'), 'error');
    }
    input.value = '';
}

function downloadDocAsWord() {
    const editor = getDocEditor();
    if (!editor) { showStatus('❌ Editor not ready.', 'error'); return; }
    const html   = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"></head><body>${editor.innerHTML}</body></html>`;
    const blob   = htmlDocx.asBlob(html);
    triggerDownload(blob, 'FlexTools_Document.docx');
}

function downloadDocAsTxt() {
    const editor = getDocEditor();
    if (!editor) return;
    const text = editor.innerText || '';
    triggerDownload(new Blob([text], { type: 'text/plain' }), 'FlexTools_Document.txt');
}

function printDoc() {
    const editor  = getDocEditor();
    if (!editor) return;
    const content = editor.innerHTML;
    const win     = window.open('', '_blank');
    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>FlexTools Pro — Document</title>
            <style>
                body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.8; padding: 40px; color: #1e293b; }
                @media print { body { padding: 20px; } }
            </style>
        </head>
        <body>${content}</body>
        </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 500);
}

function insertDocTable() {
    const rows = parseInt(prompt('Number of rows?', '3'));
    const cols = parseInt(prompt('Number of columns?', '3'));
    if (!rows || !cols || rows < 1 || cols < 1) return;

    let tableHtml = '<table style="border-collapse:collapse;width:100%;margin:12px 0;">';
    for (let r = 0; r < rows; r++) {
        tableHtml += '<tr>';
        for (let c = 0; c < cols; c++) {
            tableHtml += '<td style="border:1px solid #cbd5e1;padding:8px;min-width:60px;">&nbsp;</td>';
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table><p><br></p>';

    const editor = getDocEditor();
    editor.focus();
    document.execCommand('insertHTML', false, tableHtml);
    updateDocWordCount();
}

function insertDocImage(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const editor = getDocEditor();
        editor.focus();
        const imgHtml = `<img src="${e.target.result}" style="max-width:100%; height:auto; margin:8px 0;">`;
        document.execCommand('insertHTML', false, imgHtml);
        updateDocWordCount();
    };
    reader.readAsDataURL(file);
    input.value = '';
}

let autosaveTimeout = null;

function autosaveDoc() {
    clearTimeout(autosaveTimeout);
    autosaveTimeout = setTimeout(() => {
        const editor = getDocEditor();
        if (editor && editor.innerHTML.trim()) {
            localStorage.setItem('flextools_doc_draft', editor.innerHTML);
            localStorage.setItem('flextools_doc_draft_time', new Date().toISOString());
        }
    }, 1000);
}

function checkForDocDraft() {
    const draft = localStorage.getItem('flextools_doc_draft');
    const editor = getDocEditor();
    if (draft && editor && !editor.innerHTML.trim()) {
        document.getElementById('draftRestoreBanner').style.display = 'flex';
    }
}

function restoreDocDraft() {
    const draft = localStorage.getItem('flextools_doc_draft');
    const editor = getDocEditor();
    if (draft && editor) {
        editor.innerHTML = draft;
        updateDocWordCount();
    }
    document.getElementById('draftRestoreBanner').style.display = 'none';
    showStatus('✅ Draft restored.', 'success');
}

function dismissDocDraft() {
    localStorage.removeItem('flextools_doc_draft');
    localStorage.removeItem('flextools_doc_draft_time');
    document.getElementById('draftRestoreBanner').style.display = 'none';
}

async function scanImageToDoc(input) {
    const file = input.files[0];
    if (!file) return;

    if (typeof Tesseract === 'undefined') {
        showStatus('❌ OCR engine failed to load. Check your connection and refresh.', 'error');
        return;
    }

    const progressWrapper = document.getElementById('ocrProgressWrapper');
    const progressBar     = document.getElementById('ocrProgressBar');
    const progressPercent = document.getElementById('ocrPercent');
    const statusText      = document.getElementById('ocrStatusText');
    if (progressWrapper) progressWrapper.style.display = 'block';

    try {
        const result = await Tesseract.recognize(file, 'eng', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const pct = Math.round(m.progress * 100);
                    if (progressBar)     progressBar.style.width = pct + '%';
                    if (progressPercent) progressPercent.textContent = pct + '%';
                    if (statusText)      statusText.textContent = 'Extracting text... ' + pct + '%';
                } else if (statusText) {
                    statusText.textContent = m.status;
                }
            }
        });

        const words = result.data.words || [];
        if (!words.length) {
            showStatus('❌ No text found. Try a clearer, well-lit photo.', 'error');
            if (progressWrapper) progressWrapper.style.display = 'none';
            return;
        }

        const html = buildHtmlFromOCRWords(words);
        const editor = getDocEditor();
        if (editor) { editor.innerHTML = html; updateDocWordCount(); }

        if (progressBar)     { progressBar.style.width = '100%'; progressBar.style.background = '#22c55e'; }
        if (progressPercent) progressPercent.textContent = '100%';
        if (statusText)      statusText.textContent = '✅ Text extracted!';
        setTimeout(() => { if (progressWrapper) progressWrapper.style.display = 'none'; }, 2000);

        showStatus(`✅ Scanned — review formatting before exporting.`, 'success');
        document.getElementById('docEditorArea')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
        console.error('OCR scan error:', err);
        if (progressWrapper) progressWrapper.style.display = 'none';
        showStatus('❌ Scan failed: ' + (err.message || 'unknown error'), 'error');
    }

    input.value = '';
}

function buildHtmlFromOCRWords(words) {
    const positioned = words.map(w => ({
        text: w.text, x: w.bbox.x0, y: (w.bbox.y0 + w.bbox.y1) / 2, w: w.bbox.x1 - w.bbox.x0
    }));
    positioned.sort((a, b) => a.y - b.y);

    const rows = []; let currentRow = []; let lastY = null;
    positioned.forEach(p => {
        if (lastY !== null && Math.abs(p.y - lastY) > 14) { rows.push(currentRow); currentRow = []; }
        currentRow.push(p); lastY = p.y;
    });
    if (currentRow.length) rows.push(currentRow);

    let html = '';
    rows.forEach(row => {
        row.sort((a, b) => a.x - b.x);
        const cols = []; let col = [row[0]];
        for (let i = 1; i < row.length; i++) {
            const gap = row[i].x - (row[i - 1].x + row[i - 1].w);
            if (gap > 40) { cols.push(col); col = []; }
            col.push(row[i]);
        }
        if (col.length) cols.push(col);

        if (cols.length >= 3) {
            html += '<table style="border-collapse:collapse;margin:4px 0;"><tr>';
            cols.forEach(c => { html += `<td style="padding:2px 10px;vertical-align:top;">${escapeHtml(c.map(w => w.text).join(' '))}</td>`; });
            html += '</tr></table>';
        } else {
            const line = row.map(w => w.text).join(' ');
            html += line.trim() ? `<p style="margin:2px 0;">${escapeHtml(line)}</p>` : '<p><br></p>';
        }
    });

    return html;
}

async function extractDocTemplate(input) {
    const file = input.files[0];
    if (!file) return;

    if (typeof Tesseract === 'undefined') {
        showStatus('❌ OCR engine failed to load. Check your connection and refresh.', 'error');
        return;
    }

    const progressWrapper = document.getElementById('ocrProgressWrapper');
    const progressBar     = document.getElementById('ocrProgressBar');
    const progressPercent = document.getElementById('ocrPercent');
    const statusText      = document.getElementById('ocrStatusText');
    if (progressWrapper) progressWrapper.style.display = 'block';

    try {
        const result = await Tesseract.recognize(file, 'eng', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const pct = Math.round(m.progress * 100);
                    if (progressBar)     progressBar.style.width = pct + '%';
                    if (progressPercent) progressPercent.textContent = pct + '%';
                    if (statusText)      statusText.textContent = 'Analysing document... ' + pct + '%';
                }
            }
        });

        const words = result.data.words || [];
        if (!words.length) {
            showStatus('❌ No text found. Try a clearer photo.', 'error');
            if (progressWrapper) progressWrapper.style.display = 'none';
            return;
        }

        const lines = groupWordsIntoLines(words);
        const templateHtml = buildFillableTemplateHtml(lines);

        const editor = getDocEditor();
        if (editor) {
            editor.innerHTML = templateHtml;
            updateDocWordCount();
        }

        if (progressWrapper) progressWrapper.style.display = 'none';
        showStatus('✅ Template created. Review the blanks before filling in.', 'success');
        document.getElementById('docEditorArea')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
        console.error('Template extraction error:', err);
        if (progressWrapper) progressWrapper.style.display = 'none';
        showStatus('❌ Could not process image: ' + (err.message || 'unknown error'), 'error');
    }

    input.value = '';
}

function groupWordsIntoLines(words) {
    const sorted = [...words].sort((a, b) => a.bbox.y0 - b.bbox.y0);
    const lines = [];
    let currentLine = [];
    let lastY = null;

    sorted.forEach(word => {
        const y = word.bbox.y0;
        if (lastY !== null && Math.abs(y - lastY) > 12) {
            if (currentLine.length) lines.push(currentLine);
            currentLine = [];
        }
        currentLine.push(word);
        lastY = y;
    });
    if (currentLine.length) lines.push(currentLine);

    lines.forEach(line => line.sort((a, b) => a.bbox.x0 - b.bbox.x0));
    return lines.map(line => line.map(w => w.text).join(' '));
}

function buildFillableTemplateHtml(lines) {
    const currencySymbols = /[₦$€£¥]/;
    const datePattern     = /\b\d{1,4}[\/\-.]\d{1,2}[\/\-.]\d{1,4}\b/;
    const mostlyNumeric   = (str) => {
        const digits = (str.match(/\d/g) || []).length;
        return str.trim().length > 0 && (digits / str.replace(/\s/g, '').length) > 0.4;
    };

    let html = '';

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) { html += '<p><br></p>'; return; }

        const colonSplit = trimmed.split(/:(.+)/);
        if (colonSplit.length >= 2 && colonSplit[1].trim()) {
            const label = colonSplit[0].trim();
            const value = colonSplit[1].trim();
            const isVariable = currencySymbols.test(value) || datePattern.test(value) || mostlyNumeric(value);

            if (isVariable) {
                html += `<p><strong>${escapeHtml(label)}:</strong> <span class="fillable-blank" contenteditable="true" style="display:inline-block;min-width:120px;border-bottom:1.5px dashed #94a3b8;color:#6366f1;padding:0 4px;">______</span></p>`;
            } else {
                html += `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
            }
            return;
        }

        const isVariableLine = currencySymbols.test(trimmed) || datePattern.test(trimmed) || mostlyNumeric(trimmed);

        if (isVariableLine && trimmed.length < 40) {
            html += `<p><span class="fillable-blank" contenteditable="true" style="display:inline-block;min-width:120px;border-bottom:1.5px dashed #94a3b8;color:#6366f1;padding:0 4px;">______</span></p>`;
        } else {
            html += `<p>${index < 2 ? '<strong>' : ''}${escapeHtml(trimmed)}${index < 2 ? '</strong>' : ''}</p>`;
        }
    });

    return html;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/* ============================================
   DOC EDITOR — Movable Images (v2, rebuilt clean)
   ============================================ */

var docSelectedImage = null;
var docImageIsDragging = false;
var docDragOffsetX = 0;
var docDragOffsetY = 0;

function initDocImageSystem() {
    var editor = document.getElementById('docEditorArea');
    if (!editor) { return; }

    editor.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            docSelectImage(e.target);
        } else if (!docImageIsDragging) {
            docDeselectImage();
        }
    });

    editor.addEventListener('mousedown', function (e) {
        if (e.target.tagName === 'IMG' && e.target === docSelectedImage) {
            docStartImageDrag(e);
        }
    });

    document.addEventListener('mousemove', docDragImage);
    document.addEventListener('mouseup', docStopImageDrag);

    var slider = document.getElementById('docImgWidthSlider');
    if (slider) {
        slider.addEventListener('input', function () {
            var width = this.value;
            var label = document.getElementById('docImgWidthValue');
            if (label) { label.textContent = width + 'px'; }
            if (docSelectedImage) {
                docSelectedImage.style.width = width + 'px';
                docSelectedImage.style.maxWidth = width + 'px';
            }
        });
    }
}

function docSelectImage(img) {
    if (docSelectedImage) {
        docSelectedImage.classList.remove('wps-selected');
    }
    img.classList.add('wps-image');
    img.classList.add('wps-selected');
    if (!img.style.position || img.style.position === 'static') {
        img.style.position = 'relative';
    }
    docSelectedImage = img;

    var currentWidth = img.offsetWidth || 300;
    var slider = document.getElementById('docImgWidthSlider');
    var label = document.getElementById('docImgWidthValue');
    if (slider) { slider.value = currentWidth; }
    if (label) { label.textContent = currentWidth + 'px'; }

    var toolbar = document.getElementById('docImageToolbar');
    if (toolbar) { toolbar.style.display = 'flex'; }
}

function docDeselectImage() {
    if (docSelectedImage) {
        docSelectedImage.classList.remove('wps-selected');
    }
    docSelectedImage = null;
    var toolbar = document.getElementById('docImageToolbar');
    if (toolbar) { toolbar.style.display = 'none'; }
}

function docStartImageDrag(e) {
    if (!docSelectedImage) { return; }
    docImageIsDragging = true;
    var rect = docSelectedImage.getBoundingClientRect();
    docDragOffsetX = e.clientX - rect.left;
    docDragOffsetY = e.clientY - rect.top;
    e.preventDefault();
}

function docDragImage(e) {
    if (!docImageIsDragging || !docSelectedImage) { return; }

    var editor = document.getElementById('docEditorArea');
    var editorRect = editor.getBoundingClientRect();

    var newLeft = e.clientX - editorRect.left - docDragOffsetX;
    var newTop = e.clientY - editorRect.top - docDragOffsetY;

    docSelectedImage.style.position = 'absolute';
    docSelectedImage.style.left = newLeft + 'px';
    docSelectedImage.style.top = newTop + 'px';
    docSelectedImage.style.zIndex = '10';

    if (editor.style.position !== 'relative') {
        editor.style.position = 'relative';
    }
}

function docStopImageDrag() {
    docImageIsDragging = false;
}

function docImageDelete() {
    if (docSelectedImage) {
        docSelectedImage.remove();
        docSelectedImage = null;
        var toolbar = document.getElementById('docImageToolbar');
        if (toolbar) { toolbar.style.display = 'none'; }
        if (typeof updateDocWordCount === 'function') {
            updateDocWordCount();
        }
    }
}

/* ============================================
   PASSWORD VISIBILITY TOGGLE
   ============================================ */
function togglePassView(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon  = document.getElementById(iconId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.textContent = '🙈';
    } else {
        input.type = 'password';
        if (icon) icon.textContent = '👁️';
    }
}

/* ============================================
   PASSWORD STRENGTH CHECKER
   ============================================ */
function checkPassStrength(val) {
    const wrapper = document.getElementById('passStrengthWrapper');
    const bar     = document.getElementById('passStrengthBar');
    const label   = document.getElementById('passStrengthLabel');
    if (!wrapper) return;

    if (!val) { wrapper.style.display = 'none'; return; }
    wrapper.style.display = 'block';

    let score = 0;
    if (val.length >= 6)               score++;
    if (val.length >= 10)              score++;
    if (/[A-Z]/.test(val))             score++;
    if (/[0-9]/.test(val))             score++;
    if (/[^A-Za-z0-9]/.test(val))     score++;

    const levels = [
        { label: 'Very Weak',  color: '#ef4444', width: '15%' },
        { label: 'Weak',       color: '#f97316', width: '30%' },
        { label: 'Fair',       color: '#f59e0b', width: '55%' },
        { label: 'Strong',     color: '#22c55e', width: '80%' },
        { label: 'Very Strong',color: '#16a34a', width: '100%'}
    ];

    const level = levels[Math.min(score, levels.length - 1)];
    if (bar)   { bar.style.width = level.width; bar.style.background = level.color; }
    if (label) { label.textContent = level.label; label.style.color = level.color; }

    const confirm    = document.getElementById('pdfPasswordConfirm');
    const matchMsg   = document.getElementById('passMatchMsg');
    if (confirm && matchMsg && confirm.value) {
        matchMsg.style.display = 'block';
        if (confirm.value === val) {
            matchMsg.textContent = '✅ Passwords match';
            matchMsg.style.color = '#16a34a';
        } else {
            matchMsg.textContent = '❌ Passwords do not match';
            matchMsg.style.color = '#ef4444';
        }
    }
}

/* ============================================
   PDF PASSWORD PROTECT — Real AES-256 via JSZip
   ============================================ */
async function protectPDF() {
    const file      = document.getElementById('pdfProtectInput').files[0];
    const pass      = document.getElementById('pdfPassword').value;
    const confirm   = document.getElementById('pdfPasswordConfirm').value;
    const nameInput = document.getElementById('protectFileName').value.trim();
    const result    = document.getElementById('pdfProtectResult');

    if (!file) { showStatus('❌ Please select a PDF file.', 'error'); return; }
    if (!pass) { showStatus('❌ Please enter a password.', 'error'); return; }
    if (pass !== confirm) { showStatus('❌ Passwords do not match.', 'error'); return; }
    if (pass.length < 4) { showStatus('❌ Password must be at least 4 characters.', 'error'); return; }

    result.style.display     = 'flex';
    result.style.background  = '#f8fafc';
    result.style.borderColor = '#e2e8f0';
    result.innerHTML = '<span class="spinner"></span> Encrypting your PDF...';

    try {
        const pdfData = await file.arrayBuffer();

        const baseName = nameInput || file.name.replace('.pdf', '') || 'protected-document';
        const pdfName  = baseName + '.pdf';
        const zipName  = baseName + '_protected.zip';

        const zip = new JSZip();
        zip.file(pdfName, pdfData, {
            binary:   true,
            password: pass,
            comment:  'Protected by FlexTools Pro — flextools.pro'
        });

        const zipBlob = await zip.generateAsync({
            type:               'blob',
            compression:        'DEFLATE',
            compressionOptions: { level: 6 },
            encryptStrength:    3,
            password:           pass
        }, metadata => {
            result.innerHTML = `<span class="spinner"></span> Encrypting... ${Math.round(metadata.percent)}%`;
        });

        triggerDownload(zipBlob, zipName);

        result.innerHTML         = `🔐 PDF protected and downloaded as <strong>${zipName}</strong><br><span style="font-size:0.8rem;color:#64748b;margin-top:4px;display:block;">Use the PDF Unlock tool or any ZIP app with your password to open it.</span>`;
        result.style.background  = '#f0fdf4';
        result.style.borderColor = '#22c55e';
        result.classList.add('has-result');

        showStatus('✅ PDF protected successfully!', 'success');

        document.getElementById('pdfProtectInput').value   = '';
        document.getElementById('pdfPassword').value        = '';
        document.getElementById('pdfPasswordConfirm').value = '';
        document.getElementById('protectFileName').value    = '';
        const wrapper = document.getElementById('passStrengthWrapper');
        if (wrapper) wrapper.style.display = 'none';

    } catch (err) {
        console.error('Protect error:', err);
        result.innerHTML         = '❌ Failed to protect PDF. Please try again.';
        result.style.background  = '#fef2f2';
        result.style.borderColor = '#fecaca';
        showStatus('❌ Protection failed.', 'error');
    }
}

/* ============================================
   PDF PASSWORD UNLOCK — Extract from AES ZIP
   ============================================ */
async function unlockPDF() {
    const file     = document.getElementById('pdfUnlockInput').files[0];
    const password = document.getElementById('pdfUnlockPassword').value;
    const result   = document.getElementById('pdfUnlockResult');

    if (!file)     { showStatus('❌ Please select a ZIP file.', 'error'); return; }
    if (!password) { showStatus('❌ Please enter the password.', 'error'); return; }

    result.style.display     = 'flex';
    result.style.background  = '#f8fafc';
    result.style.borderColor = '#e2e8f0';
    result.innerHTML = '<span class="spinner"></span> Unlocking PDF...';

    try {
        const zipData = await file.arrayBuffer();

        let zip;
        try {
            zip = await JSZip.loadAsync(zipData, { password });
        } catch (zipErr) {
            result.innerHTML         = '❌ Could not open file. It may be corrupted or not a valid ZIP.';
            result.style.background  = '#fef2f2';
            result.style.borderColor = '#fecaca';
            showStatus('❌ Invalid file format.', 'error');
            return;
        }

        let pdfFile = null;
        let pdfName = 'unlocked.pdf';

        zip.forEach((relativePath, zipEntry) => {
            if (relativePath.toLowerCase().endsWith('.pdf') && !zipEntry.dir) {
                pdfFile = zipEntry;
                pdfName = relativePath;
            }
        });

        if (!pdfFile) {
            result.innerHTML         = '❌ No PDF found inside this ZIP file.';
            result.style.background  = '#fef2f2';
            result.style.borderColor = '#fecaca';
            showStatus('❌ No PDF found in ZIP.', 'error');
            return;
        }

        let pdfData;
        try {
            pdfData = await pdfFile.async('arraybuffer', { password });
        } catch (decryptErr) {
            result.innerHTML         = '❌ Wrong password. Please check your password and try again.';
            result.style.background  = '#fef2f2';
            result.style.borderColor = '#fecaca';
            result.style.color       = '#dc2626';
            showStatus('❌ Wrong password.', 'error');
            return;
        }

        const uint8  = new Uint8Array(pdfData);
        const header = String.fromCharCode(...uint8.slice(0, 4));
        if (header !== '%PDF') {
            result.innerHTML         = '❌ Wrong password. The file could not be decrypted correctly.';
            result.style.background  = '#fef2f2';
            result.style.borderColor = '#fecaca';
            showStatus('❌ Wrong password.', 'error');
            return;
        }

        const outputName = pdfName.replace('.pdf', '_unlocked.pdf');
        triggerDownload(new Blob([pdfData], { type: 'application/pdf' }), outputName);

        result.innerHTML         = `🔓 PDF unlocked and downloaded as <strong>${outputName}</strong>`;
        result.style.background  = '#f0fdf4';
        result.style.borderColor = '#22c55e';
        result.style.color       = '#166534';
        result.classList.add('has-result');

        showStatus('✅ PDF unlocked successfully!', 'success');

        document.getElementById('pdfUnlockInput').value    = '';
        document.getElementById('pdfUnlockPassword').value = '';

    } catch (err) {
        console.error('Unlock error:', err);
        result.innerHTML         = '❌ Failed to unlock PDF. Please check the file and password.';
        result.style.background  = '#fef2f2';
        result.style.borderColor = '#fecaca';
        showStatus('❌ Unlock failed.', 'error');
    }
}

/* ============================================
   WORD TO PDF
   ============================================ */
async function convertDocToPDF() {
    const file   = document.getElementById('docToPdfInput').files[0];
    const result = document.getElementById('docToPdfResult');

    if (!file) { showStatus('❌ Please select a .docx file.', 'error'); return; }

    result.style.display    = 'flex';
    result.style.background = '#f8fafc';
    result.innerHTML = '<span class="spinner"></span> Converting to PDF...';

    try {
        const buffer = await file.arrayBuffer();

        // Extract images alongside HTML so we can embed them too
        const converted = await mammoth.convertToHtml(
            { arrayBuffer: buffer },
            {
                convertImage: mammoth.images.imgElement(async (image) => {
                    const base64 = await image.read('base64');
                    return { src: `data:${image.contentType};base64,${base64}` };
                })
            }
        );

        const parser = new DOMParser();
        const docHtml = parser.parseFromString(converted.value, 'text/html');
        const elements = Array.from(docHtml.body.children);

        if (!elements.length) {
            throw new Error('No readable content found in this document.');
        }

        const { PDFDocument, StandardFonts, rgb } = PDFLib;
        const pdfDoc = await PDFDocument.create();
        const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBold    = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontItalic  = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

        const pageWidth  = 595.28;
        const pageHeight = 841.89;
        const margin     = 50;
        const maxLineWidth = pageWidth - margin * 2;

        let page = pdfDoc.addPage([pageWidth, pageHeight]);
        let y = pageHeight - margin;

        function newPageIfNeeded(neededSpace) {
            if (y - neededSpace < margin) {
                page = pdfDoc.addPage([pageWidth, pageHeight]);
                y = pageHeight - margin;
            }
        }

        function wrapAndDraw(text, fontSize, font, indent = 0, spacingAfter = 8) {
            const lineHeight = fontSize * 1.35;
            const usableWidth = maxLineWidth - indent;
            const words = text.split(' ');
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine ? currentLine + ' ' + word : word;
                const testWidth = font.widthOfTextAtSize(testLine, fontSize);

                if (testWidth > usableWidth && currentLine) {
                    newPageIfNeeded(lineHeight);
                    page.drawText(currentLine, { x: margin + indent, y, size: fontSize, font, color: rgb(0, 0, 0) });
                    y -= lineHeight;
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }

            if (currentLine) {
                newPageIfNeeded(lineHeight);
                page.drawText(currentLine, { x: margin + indent, y, size: fontSize, font, color: rgb(0, 0, 0) });
                y -= lineHeight;
            }

            y -= spacingAfter;
        }

        async function drawImageElement(imgEl) {
            try {
                const src = imgEl.getAttribute('src');
                if (!src || !src.startsWith('data:')) return;

                const base64 = src.split(',')[1];
                const isPng = src.includes('image/png');
                const imgBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

                const embeddedImg = isPng
                    ? await pdfDoc.embedPng(imgBytes)
                    : await pdfDoc.embedJpg(imgBytes);

                let imgWidth = embeddedImg.width;
                let imgHeight = embeddedImg.height;

                const maxImgWidth = maxLineWidth;
                if (imgWidth > maxImgWidth) {
                    const scale = maxImgWidth / imgWidth;
                    imgWidth *= scale;
                    imgHeight *= scale;
                }

                newPageIfNeeded(imgHeight + 15);
                page.drawImage(embeddedImg, { x: margin, y: y - imgHeight, width: imgWidth, height: imgHeight });
                y -= imgHeight + 15;
            } catch (e) {
                console.warn('Image skipped:', e);
            }
        }

        // Process each block-level element with formatting based on its tag
        for (const el of elements) {
            const tag = el.tagName.toLowerCase();
            const text = el.textContent.trim();

            if (tag === 'img') {
                await drawImageElement(el);
                continue;
            }

            if (!text && tag !== 'img') { y -= 6; continue; }

            if (tag === 'h1') {
                newPageIfNeeded(30);
                wrapAndDraw(text, 22, fontBold, 0, 14);
            } else if (tag === 'h2') {
                newPageIfNeeded(26);
                wrapAndDraw(text, 18, fontBold, 0, 12);
            } else if (tag === 'h3') {
                newPageIfNeeded(22);
                wrapAndDraw(text, 15, fontBold, 0, 10);
            } else if (tag === 'ul' || tag === 'ol') {
                const items = Array.from(el.children);
                items.forEach((li, index) => {
                    const bullet = tag === 'ul' ? '•  ' : `${index + 1}.  `;
                    wrapAndDraw(bullet + li.textContent.trim(), 12, fontRegular, 15, 6);
                });
            } else if (tag === 'p') {
                // Check if paragraph contains bold/italic runs
                const hasBold = el.querySelector('strong, b');
                const hasItalic = el.querySelector('em, i');
                const useFont = hasBold ? fontBold : (hasItalic ? fontItalic : fontRegular);
                wrapAndDraw(text, 12, useFont, 0, 8);

                // Handle any images inside this paragraph too
                const innerImgs = el.querySelectorAll('img');
                for (const innerImg of innerImgs) {
                    await drawImageElement(innerImg);
                }
            } else {
                wrapAndDraw(text, 12, fontRegular, 0, 8);
            }
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'FlexTools_Converted.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        result.innerHTML         = '✅ PDF downloaded — real editable text with formatting preserved!';
        result.style.background  = '#f0fdf4';
        result.style.borderColor = '#22c55e';
        result.classList.add('has-result');
        showStatus('✅ Converted to PDF!', 'success');

    } catch (err) {
        console.error(err);
        result.innerHTML         = '❌ Conversion failed: ' + (err.message || 'Please try a different file.');
        result.style.background  = '#fef2f2';
        showStatus('❌ Conversion failed.', 'error');
    }
}

/* ============================================
   PDF TO WORD — Text extraction based
   ============================================ */
async function convertPDFtoDoc() {
    const file   = document.getElementById('pdfToDocInput').files[0];
    const result = document.getElementById('pdfToDocResult');

    if (!file) { showStatus('❌ Please select a PDF file.', 'error'); return; }
    if (typeof pdfjsLib === 'undefined') { showStatus('❌ PDF engine failed to load. Refresh and try again.', 'error'); return; }
    if (typeof JSZip === 'undefined') { showStatus('❌ File builder failed to load. Refresh and try again.', 'error'); return; }

    result.style.display    = 'flex';
    result.style.background = '#f8fafc';
    result.innerHTML = '<span class="spinner"></span> Extracting text and images...';

    try {
        const bytes = await file.arrayBuffer();
        const pdf   = await pdfjsLib.getDocument({ data: bytes }).promise;
        let totalItems = 0;
        let bodyXml = '';
        const extractedImages = []; // { id, base64, width, height }

        for (let i = 1; i <= pdf.numPages; i++) {
            const page        = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const viewport    = page.getViewport({ scale: 1 });
            totalItems += textContent.items.length;

            // Extract any embedded images on this page (logos, stamps, etc.)
            const opList = await page.getOperatorList();
            for (let j = 0; j < opList.fnArray.length; j++) {
                if (opList.fnArray[j] === pdfjsLib.OPS.paintImageXObject) {
                    const imgName = opList.argsArray[j][0];
                    try {
                        const imgObj = await new Promise((resolve) => page.objs.get(imgName, resolve));
                        if (imgObj && imgObj.data && imgObj.width && imgObj.height) {
                            const canvas = document.createElement('canvas');
                            canvas.width = imgObj.width;
                            canvas.height = imgObj.height;
                            const ctx = canvas.getContext('2d');
                            const imgData = ctx.createImageData(imgObj.width, imgObj.height);

                            // Handle RGB (3 channel) vs RGBA (4 channel) source data
                            if (imgObj.data.length === imgObj.width * imgObj.height * 3) {
                                for (let p = 0, q = 0; p < imgObj.data.length; p += 3, q += 4) {
                                    imgData.data[q]   = imgObj.data[p];
                                    imgData.data[q+1] = imgObj.data[p+1];
                                    imgData.data[q+2] = imgObj.data[p+2];
                                    imgData.data[q+3] = 255;
                                }
                            } else {
                                imgData.data.set(imgObj.data);
                            }
                            ctx.putImageData(imgData, 0, 0);
                            extractedImages.push({
                                id: `image${extractedImages.length + 1}`,
                                base64: canvas.toDataURL('image/png').split(',')[1],
                                width: imgObj.width,
                                height: imgObj.height
                            });
                        }
                    } catch (imgErr) {
                        console.warn('Could not extract one embedded image:', imgErr);
                    }
                }
            }

            bodyXml += buildDocxXmlFromItems(textContent.items, viewport);
        }

        if (totalItems === 0 || !bodyXml.trim()) {
            result.innerHTML = `❌ No selectable text found (checked ${pdf.numPages} page${pdf.numPages > 1 ? 's' : ''}). This is likely a scanned photo saved as PDF — try Image to Word (OCR) instead.`;
            result.style.background = '#fef2f2';
            showStatus('❌ No extractable text — likely a scanned PDF.', 'error');
            return;
        }

        // Prepend extracted images (e.g. logo) before the text body
        // Prepend extracted images (e.g. logo) before the text body
        const userImageSize = parseInt(document.getElementById('pdfToDocImageSize')?.value ?? 150);
        let imageXml = '';

        if (userImageSize > 0) {
            extractedImages.slice(0, 3).forEach((img, idx) => { // cap at 3 to keep file size sane
                const displayW = Math.min(img.width, userImageSize);
                const displayH = Math.round(img.height * (displayW / img.width));
            imageXml += `<w:p><w:r><w:drawing>
                <wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing">
                  <wp:extent cx="${displayW * 9525}" cy="${displayH * 9525}"/>
                  <wp:docPr id="${idx+1}" name="${img.id}"/>
                  <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
                    <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
                      <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
                        <pic:nvPicPr><pic:cNvPr id="${idx+1}" name="${img.id}"/><pic:cNvPicPr/></pic:nvPicPr>
                        <pic:blipFill><a:blip r:embed="rId${idx+2}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
                        <pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${displayW * 9525}" cy="${displayH * 9525}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>
                      </pic:pic>
                    </a:graphicData>
                  </a:graphic>
                </wp:inline>
            </w:drawing></w:r></w:p>`;
        });
    }

        const blob = await buildRealDocxBlob(imageXml + bodyXml, extractedImages.slice(0, 3));

        if (!blob || blob.size < 1000) {
            result.innerHTML = '❌ File generation produced an unexpectedly small file. Please try again.';
            result.style.background = '#fef2f2';
            showStatus('❌ Generation failed.', 'error');
            return;
        }

        triggerDownload(blob, 'FlexTools_Converted.docx');
        result.innerHTML         = `✅ Word document downloaded — with formatting and ${extractedImages.length > 0 ? extractedImages.length + ' image(s)' : 'text'} preserved!`;
        result.style.background  = '#f0fdf4';
        result.style.borderColor = '#22c55e';
        result.classList.add('has-result');
        showStatus('✅ Converted to Word!', 'success');

    } catch (err) {
        console.error('PDF to Doc error:', err);
        result.innerHTML = '❌ Conversion failed: ' + (err.message || 'unknown error') + '. Please try again or contact support via WhatsApp.';
        result.style.background = '#fef2f2';
        showStatus('❌ Conversion failed.', 'error');
    }
}

/* ---- Build raw Word XML paragraphs/tables from PDF text positions ---- */
function buildDocxXmlFromItems(items, viewport) {
    const positioned = items
        .filter(it => it.str && it.str.trim())
        .map(it => {
            const tx = pdfjsLib.Util.transform(viewport.transform, it.transform);
            // Font height directly from the transform matrix — real size, not guessed
            const fontHeight = Math.hypot(tx[2], tx[3]);
            const fontName = (it.fontName || '').toLowerCase();
            const isBold = fontName.includes('bold');
            const isItalic = fontName.includes('italic') || fontName.includes('oblique');
            return {
                text: it.str,
                x: tx[4], y: tx[5],
                w: it.width * viewport.scale,
                size: Math.round(fontHeight),
                bold: isBold,
                italic: isItalic
            };
        });
    if (!positioned.length) return '';

    positioned.sort((a, b) => b.y - a.y);
    const rows = []; let currentRow = []; let lastY = null;
    positioned.forEach(p => {
        if (lastY !== null && Math.abs(p.y - lastY) > 6) { rows.push(currentRow); currentRow = []; }
        currentRow.push(p); lastY = p.y;
    });
    if (currentRow.length) rows.push(currentRow);

    const classified = rows.map(row => {
        row.sort((a, b) => a.x - b.x);
        const cols = []; let col = [row[0]];
        for (let i = 1; i < row.length; i++) {
            const gap = row[i].x - (row[i - 1].x + row[i - 1].w);
            if (gap > 20) { cols.push(col); col = []; }
            col.push(row[i]);
        }
        if (col.length) cols.push(col);
        return {
            isTabular: cols.length >= 3,
            columns: cols.map(c => ({ runs: c })),
            runs: row
        };
    });

    let xml = '';
    let pendingRows = [];

    // Convert PDF font size (points) to Word half-points (w:sz uses half-points)
    const toHalfPoints = (size) => Math.max(12, Math.round(size * 2));

    const buildRunXml = (wordItem) => {
        const rPr = `<w:rPr>
            ${wordItem.bold ? '<w:b/>' : ''}
            ${wordItem.italic ? '<w:i/>' : ''}
            <w:sz w:val="${toHalfPoints(wordItem.size)}"/>
        </w:rPr>`;
        return `<w:r>${rPr}<w:t xml:space="preserve">${xmlEscape(wordItem.text)} </w:t></w:r>`;
    };

    const flushTable = () => {
        if (!pendingRows.length) return;
        xml += '<w:tbl><w:tblPr><w:tblW w:w="5000" w:type="pct"/></w:tblPr>';
        pendingRows.forEach(cols => {
            xml += '<w:tr>';
            cols.forEach(cell => {
                const cellRuns = cell.runs.map(buildRunXml).join('');
                xml += `<w:tc><w:tcPr/><w:p>${cellRuns}</w:p></w:tc>`;
            });
            xml += '</w:tr>';
        });
        xml += '</w:tbl>';
        pendingRows = [];
    };

    classified.forEach(row => {
        if (row.isTabular) {
            pendingRows.push(row.columns);
        } else {
            flushTable();
            const lineHasContent = row.runs.some(r => r.text.trim());
            if (lineHasContent) {
                const runsXml = row.runs.map(buildRunXml).join('');
                xml += `<w:p>${runsXml}</w:p>`;
            }
        }
    });
    flushTable();

    return xml;
}

function xmlEscape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/* ---- Assemble a genuine, valid .docx file using JSZip ---- */
async function buildRealDocxBlob(bodyXml, images = []) {
    const zip = new JSZip();

    const imageOverrides = images.map((img, idx) =>
        `<Override PartName="/word/media/${img.id}.png" ContentType="image/png"/>`
    ).join('');

    zip.file('[Content_Types].xml',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  ${imageOverrides}
</Types>`);

    zip.folder('_rels').file('.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

    const imageRels = images.map((img, idx) =>
        `<Relationship Id="rId${idx+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${img.id}.png"/>`
    ).join('');

    zip.folder('word').folder('_rels').file('document.xml.rels',
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${imageRels}
</Relationships>`);

    if (images.length) {
        const mediaFolder = zip.folder('word').folder('media');
        images.forEach(img => mediaFolder.file(`${img.id}.png`, img.base64, { base64: true }));
    }

    const documentXml =
`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

    zip.folder('word').file('document.xml', documentXml);

    return await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
}

/* ============================================
   PDF WATERMARK
   ============================================ */
function toggleWatermarkType() {
    const type = document.getElementById('watermarkType').value;
    document.getElementById('watermarkTextOptions').style.display  = type === 'text'  ? 'block' : 'none';
    document.getElementById('watermarkImageOptions').style.display = type === 'image' ? 'block' : 'none';
}

async function applyWatermark() {
    const file   = document.getElementById('watermarkPdfInput').files[0];
    const result = document.getElementById('watermarkResult');
    const type   = document.getElementById('watermarkType').value;
    const opacity  = parseInt(document.getElementById('watermarkOpacity').value) / 100;
    const rotation = parseInt(document.getElementById('watermarkRotation').value);
    const position = document.getElementById('watermarkPosition').value;

    if (!file) { showStatus('❌ Please select a PDF file.', 'error'); return; }

    result.style.display    = 'flex';
    result.style.background = '#f8fafc';
    result.innerHTML = '<span class="spinner"></span> Applying watermark...';

    try {
        const { PDFDocument, rgb, degrees } = PDFLib;
        const bytes = await file.arrayBuffer();
        const doc   = await PDFDocument.load(bytes);
        const pages = doc.getPages();

        if (type === 'text') {
            const text     = document.getElementById('watermarkText').value.trim() || 'WATERMARK';
            const fontSize = parseInt(document.getElementById('watermarkFontSize').value) || 48;
            const hex      = document.getElementById('watermarkColor').value.replace('#','');
            const r = parseInt(hex.substring(0,2),16)/255;
            const g = parseInt(hex.substring(2,4),16)/255;
            const b = parseInt(hex.substring(4,6),16)/255;
            const font = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);

            pages.forEach(page => {
                const { width, height } = page.getSize();

                if (position === 'center') {
                    page.drawText(text, {
                        x: width / 2 - (text.length * fontSize * 0.25),
                        y: height / 2,
                        size: fontSize,
                        font,
                        color: rgb(r, g, b),
                        opacity,
                        rotate: degrees(rotation)
                    });
                } else {
                    // Tiled across the page
                    const stepX = fontSize * text.length * 0.7;
                    const stepY = fontSize * 3;
                    for (let y = 0; y < height + stepY; y += stepY) {
                        for (let x = -stepX; x < width + stepX; x += stepX) {
                            page.drawText(text, {
                                x, y, size: fontSize, font,
                                color: rgb(r, g, b), opacity, rotate: degrees(rotation)
                            });
                        }
                    }
                }
            });

        } else {
            const imgFile = document.getElementById('watermarkImageInput').files[0];
            if (!imgFile) { showStatus('❌ Please select a watermark image.', 'error'); return; }

            const imgBytes = await imgFile.arrayBuffer();
            const isJpg = imgFile.type.includes('jpeg') || imgFile.type.includes('jpg');
            const embeddedImg = isJpg ? await doc.embedJpg(imgBytes) : await doc.embedPng(imgBytes);
            const imgDims = embeddedImg.scale(0.4);

            pages.forEach(page => {
                const { width, height } = page.getSize();
                if (position === 'center') {
                    page.drawImage(embeddedImg, {
                        x: width / 2 - imgDims.width / 2,
                        y: height / 2 - imgDims.height / 2,
                        width: imgDims.width,
                        height: imgDims.height,
                        opacity,
                        rotate: degrees(rotation)
                    });
                } else {
                    for (let y = 0; y < height; y += imgDims.height * 1.5) {
                        for (let x = 0; x < width; x += imgDims.width * 1.5) {
                            page.drawImage(embeddedImg, {
                                x, y, width: imgDims.width, height: imgDims.height,
                                opacity, rotate: degrees(rotation)
                            });
                        }
                    }
                }
            });
        }

        const outBytes = await doc.save();
        triggerDownload(new Blob([outBytes], { type: 'application/pdf' }), 'FlexTools_Watermarked.pdf');

        result.innerHTML         = '✅ Watermark applied and downloaded!';
        result.style.background  = '#f0fdf4';
        result.style.borderColor = '#22c55e';
        result.classList.add('has-result');
        showStatus('✅ Watermark added!', 'success');

    } catch (err) {
        console.error(err);
        result.innerHTML        = '❌ Failed to add watermark. Please try again.';
        result.style.background = '#fef2f2';
        showStatus('❌ Watermark failed.', 'error');
    }
}

/* ============================================
   PDF ROTATE / REORDER
   ============================================ */
let organizePages = []; // { originalIndex, rotation, thumbUrl, removed }

async function loadPDFForOrganize() {
    const file = document.getElementById('organizePdfInput').files[0];
    if (!file) return;

    organizePDFBytes = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: organizePDFBytes }).promise;
    organizePages = [];

    const grid = document.getElementById('organizePagesGrid');
    grid.innerHTML = '<p style="grid-column:1/-1;color:#64748b;">Loading pages...</p>';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page     = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.4 });
        const canvas   = document.createElement('canvas');
        canvas.width  = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;

        organizePages.push({
            originalIndex: i - 1,
            rotation: 0,
            thumbUrl: canvas.toDataURL(),
            removed: false
        });
    }

    renderOrganizeGrid();
    document.getElementById('organizeDownloadBtn').style.display = 'block';
}

let organizePDFBytes = null;

function renderOrganizeGrid() {
    const grid = document.getElementById('organizePagesGrid');
    grid.innerHTML = '';

    organizePages.forEach((p, idx) => {
        if (p.removed) return;
        const card = document.createElement('div');
        card.style.cssText = 'border:1px solid #e2e8f0;border-radius:10px;padding:8px;background:#f8fafc;text-align:center;';
        card.innerHTML = `
            <div style="overflow:hidden;height:140px;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:6px;margin-bottom:8px;">
                <img src="${p.thumbUrl}" style="max-width:100%;max-height:100%;transform:rotate(${p.rotation}deg);transition:transform 0.2s;">
            </div>
            <p style="font-size:11px;color:#64748b;margin-bottom:6px;">Page ${p.originalIndex + 1}</p>
            <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;">
                <button onclick="rotateOrganizePage(${idx})" style="padding:4px 8px;border:1px solid #e2e8f0;background:#fff;border-radius:6px;cursor:pointer;font-size:11px;">↻ Rotate</button>
                <button onclick="moveOrganizePage(${idx},-1)" style="padding:4px 8px;border:1px solid #e2e8f0;background:#fff;border-radius:6px;cursor:pointer;font-size:11px;">◀</button>
                <button onclick="moveOrganizePage(${idx},1)" style="padding:4px 8px;border:1px solid #e2e8f0;background:#fff;border-radius:6px;cursor:pointer;font-size:11px;">▶</button>
                <button onclick="removeOrganizePage(${idx})" style="padding:4px 8px;border:1px solid #fecaca;background:#fff;border-radius:6px;cursor:pointer;font-size:11px;color:#dc2626;">✕</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function rotateOrganizePage(idx) {
    organizePages[idx].rotation = (organizePages[idx].rotation + 90) % 360;
    renderOrganizeGrid();
}

function moveOrganizePage(idx, dir) {
    const target = idx + dir;
    if (target < 0 || target >= organizePages.length) return;
    [organizePages[idx], organizePages[target]] = [organizePages[target], organizePages[idx]];
    renderOrganizeGrid();
}

function removeOrganizePage(idx) {
    organizePages[idx].removed = true;
    renderOrganizeGrid();
}

async function downloadOrganizedPDF() {
    const result = document.getElementById('organizeResult');
    result.style.display = 'flex';
    result.innerHTML = '<span class="spinner"></span> Building your PDF...';

    try {
        const { PDFDocument, degrees } = PDFLib;
        const srcDoc = await PDFDocument.load(organizePDFBytes);
        const newDoc = await PDFDocument.create();

        const activePages = organizePages.filter(p => !p.removed);
        for (const p of activePages) {
            const [copied] = await newDoc.copyPages(srcDoc, [p.originalIndex]);
            copied.setRotation(degrees(p.rotation));
            newDoc.addPage(copied);
        }

        const bytes = await newDoc.save();
        triggerDownload(new Blob([bytes], { type: 'application/pdf' }), 'FlexTools_Organized.pdf');

        result.innerHTML = '✅ PDF downloaded successfully!';
        result.style.background = '#f0fdf4';
        result.classList.add('has-result');
        showStatus('✅ PDF organized!', 'success');
    } catch (err) {
        console.error(err);
        result.innerHTML = '❌ Failed. Please try again.';
        result.style.background = '#fef2f2';
    }
}

/* ============================================
   NEWSLETTER FORM SUBMISSION
   ============================================ */
document.addEventListener('submit', async (e) => {
    if (e.target.id !== 'newsletterForm') return;
    e.preventDefault();

    const form = e.target;
    const msg  = document.getElementById('newsletterMsg');
    const formData = new FormData(form);

    msg.style.display = 'block';
    msg.style.color = '#64748b';
    msg.textContent = 'Submitting...';

    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (result.success) {
            msg.style.color = '#16a34a';
            msg.textContent = '✅ Thanks! You\'re on the list.';
            form.reset();
        } else {
            msg.style.color = '#dc2626';
            msg.textContent = '❌ Something went wrong. Try again.';
        }
    } catch (err) {
        msg.style.color = '#dc2626';
        msg.textContent = '❌ Network error. Try again.';
    }
});  

/* ============================================
   DYNAMIC META TAG MANAGER
   Updates title, description, canonical, and
   Open Graph tags per tool — same function as
   RankMath/Yoast, adapted for a single-page app.
   ============================================ */

const toolMetaData = {
    'home': {
        title: 'FlexTools Pro — Free PDF, Word & Image Tools',
        description: 'Edit, convert, merge and compress PDFs and images for free, directly in your browser. No signup, no uploads to any server.'
    },
    'currency-converter': {
        title: 'Free Currency Converter — Live Exchange Rates | FlexTools Pro',
        description: 'Convert between world currencies with live exchange rates, free online, no signup required.'
    },
    'crypto-converter': {
        title: 'Free Crypto Converter — Live Rates | FlexTools Pro',
        description: 'Convert between cryptocurrencies and world currencies with live rates, free online with no signup.'
    },
    'unit-converter': {
        title: 'Free Unit Converter — Length, Weight, Temperature | FlexTools Pro',
        description: 'Convert between length, weight, temperature, and volume units instantly, free online.'
    },
    'vat-calculator': {
        title: 'Free VAT Calculator — Nigeria, Ghana & More | FlexTools Pro',
        description: 'Calculate VAT-inclusive and VAT-exclusive prices instantly for Ghana, Nigeria, and other countries, free online.'
    },
    'percentage-calculator': {
        title: 'Free Percentage Calculator | FlexTools Pro',
        description: 'Instantly calculate percentage increases, decreases, and comparisons for free online.'
    },
    'bmi-calculator': {
        title: 'Free BMI Calculator | FlexTools Pro',
        description: 'Calculate your Body Mass Index (BMI) instantly and free, with health category results.'
    },
    'tax-calculator': {
        title: 'Free Income Tax Calculator | FlexTools Pro',
        description: 'Estimate your take-home pay after income tax deductions instantly, free online.'
    },
    'word': {
        title: 'Free Image to Word Converter (OCR) | FlexTools Pro',
        description: 'FlexTools Pro\'s Image to Word tool uses OCR to turn any photo of text into an editable Word document for free.'
    },
    'img-compressor': {
        title: 'Free Image Compressor | FlexTools Pro',
        description: 'Compress JPG, PNG, and WebP images online for free without losing quality. No upload to server, fully private.'
    },
    'img-resizer': {
        title: 'Free Image Resizer | FlexTools Pro',
        description: 'Resize any photo or image to custom dimensions for free, directly in your browser.'
    },
    'file-converter': {
        title: 'Free Image File Converter | FlexTools Pro',
        description: 'Convert images between JPG, PNG, WebP, and HEIC formats for free, with no signup required.'
    },
    'pdf-editor': {
        title: 'Free PDF Editor — Edit, Sign, Annotate | FlexTools Pro',
        description: 'Edit PDF text, add signatures, images, and annotations directly in your browser. Free, no signup, files never leave your device.'
    },
    'pdf-merge': {
        title: 'Free Merge PDF Tool | FlexTools Pro',
        description: 'Combine multiple PDF files into one document for free, directly in your browser with no signup required.'
    },
    'pdf-split': {
        title: 'Free Split PDF Tool | FlexTools Pro',
        description: 'Extract pages from any PDF into separate files for free, processed entirely in your browser.'
    },
    'pdf-to-jpg': {
        title: 'Free PDF to JPG Converter | FlexTools Pro',
        description: 'Convert any PDF page into a downloadable JPG image for free, with no signup required.'
    },
    'pdf-protect': {
        title: 'Free PDF Password Protect Tool | FlexTools Pro',
        description: 'Secure any PDF file with a password for free, processed entirely in your browser with no server upload.'
    },
    'pdf-unlock': {
        title: 'Free PDF Unlock Tool | FlexTools Pro',
        description: 'Remove password protection from a PDF for free, without uploading your file to any server.'
    },
    'doc-editor': {
        title: 'Free Document Editor | FlexTools Pro',
        description: 'Write, format, and edit Word-style documents for free directly in your browser, including scanning receipts into fillable templates.'
    },
    'pdf': {
        title: 'Free Image to PDF Converter | FlexTools Pro',
        description: 'Convert any photo or image into a PDF file for free, with no signup required.'
    },
    'doc-to-pdf': {
        title: 'Free Word to PDF Converter | FlexTools Pro',
        description: 'Convert a .docx Word file into a PDF for free, directly in your browser.'
    },
    'pdf-to-doc': {
        title: 'Free PDF to Word Converter | FlexTools Pro',
        description: 'Convert PDF files to editable Word documents online for free. No signup, no watermark, files processed locally in your browser.'
    },
    'pdf-watermark': {
        title: 'Free PDF Watermark Tool | FlexTools Pro',
        description: 'Add a custom text watermark across every page of a PDF for free, with no signup required.'
    },
    'pdf-organize': {
        title: 'Free PDF Rotate & Reorder Tool | FlexTools Pro',
        description: 'Rotate and reorder pages within any PDF for free, directly in your browser.'
    }
};

function updatePageMeta(toolId) {
    const meta = toolMetaData[toolId] || toolMetaData['home'];
    const fullTitle = meta.title;
    const desc = meta.description;
    const canonicalUrl = toolId === 'home'
        ? 'https://www.flextools.pro/'
        : `https://www.flextools.pro/${toolId}`;

    // Update <title>
    document.title = fullTitle;

    // Update meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', desc);

    // Update canonical URL
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (canonicalTag) canonicalTag.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    setMetaProperty('og:title', fullTitle);
    setMetaProperty('og:description', desc);
    setMetaProperty('og:url', canonicalUrl);

    // Update Twitter Card tags
    setMetaName('twitter:title', fullTitle);
    setMetaName('twitter:description', desc);
}

function setMetaProperty(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (tag) tag.setAttribute('content', content);
}

function setMetaName(name, content) {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (tag) tag.setAttribute('content', content);
}

/* ============================================
   WATERMARK FIX — Diagnostic + Live Preview
   Wraps existing applyWatermark safely
   ============================================ */

function checkWatermarkElements() {
    var ids = ['watermarkPdfInput', 'watermarkType', 'watermarkTextOptions', 'watermarkImageOptions', 'watermarkOpacity', 'watermarkRotation', 'watermarkPosition', 'watermarkText', 'watermarkFontSize', 'watermarkColor', 'watermarkImageInput', 'watermarkResult'];
    var missing = [];
    ids.forEach(function (id) {
        if (!document.getElementById(id)) { missing.push(id); }
    });
    if (missing.length > 0) {
        console.error('WATERMARK BUG FOUND — missing element IDs:', missing);
    } else {
        console.log('All watermark elements found correctly.');
    }
}

setTimeout(checkWatermarkElements, 2000);

/* ---- Live Preview (image watermark position) ---- */
function initWatermarkPreviewSafe() {
    var pdfInput = document.getElementById('watermarkPdfInput');
    if (!pdfInput || pdfInput.dataset.previewAdded === 'true') { return; }
    pdfInput.dataset.previewAdded = 'true';

    pdfInput.addEventListener('change', async function (e) {
        var file = e.target.files[0];
        if (!file) { return; }

        try {
            var bytes = await file.arrayBuffer();
            var pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            var page = await pdf.getPage(1);
            var viewport = page.getViewport({ scale: 1 });

            var existing = document.getElementById('wmPreviewCanvas');
            if (existing) { existing.remove(); }

            var canvas = document.createElement('canvas');
            canvas.id = 'wmPreviewCanvas';
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            canvas.style.maxWidth = '100%';
            canvas.style.border = '1px solid #e2e8f0';
            canvas.style.borderRadius = '8px';
            canvas.style.marginTop = '12px';
            canvas.style.display = 'block';

            await page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;

            pdfInput.parentElement.appendChild(canvas);
            drawWmPreviewOverlay(canvas, viewport);

            var watchIds = ['watermarkType', 'watermarkOpacity', 'watermarkRotation', 'watermarkPosition', 'watermarkText', 'watermarkFontSize'];
            watchIds.forEach(function (id) {
                var el = document.getElementById(id);
                if (el && !el.dataset.previewWatched) {
                    el.dataset.previewWatched = 'true';
                    el.addEventListener('input', function () { drawWmPreviewOverlay(canvas, viewport); });
                    el.addEventListener('change', function () { drawWmPreviewOverlay(canvas, viewport); });
                }
            });

        } catch (err) {
            console.error('Watermark preview failed to load PDF:', err);
        }
    });
}

function drawWmPreviewOverlay(canvas, viewport) {
    var ctx = canvas.getContext('2d');
    var type = document.getElementById('watermarkType') ? document.getElementById('watermarkType').value : 'text';
    var opacity = (parseInt(document.getElementById('watermarkOpacity').value) || 30) / 100;
    var position = document.getElementById('watermarkPosition') ? document.getElementById('watermarkPosition').value : 'center';
    var text = document.getElementById('watermarkText') ? (document.getElementById('watermarkText').value || 'WATERMARK') : 'WATERMARK';
    var fontSize = parseInt(document.getElementById('watermarkFontSize').value) || 48;

    // Redraw base PDF page fresh each time
    var pdfInput = document.getElementById('watermarkPdfInput');
    var file = pdfInput.files[0];
    if (!file) { return; }

    file.arrayBuffer().then(function (bytes) {
        pdfjsLib.getDocument({ data: bytes }).promise.then(function (pdf) {
            pdf.getPage(1).then(function (page) {
                page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
                    ctx.save();
                    ctx.globalAlpha = opacity;
                    ctx.font = fontSize + 'px Arial';
                    ctx.fillStyle = '#94a3b8';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';

                    if (position === 'tiled') {
                        var stepX = fontSize * text.length * 0.7;
                        var stepY = fontSize * 3;
                        for (var y = 0; y < canvas.height + stepY; y += stepY) {
                            for (var x = 0; x < canvas.width + stepX; x += stepX) {
                                ctx.fillText(text, x, y);
                            }
                        }
                    } else {
                        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
                    }
                    ctx.restore();
                });
            });
        });
    });
}

setInterval(initWatermarkPreviewSafe, 1000);