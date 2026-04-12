let quill;

// --- UPDATED WORLD CURRENCY LIST (UNTOUCHED) ---
const currencyData = {
    "USD": "US Dollar", "CAD": "Canadian Dollar", "BRL": "Brazilian Real", "MXN": "Mexican Peso",
    "ARS": "Argentine Peso", "EUR": "Euro", "GBP": "British Pound", "CHF": "Swiss Franc",
    "RUB": "Russian Ruble", "TRY": "Turkish Lira", "SEK": "Swedish Krona", "NGN": "Nigerian Naira",
    "GHS": "Ghanaian Cedi", "ZAR": "South African Rand", "KES": "Kenyan Shilling", "EGP": "Egyptian Pound",
    "MAD": "Moroccan Dirham", "JPY": "Japanese Yen", "CNY": "Chinese Yuan", "INR": "Indian Rupee",
    "AED": "UAE Dirham", "SAR": "Saudi Riyal", "KRW": "South Korean Won", "SGD": "Singapore Dollar",
    "ILS": "Israeli Shekel", "AUD": "Australian Dollar", "NZD": "New Zealand Dollar"
};

window.onload = () => {
    // Populate Currency
    const fromS = document.getElementById('fromCurrency');
    const toS = document.getElementById('toCurrency');
    if (fromS && toS) {
        for (const [code, name] of Object.entries(currencyData)) {
            fromS.add(new Option(name, code)); 
            toS.add(new Option(name, code));
        }
        fromS.value = "USD"; toS.value = "NGN";
    }

    if (document.getElementById('editor-container')) {
        quill = new Quill('#editor-container', { theme: 'snow' });
    }

    // 1. Get the last tool used (from URL or Storage)
    let path = window.location.pathname.split('/').filter(Boolean)[0] || window.location.hash.replace('#', '') || localStorage.getItem('activeTool') || 'currency';
    
    // 2. Find the button and category
    const targetBtn = document.querySelector(`[onclick*="'${path}'"]`);
    if (targetBtn) {
        const parentCategory = targetBtn.closest('.group-content');
        if (parentCategory) {
            parentCategory.classList.add('show'); // Open the specific folder
            const chevron = parentCategory.parentElement.querySelector('.chevron');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
    }
    
    // 3. Show tool WITHOUT closing sidebar (to prevent mobile flicker on boot)
    showTool(path, targetBtn, true); 
};

function showTool(id, btn, isBoot = false) {
    const targetTool = document.getElementById(id);
    if (!targetTool) return;

    // Switch Visibility
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));
    targetTool.classList.add('active');

    // Update Active Button
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeBtn = btn || document.querySelector(`[onclick*="'${id}'"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // SAVE STATE
    localStorage.setItem('activeTool', id);

    // Close sidebar on mobile ONLY if user clicked (not on refresh)
    if (!isBoot && window.innerWidth <= 900) {
        document.getElementById('sidebar').classList.remove('open');
    }

    // Update URL & Title
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    if (isLocal) window.location.hash = id;
    else if (window.location.pathname !== `/${id}`) window.history.pushState({tool: id}, "", `/${id}`);
    
    document.title = `${activeBtn ? activeBtn.innerText.trim() : "Tool"} | FlexTools Pro`;
}

function toggleCategory(header) {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.chevron');
    
    // Close other folders to keep it tidy
    document.querySelectorAll('.group-content').forEach(other => {
        if (other !== content) {
            other.classList.remove('show');
            const c = other.parentElement.querySelector('.chevron');
            if (c) c.style.transform = 'rotate(0deg)';
        }
    });

    content.classList.toggle('show');
    if (chevron) chevron.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
}

// --- REFRESH SPINNER LOGIC ---
if (typeof PullToRefresh !== 'undefined') {
    PullToRefresh.init({
        mainElement: 'body',
        distThreshold: 80,
        onRefresh() {
            return new Promise((resolve) => {
                // Force-inject the spinner overlay
                const overlay = document.createElement('div');
                overlay.className = 'refresh-overlay';
                overlay.innerHTML = `
                    <div class="refresh-spinner"></div>
                    <p style="margin-top:20px; font-weight:800; color:#0f172a;">Updating FlexTools...</p>
                `;
                document.body.appendChild(overlay);

                setTimeout(() => {
                    window.location.reload();
                    resolve();
                }, 1500);
            });
        }
    });
}

// --- UNIVERSAL TASK HANDLER (Manages Spinners & Done Message) ---
async function processTask(toolName, callback) {
    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;

    try {
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner"></span> Processing...`;
        await callback();
        showStatus(`✅ ${toolName} Completed!`, "success");
    } catch (error) {
        console.error(error);
        showStatus(`❌ ${toolName} Failed: ${error.message}`, "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalContent;
    }
}

function showStatus(message, type) {
    const statusBox = document.createElement('div');
    statusBox.className = `status-toast ${type}`;
    statusBox.innerText = message;
    document.body.appendChild(statusBox);
    setTimeout(() => statusBox.remove(), 4000);
}

// --- FINANCIAL TOOLS ---
async function convertCurrency() {
    const amt = document.getElementById('currAmount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const res = document.getElementById('currResult');
    if (!amt) return;

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await response.json();
        if (data.result === "success") {
            const rate = data.rates[to];
            const result = (amt * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            res.style.display = "block";
            res.innerHTML = `${amt} ${from} = <span style="color:#f97316">${result} ${to}</span>`;
        }
    } catch (error) {
        res.innerHTML = "Error fetching rates.";
    }
}

function convertUnits() {
    const val = parseFloat(document.getElementById('unitValue').value);
    const type = document.getElementById('unitType').value;
    const res = document.getElementById('unitResult');
    if (isNaN(val)) return;
    let out = (type === "length") ? `${val}m = ${(val * 3.28).toFixed(2)}ft` : `${val}kg = ${(val * 2.2).toFixed(2)}lb`;
    res.style.display = "block"; res.innerHTML = `<strong>${out}</strong>`;
}

// --- IMAGE PROCESSING TOOLS ---

async function processImageToWord() {
    await processTask("Image to Word", async () => {
        const file = document.getElementById('wordImageInput').files[0];
        if (!file) throw new Error("Select an image first.");
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        triggerDownload(new Blob([text], { type: 'application/msword' }), "FlexTools_OCR.doc");
    });
}

async function compressImage() {
    await processTask("Compression", async () => {
        const file = document.getElementById('compressInput').files[0];
        const quality = parseFloat(document.getElementById('compressQuality').value);
        if (!file) throw new Error("Select an image.");
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        canvas.toBlob(b => triggerDownload(b, "compressed.jpg"), 'image/jpeg', quality);
    });
}

async function resizeImage() {
    await processTask("Resize", async () => {
        const file = document.getElementById('resizerInput').files[0];
        const width = parseInt(document.getElementById('resizeWidth').value);
        if (!file || !width) throw new Error("Missing file or width.");
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        const scale = width / img.width;
        canvas.width = width;
        canvas.height = img.height * scale;
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(b => triggerDownload(b, "resized.jpg"), 'image/jpeg');
    });
}

async function convertFile() {
    await processTask("Format Conversion", async () => {
        const file = document.getElementById('fileConvInput').files[0];
        const format = document.getElementById('fileToFormat').value;
        if (!file) throw new Error("No file selected.");
        const img = await loadImage(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width; canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        canvas.toBlob(b => triggerDownload(b, `converted.${format.split('/')[1]}`), format);
    });
}

// --- PDF & DOC TOOLS ---

async function mergePDFs() {
    await processTask("Merge PDF", async () => {
        const files = document.getElementById('mergeInput').files;
        if (files.length < 2) throw new Error("Select 2+ PDFs");
        const mergedPdf = await PDFLib.PDFDocument.create();
        for (let f of files) {
            const b = await f.arrayBuffer();
            const p = await PDFLib.PDFDocument.load(b);
            const pages = await mergedPdf.copyPages(p, p.getPageIndices());
            pages.forEach(pg => mergedPdf.addPage(pg));
        }
        const pdfBytes = await mergedPdf.save();
        triggerDownload(new Blob([pdfBytes], { type: 'application/pdf' }), "Merged.pdf");
    });
}

async function splitPDF() {
    await processTask("Split PDF", async () => {
        const file = document.getElementById('splitInput').files[0];
        const pageNum = parseInt(document.getElementById('splitPage').value) - 1;
        if (!file) throw new Error("No PDF selected.");
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFLib.PDFDocument.load(bytes);
        const newPdf = await PDFLib.PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [pageNum]);
        newPdf.addPage(page);
        const pdfBytes = await newPdf.save();
        triggerDownload(new Blob([pdfBytes]), "Split_Page.pdf");
    });
}

async function downloadPDF() {
    await processTask("Image to PDF", async () => {
        const file = document.getElementById('pdfImageInput').files[0];
        if (!file) throw new Error("No image selected.");
        const { jsPDF } = window.jspdf;
        const imgData = await new Promise(res => {
            const r = new FileReader(); r.onload = e => res(e.target.result); r.readAsDataURL(file);
        });
        const doc = new jsPDF();
        doc.addImage(imgData, 'JPEG', 10, 10, 190, 0);
        doc.save("Export.pdf");
    });
}

function downloadDocAsWord() {
    processTask("Word Export", () => {
        const content = quill.getText();
        triggerDownload(new Blob([content], { type: 'text/plain' }), "FlexTools_Doc.txt");
    });
}

// --- HELPERS (UNTOUCHED LOGIC) ---
function triggerDownload(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
}

function loadImage(file) {
    return new Promise(res => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => res(img);
    });
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }

function toggleCategory(header) {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.chevron');
    content.classList.toggle('show');
    if (chevron) chevron.classList.toggle('rotate');
}

function toggleFaq(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
    
    // Optional: Close other FAQs when one opens
    document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('active');
    });
}

