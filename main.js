let quill;
const currencyData = { "USD": "US Dollar", "NGN": "Nigerian Naira", "EUR": "Euro", "GBP": "British Pound", "GHS": "Ghanaian Cedi", "KES": "Kenyan Shilling" };

window.onload = () => {
    const fromS = document.getElementById('fromCurrency');
    const toS = document.getElementById('toCurrency');
    for (const [code, name] of Object.entries(currencyData)) {
        fromS.add(new Option(name, code)); toS.add(new Option(name, code));
    }
    fromS.value = "USD"; toS.value = "NGN";
    quill = new Quill('#editor-container', { theme: 'snow' });

    const hash = window.location.hash.substring(1);
    if (hash) {
        const btn = Array.from(document.querySelectorAll('.nav-item')).find(b => b.innerText.toLowerCase().includes(hash));
        if (btn) showTool(hash, btn);
    }
};

function showTool(id, btn) {
    document.querySelectorAll('.tool-card').forEach(c => c.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    btn.classList.add('active');
    window.location.hash = id;
}

async function convertCurrency() {
    const amt = document.getElementById('currAmount').value;
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
    const res = document.getElementById('currResult');
    if (!amt) return;
    const response = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await response.json();
    const result = (amt * data.rates[to]).toLocaleString(undefined, {minimumFractionDigits: 2});
    res.style.display = "block";
    res.innerHTML = `${amt} ${from} = <span style="color:#10b981">${result} ${to}</span>`;
}

async function processImageToWord() {
    const file = document.getElementById('wordImageInput').files[0];
    const status = document.getElementById('ocrStatus');
    if (!file) return;
    status.innerText = "Scanning text...";
    const worker = await Tesseract.createWorker('eng');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();
    const doc = new docx.Document({ sections: [{ children: [new docx.Paragraph(text)] }] });
    docx.Packer.toBlob(doc).then(blob => {
        const link = document.createElement("a"); link.href = URL.createObjectURL(blob);
        link.download = "FlexTools_OCR.docx"; link.click(); status.innerText = "Done!";
    });
}

async function previewPDF() {
    const fileInput = document.getElementById('pdfEditInput');
    const text = document.getElementById('pdfTextToAdd').value || " ";
    const previewFrame = document.getElementById('pdfPreview');
    if (!fileInput.files[0]) return;
    const reader = new FileReader();
    reader.onload = async function() {
        const pdfDoc = await PDFLib.PDFDocument.load(new Uint8Array(this.result));
        const firstPage = pdfDoc.getPages()[0];
        firstPage.drawText(text, { x: 50, y: firstPage.getSize().height - 50, size: 25, color: PDFLib.rgb(0.14, 0.38, 0.92) });
        const pdfBytes = await pdfDoc.save();
        previewFrame.src = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    };
    reader.readAsArrayBuffer(fileInput.files[0]);
}

function downloadEditedPDF() {
    const src = document.getElementById('pdfPreview').src;
    if (!src) return alert("Upload PDF first");
    const link = document.createElement("a"); link.href = src; link.download = "FlexTools_Edited.pdf"; link.click();
}

function importWordFile(input) {
    const reader = new FileReader();
    reader.onload = (e) => {
        mammoth.convertToHtml({arrayBuffer: e.target.result}).then(res => quill.clipboard.dangerouslyPasteHTML(res.value));
    };
    reader.readAsArrayBuffer(input.files[0]);
}

function downloadDocAsWord() {
    const doc = new docx.Document({ sections: [{ children: [new docx.Paragraph(quill.getText())] }] });
    docx.Packer.toBlob(doc).then(blob => {
        const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "FlexTools.docx"; link.click();
    });
}

function downloadDocAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF(); doc.text(quill.getText(), 10, 10); doc.save("FlexTools.pdf");
}

function downloadPDF() {
    const file = document.getElementById('pdfImageInput').files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF(); pdf.addImage(e.target.result, 'JPEG', 15, 15, 180, 160); pdf.save("FlexTools_Image.pdf");
    };
    reader.readAsDataURL(file);
}
