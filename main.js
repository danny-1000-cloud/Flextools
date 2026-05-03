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


// 1. Keep your original showTool function, but add ONE explicit line at the end.
function showTool(id, btn, isBoot = false) {
    if (!id) return;

    localStorage.setItem('activeTool', id); 
    window.location.hash = id;

    const displayTitle = id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    document.title = `${displayTitle} | FlexTools Pro`;

    document.querySelectorAll('.tool-card').forEach(card => card.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('active');
        if (!isBoot) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (btn) btn.classList.add('active');

    // 1. THE REUSE FIX: Explicitly shut the mobile menu
    if (!isBoot && window.innerWidth <= 900) {
        // If your sidebar uses a class like 'active' or 'open'
        const sidebar = document.querySelector('.sidebar') || document.querySelector('.nav-links');
        if (sidebar) {
            sidebar.classList.remove('active');
            sidebar.classList.remove('open');
        }

        // 2. THE DARKNESS FIX: Remove the overlay
        // Check if you have a div with a class like 'overlay', 'backdrop', or 'dimmer'
        const overlay = document.querySelector('.overlay') || document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.classList.remove('show');
            // If it's controlled by style:
            overlay.style.display = 'none';
        }

        // 3. Check if the "darkness" is actually on the <body> tag
        document.body.classList.remove('menu-open');
        document.body.classList.remove('sidebar-open');
        document.body.style.overflow = 'auto'; // Re-enable scrolling if it was locked
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
    const resultBox = document.getElementById('unitResult');
    let result = 0;
    let unit = "";

    if (isNaN(val)) {
        resultBox.innerHTML = "Please enter a valid number";
        return;
    }

    switch (type) {
        case "mToFt":
            result = val * 3.28084;
            unit = "ft";
            break;
        case "ftToM":
            result = val / 3.28084;
            unit = "m";
            break;
        case "kgToLb":
            result = val * 2.20462;
            unit = "lb";
            break;
        case "lbToKg":
            result = val / 2.20462;
            unit = "kg";
            break;
        case "cToF":
            result = (val * 9/5) + 32;
            unit = "°F";
            break;
        case "fToC":
            result = (val - 32) * 5/9;
            unit = "°C";
            break;
        case "mbToGb":
            result = val / 1024;
            unit = "GB";
            break;
        case "gbToMb":
            result = val * 1024;
            unit = "MB";
            break;
        case "kmToMiles":
            result = val * 0.621371;
            unit = "miles"; 
            break;
        case "milesToKm":
            result = val / 0.621371;
            unit = "km";
            break;
    }

    resultBox.innerHTML = `Result: ${result.toFixed(2)} ${unit}`;
}

// --- IMAGE PROCESSING TOOLS ---

async function processImageToWord() {
    await processTask("Image to Word", async () => {
        const file = document.getElementById('wordImageInput').files[0];
        if (!file) throw new Error("Select an image first.");

        // 1. Perform OCR
        const { data: { text } } = await Tesseract.recognize(file, 'eng');

        // 2. Display the text in a preview area instead of downloading
        const previewArea = document.getElementById('wordPreviewArea');
        const textField = document.getElementById('wordExtractedText');
        
        textField.value = text; // Put text in the box
        previewArea.style.display = 'block'; // Show the preview section
    });
}

// 3. New helper to download ONLY when the user is ready
function downloadProcessedWord() {
    const text = document.getElementById('wordExtractedText').value;
    triggerDownload(new Blob([text], { type: 'application/msword' }), "FlexTools_OCR.doc");
}

function copyToClipboard() {
    const text = document.getElementById('wordExtractedText');
    text.select();
    document.execCommand('copy');
    alert('Text copied to clipboard!');
}


let currentSourceImg = null;
let isProcessing = false;

/** 
 * Step 1: Initial load 
 */
async function initCompressor() {
    const input = document.getElementById('compressInput');
    if (!input || !input.files[0]) return;

    // Use the professional loader you already have in FlexTools Pro
    currentSourceImg = await loadImage(input.files[0]);
    
    // Reveal the hidden container
    document.getElementById('compressPreviewArea').style.display = 'block';
    
    compressImage(); 
}

/** 
 * Step 2: High-speed live preview 
 */
function compressImage() {
    const pct = document.getElementById('compressQuality').value;
    document.getElementById('qualityValue').innerText = pct + "%";

    if (!currentSourceImg || isProcessing) return;

    // Tell the browser to update when the screen is ready (Prevents lag)
    requestAnimationFrame(() => {
        isProcessing = true;

        const canvas = document.getElementById('previewCanvas');
        const ctx = canvas.getContext('2d');

        // Match resolution to image
        canvas.width = currentSourceImg.width;
        canvas.height = currentSourceImg.height;

        // Instant GPU-based draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentSourceImg, 0, 0);

        // Instant size estimation (fast math, no heavy blob creation)
        const estimatedSize = (currentSourceImg.src.length * (pct / 100) / 1024).toFixed(2);
        document.getElementById('sizeComparison').innerText = `Estimated Size: ~${estimatedSize} KB`;

        isProcessing = false;
    });
}

/** 
 * Step 3: Final heavy-lifting only on download 
 */
async function downloadCompressedImage() {
    const pct = document.getElementById('compressQuality').value;
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = currentSourceImg.width;
    offscreenCanvas.height = currentSourceImg.height;
    const ctx = offscreenCanvas.getContext('2d');
    ctx.drawImage(currentSourceImg, 0, 0);

    // Only create the heavy file when user clicks the button
    offscreenCanvas.toBlob((blob) => {
        triggerDownload(blob, "FlexTools_Compressed.jpg");
    }, 'image/jpeg', pct / 100);
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

let pdfBytes = null;
let pdfPageImage = null;
let textLayers = []; // Array to hold multiple text objects

async function initPDFEditor() {
    const file = document.getElementById('pdfEditInput').files[0];
    if (!file) return;

    document.getElementById('pdfControls').style.display = 'block';
    document.getElementById('pdfViewContainer').style.display = 'block';
    document.getElementById('pdfDownloadBtn').style.display = 'block';
    document.getElementById('layerContainer').style.display = 'block';

    pdfBytes = await file.arrayBuffer();
    
    // Render the PDF background
    const loadingTask = pdfjsLib.getDocument({data: pdfBytes});
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({scale: 1.5});
    
    const canvas = document.getElementById('pdfCanvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({canvasContext: context, viewport: viewport}).promise;
    
    pdfPageImage = new Image();
    pdfPageImage.src = canvas.toDataURL();
    pdfPageImage.onload = () => drawPreview();
}

function addTextLayer() {
    const textInput = document.getElementById('pdfTextToAdd');
    const x = document.getElementById('textX').value;
    const y = document.getElementById('textY').value;

    if (!textInput.value) return;

    // Add to our data array
    textLayers.push({
        content: textInput.value,
        x: parseInt(x),
        y: parseInt(y)
    });

    // Update the UI list
    const list = document.getElementById('layerList');
    const li = document.createElement('li');
    li.style = "background: #eee; margin-bottom: 5px; padding: 5px; border-radius: 4px; display: flex; justify-content: space-between;";
    li.innerHTML = `<span>"${textInput.value}" at ${x}, ${y}</span> <button onclick="removeLayer(${textLayers.length - 1})" style="color: red; border: none; background: none; cursor: pointer;">Delete</button>`;
    list.appendChild(li);

    textInput.value = ""; // Clear input for next text
    drawPreview();
}

function removeLayer(index) {
    textLayers.splice(index, 1);
    updateLayerListUI();
    drawPreview();
}

function updateLayerListUI() {
    const list = document.getElementById('layerList');
    list.innerHTML = "";
    textLayers.forEach((layer, i) => {
        const li = document.createElement('li');
        li.style = "background: #eee; margin-bottom: 5px; padding: 5px; border-radius: 4px; display: flex; justify-content: space-between;";
        li.innerHTML = `<span>"${layer.content}"</span> <button onclick="removeLayer(${i})" style="color: red; border: none; background: none;">Delete</button>`;
        list.appendChild(li);
    });
}

function drawPreview() {
    const canvas = document.getElementById('pdfCanvas');
    const ctx = canvas.getContext('2d');
    if (!pdfPageImage) return;

    // 1. Draw Background
    ctx.drawImage(pdfPageImage, 0, 0);

    // 2. Draw Current (unsaved) text in Blue so user sees it moving
    const currentText = document.getElementById('pdfTextToAdd').value;
    const currX = document.getElementById('textX').value;
    const currY = document.getElementById('textY').value;
    
    ctx.font = "24px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText(currentText, currX, currY);

    // 3. Draw all Saved Layers in Black
    ctx.fillStyle = "black";
    textLayers.forEach(layer => {
        ctx.fillText(layer.content, layer.x, layer.y);
    });
}

async function downloadEditedPDF() {
    const { PDFDocument, rgb } = PDFLib;
    const existingPdfDoc = await PDFDocument.load(pdfBytes);
    const firstPage = existingPdfDoc.getPages()[0];
    const { width, height } = firstPage.getSize();
    const canvas = document.getElementById('pdfCanvas');

    // Add every layer to the actual PDF
    for (const layer of textLayers) {
        firstPage.drawText(layer.content, {
            x: layer.x * (width / canvas.width),
            y: height - (layer.y * (height / canvas.height)),
            size: 20,
            color: rgb(0, 0, 0),
        });
    }

    const modifiedPdfBytes = await existingPdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    triggerDownload(blob, "FlexTools_Final.pdf");
}

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


function initDocEditor() {
    const container = document.getElementById('editor-container');
    
    // 1. Safety check: Does the container exist?
    if (!container) return;

    // 2. Check if a toolbar already exists inside the wrapper
    // Quill adds a div with class "ql-toolbar" above the container
    const existingToolbar = container.parentElement.querySelector('.ql-toolbar');
    
    if (existingToolbar || window.myQuillEditor) {
        console.log("Editor already exists. Skipping to avoid double toolbar.");
        return; 
    }

    // 3. Clear any "ghost" HTML inside the container just in case
    container.innerHTML = "";

    try {
        window.myQuillEditor = new Quill('#editor-container', {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['clean']
                ]
            }
        });
        console.log("Doc Editor initialized successfully.");
    } catch (err) {
        console.error("Quill Init Error:", err);
    }
}

// Call it on page load
window.addEventListener('load', initDocEditor);


// 2. Import .docx and convert to "Live" Editable Text
async function importWordFile(input) {
    const file = input.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    
    // Mammoth parses the Word file into clean HTML
    mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then(function(result) {
            quill.clipboard.dangerouslyPasteHTML(result.value);
        })
        .catch(function(err) {
            console.error(err);
            alert("Error: Could not read Word document.");
        });
}

// 3. Export the "Live" edits back to a real Word File
function downloadDocAsWord() {
    const content = quill.root.innerHTML;
    
    // Create a basic HTML document structure for the converter
    const htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="utf-8"></head>
        <body>${content}</body>
        </html>
    `;

    // Convert the editor content to a Word Blob
    const docxBlob = htmlDocx.asBlob(htmlString);
    
    // Use your existing download helper
    triggerDownload(docxBlob, "FlexTools_Edited.docx");
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


window.addEventListener('hashchange', () => {
    const id = window.location.hash.replace('#', '');
    if (id) {
        const targetBtn = document.querySelector(`[onclick*="'${id}'"]`);
        showTool(id, targetBtn, false);
    }
});