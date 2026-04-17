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
    // 1. DATA INIT (Currency & Editor)
    const fromS = document.getElementById('fromCurrency');
    const toS = document.getElementById('toCurrency');
    if (fromS && toS && typeof currencyData !== 'undefined') {
        for (const [code, name] of Object.entries(currencyData)) {
            fromS.add(new Option(name, code)); 
            toS.add(new Option(name, code));
        }
        fromS.value = "USD"; toS.value = "NGN";
    }

    if (document.getElementById('editor-container') && typeof Quill !== 'undefined') {
        quill = new Quill('#editor-container', { theme: 'snow' });
    }

    function initRefresher() {
    if (typeof PullToRefresh === 'undefined') return;

    PullToRefresh.init({
        mainElement: 'body', 
        onRefresh() {
            window.location.reload();
        },
        distThreshold: 60,
        distMax: 90,
        shouldPullToRefresh: () => !window.scrollY, // Only pull if at the very top
        instructionsPullToRefresh: 'Pull to refresh FlexTools',
        instructionsReleaseToRefresh: 'Release to update',
        refreshTimeout: 500
    });
}

// Call this inside your window.onload

    // 2. SMART ROUTING WITH SAFETY FALLBACK
    // Try to find a saved tool; if none, default to 'currency'
    let activeTool = localStorage.getItem('activeTool') || 
                     window.location.hash.replace('#', '') || 
                     'currency';

    // Verify the tool actually exists in your HTML
    let targetCard = document.getElementById(activeTool);
    
    // SAFETY CHECK: If the saved tool is missing or broken, force currency
    if (!targetCard) {
        activeTool = 'currency';
        targetCard = document.getElementById('currency');
    }

    // 3. UI RESTORATION
    const targetBtn = document.querySelector(`[onclick*="'${activeTool}'"]`);
    
    if (targetBtn) {
        // Auto-expand the folder
        const parentCategory = targetBtn.closest('.group-content');
        if (parentCategory) {
            parentCategory.classList.add('show'); 
            const chevron = parentCategory.parentElement.querySelector('.chevron');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
    }
    
    // Final Launch
    showTool(activeTool, targetBtn, true); 
};

function showTool(id, btn, isBoot = false) {
    if (!id) return;

    // --- SAVE TO MEMORY (CRITICAL) ---
    localStorage.setItem('activeTool', id); 

    // Remove active class from all tool cards and buttons
    document.querySelectorAll('.tool-card').forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    // Activate the selected tool card
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        // Smooth scroll to top on mobile so they see the tool
        if (!isBoot) window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Highlight the button in the sidebar
    if (btn) btn.classList.add('active');

    // Close sidebar on mobile ONLY if this wasn't an automatic boot-up
    if (!isBoot && window.innerWidth <= 900) {
        if (typeof toggleSidebar === 'function') toggleSidebar();
    }
}


function toggleCategory(header) {
    const content = header.nextElementSibling;
    const chevron = header.querySelector('.chevron');
    
    // 1. Close other folders
    document.querySelectorAll('.group-content').forEach(other => {
        if (other !== content) {
            other.classList.remove('show');
            const c = other.parentElement.querySelector('.chevron');
            if (c) c.style.transform = 'rotate(0deg)';
        }
    });

    // 2. Toggle current folder
    content.classList.toggle('show');
    
    // 3. Apply rotation (matches your version)
    if (chevron) {
        chevron.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
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
            res.innerHTML = `${amt} ${from} = <span style="color:#22c55e">${result} ${to}</span>`;
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

// 4. SIDEBAR TOGGLE
function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.querySelector('.sidebar-overlay');
    if (sb) sb.classList.toggle('open');
    if (ov) ov.classList.toggle('active');
}

function toggleFaq(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
    
    // Optional: Close other FAQs when one opens
    document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('active');
    });
}

