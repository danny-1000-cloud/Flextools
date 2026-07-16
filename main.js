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
   IMAGE TO WORD (OCR)
   ============================================ */
async function processImageToWord() {
    await processTask('Image to Word', async () => {
        const file = document.getElementById('wordImageInput').files[0];
        if (!file) throw new Error('Please select an image first.');
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        document.getElementById('wordExtractedText').value = text;
        document.getElementById('wordPreviewArea').style.display = 'block';
    });
}

function downloadProcessedWord() {
    const text = document.getElementById('wordExtractedText').value;
    triggerDownload(new Blob([text], { type: 'application/msword' }), 'FlexTools_OCR.doc');
}

function copyToClipboard() {
    const text = document.getElementById('wordExtractedText');
    text.select();
    document.execCommand('copy');
    showStatus('✅ Text copied to clipboard!', 'success');
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
        const img    = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        const ext = format.split('/')[1];
        canvas.toBlob(b => triggerDownload(b, `FlexTools_Converted.${ext}`), format);
    });
}

/* ============================================
   PDF EDITOR — Full Featured
   Text | Draw | Highlight | Sign | Erase | Image
   Multi-page support
   ============================================ */

let pdfBytes         = null;
let pdfDoc           = null;
let pdfPageImages    = {};
let currentPDFPage   = 1;
let totalPDFPages    = 1;
let textLayers       = {};
let drawLayers       = {};
let imageLayers      = {};
let eraserLayers     = {};
let currentPDFTool   = 'text';
let isDrawing        = false;
let isErasing        = false;
let pdfImportedImg   = null;
let isBold           = false;
let actionHistory    = [];
let currentHighlightColor = '#FFE500';
let signatureData    = null;
let isPlacingSignature = false;
let signCanvas       = null;
let signCtx          = null;
let isSignDrawing    = false;

function initPageLayers(page) {
    if (!textLayers[page])   textLayers[page]   = [];
    if (!drawLayers[page])   drawLayers[page]   = [];
    if (!imageLayers[page])  imageLayers[page]  = [];
    if (!eraserLayers[page]) eraserLayers[page] = [];
}

function selectPDFTool(tool) {
    currentPDFTool     = tool;
    isPlacingSignature = false;

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

    const panels = ['textOptions','drawOptions','highlightOptions','signOptions','eraserOptions','imageOptions'];
    panels.forEach(p => {
        const el = document.getElementById(p);
        if (el) el.style.display = 'none';
    });

    const panel = document.getElementById(tool + 'Options');
    if (panel) panel.style.display = 'block';

    const canvas = document.getElementById('pdfCanvas');
    if (canvas) {
        if (tool === 'draw' || tool === 'highlight') canvas.style.cursor = 'crosshair';
        else if (tool === 'eraser') canvas.style.cursor = 'cell';
        else canvas.style.cursor = 'crosshair';
    }

    if (tool === 'sign') initSignaturePad();
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
    document.querySelectorAll('#highlightOptions button').forEach(b => {
        b.style.border = '2px solid #ccc';
    });
    event.target.style.border = '2px solid #6366f1';
}

function initSignaturePad() {
    signCanvas = document.getElementById('signatureCanvas');
    if (!signCanvas) return;
    signCtx    = signCanvas.getContext('2d');
    signCtx.lineWidth   = 2;
    signCtx.strokeStyle = document.getElementById('signColor')?.value || '#000080';
    signCtx.lineCap     = 'round';
    signCtx.lineJoin    = 'round';

    signCanvas.onmousedown  = e => { isSignDrawing = true; signCtx.beginPath(); const r = signCanvas.getBoundingClientRect(); signCtx.moveTo(e.clientX - r.left, e.clientY - r.top); };
    signCanvas.onmousemove  = e => { if (!isSignDrawing) return; const r = signCanvas.getBoundingClientRect(); signCtx.strokeStyle = document.getElementById('signColor')?.value || '#000080'; signCtx.lineTo(e.clientX - r.left, e.clientY - r.top); signCtx.stroke(); };
    signCanvas.onmouseup    = () => { isSignDrawing = false; };
    signCanvas.onmouseleave = () => { isSignDrawing = false; };

    signCanvas.ontouchstart = e => { e.preventDefault(); isSignDrawing = true; signCtx.beginPath(); const r = signCanvas.getBoundingClientRect(); signCtx.moveTo(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top); };
    signCanvas.ontouchmove  = e => { e.preventDefault(); if (!isSignDrawing) return; const r = signCanvas.getBoundingClientRect(); signCtx.strokeStyle = document.getElementById('signColor')?.value || '#000080'; signCtx.lineTo(e.touches[0].clientX - r.left, e.touches[0].clientY - r.top); signCtx.stroke(); };
    signCanvas.ontouchend   = e => { e.preventDefault(); isSignDrawing = false; };
}

function clearSignature() {
    if (signCtx && signCanvas) signCtx.clearRect(0, 0, signCanvas.width, signCanvas.height);
}

function placeSignatureOnPDF() {
    if (!signCanvas) return;
    signatureData      = signCanvas.toDataURL();
    isPlacingSignature = true;
    showStatus('✅ Now click on the PDF where you want your signature.', 'success');
}

async function initPDFEditor() {
    const file = document.getElementById('pdfEditInput').files[0];
    if (!file) return;

    textLayers    = {};
    drawLayers    = {};
    imageLayers   = {};
    eraserLayers  = {};
    actionHistory = [];
    pdfPageImages = {};
    currentPDFPage = 1;

    const list = document.getElementById('layerList');
    if (list) list.innerHTML = '';

    document.getElementById('pdfControls').style.display     = 'block';
    document.getElementById('pdfViewContainer').style.display = 'block';
    document.getElementById('pdfDownloadBtn').style.display   = 'block';
    document.getElementById('layerContainer').style.display   = 'block';

    pdfBytes  = await file.arrayBuffer();
    pdfDoc    = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
    totalPDFPages = pdfDoc.numPages;

    const info = document.getElementById('pdfPageInfo');
    if (info) { info.textContent = `✅ ${totalPDFPages} page${totalPDFPages > 1 ? 's' : ''} loaded`; info.style.display = 'block'; }

    const nav = document.getElementById('pdfPageNav');
    if (nav) nav.style.display = totalPDFPages > 1 ? 'block' : 'none';

    await renderPDFPage(currentPDFPage);
    showStatus('✅ PDF loaded. Select a tool and start editing.', 'success');
}

async function renderPDFPage(pageNum) {
    const page     = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas   = document.getElementById('pdfCanvas');
    const ctx      = canvas.getContext('2d');

    canvas.width  = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;

    if (!pdfPageImages[pageNum]) {
        pdfPageImages[pageNum]     = new Image();
        pdfPageImages[pageNum].src = canvas.toDataURL();
        await new Promise(r => pdfPageImages[pageNum].onload = r);
    }

    initPageLayers(pageNum);
    updatePageLabel();
    drawPDFPreview();
    attachCanvasEvents();
}

function updatePageLabel() {
    const label = document.getElementById('pdfPageLabel');
    if (label) label.textContent = `Page ${currentPDFPage} of ${totalPDFPages}`;
}

async function changePDFPage(dir) {
    const next = currentPDFPage + dir;
    if (next < 1 || next > totalPDFPages) return;
    currentPDFPage = next;
    if (!pdfPageImages[currentPDFPage]) {
        await renderPDFPage(currentPDFPage);
    } else {
        initPageLayers(currentPDFPage);
        updatePageLabel();
        drawPDFPreview();
    }
}

function attachCanvasEvents() {
    const canvas = document.getElementById('pdfCanvas');
    if (!canvas) return;
    canvas.onmousedown  = handlePDFMouseDown;
    canvas.onmousemove  = handlePDFMouseMove;
    canvas.onmouseup    = handlePDFMouseUp;
    canvas.onclick      = handlePDFCanvasClick;
    canvas.ontouchstart = e => { e.preventDefault(); handlePDFMouseDown(e.touches[0]); };
    canvas.ontouchmove  = e => { e.preventDefault(); handlePDFMouseMove(e.touches[0]); };
    canvas.ontouchend   = e => { e.preventDefault(); handlePDFMouseUp(); };
}

function getCanvasCoords(e) {
    const canvas = document.getElementById('pdfCanvas');
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

function handlePDFMouseDown(e) {
    if (currentPDFTool === 'draw' || currentPDFTool === 'highlight') {
        isDrawing = true;
        const { x, y } = getCanvasCoords(e);
        const color = currentPDFTool === 'draw'
            ? (document.getElementById('drawColor')?.value || '#000000')
            : currentHighlightColor;
        const size  = currentPDFTool === 'draw'
            ? parseInt(document.getElementById('drawSize')?.value || 3)
            : parseInt(document.getElementById('highlightSize')?.value || 20);
        const alpha = currentPDFTool === 'highlight' ? 0.35 : 1;
        const layer = { type: currentPDFTool, points: [{ x, y }], color, size, alpha };
        drawLayers[currentPDFPage].push(layer);
        actionHistory.push({ tool: currentPDFTool, page: currentPDFPage, layerIndex: drawLayers[currentPDFPage].length - 1 });
    }
    if (currentPDFTool === 'eraser') {
        isErasing = true;
        applyEraser(e);
    }
}

function handlePDFMouseMove(e) {
    if (isDrawing && (currentPDFTool === 'draw' || currentPDFTool === 'highlight')) {
        const { x, y } = getCanvasCoords(e);
        const layers   = drawLayers[currentPDFPage];
        if (layers.length > 0) {
            layers[layers.length - 1].points.push({ x, y });
            drawPDFPreview();
        }
    }
    if (isErasing && currentPDFTool === 'eraser') applyEraser(e);
}

function handlePDFMouseUp() {
    isDrawing = false;
    isErasing = false;
}

function handlePDFCanvasClick(e) {
    if (currentPDFTool === 'draw' || currentPDFTool === 'highlight' || currentPDFTool === 'eraser') return;
    const { x, y } = getCanvasCoords(e);

    if (currentPDFTool === 'text') {
        const text   = document.getElementById('pdfTextToAdd')?.value.trim();
        const color  = document.getElementById('pdfTextColor')?.value || '#000000';
        const size   = parseInt(document.getElementById('pdfFontSize')?.value || 20);
        const font   = document.getElementById('pdfFontFamily')?.value || 'Arial';
        if (!text) { showStatus('❌ Please enter text first.', 'error'); return; }
        const layer = { type: 'text', content: text, x, y, color, size, bold: isBold, font };
        textLayers[currentPDFPage].push(layer);
        actionHistory.push({ tool: 'text', page: currentPDFPage, layerIndex: textLayers[currentPDFPage].length - 1 });
        addLayerToList('text', `"${text}"`, currentPDFPage, textLayers[currentPDFPage].length - 1);
        drawPDFPreview();
    }

    if (currentPDFTool === 'image') {
        if (!pdfImportedImg) { showStatus('❌ Please select an image first.', 'error'); return; }
        const w = parseInt(document.getElementById('pdfImgWidth')?.value || 150);
        const h = parseInt(document.getElementById('pdfImgHeight')?.value || 100);
        const layer = { type: 'image', img: pdfImportedImg, x, y, w, h };
        imageLayers[currentPDFPage].push(layer);
        actionHistory.push({ tool: 'image', page: currentPDFPage, layerIndex: imageLayers[currentPDFPage].length - 1 });
        addLayerToList('image', `Image at (${Math.round(x)}, ${Math.round(y)})`, currentPDFPage, imageLayers[currentPDFPage].length - 1);
        drawPDFPreview();
    }

    if (currentPDFTool === 'sign' && isPlacingSignature && signatureData) {
        const sigImg = new Image();
        sigImg.src   = signatureData;
        sigImg.onload = () => {
            const layer = { type: 'image', img: sigImg, x, y, w: 200, h: 80 };
            imageLayers[currentPDFPage].push(layer);
            actionHistory.push({ tool: 'image', page: currentPDFPage, layerIndex: imageLayers[currentPDFPage].length - 1 });
            addLayerToList('image', `Signature at (${Math.round(x)}, ${Math.round(y)})`, currentPDFPage, imageLayers[currentPDFPage].length - 1);
            drawPDFPreview();
            isPlacingSignature = false;
            showStatus('✅ Signature placed!', 'success');
        };
    }
}

function applyEraser(e) {
    const { x, y } = getCanvasCoords(e);
    const size = parseInt(document.getElementById('eraserSize')?.value || 30);
    const half = size / 2;
    const canvas = document.getElementById('pdfCanvas');
    canvas.getContext('2d').fillStyle = '#ffffff';
    canvas.getContext('2d').fillRect(x - half, y - half, size, size);
    eraserLayers[currentPDFPage].push({ x, y, size });
}

function loadPDFImage(input) {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        pdfImportedImg     = new Image();
        pdfImportedImg.src = e.target.result;
        pdfImportedImg.onload = () => showStatus('✅ Image ready. Click on the PDF to place it.', 'success');
    };
    reader.readAsDataURL(file);
}

function drawPDFPreview() {
    const canvas = document.getElementById('pdfCanvas');
    if (!canvas || !pdfPageImages[currentPDFPage]) return;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(pdfPageImages[currentPDFPage], 0, 0);

    ctx.fillStyle = '#ffffff';
    (eraserLayers[currentPDFPage] || []).forEach(e => {
        ctx.fillRect(e.x - e.size/2, e.y - e.size/2, e.size, e.size);
    });

    (drawLayers[currentPDFPage] || []).forEach(layer => {
        if (layer.points.length < 2) return;
        ctx.save();
        ctx.globalAlpha   = layer.alpha || 1;
        ctx.strokeStyle   = layer.color;
        ctx.lineWidth     = layer.size;
        ctx.lineCap       = 'round';
        ctx.lineJoin      = 'round';
        ctx.beginPath();
        ctx.moveTo(layer.points[0].x, layer.points[0].y);
        layer.points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.restore();
    });

    (imageLayers[currentPDFPage] || []).forEach(layer => {
        ctx.drawImage(layer.img, layer.x, layer.y, layer.w, layer.h);
    });

    (textLayers[currentPDFPage] || []).forEach(layer => {
        const weight   = layer.bold ? 'bold ' : '';
        ctx.font       = `${weight}${layer.size}px ${layer.font || 'Arial'}`;
        ctx.fillStyle  = layer.color;
        ctx.fillText(layer.content, layer.x, layer.y);
    });
}

function addLayerToList(type, label, page, index) {
    const list  = document.getElementById('layerList');
    if (!list)  return;
    const icons = { text: '✏️', image: '🖼️', draw: '🖊️', highlight: '🖍️', eraser: '🧹' };
    const li    = document.createElement('li');
    li.id       = `pdflayer-${type}-${page}-${index}`;
    li.style.cssText = 'background:#f1f5f9;padding:8px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;';
    li.innerHTML = `<span>${icons[type] || '•'} ${label} (p${page})</span><button onclick="removeSpecificLayer('${type}',${page},${index})" style="color:#ef4444;border:none;background:none;cursor:pointer;font-weight:700;">✕</button>`;
    list.appendChild(li);
}

function removeSpecificLayer(type, page, index) {
    if (type === 'text')  textLayers[page]?.splice(index, 1);
    if (type === 'image') imageLayers[page]?.splice(index, 1);
    if (type === 'draw' || type === 'highlight') drawLayers[page]?.splice(index, 1);
    const li = document.getElementById(`pdflayer-${type}-${page}-${index}`);
    if (li) li.remove();
    drawPDFPreview();
}

function undoPDFAction() {
    if (!actionHistory.length) { showStatus('Nothing to undo.', 'error'); return; }
    const last = actionHistory.pop();
    if (last.tool === 'text')   textLayers[last.page]?.pop();
    if (last.tool === 'image')  imageLayers[last.page]?.pop();
    if (last.tool === 'draw' || last.tool === 'highlight') drawLayers[last.page]?.pop();
    if (last.tool === 'eraser') eraserLayers[last.page]?.pop();
    const li = document.querySelector(`#pdflayer-${last.tool}-${last.page}-${last.layerIndex}`);
    if (li) li.remove();
    drawPDFPreview();
}

function clearAllPDFEdits() {
    initPageLayers(currentPDFPage);
    textLayers[currentPDFPage]   = [];
    drawLayers[currentPDFPage]   = [];
    imageLayers[currentPDFPage]  = [];
    eraserLayers[currentPDFPage] = [];
    actionHistory = actionHistory.filter(a => a.page !== currentPDFPage);
    const list = document.getElementById('layerList');
    if (list) list.innerHTML = '';
    drawPDFPreview();
    showStatus('✅ Page edits cleared.', 'success');
}

async function downloadEditedPDF() {
    try {
        const { PDFDocument, rgb } = PDFLib;
        const doc = await PDFDocument.load(pdfBytes);

        for (let pageNum = 1; pageNum <= totalPDFPages; pageNum++) {
            const page = doc.getPages()[pageNum - 1];
            const { width, height } = page.getSize();
            const canvas = document.getElementById('pdfCanvas');
            const scaleX = width  / canvas.width;
            const scaleY = height / canvas.height;

            (eraserLayers[pageNum] || []).forEach(e => {
                page.drawRectangle({
                    x: (e.x - e.size/2) * scaleX,
                    y: height - ((e.y + e.size/2) * scaleY),
                    width:  e.size * scaleX,
                    height: e.size * scaleY,
                    color:  rgb(1, 1, 1)
                });
            });

            for (const layer of (textLayers[pageNum] || [])) {
                const hex = layer.color.replace('#','');
                const r   = parseInt(hex.substring(0,2),16)/255;
                const g   = parseInt(hex.substring(2,4),16)/255;
                const b   = parseInt(hex.substring(4,6),16)/255;
                page.drawText(layer.content, {
                    x:     layer.x * scaleX,
                    y:     height - (layer.y * scaleY),
                    size:  layer.size * Math.min(scaleX, scaleY),
                    color: rgb(r, g, b)
                });
            }

            for (const layer of (imageLayers[pageNum] || [])) {
                try {
                    const src     = layer.img.src;
                    const isJpg   = src.includes('jpeg') || src.includes('jpg');
                    const b64     = src.split(',')[1];
                    const bytes   = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
                    const embed   = isJpg ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);
                    page.drawImage(embed, {
                        x:      layer.x * scaleX,
                        y:      height - ((layer.y + layer.h) * scaleY),
                        width:  layer.w * scaleX,
                        height: layer.h * scaleY
                    });
                } catch (imgErr) { console.warn('Image layer skipped:', imgErr); }
            }
        }

        const bytes = await doc.save();
        triggerDownload(new Blob([bytes], { type: 'application/pdf' }), 'FlexTools_Edited.pdf');
        showStatus('✅ PDF downloaded!', 'success');

    } catch (err) {
        console.error(err);
        showStatus('❌ Download failed. Please try again.', 'error');
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
   DOC EDITOR — Full Featured
   contenteditable based (no Quill dependency)
   ============================================ */

function getDocEditor() {
    return document.getElementById('docEditorArea');
}

function initDocEditor() {
    // No third-party editor library to initialise — the editor area
    // is a plain contenteditable div. This function exists so
    // showTool('doc-editor') has a safe hook to call without error.
    const editor = getDocEditor();
    if (editor) updateDocWordCount();
}

function applyDocFormat(command, value = null) {
    const editor = getDocEditor();
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, value);
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
    const buffer = await file.arrayBuffer();
    mammoth.convertToHtml({ arrayBuffer: buffer })
        .then(result => {
            const editor = getDocEditor();
            if (editor) {
                editor.innerHTML = result.value;
                updateDocWordCount();
                showStatus('✅ Document imported successfully.', 'success');
            }
        })
        .catch(err => {
            console.error(err);
            showStatus('❌ Could not read Word document.', 'error');
        });
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

/* ============================================
   DOC EDITOR — SCAN IMAGE / CAMERA TO DOC
   (single definition — duplicate removed)
   ============================================ */
async function scanImageToDoc(input) {
    const file = input.files[0];
    if (!file) return;

    const previewWrapper = document.getElementById('docScanPreview');
    const previewImg     = document.getElementById('docScanPreviewImg');
    if (previewWrapper && previewImg) {
        previewImg.src               = URL.createObjectURL(file);
        previewWrapper.style.display = 'block';
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
                } else if (m.status === 'loading tesseract core') {
                    if (statusText) statusText.textContent = 'Loading OCR engine...';
                } else if (m.status === 'initializing tesseract') {
                    if (statusText) statusText.textContent = 'Initialising...';
                } else if (m.status === 'loading language traineddata') {
                    if (statusText) statusText.textContent = 'Loading language data...';
                }
            }
        });

        const extractedText = result.data.text.trim();

        if (!extractedText) {
            showStatus('❌ No text found in image. Try a clearer photo.', 'error');
            if (progressWrapper) progressWrapper.style.display = 'none';
            return;
        }

        const editor = getDocEditor();
        if (editor) {
            const lines = extractedText.split('\n');
            let html    = '';
            lines.forEach(line => {
                const trimmed = line.trim();
                html += trimmed ? `<p>${trimmed}</p>` : '<p><br></p>';
            });
            editor.innerHTML = html;
            updateDocWordCount();
        }

        if (progressBar)     { progressBar.style.width = '100%'; progressBar.style.background = '#22c55e'; }
        if (progressPercent) progressPercent.textContent = '100%';
        if (statusText)      statusText.textContent = '✅ Text extracted successfully!';

        setTimeout(() => { if (progressWrapper) progressWrapper.style.display = 'none'; }, 2000);

        const wordCount = extractedText.split(/\s+/).filter(Boolean).length;
        showStatus(`✅ Document scanned — ${wordCount} words extracted.`, 'success');

        document.getElementById('docEditorArea')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (err) {
        console.error('OCR Error:', err);
        if (progressWrapper) progressWrapper.style.display = 'none';
        showStatus('❌ Could not scan image. Please try again with a clearer photo.', 'error');
    }

    input.value = '';
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