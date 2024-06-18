import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const addTextToPdf = async (formUrl, formData) => {
  try {
    // Fetch the existing PDF
    const existingPdfBytes = await fetch(formUrl).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch PDF: ${res.statusText}`);
      }
      return res.arrayBuffer();
    });

    // Load the existing PDF into pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Get the first page of the document
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Define the text positions and content
    const textSpecs = [
      { text: formData.name, x: 408, y: 634, size: 11 },
      { text: formData.date, x: 115, y: 664, size: 11 },
      { text: formData.time, x: 115, y: 664, size: 11 },
      { text: formData.eventName, x: 115, y: 695, size: 11 },
      { text: formData.noOfPax, x: 115, y: 695, size: 11 },
      { text: formData.location, x: 115, y: 695, size: 11 },
      { text: formData.roomType, x: 115, y: 695, size: 11 },
      { text: formData.seatingArrangement, x: 115, y: 695, size: 11 },
      { text: formData.stagingNeeds, x: 115, y: 695, size: 11 },
      { text: formData.foodArrangement, x: 115, y: 695, size: 11 },
      { text: formData.remarks, x: 115, y: 695, size: 11 },
      { text: formData.utility, x: 115, y: 695, size: 11 },
      // Add more text specifications as needed
    ];

    // Draw the text on the PDF
    textSpecs.forEach(spec => {
      firstPage.drawText(spec.text, {
        x: spec.x,
        y: spec.y,
        size: spec.size,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
    });

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Create a Blob URL
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    // Return the Blob URL
    return blobUrl;
  } catch (error) {
    console.error('Error processing PDF:', error);
    throw error;
  }
};