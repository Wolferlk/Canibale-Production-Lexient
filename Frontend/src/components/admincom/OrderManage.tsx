import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { generateOrderPDF } from '../../utils/pdfGenerator'; // adjust path as needed
import { 
  FiEdit, 
  FiEye, 
  FiX, 
  FiFilter, 
  FiDollarSign, 
  FiPackage, 
  FiUser, 
  FiPhone, 
  FiMapPin, 
  FiShoppingCart,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiFileText
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

const OrderManage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [formData, setFormData] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [refresh]);

  useEffect(() => {
    let result = orders;
    
    if (filter !== "all") {
      result = result.filter(order => order.status === filter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.name.toLowerCase().includes(query) || 
        order.phone1.includes(query) ||
        order.address.toLowerCase().includes(query)
      );
    }
    
    setFilteredOrders(result);
  }, [filter, orders, searchQuery]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data.reverse());
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders.");
    }
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone1 || !formData.address || !formData.cartItems.length) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const finalOrderData = { ...formData };

    try {
      if (editingOrder && editingOrder.id) {
        await axios.put(
          `http://localhost:5000/api/orders/${editingOrder.id}`,
          finalOrderData
        );
        toast.success("Order updated successfully!");
        setRefresh(!refresh);
        setFormData(null);
        setEditingOrder(null);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error(
        `Error saving order: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setFormData(order);
    setEditingOrder(order);
  };

  const resetForm = () => {
    setFormData(null);
    setEditingOrder(null);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "cancelled":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const countOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status).length;
  };

const generateOrderPDF = async () => {
  if (!selectedOrder) return;

  // Create a new PDF document
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Simple professional colors
  const black = [0, 0, 0];
  const darkGray = [60, 60, 60];
  const lightGray = [150, 150, 150];
  const veryLightGray = [245, 245, 245];
  const white = [255, 255, 255];

  // Clean header
  doc.setFillColor(...black);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  // Company name - simple and bold
  doc.setTextColor(...white);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('CANNIBAL.CO', 20, 15);
  
  // Website and contact
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('cannibalco.com  |  +94 78 289 8993', 20, 25);
  
  // Invoice title - right aligned
  doc.setTextColor(...black);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth - 20, 55, { align: 'right' });
  
  // Simple line under invoice
  doc.setDrawColor(...black);
  doc.setLineWidth(1);
  doc.line(pageWidth - 60, 58, pageWidth - 20, 58);
  
  // Invoice details box - clean and minimal
  let yPos = 65;
  doc.setFillColor(...veryLightGray);
  doc.rect(pageWidth - 65, yPos, 50, 30, 'F');
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);
  doc.rect(pageWidth - 65, yPos, 50, 30);
  
  doc.setTextColor(...black);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice No:', pageWidth - 62, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(selectedOrder.odercid || selectedOrder._id?.slice(-8) || 'N/A', pageWidth - 62, yPos + 12);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Date:', pageWidth - 62, yPos + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(new Date(selectedOrder.createdAt || new Date()).toLocaleDateString(), pageWidth - 62, yPos + 24);
  
  // Status - simple badge
  yPos += 35;
  const statusColor = selectedOrder.status === 'completed' ? [34, 139, 34] : 
                     selectedOrder.status === 'cancelled' ? [220, 20, 60] : lightGray;
  
  doc.setFillColor(...statusColor);
  doc.rect(pageWidth - 45, yPos, 30, 8, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text(selectedOrder.status.toUpperCase(), pageWidth - 30, yPos + 5, { align: 'center' });
  
  // Company address - simple format
  yPos = 65;
  doc.setTextColor(...black);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('FROM:', 20, yPos);
  
  doc.setFontSize(11);
  doc.text('CANNIBAL.CO', 20, yPos + 8);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Suramya, Dewagoda, Madampe', 20, yPos + 16);
  doc.text('Ambalangoda, Sri Lanka', 20, yPos + 22);
  doc.text('Phone: +94 78 289 8993', 20, yPos + 30);
  doc.text('Web: cannibalco.com', 20, yPos + 36);
  
  // Customer section - clean box
  yPos += 50;
  doc.setFillColor(...veryLightGray);
  doc.rect(15, yPos, pageWidth - 30, 40, 'F');
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);
  doc.rect(15, yPos, pageWidth - 30, 40);
  
  // Customer header
  doc.setFillColor(...darkGray);
  doc.rect(15, yPos, pageWidth - 30, 8, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('BILL TO:', 20, yPos + 5);
  
  // Customer details - simple layout
  yPos += 12;
  doc.setTextColor(...black);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(selectedOrder.name, 20, yPos);
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Phone: ${selectedOrder.phone1}`, 20, yPos + 8);
  if (selectedOrder.phone2) {
    doc.text(`Alt Phone: ${selectedOrder.phone2}`, 20, yPos + 14);
    yPos += 6;
  }
  if (selectedOrder.email) {
    doc.text(`Email: ${selectedOrder.email}`, 20, yPos + 14);
    yPos += 6;
  }
  doc.text(`Address: ${selectedOrder.address}`, 20, yPos + 14);
  if (selectedOrder.city) {
    doc.text(`City: ${selectedOrder.city},${selectedOrder.district}`, 20, yPos + 20);
  }
  
  // Items table - clean and simple
  yPos += 35;
  
  // Table header
  doc.setFillColor(...darkGray);
  doc.rect(15, yPos, pageWidth - 30, 10, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('ORDER DETAILS', 20, yPos + 6);
  
  yPos += 15;
  
  // Simple table with autoTable
  const itemsTableData = selectedOrder.cartItems.map((item, index) => [
    (index + 1).toString(),
    item.productName,
    item.color || 'N/A',
    item.size || 'N/A',
    item.quantity.toString(),
    `LKR ${item.price.toFixed(2)}`,
    `LKR ${(item.price * item.quantity).toFixed(2)}`
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Product', 'Color', 'Size', 'Qty', 'Price', 'Total']],
    body: itemsTableData,
    theme: 'striped',
    headStyles: { 
      fillColor: [60, 60, 60],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [0, 0, 0]
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { cellWidth: 70 },
      2: { halign: 'center', cellWidth: 20 },
      3: { halign: 'center', cellWidth: 20 },
      4: { halign: 'center', cellWidth: 15 },
      5: { halign: 'right', cellWidth: 25 },
      6: { halign: 'right', cellWidth: 25, fontStyle: 'bold' }
    },
    margin: { left: 15, right: 15 }
  });
  
  // Simple totals section
  const totalsY = doc.lastAutoTable.finalY + 20;
  
  doc.setFillColor(...veryLightGray);
  doc.rect(pageWidth - 70, totalsY, 60, 35, 'F');
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);
  doc.rect(pageWidth - 70, totalsY, 60, 35);
  
  // Totals header
  doc.setFillColor(...darkGray);
  doc.rect(pageWidth - 70, totalsY, 60, 8, 'F');
  doc.setTextColor(...white);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL', pageWidth - 40, totalsY + 5, { align: 'center' });
  
  // Calculate totals
  const subtotal = selectedOrder.totalAmount || 0;
  const shipping = 350;
  const total = subtotal + shipping;
  
  doc.setTextColor(...black);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Subtotal:', pageWidth - 65, totalsY + 15);
  doc.text(`LKR ${subtotal.toFixed(2)}`, pageWidth - 15, totalsY + 15, { align: 'right' });
  
  doc.text('Shipping:', pageWidth - 65, totalsY + 22);
  doc.text(`LKR ${shipping.toFixed(2)}`, pageWidth - 15, totalsY + 22, { align: 'right' });
  
  // Total line
  doc.setDrawColor(...darkGray);
  doc.setLineWidth(0.5);
  doc.line(pageWidth - 65, totalsY + 25, pageWidth - 15, totalsY + 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL:', pageWidth - 65, totalsY + 32);
  doc.text(`LKR ${total.toFixed(2)}`, pageWidth - 15, totalsY + 32, { align: 'right' });
  
  // Simple footer
  const footerY = pageHeight - 30;
  
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.5);
  doc.line(20, footerY, pageWidth - 20, footerY);
  
  // Thank you message
  doc.setTextColor(...black);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you!', pageWidth / 2, footerY + 10, { align: 'center' });
  
  // Footer note
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...lightGray);
  doc.text('This invoice was generated electronically and is valid without signature.', pageWidth / 2, footerY + 18, { align: 'center' });
  
  // Save with clean filename
  const filename = `Invoice_${selectedOrder.odercid || selectedOrder._id?.slice(-8) || 'ORDER'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
  
  toast.success("Professional invoice generated successfully!");
};

  const totalOrders = orders.length;
  const completedOrders = countOrdersByStatus("completed");
  const pendingOrders = countOrdersByStatus("pending");
  const cancelledOrders = countOrdersByStatus("cancelled");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Panel: Order List */}
      <motion.div
        className="w-full lg:w-1/2 p-6 overflow-y-auto"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Order Dashboard</h1>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <FiFilter size={18} />
              </div>
            </div>
          </div>
          
          {/* Order Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
  {/* Total Orders */}
  <div 
    onClick={() => setFilter("all")}
    className={`p-3 rounded-lg cursor-pointer transition-all ${filter === "all" ? "bg-indigo-50 border-2 border-indigo-200" : "bg-white border border-gray-100 hover:border-indigo-100 shadow-xs"}`}
  >
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-md bg-indigo-100 text-indigo-600">
        <FiPackage size={18} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Total Orders</p>
        <p className="text-xl font-bold text-gray-800">{totalOrders}</p>
      </div>
    </div>
  </div>
  
  {/* Completed Orders */}
  <div 
    onClick={() => setFilter("completed")}
    className={`p-3 rounded-lg cursor-pointer transition-all ${filter === "completed" ? "bg-green-50 border-2 border-green-200" : "bg-white border border-gray-100 hover:border-green-100 shadow-xs"}`}
  >
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-md bg-green-100 text-green-600">
        <FiCheckCircle size={18} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Completed</p>
        <p className="text-xl font-bold text-gray-800">{completedOrders}</p>
      </div>
    </div>
  </div>
  
  {/* Pending Orders */}
  <div 
    onClick={() => setFilter("pending")}
    className={`p-3 rounded-lg cursor-pointer transition-all ${filter === "pending" ? "bg-amber-50 border-2 border-amber-200" : "bg-white border border-gray-100 hover:border-amber-100 shadow-xs"}`}
  >
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-md bg-amber-100 text-amber-600">
        <FiClock size={18} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Pending</p>
        <p className="text-xl font-bold text-gray-800">{pendingOrders}</p>
      </div>
    </div>
  </div>
  
  {/* Cancelled Orders */}
  <div 
    onClick={() => setFilter("cancelled")}
    className={`p-3 rounded-lg cursor-pointer transition-all ${filter === "cancelled" ? "bg-rose-50 border-2 border-rose-200" : "bg-white border border-gray-100 hover:border-rose-100 shadow-xs"}`}
  >
    <div className="flex items-center space-x-2">
      <div className="p-2 rounded-md bg-rose-100 text-rose-600">
        <FiXCircle size={18} />
      </div>
      <div>
        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Cancelled</p>
        <p className="text-xl font-bold text-gray-800">{cancelledOrders}</p>
      </div>
    </div>
  </div>
</div>
          
          {/* Order List with Scrollbar */}
<div className="h-96 overflow-y-visible pr-2">
  <div className="space-y-3">
    {filteredOrders.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <FiPackage size={48} className="mb-4" />
        <p>No orders found</p>
      </div>
    ) : (
      filteredOrders.map((order) => (
        <motion.div
          key={order.id}
          className={`p-4 rounded-xl cursor-pointer border-l-4 ${getStatusColor(order.status)} bg-white shadow-sm hover:shadow-md transition-all`}
          onClick={() => handleSelectOrder(order)}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <FiUser className="text-gray-400" />
                {order.name}
              </h2>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FiPhone className="text-gray-400" />
                {order.phone1}
              </p>
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <FiMapPin className="text-gray-400 mt-0.5" />
                <span className="flex-1">{order.address}</span>
              </p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <span className="text-sm font-medium text-gray-700">
                ${order.totalAmount?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </motion.div>
      ))
    )}
  </div>
</div>
        </div>
      </motion.div>

      {/* Right Panel: Order Details */}
      <AnimatePresence>
        
        {selectedOrder && (
          
          <motion.div
            className="fixed inset-0 lg:relative lg:w-1/2 bg-white lg:bg-gray-50 z-10 lg:z-0 p-6 overflow-y-auto shadow-xl lg:shadow-none"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="flex-1 space-y-6">
                {/* Customer Info Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiUser className="text-blue-500" />
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{formData.odercid}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Primary Phone</p>
                    <p className="font-medium">{formData.phone1}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Secondary Phone</p>
                    <p className="font-medium">{formData.phone2 || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Status</p>
                    <p className={`font-medium inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(formData.status)}`}>
                      {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium">Home : {formData.address}</p>
                    <p className="font-medium">City : {formData.city}</p>
                    <p className="font-medium">District : {formData.district}</p>
                  </div>
                </div>
                </div>
                
                {/* Order Summary Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiShoppingCart className="text-blue-500" />
                    Order Summary
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium">{formData.totalAmount?.toFixed(2) || "0.00"}</p>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium">350.00</p>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <p>Total</p>
                     <p>LKR {((formData.totalAmount || 0) + 350).toFixed(2)}</p>

                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={generateOrderPDF}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <FiFileText size={16} />
                  Report
                </button>
                <button
                  onClick={() => navigate(`/order-edit/${selectedOrder._id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <FiEdit size={16} />
                  Edit Order
                </button>
              </div>
                
                {/* Items List Card */}
                <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FiPackage className="text-blue-500" />
                    Ordered Items ({formData.cartItems.length})
                  </h3>
                  <div className="space-y-4">
                    {formData.cartItems.length > 0 ? (
                      formData.cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-start border-b pb-4 last:border-0">
                          <div className="flex space-x-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              <FiPackage className="text-gray-400" size={24} />
                            </div>
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-gray-500">Color: {item.color}</p>
                              <p className="text-sm text-gray-500">Size: {item.size}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-medium">
                            LKR {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">No items in this order</p>
                    )}
                  </div>
                </div>
                
              </div>
              
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State for Right Panel */}
      {!selectedOrder && (
        <motion.div 
          className="hidden lg:flex lg:w-1/2 items-center justify-center p-6 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <FiEye size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">Select an order</h3>
            <p className="text-gray-500 mt-1">Choose an order from the list to view details</p>
          </div>
        </motion.div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default OrderManage;
