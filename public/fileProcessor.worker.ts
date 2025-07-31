declare let self: Worker;

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// The worker needs to know where to find the pdf.worker.js file.
// @ts-ignore
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

self.onmessage = async (e) => {
  const { file, fileId } = e.data;

  try {
    let extractedText = "";
    const fileData = await file.arrayBuffer();

    switch (file.type) {
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
      fileId,
      content: extractedText,
    });
  } catch (error: any) {
    self.postMessage({
      type: "error",
      fileId,
      error: error.message,
    });
  }
};

export {};
