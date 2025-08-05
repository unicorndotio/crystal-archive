declare let self: Worker;

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// The worker needs to know where to find the pdf.worker.js file.
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.54/build/pdf.worker.mjs`;

self.onmessage = async (e) => {
  const { file, record } = e.data;

  try {
    let extractedText = "";
    const fileData = await file.arrayBuffer();

    switch (record.type) {
      case "text/plain":
        extractedText = new TextDecoder().decode(fileData);
        break;

      case "application/pdf":
        const pdf = await pdfjsLib.getDocument({ data: fileData }).promise;
        const pages = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          pages.push(content.items.map((item: any) => item.str).join(" "));
        }
        extractedText = pages.join("\n");
        break;

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        const result = await mammoth.extractRawText({ arrayBuffer: fileData });
        extractedText = result.value;
        break;
    }

    self.postMessage({
      type: "processed",
      file: record,
      content: extractedText,
    });
  } catch (error: any) {
    self.postMessage({
      type: "error",
      file: record,
      error: error.message,
    });
  }
};

export {};
