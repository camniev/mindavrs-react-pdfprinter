import React, { useRef, useState, useEffect } from 'react';
import { addTextToPdf } from './AddTextToPdf'; // Adjust the path if necessary

const PdfForm = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  const formData = {
    name: 'John Doe',
    date: 'June 20, 2024',
    time: '1:00 - 5:00 p.m.',
    eventName: 'Cameron\'s 18th Birthday',
    noOfPax: '200',
    location: 'BIMP-EAGA Conference Hall (14th Floor)',
    roomType: 'BIMP-EAGA Conference Hall (14th Floor)',
    seatingArrangement: 'Herringbone',
    stagingNeeds: 'Theatre',
    foodArrangement: 'Buffet Service',
    remarks: 'Provider will be Waling Waling Acacia',
    utility: 'Amy, Jhong',
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