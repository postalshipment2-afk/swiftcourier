// import { useRef } from "react";
// import { X, Download, Package } from "lucide-react";

// interface ReceiptProps {
//   data: any;
//   onClose: () => void;
// }

// export function Receipt({ data, onClose }: ReceiptProps) {
//   const receiptRef = useRef<HTMLDivElement>(null);

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
//           <h2 className="text-2xl">Shipment Receipt</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={handlePrint}
//               className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//             >
//               <Download className="w-4 h-4" />
//               Print/Save
//             </button>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-md transition-colors"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div ref={receiptRef} className="p-8 relative">
//           <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
//             <div className="transform -rotate-45">
//               <p className="text-8xl font-bold text-green-600">PAID</p>
//             </div>
//           </div>

//           <div className="relative z-10">
//             <div className="text-center mb-8 border-b pb-6">
//               <div className="flex justify-center mb-4">
//                 <Package className="w-16 h-16 text-blue-600" />
//               </div>
//               <h1 className="text-3xl mb-2">Surepath Logistics ltd</h1>
//               <p className="text-gray-600">
//                 International Logistics & Delivery Services
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 123 Logistics Ave, Shipping District, NY 10001
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-8 mb-8">
//               <div>
//                 <h3 className="font-semibold text-lg mb-3 text-blue-600">
//                   Receipt Information
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <p>
//                     <span className="font-medium">Receipt #:</span> RCP-
//                     {data.id}
//                   </p>
//                   <p>
//                     <span className="font-medium">Tracking #:</span>{" "}
//                     {data.tracking_number}
//                   </p>
//                   <p>
//                     <span className="font-medium">Date:</span>{" "}
//                     {new Date(data.created_at).toLocaleDateString()}
//                   </p>
//                   <p>
//                     <span className="font-medium">Time:</span>{" "}
//                     {new Date(data.created_at).toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-3 text-blue-600">
//                   Status
//                 </h3>
//                 <div className="space-y-2 text-sm">
//                   <p>
//                     <span className="font-medium">Current Status:</span>{" "}
//                     {data.status.replace("_", " ").toUpperCase()}
//                   </p>
//                   <p>
//                     <span className="font-medium">Payment Status:</span>{" "}
//                     <span className="text-green-600 font-semibold">PAID</span>
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-8 mb-8">
//               <div className="border rounded-lg p-4 bg-gray-50">
//                 <h3 className="font-semibold text-lg mb-3">Sender Details</h3>
//                 <div className="space-y-2 text-sm">
//                   <p>
//                     <span className="font-medium">Name:</span>{" "}
//                     {data.sender_name}
//                   </p>
//                   <p>
//                     <span className="font-medium">Email:</span>{" "}
//                     {data.sender_email}
//                   </p>
//                   <p>
//                     <span className="font-medium">Phone:</span>{" "}
//                     {data.sender_phone}
//                   </p>
//                   <p>
//                     <span className="font-medium">Address:</span>{" "}
//                     {data.sender_address}
//                   </p>
//                   <p>
//                     <span className="font-medium">City:</span>{" "}
//                     {data.sender_city}
//                   </p>
//                   <p>
//                     <span className="font-medium">Country:</span>{" "}
//                     {data.sender_country}
//                   </p>
//                 </div>
//               </div>

//               <div className="border rounded-lg p-4 bg-gray-50">
//                 <h3 className="font-semibold text-lg mb-3">Receiver Details</h3>
//                 <div className="space-y-2 text-sm">
//                   <p>
//                     <span className="font-medium">Name:</span>{" "}
//                     {data.receiver_name}
//                   </p>
//                   <p>
//                     <span className="font-medium">Email:</span>{" "}
//                     {data.receiver_email}
//                   </p>
//                   <p>
//                     <span className="font-medium">Phone:</span>{" "}
//                     {data.receiver_phone}
//                   </p>
//                   <p>
//                     <span className="font-medium">Address:</span>{" "}
//                     {data.receiver_address}
//                   </p>
//                   <p>
//                     <span className="font-medium">City:</span>{" "}
//                     {data.receiver_city}
//                   </p>
//                   <p>
//                     <span className="font-medium">Country:</span>{" "}
//                     {data.receiver_country}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 mb-8 bg-blue-50">
//               <h3 className="font-semibold text-lg mb-3">
//                 Package Information
//               </h3>
//               <div className="space-y-2 text-sm">
//                 <p>
//                   <span className="font-medium">Description:</span>{" "}
//                   {data.package_description}
//                 </p>
//                 <p>
//                   <span className="font-medium">Weight:</span>{" "}
//                   {data.package_weight} kg
//                 </p>
//                 {data.current_location && (
//                   <p>
//                     <span className="font-medium">Current Location:</span>{" "}
//                     {data.current_location}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className="border-t pt-6">
//               <div className="text-center text-sm text-gray-600 space-y-2">
//                 <p className="font-semibold text-green-600 text-lg mb-4">
//                   ✓ Payment Confirmed
//                 </p>
//                 <p>
//                   This is an official receipt for your shipment registration.
//                 </p>
//                 <p>
//                   For tracking and support, visit www.surepath-logistics.com or
//                   call +1 (413) 217-0381
//                 </p>
//                 <p className="mt-4 font-medium">
//                   Thank you for choosing Surepath Logistics!
//                 </p>
//               </div>
//             </div>

//             <div className="mt-8 text-center text-xs text-gray-500">
//               <p>
//                 This receipt is computer-generated and valid without signature.
//               </p>
//               <p className="mt-1">
//                 © {new Date().getFullYear()} Surepath Logistics ltd. All rights
//                 reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @media print {
//           body * {
//             visibility: ;
//           }
//           ${receiptRef.current ? `#${receiptRef.current.id}` : ".receipt-content"},
//           ${receiptRef.current ? `#${receiptRef.current.id}` : ".receipt-content"} * {
//             visibility: visible;
//           }
//           ${receiptRef.current ? `#${receiptRef.current.id}` : ".receipt-content"} {
//             position: absolute;
//             left: 0;
//             top: 0;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// import { useRef, useState } from "react";
// import { X, Download, Package, Loader2 } from "lucide-react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// interface ReceiptProps {
//   data: any;
//   onClose: () => void;
// }

// export function Receipt({ data, onClose }: ReceiptProps) {
//   const receiptRef = useRef<HTMLDivElement>(null);
//   const [isDownloading, setIsDownloading] = useState(false);

//   // Hex codes only - no oklch allowed here
//   const style = {
//     orange: "#f97316",
//     orangeLight: "#fff7ed",
//     green: "#16a34a",
//     greenLight: "#f0fdf4",
//     gray900: "#111827",
//     gray500: "#6b7280",
//     gray100: "#f3f4f6",
//     gray50: "#f9fafb",
//     white: "#ffffff",
//     border: "#e5e7eb",
//   };

//   const handleDownloadPDF = async () => {
//     if (!receiptRef.current) return;

//     setIsDownloading(true);
//     try {
//       const element = receiptRef.current;

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: style.white,
//         logging: false,
//         // THE CRITICAL FIX: This removes Tailwind's oklch-filled stylesheets
//         // from the temporary clone so the parser doesn't crash.
//         onclone: (clonedDoc) => {
//           const styleSheets = Array.from(clonedDoc.styleSheets);
//           styleSheets.forEach((sheet) => {
//             try {
//               if (
//                 sheet.href === null ||
//                 sheet.href.includes(window.location.hostname)
//               ) {
//                 sheet.disabled = true; // Disable all internal styles
//               }
//             } catch (e) {
//               console.log("Could not disable stylesheet", e);
//             }
//           });
//         },
//       });

//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });

//       const imgWidth = 210;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save(`Receipt-${data.tracking_number}.pdf`);
//     } catch (error) {
//       console.error("Capture Error:", error);
//       alert(
//         "Format compatibility error. Please try again or use a different browser.",
//       );
//     } finally {
//       setIsDownloading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden flex flex-col">
//         {/* Header (Not in PDF) */}
//         <div className="bg-white border-b px-6 py-4 flex justify-between items-center shrink-0">
//           <div>
//             <h2 className="text-xl font-bold text-gray-800">
//               Shipment Receipt
//             </h2>
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={handleDownloadPDF}
//               disabled={isDownloading}
//               style={{ backgroundColor: style.orange, color: style.white }}
//               className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:opacity-90 disabled:opacity-50"
//             >
//               {isDownloading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <Download className="w-4 h-4" />
//               )}
//               {isDownloading ? "Generating..." : "Download PDF"}
//             </button>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         {/* Scrollable Receipt Area */}
//         <div className="overflow-y-auto flex-1 bg-gray-50 p-4 sm:p-8">
//           <div
//             ref={receiptRef}
//             style={{
//               backgroundColor: style.white,
//               color: style.gray900,
//               fontFamily: "Arial, sans-serif",
//               width: "100%",
//               maxWidth: "650px",
//               margin: "0 auto",
//               padding: "40px",
//               border: `1px solid ${style.gray100}`,
//               position: "relative",
//             }}
//           >
//             {/* Watermark */}
//             <div
//               style={{
//                 position: "absolute",
//                 inset: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 pointerEvents: "none",
//                 overflow: "hidden",
//               }}
//             >
//               <div style={{ transform: "rotate(-35deg)", opacity: 0.1 }}>
//                 <p
//                   style={{
//                     color: style.green,
//                     fontSize: "100px",
//                     fontWeight: "900",
//                     border: `8px solid ${style.green}`,
//                     padding: "10px 30px",
//                     borderRadius: "20px",
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   PAID
//                 </p>
//               </div>
//             </div>

//             <div style={{ position: "relative", zIndex: 10 }}>
//               {/* Branding */}
//               <div
//                 style={{
//                   textAlign: "center",
//                   marginBottom: "40px",
//                   borderBottom: `2px solid ${style.gray50}`,
//                   paddingBottom: "30px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor: style.orangeLight,
//                       padding: "16px",
//                       borderRadius: "16px",
//                     }}
//                   >
//                     <Package
//                       style={{
//                         color: style.orange,
//                         width: "48px",
//                         height: "48px",
//                       }}
//                     />
//                   </div>
//                 </div>
//                 <h1
//                   style={{
//                     fontSize: "24px",
//                     fontWeight: "900",
//                     margin: 0,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Surepath Logistics Ltd
//                 </h1>
//                 <p
//                   style={{
//                     color: style.orange,
//                     fontWeight: "bold",
//                     fontSize: "14px",
//                     margin: "4px 0",
//                   }}
//                 >
//                   International Logistics & Delivery Services
//                 </p>
//                 <p style={{ color: style.gray500, fontSize: "10px" }}>
//                   123 LOGISTICS AVE, NY 10001 | SUPPORT: +1 (413) 217-0381
//                 </p>
//               </div>

//               {/* Info Grid */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "40px",
//                   marginBottom: "40px",
//                 }}
//               >
//                 <div>
//                   <h3
//                     style={{
//                       color: style.orange,
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       textTransform: "uppercase",
//                       marginBottom: "12px",
//                     }}
//                   >
//                     Receipt Details
//                   </h3>
//                   <div style={{ fontSize: "14px" }}>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         borderBottom: `1px solid ${style.gray50}`,
//                         padding: "4px 0",
//                       }}
//                     >
//                       <span style={{ color: style.gray500 }}>Tracking:</span>
//                       <span style={{ fontWeight: "bold" }}>
//                         {data.tracking_number}
//                       </span>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         borderBottom: `1px solid ${style.gray50}`,
//                         padding: "4px 0",
//                       }}
//                     >
//                       <span style={{ color: style.gray500 }}>Date:</span>
//                       <span>
//                         {new Date(data.created_at).toLocaleDateString()}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "8px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       backgroundColor: style.orangeLight,
//                       color: style.orange,
//                       padding: "8px",
//                       borderRadius: "4px",
//                       textAlign: "center",
//                       fontSize: "12px",
//                       fontWeight: "bold",
//                       border: `1px solid ${style.orange}`,
//                     }}
//                   >
//                     {data.status?.replace("_", " ")}
//                   </div>
//                   <div
//                     style={{
//                       backgroundColor: style.greenLight,
//                       color: style.green,
//                       padding: "8px",
//                       borderRadius: "4px",
//                       textAlign: "center",
//                       fontSize: "12px",
//                       fontWeight: "900",
//                       border: `1px solid ${style.green}`,
//                     }}
//                   >
//                     FULLY PAID
//                   </div>
//                 </div>
//               </div>

//               {/* Addresses */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: "20px",
//                   marginBottom: "40px",
//                 }}
//               >
//                 <div
//                   style={{
//                     backgroundColor: style.gray50,
//                     padding: "20px",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   <h4
//                     style={{
//                       color: style.orange,
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       borderBottom: `1px solid ${style.border}`,
//                       paddingBottom: "4px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     SENDER
//                   </h4>
//                   <p
//                     style={{ fontWeight: "bold", fontSize: "14px", margin: 0 }}
//                   >
//                     {data.sender_name}
//                   </p>
//                   <p
//                     style={{
//                       color: style.gray500,
//                       fontSize: "12px",
//                       margin: "4px 0",
//                     }}
//                   >
//                     {data.sender_address}, {data.sender_city}
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     backgroundColor: style.gray50,
//                     padding: "20px",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   <h4
//                     style={{
//                       color: style.orange,
//                       fontSize: "14px",
//                       fontWeight: "bold",
//                       borderBottom: `1px solid ${style.border}`,
//                       paddingBottom: "4px",
//                       marginBottom: "8px",
//                     }}
//                   >
//                     RECEIVER
//                   </h4>
//                   <p
//                     style={{ fontWeight: "bold", fontSize: "14px", margin: 0 }}
//                   >
//                     {data.receiver_name}
//                   </p>
//                   <p
//                     style={{
//                       color: style.gray500,
//                       fontSize: "12px",
//                       margin: "4px 0",
//                     }}
//                   >
//                     {data.receiver_address}, {data.receiver_city}
//                   </p>
//                 </div>
//               </div>

//               {/* Package Specs */}
//               <div
//                 style={{
//                   border: `2px dashed ${style.border}`,
//                   borderRadius: "12px",
//                   padding: "20px",
//                   marginBottom: "40px",
//                 }}
//               >
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div>
//                     <p
//                       style={{
//                         color: style.gray500,
//                         fontSize: "10px",
//                         fontWeight: "bold",
//                         margin: 0,
//                       }}
//                     >
//                       WEIGHT
//                     </p>
//                     <p
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: "bold",
//                         margin: 0,
//                       }}
//                     >
//                       {data.package_weight} KG
//                     </p>
//                   </div>
//                   <div style={{ textAlign: "right" }}>
//                     <p
//                       style={{
//                         color: style.gray500,
//                         fontSize: "10px",
//                         fontWeight: "bold",
//                         margin: 0,
//                       }}
//                     >
//                       CONTENTS
//                     </p>
//                     <p
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "bold",
//                         margin: 0,
//                       }}
//                     >
//                       {data.package_description || "Parcel"}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Footer */}
//               <div
//                 style={{
//                   textAlign: "center",
//                   borderTop: `1px solid ${style.gray50}`,
//                   paddingTop: "20px",
//                 }}
//               >
//                 <p style={{ color: style.gray500, fontSize: "9px", margin: 0 }}>
//                   © {new Date().getFullYear()} SUREPATH LOGISTICS LTD. SYSTEM
//                   GENERATED RECEIPT.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useRef, useState } from "react";
import { X, Download, Package, Loader2, ShieldCheck } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ReceiptProps {
  data: any;
  onClose: () => void;
}

export function Receipt({ data, onClose }: ReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const hex = {
    brand: "#f97316",
    navy: "#0f172a",
    navyLight: "#475569",
    gray100: "#f1f5f9",
    white: "#ffffff",
    seal: "#1d4ed8",
    sig: "#171717",
    paid: "#16a34a",
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2, // Scale 2 is safer for alignment stability than 3
        useCORS: true,
        backgroundColor: hex.white,
        onclone: (clonedDoc) => {
          const styleSheets = Array.from(clonedDoc.styleSheets);
          styleSheets.forEach((sheet) => {
            try {
              if (
                sheet.href === null ||
                sheet.href.includes(window.location.hostname)
              ) {
                sheet.disabled = true;
              }
            } catch (e) {}
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save(`Surepath_Receipt_${data.tracking_number}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b px-8 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-orange-600" />
            <span className="font-bold text-slate-800">
              Official Document Preview
            </span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              style={{ backgroundColor: hex.brand }}
              className="px-6 py-2 text-white font-bold rounded-full flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isDownloading ? "Processing..." : "Download PDF"}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrolling Preview Container */}
        <div className="overflow-y-auto flex-1 bg-slate-100 p-4 sm:p-10">
          {/* THE DOCUMENT - FORCED A4 RATIO (800px x 1132px) */}
          <div
            ref={receiptRef}
            style={{
              backgroundColor: hex.white,
              color: hex.navy,
              fontFamily: "Arial, sans-serif",
              width: "800px",
              height: "1132px",
              margin: "0 auto",
              padding: "60px",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            {/* BACKGROUND WATERMARK (Centered and balanced) */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-30deg)",
                zIndex: 0,
                opacity: 0.04,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  fontSize: "180px",
                  fontWeight: "900",
                  color: hex.paid,
                  border: `20px solid ${hex.paid}`,
                  padding: "20px 80px",
                  borderRadius: "40px",
                }}
              >
                PAID
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* HEADER AREA */}
              <div
                style={{
                  width: "100%",
                  marginBottom: "50px",
                  overflow: "hidden",
                }}
              >
                <div style={{ float: "left", width: "60%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Package
                      style={{
                        color: hex.brand,
                        width: "40px",
                        height: "40px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: "900",
                        color: hex.navy,
                        textTransform: "uppercase",
                      }}
                    >
                      Surepath
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "2px 0 0 52px",
                      fontSize: "11px",
                      fontWeight: "bold",
                      color: hex.brand,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Logistics Limited
                  </p>
                </div>
                <div
                  style={{ float: "right", width: "40%", textAlign: "right" }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "300",
                      margin: 0,
                      color: hex.navyLight,
                      textTransform: "uppercase",
                    }}
                  >
                    Shipment Receipt
                  </h2>
                  <p
                    style={{
                      margin: "5px 0",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    TRK: {data.tracking_number}
                  </p>
                </div>
                <div style={{ clear: "both" }}></div>
              </div>

              <div
                style={{
                  height: "4px",
                  backgroundColor: hex.brand,
                  width: "60px",
                  marginBottom: "40px",
                }}
              ></div>

              {/* ADDRESS AREA (Using percentage widths for perfect alignment) */}
              <div
                style={{
                  width: "100%",
                  marginBottom: "60px",
                  overflow: "hidden",
                }}
              >
                <div style={{ float: "left", width: "45%" }}>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: hex.brand,
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${hex.gray100}`,
                      paddingBottom: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    Sender
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0 0 5px 0",
                    }}
                  >
                    {data.sender_name}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: hex.navyLight,
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    {data.sender_address},<br />
                    {data.sender_city}, {data.sender_country}
                  </p>
                </div>
                <div style={{ float: "right", width: "45%" }}>
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: hex.brand,
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${hex.gray100}`,
                      paddingBottom: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    Receiver
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      margin: "0 0 5px 0",
                    }}
                  >
                    {data.receiver_name}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: hex.navyLight,
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    {data.receiver_address},<br />
                    {data.receiver_city}, {data.receiver_country}
                  </p>
                </div>
                <div style={{ clear: "both" }}></div>
              </div>

              {/* TABLE AREA */}
              <div
                style={{
                  width: "100%",
                  border: `1px solid ${hex.gray100}`,
                  borderRadius: "8px",
                  marginBottom: "60px",
                }}
              >
                <div
                  style={{
                    backgroundColor: hex.navy,
                    color: hex.white,
                    padding: "12px 25px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ float: "left" }}>ITEM DESCRIPTION</div>
                  <div style={{ float: "right" }}>WEIGHT</div>
                </div>
                <div style={{ padding: "30px 25px", overflow: "hidden" }}>
                  <div style={{ float: "left", width: "70%" }}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "0 0 5px 0",
                      }}
                    >
                      {data.package_description || "General Parcel"}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: hex.navyLight,
                        margin: 0,
                      }}
                    >
                      Certified Shipment Transaction
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: hex.brand,
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Date: {new Date(data.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    style={{ float: "right", width: "25%", textAlign: "right" }}
                  >
                    <p
                      style={{ fontSize: "32px", fontWeight: "900", margin: 0 }}
                    >
                      {data.package_weight}{" "}
                      <span style={{ fontSize: "16px", color: hex.brand }}>
                        KG
                      </span>
                    </p>
                  </div>
                  <div style={{ clear: "both" }}></div>
                </div>
              </div>

              {/* SIGNATURE & SEAL AREA */}
              <div
                style={{
                  width: "100%",
                  marginTop: "80px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* SEAL (Positioned absolutely so it doesn't push the signature) */}
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    bottom: "0",
                    width: "130px",
                    height: "130px",
                    border: `3px double ${hex.seal}`,
                    borderRadius: "50%",
                    transform: "rotate(-15deg)",
                    opacity: 0.6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: hex.seal,
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: "bold" }}>
                    SUREPATH
                  </span>
                  <div
                    style={{
                      height: "1px",
                      width: "70%",
                      backgroundColor: hex.seal,
                      margin: "3px 0",
                    }}
                  ></div>
                  <span style={{ fontSize: "14px", fontWeight: "900" }}>
                    OFFICIAL
                  </span>
                  <div
                    style={{
                      height: "1px",
                      width: "70%",
                      backgroundColor: hex.seal,
                      margin: "3px 0",
                    }}
                  ></div>
                  <span style={{ fontSize: "9px", fontWeight: "bold" }}>
                    VERIFIED
                  </span>
                </div>

                {/* SIGNATURE (Floated right) */}
                <div
                  style={{ float: "right", width: "240px", textAlign: "right" }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      color: hex.navyLight,
                      textTransform: "uppercase",
                      marginBottom: "5px",
                    }}
                  >
                    Authorized Signature
                  </p>
                  <div
                    style={{
                      borderBottom: `2px solid ${hex.navy}`,
                      height: "50px",
                      position: "relative",
                      marginBottom: "10px",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                        fontSize: "32px",
                        fontFamily: "cursive",
                        color: hex.sig,
                        opacity: 0.8,
                      }}
                    >
                      M. Anderson
                    </span>
                  </div>
                  <p
                    style={{ fontSize: "14px", fontWeight: "bold", margin: 0 }}
                  >
                    Mark Anderson
                  </p>
                  <p
                    style={{
                      fontSize: "10px",
                      color: hex.navyLight,
                      margin: 0,
                    }}
                  >
                    Document Controller
                  </p>
                </div>
              </div>

              {/* FOOTER */}
              <div
                style={{
                  // position: "absolute",
                  bottom: "20px",
                  width: "100%",
                  textAlign: "center",
                  borderTop: `1px solid ${hex.gray100}`,
                  paddingTop: "15px",
                  marginTop: "100px",
                }}
              >
                <p
                  style={{ fontSize: "10px", color: hex.navyLight, margin: 0 }}
                >
                  © {new Date().getFullYear()} Surepath Logistics Ltd. |
                  Document ID: {data.id?.toString().slice(-10).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
