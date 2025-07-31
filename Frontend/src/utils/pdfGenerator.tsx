// src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { toast } from 'react-hot-toast';

// Modify this to accept selectedOrder as a parameter
export const generatereportPDF = async () => {
  if (!selectedOrder) return;

  // Create a new PDF document
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Define grayscale colors for professional B&W design
  const black = [0, 0, 0];
  const darkGray = [64, 64, 64];
  const mediumGray = [128, 128, 128];
  const lightGray = [192, 192, 192];
  const veryLightGray = [240, 240, 240];
  const white = [255, 255, 255];

  // Add sophisticated border frame
  doc.setDrawColor(...black);
  doc.setLineWidth(2);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
  
  // Inner decorative border
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Header section with geometric design
  doc.setFillColor(...black);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  // Add diagonal design elements
  doc.setFillColor(...darkGray);
  doc.triangle(0, 0, 60, 0, 0, 40);
  doc.triangle(pageWidth, 0, pageWidth - 60, 0, pageWidth, 40);
  
  // Logo placeholder (you can replace with actual logo loading)
  doc.setFillColor(...white);
  doc.circle(30, 20, 12, 'F');
  doc.setDrawColor(...black);
  doc.setLineWidth(1);
  doc.circle(30, 20, 12);
  
  // Company name with sophisticated typography
  doc.setTextColor(...white);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('CANNIBAL.CO', 50, 18);
  
  // Subtitle
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('PREMIUM FASHION & LIFESTYLE', 50, 25);
  
  // Contact info in header
  doc.setFontSize(7);
  doc.text('+9478 289 8993  |  www.cannibal.co', 50, 32);
  
  // Invoice title with decorative elements
  doc.setTextColor(...black);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth - 15, 60, { align: 'right' });
  
  // Decorative line under invoice
  doc.setDrawColor(...black);
  doc.setLineWidth(2);
  doc.line(pageWidth - 60, 62, pageWidth - 15, 62);
  
  // Invoice number with stylized box
  let yPos = 70;
  doc.setFillColor(...veryLightGray);
  doc.roundedRect(pageWidth - 70, yPos, 55, 25, 2, 2, 'F');
  doc.setDrawColor(...black);
  doc.setLineWidth(0.5);
  doc.roundedRect(pageWidth - 70, yPos, 55, 25, 2, 2);
  
  doc.setTextColor(...black);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE NO.', pageWidth - 67, yPos + 5);
  doc.setFontSize(10);
  doc.text(selectedOrder.odercid || selectedOrder._id?.slice(-8) || 'N/A', pageWidth - 67, yPos + 12);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('DATE:', pageWidth - 67, yPos + 18);
  doc.text(new Date(selectedOrder.createdAt || new Date()).toLocaleDateString(), pageWidth - 67, yPos + 22);
  
  // Status badge with professional styling
  yPos += 30;
  const statusColors = {
    'pending': lightGray,
    'completed': darkGray,
    'cancelled': mediumGray
  };
  
  doc.setFillColor(...(statusColors[selectedOrder.status] || lightGray));
  doc.roundedRect(pageWidth - 50, yPos, 35, 8, 2, 2, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(selectedOrder.status.toUpperCase(), pageWidth - 32, yPos + 5, { align: 'center' });
  
  // Company address section
  yPos = 70;
  doc.setTextColor(...black);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('FROM:', 15, yPos);
  
  doc.setFontSize(12);
  doc.text('CANNIBAL.CO', 15, yPos + 8);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const addressLines = [
    'Suramya, Dewagoda, Madampe,',
    'Ambalangoda, Sri Lanka',
    '',
    'Phone: +9478 289 8993',
    'Web: www.cannibal.co'
  ];
  
  addressLines.forEach((line, index) => {
    doc.text(line, 15, yPos + 15 + (index * 5));
  });
  
  // Customer section with elegant styling
  yPos += 50;
  
  // Customer info box
  doc.setFillColor(...veryLightGray);
  doc.roundedRect(12, yPos, pageWidth - 24, 45, 3, 3, 'F');
  doc.setDrawColor(...darkGray);
  doc.setLineWidth(0.5);
  doc.roundedRect(12, yPos, pageWidth - 24, 45, 3, 3);
  
  // Customer header
  doc.setFillColor(...black);
  doc.rect(12, yPos, pageWidth - 24, 8, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', 17, yPos + 5);
  
  // Customer details
  yPos += 12;
  doc.setTextColor(...black);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(selectedOrder.name.toUpperCase(), 17, yPos);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  
  const customerDetails = [
    `Phone: ${selectedOrder.phone1}`,
    selectedOrder.phone2 ? `Alt Phone: ${selectedOrder.phone2}` : '',
    selectedOrder.email ? `Email: ${selectedOrder.email}` : '',
    `Address: ${selectedOrder.address}`,
    selectedOrder.city ? `City: ${selectedOrder.city}` : '',
    selectedOrder.district ? `District: ${selectedOrder.district}` : ''
  ].filter(detail => detail !== '');
  
  customerDetails.forEach((detail, index) => {
    doc.text(detail, 17, yPos + 6 + (index * 4));
  });
  
  // Items section with sophisticated table
  yPos += 55;
  
  // Items header
  doc.setFillColor(...black);
  doc.rect(12, yPos, pageWidth - 24, 10, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('ORDER DETAILS', 17, yPos + 6);
  
  yPos += 15;
  
  // Professional items table
  const itemsTableData = selectedOrder.cartItems.map((item, index) => [
    String(index + 1).padStart(2, '0'),
    item.productName.toUpperCase(),
    item.color?.toUpperCase() || 'N/A',
    item.size?.toUpperCase() || 'N/A',
    item.quantity.toString(),
    `$${item.price.toFixed(2)}`,
    `$${(item.price * item.quantity).toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'PRODUCT', 'COLOR', 'SIZE', 'QTY', 'PRICE', 'TOTAL']],
    body: itemsTableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [0, 0, 0],
      cellPadding: 3
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 12 },
      1: { cellWidth: 70, fontStyle: 'bold' },
      2: { halign: 'center', cellWidth: 20 },
      3: { halign: 'center', cellWidth: 20 },
      4: { halign: 'center', cellWidth: 15 },
      5: { halign: 'right', cellWidth: 25 },
      6: { halign: 'right', cellWidth: 25, fontStyle: 'bold' }
    },
    margin: { left: 12, right: 12 },
    tableLineColor: [0, 0, 0],
    tableLineWidth: 0.5
  });
  
  // Elegant totals section
  const totalsY = doc.lastAutoTable.finalY + 15;
  
  // Totals box with sophisticated design
  doc.setFillColor(...veryLightGray);
  doc.roundedRect(pageWidth - 85, totalsY, 75, 40, 3, 3, 'F');
  doc.setDrawColor(...black);
  doc.setLineWidth(1);
  doc.roundedRect(pageWidth - 85, totalsY, 75, 40, 3, 3);
  
  // Totals header
  doc.setFillColor(...black);
  doc.rect(pageWidth - 85, totalsY, 75, 8, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('SUMMARY', pageWidth - 47, totalsY + 5, { align: 'center' });
  
  // Calculate totals
  const subtotal = selectedOrder.totalAmount || 0;
  const discount = 0; // You can make this dynamic
  const shipping = 0; // You can make this dynamic
  const total = subtotal - discount + shipping;
  
  const totalsData = [
    ['Subtotal:', `$${subtotal.toFixed(2)}`],
    ['Discount:', discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00'],
    ['Shipping:', `$${shipping.toFixed(2)}`],
    ['TOTAL:', `$${total.toFixed(2)}`]
  ];
  
  doc.setTextColor(...black);
  totalsData.forEach(([label, amount], index) => {
    const itemY = totalsY + 12 + (index * 6);
    const isTotal = index === 3;
    
    doc.setFontSize(isTotal ? 10 : 8);
    doc.setFont('helvetica', isTotal ? 'bold' : 'normal');
    doc.text(label, pageWidth - 80, itemY);
    doc.text(amount, pageWidth - 15, itemY, { align: 'right' });
    
    if (index === 2) {
      // Add line before total
      doc.setDrawColor(...black);
      doc.setLineWidth(0.5);
      doc.line(pageWidth - 80, itemY + 2, pageWidth - 15, itemY + 2);
    }
  });
  
  // Footer with sophisticated design
  const footerY = pageHeight - 40;
  
  // Footer border
  doc.setDrawColor(...black);
  doc.setLineWidth(0.5);
  doc.line(15, footerY, pageWidth - 15, footerY);
  
  // Thank you message
  doc.setTextColor(...black);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('THANK YOU FOR YOUR BUSINESS', pageWidth / 2, footerY + 10, { align: 'center' });
  
  // Footer details
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('This is a computer generated invoice and does not require a signature.', pageWidth / 2, footerY + 18, { align: 'center' });
  
  // Terms and conditions
  doc.setFontSize(6);
  doc.setTextColor(...mediumGray);
  doc.text('Terms & Conditions: All sales are final. Returns accepted within 7 days with original receipt.', pageWidth / 2, footerY + 24, { align: 'center' });
  
  // Page footer
  doc.setFontSize(6);
  doc.text(`Generated: ${new Date().toLocaleString()} | Page 1 of 1`, pageWidth / 2, pageHeight - 15, { align: 'center' });
  
  // Save with professional filename
  const filename = `CANNIBAL_Invoice_${selectedOrder.odercid || selectedOrder._id?.slice(-8) || 'ORDER'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
  
  toast.success("Professional B&W invoice generated successfully!");
};
