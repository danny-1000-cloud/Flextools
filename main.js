let quill;

// --- UPDATED WORLD CURRENCY LIST ---
const currencyData = {
    "USD": "US Dollar",
    "CAD": "Canadian Dollar",
    "BRL": "Brazilian Real",
    "MXN": "Mexican Peso",
    "ARS": "Argentine Peso",
    "EUR": "Euro",
    "GBP": "British Pound",
    "CHF": "Swiss Franc",
    "RUB": "Russian Ruble",
    "TRY": "Turkish Lira",
    "SEK": "Swedish Krona",
    "NGN": "Nigerian Naira",
    "GHS": "Ghanaian Cedi",
    "ZAR": "South African Rand",
    "KES": "Kenyan Shilling",
    "EGP": "Egyptian Pound",
    "MAD": "Moroccan Dirham",
    "JPY": "Japanese Yen",
    "CNY": "Chinese Yuan",
    "INR": "Indian Rupee",
    "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",
    "KRW": "South Korean Won",
    "SGD": "Singapore Dollar",
    "ILS": "Israeli Shekel",
    "AUD": "Australian Dollar",
    "NZD": "New Zealand Dollar"
};

window.onload = () => {
    const fromS = document.getElementById('fromCurrency');
    const toS = document.getElementById('toCurrency');
    if(fromS) {
        for (const [code, name] of Object.entries(currencyData)) {
            fromS.add(new Option(name, code)); 
            toS.add(new Option(name, code));
        }
        fromS.value = "USD"; toS.value = "NGN";
    }
    quill = new Quill('#editor-container', { theme: 'snow' });
};

function showTool(id, btn) {
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    window.location.hash = id;
}

// --- NEW TOOLS (UNTOUCHED) ---
async function mergePDFs() {
    const files = document.getElementById('mergeInput').files;
    if (files.length < 2) return alert("Select 2+ PDFs");
    const mergedPdf = await PDFLib.PDFDocument.create();
    for (let f of files) {
        const b = await f.arrayBuffer();
        const p = await PDFLib.PDFDocument.load(b);
        const pages = await mergedPdf.copyPages(p, p.getPageIndices());
        pages.forEach(pg => mergedPdf.addPage(pg));
    }
    const pdfBytes = await mergedPdf.save();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = "Merged_FlexTools.pdf"; link.click();
}

function compressImage() {
    const file = document.getElementById('compressInput').files[0];
    const quality = parseFloat(document.getElementById('compressQuality').value);
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        const img = new Image(); img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width; canvas.height = img.height;
            canvas.getContext('2d').drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = "compressed.jpg"; link.click();
            }, 'image/jpeg', quality);
        };
    };
}

function convertUnits() {
    const val = parseFloat(document.getElementById('unitValue').value);
    const type = document.getElementById('unitType').value;
    const res = document.getElementById('unitResult');
    let out = (type === "length") ? `${val}m = ${(val * 3.28).toFixed(2)}ft` : `${val}kg = ${(val * 2.2).toFixed(2)}lb`;
    res.style.display = "block"; res.innerHTML = `<strong>${out}</strong>`;
}

// --- ORIGINAL LOGIC RESTORED & WORKING ---
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
        console.error("Currency Error:", error);
        res.innerHTML = "Error fetching rates.";
    }
}

// [Rest of your OCR, PDF Edit, Doc Import logic remains here exactly as provided]