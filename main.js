/* ============================================
   MAIN.JS — FlexTools Pro
   Version: 2.0 | July 2026
   ============================================ */

'use strict';

/* ============================================
   CURRENCY DATA
   ============================================ */
const currencyData = {
    "USD": "US Dollar",        "CAD": "Canadian Dollar",   "BRL": "Brazilian Real",
    "MXN": "Mexican Peso",     "ARS": "Argentine Peso",    "EUR": "Euro",
    "GBP": "British Pound",    "CHF": "Swiss Franc",       "RUB": "Russian Ruble",
    "TRY": "Turkish Lira",     "SEK": "Swedish Krona",     "NGN": "Nigerian Naira",
    "GHS": "Ghanaian Cedi",    "ZAR": "South African Rand","KES": "Kenyan Shilling",
    "EGP": "Egyptian Pound",   "MAD": "Moroccan Dirham",   "JPY": "Japanese Yen",
    "CNY": "Chinese Yuan",     "INR": "Indian Rupee",      "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",      "KRW": "South Korean Won",  "SGD": "Singapore Dollar",
    "ILS": "Israeli Shekel",   "AUD": "Australian Dollar", "NZD": "New Zealand Dollar"
};

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
        toS.value   = "NGN";
    }

    // Populate crypto-to-currency dropdown
    const toCryptoSelect = document.getElementById('toCryptoCurrency');
    if (toCryptoSelect) {
        for (const [code, name] of Object.entries(currencyData)) {
            toCryptoSelect.add(new Option(`${code} — ${name}`, code));
        }
        toCryptoSelect.value = "NGN";
    }

    // Init doc editor
    initDocEditor();

    // Routing
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const targetEl = document.getElementById(path);

    if (path && targetEl) {
        showTool(path, null, true, true);
    } else {
        showTool('home', null, true, true);
    }

    // Copyright year
    const yearEl = document.getElementById('ft-current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Reveal page (anti-flicker)
    document.documentElement.style.display = 'block';

    // Pull-to-refresh
    if (typeof initRefresher === 'function') initRefresher();
});

/* ============================================
   ROUTING — showTool
   ============================================ */
function showTool(id, btn, isBoot = false, isRefresh = false) {
    if (!id) return;

    // Update URL (only on real clicks)
    if (!isBoot && !isRefresh) {
        const newPath = id === 'home' ? '/' : `/${id}`;
        window.history.pushState({ tool: id }, '', newPath);
    }

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

    // Close all others
    document.querySelectorAll('.group-content').forEach(other => {
        if (other !== content) {
            other.classList.remove('show');
            const c = other.parentElement.querySelector('.chevron');
            if (c) c.style.transform = 'rotate(0deg)';
        }
    });

    // Toggle current
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
window.onpopstate = function() {
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    showTool(path || 'home', null, true);
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

    if (isNaN(salary) || salary <= 0) { resultBox.innerHTML = 'Please enter a valid salary.'; return; }

    const brackets = {
        nigeria:     [[300000,0.07],[300000,0.11],[500000,0.15],[500000,0.19],[1600000,0.21],[Infinity,0.24]],
        ghana:       [[4824,0],[1320,0.05],[1560,0.10],[36000,0.175],[196740,0.25],[Infinity,0.30]],
        kenya:       [[288000,0.10],[100000,0.25],[Infinity,0.30]],
        southafrica: [[237100,0.18],[133500,0.26],[184200,0.31],[Infinity,0.36]],
        uk:          [[12570,0],[37700,0.20],[99730,0.40],[Infinity,0.45]],
        usa:         [[11600,0.10],[35550,0.12],[53375,0.22],[Infinity,0.24]]
    };

    let tax = 0, remaining = salary;
    for (const [limit, rate] of brackets[country]) {
        if (remaining <= 0) break;
        const taxable = Math.min(remaining, limit);
        tax += taxable * rate;
        remaining -= taxable;
    }

    const takeHome    = salary - tax;
    const effectiveRate = ((tax / salary) * 100).toFixed(1);
    const fmt = n => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    resultBox.innerHTML = `<small>Estimated Annual Tax</small>${fmt(tax)}<div style="font-size:0.85rem;color:#64748b;margin-top:8px;font-weight:600;">Take-Home: ${fmt(takeHome)} · Effective Rate: ${effectiveRate}%</div>`;
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
   PDF EDITOR
   ============================================ */
let pdfBytes     = null;
let pdfPageImage = null;
let textLayers   = [];

async function initPDFEditor() {
    const file = document.getElementById('pdfEditInput').files[0];
    if (!file) return;

    ['pdfControls','pdfViewContainer','pdfDownloadBtn','layerContainer'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    });

    pdfBytes = await file.arrayBuffer();
    const pdf      = await pdfjsLib.getDocument({ data: pdfBytes }).promise;
    const page     = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas   = document.getElementById('pdfCanvas');
    const ctx      = canvas.getContext('2d');
    canvas.height  = viewport.height;
    canvas.width   = viewport.width;
    await page.render({ canvasContext: ctx, viewport }).promise;

    pdfPageImage       = new Image();
    pdfPageImage.src   = canvas.toDataURL();
    pdfPageImage.onload = () => drawPreview();
}

function addTextLayer() {
    const textInput = document.getElementById('pdfTextToAdd');
    const x = document.getElementById('textX').value;
    const y = document.getElementById('textY').value;
    if (!textInput.value.trim()) return;

    textLayers.push({ content: textInput.value.trim(), x: parseInt(x), y: parseInt(y) });

    const list = document.getElementById('layerList');
    const li   = document.createElement('li');
    li.style.cssText = 'background:#f1f5f9;margin-bottom:5px;padding:8px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;';
    li.innerHTML = `<span>"${textInput.value}" at (${x}, ${y})</span><button onclick="removeLayer(${textLayers.length - 1})" style="color:#ef4444;border:none;background:none;cursor:pointer;font-weight:700;">✕</button>`;
    list.appendChild(li);

    textInput.value = '';
    drawPreview();
}

function removeLayer(index) {
    textLayers.splice(index, 1);
    const list = document.getElementById('layerList');
    list.innerHTML = '';
    textLayers.forEach((layer, i) => {
        const li = document.createElement('li');
        li.style.cssText = 'background:#f1f5f9;margin-bottom:5px;padding:8px 12px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;font-size:0.85rem;';
        li.innerHTML = `<span>"${layer.content}"</span><button onclick="removeLayer(${i})" style="color:#ef4444;border:none;background:none;cursor:pointer;font-weight:700;">✕</button>`;
        list.appendChild(li);
    });
    drawPreview();
}

function drawPreview() {
    const canvas = document.getElementById('pdfCanvas');
    const ctx    = canvas.getContext('2d');
    if (!pdfPageImage) return;
    ctx.drawImage(pdfPageImage, 0, 0);
    ctx.font      = '22px Arial';
    ctx.fillStyle = '#3b82f6';
    const currentText = document.getElementById('pdfTextToAdd').value;
    const currX = document.getElementById('textX').value;
    const currY = document.getElementById('textY').value;
    ctx.fillText(currentText, currX, currY);
    ctx.fillStyle = '#0f172a';
    textLayers.forEach(l => ctx.fillText(l.content, l.x, l.y));
}

async function downloadEditedPDF() {
    const { PDFDocument, rgb } = PDFLib;
    const doc       = await PDFDocument.load(pdfBytes);
    const page      = doc.getPages()[0];
    const { width, height } = page.getSize();
    const canvas    = document.getElementById('pdfCanvas');

    for (const layer of textLayers) {
        page.drawText(layer.content, {
            x: layer.x * (width / canvas.width),
            y: height - (layer.y * (height / canvas.height)),
            size: 18,
            color: rgb(0, 0, 0)
        });
    }

    const bytes = await doc.save();
    triggerDownload(new Blob([bytes], { type: 'application/pdf' }), 'FlexTools_Edited.pdf');
}

/* ============================================
   MERGE PDF
   ============================================ */
async function mergePDFs() {
    await processTask('Merge PDF', async () => {
        const files = document.getElementById('mergeInput').files;
        if (files.length < 2) throw new Error('Please select at least 2 PDF files.');
        const merged = await PDFLib.PDFDocument.create();
        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const pdf   = await PDFLib.PDFDocument.load(bytes);
            const pages = await merged.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(p => merged.addPage(p));
        }
        const bytes = await merged.save();
        triggerDownload(new Blob([bytes], { type: 'application/pdf' }), 'FlexTools_Merged.pdf');
    });
}

/* ============================================
   SPLIT PDF
   ============================================ */
async function splitPDF() {
    await processTask('Split PDF', async () => {
        const file    = document.getElementById('splitInput').files[0];
        const pageNum = parseInt(document.getElementById('splitPage').value) - 1;
        if (!file) throw new Error('Please select a PDF file.');
        const bytes  = await file.arrayBuffer();
        const src    = await PDFLib.PDFDocument.load(bytes);
        const newPdf = await PDFLib.PDFDocument.create();
        const [page] = await newPdf.copyPages(src, [pageNum]);
        newPdf.addPage(page);
        const out = await newPdf.save();
        triggerDownload(new Blob([out], { type: 'application/pdf' }), 'FlexTools_Page.pdf');
    });
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
   PDF PASSWORD PROTECT
   ============================================ */
async function protectPDF() {
    const file    = document.getElementById('pdfProtectInput').files[0];
    const pass    = document.getElementById('pdfPassword').value;
    const confirm = document.getElementById('pdfPasswordConfirm').value;
    const res     = document.getElementById('pdfProtectResult');

    if (!file)              { showStatus('❌ Please select a PDF file.', 'error'); return; }
    if (!pass)              { showStatus('❌ Please enter a password.', 'error'); return; }
    if (pass !== confirm)   { showStatus('❌ Passwords do not match.', 'error'); return; }

    res.style.display = 'flex';
    res.innerHTML = `<span class="spinner"></span> Encrypting PDF...`;

    try {
        const bytes  = await file.arrayBuffer();
        const doc    = await PDFLib.PDFDocument.load(bytes);
        const output = await doc.save({
            userPassword:  pass,
            ownerPassword: pass,
            permissions: {
                printing:       'highResolution',
                modifying:       false,
                copying:         false,
                annotating:      false,
                fillingForms:    false,
                contentAccessibility: false,
                documentAssembly:     false
            }
        });
        triggerDownload(new Blob([output], { type: 'application/pdf' }), 'FlexTools_Protected.pdf');
        res.innerHTML = '🔐 PDF protected and downloaded successfully!';
        res.classList.add('has-result');
    } catch (err) {
        console.error(err);
        res.innerHTML = '❌ Failed to protect PDF. Please try a different file.';
        showStatus('❌ PDF protection failed.', 'error');
    }
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
   DOC EDITOR
   ============================================ */
let quill = null;

function initDocEditor() {
    const container = document.getElementById('editor-container');
    if (!container) return;
    const existingToolbar = container.parentElement.querySelector('.ql-toolbar');
    if (existingToolbar || window.myQuillEditor) return;
    container.innerHTML = '';

    try {
        window.myQuillEditor = new Quill('#editor-container', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ align: [] }],
                    ['clean']
                ]
            }
        });
        quill = window.myQuillEditor;
    } catch (err) {
        console.error('Quill init error:', err);
    }
}

async function importWordFile(input) {
    const file = input.files[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    mammoth.convertToHtml({ arrayBuffer: buffer })
        .then(result => {
            const editor = window.myQuillEditor || quill;
            if (editor) editor.clipboard.dangerouslyPasteHTML(result.value);
        })
        .catch(err => {
            console.error(err);
            showStatus('❌ Could not read Word document.', 'error');
        });
}

function downloadDocAsWord() {
    const editor  = window.myQuillEditor || quill;
    if (!editor)  { showStatus('❌ Editor not ready.', 'error'); return; }
    const content = editor.root.innerHTML;
    const html    = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"></head><body>${content}</body></html>`;
    const blob    = htmlDocx.asBlob(html);
    triggerDownload(blob, 'FlexTools_Document.docx');
}