import React, { useRef, useState, useEffect } from 'react';
import { addTextToPdf } from './AddTextToPdf'; // Adjust the path if necessary

const PdfForm = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  const formData = {
    name: 'John Doe',
    date: '2024-06-20',
    eventName: 'Cameron\'s 18th Birthday',
    // Add more fields as needed
  };

  useEffect(() => {
    const populatePdf = async () => {
      try {
        const blobUrl = await addTextToPdf('/MinDAVenueReservationForm.pdf', formData); // Correct path
        setPdfUrl(blobUrl);
      } catch (error) {
        console.error('Error populating PDF:', error);
      }
    };

    populatePdf();
  }, []);

  const handlePrint = async () => {
    if (pdfUrl) {
      const newWindow = window.open(pdfUrl, '_blank');
      if (newWindow) {
        newWindow.onload = () => {
          newWindow.print();
        };
      } else {
        console.error('Failed to open new window/tab');
      }
    }
  };

  return (
    <div>
      <button onClick={handlePrint}>Print PDF Form</button>
    </div>
  );
};

export default PdfForm;