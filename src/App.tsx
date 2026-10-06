/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialServices, initialCareProducts, initialOrders, initialReviews, initialQueueSlots } from './data/mockData';
import { ServiceItem, CareProductItem, OrderItem, ReviewItem, QueueSlot, OrderStatus } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CatalogSection } from './components/CatalogSection';
import { LiveTrackingSection } from './components/LiveTrackingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AdminConsole } from './components/AdminConsole';
import { BookingModal } from './components/BookingModal';
import { DigitalReceiptModal } from './components/DigitalReceiptModal';
import { WhatsAppPreviewModal } from './components/WhatsAppPreviewModal';
import { FooterSection } from './components/FooterSection';
import { ShoeDiagnosticModal } from './components/ShoeDiagnosticModal';
import { FloatingWhatsAppWidget } from './components/FloatingWhatsAppWidget';
import { StaffAccessModal } from './components/StaffAccessModal';

export default function App() {
  // Persistence with localStorage
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('shoelab_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [careProducts, setCareProducts] = useState<CareProductItem[]>(() => {
    const saved = localStorage.getItem('shoelab_products');
    return saved ? JSON.parse(saved) : initialCareProducts;
  });

  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('shoelab_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('shoelab_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [queueSlots, setQueueSlots] = useState<QueueSlot[]>(() => {
    const saved = localStorage.getItem('shoelab_queues');
    return saved ? JSON.parse(saved) : initialQueueSlots;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('shoelab_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shoelab_products', JSON.stringify(careProducts));
  }, [careProducts]);

  useEffect(() => {
    localStorage.setItem('shoelab_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Clean Role & Portal Separation: 'customer' vs 'admin'
  const [currentView, setCurrentView] = useState<'customer' | 'admin'>('customer');
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);

  // Customer Modals
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<OrderItem | null>(null);
  const [activeWhatsAppState, setActiveWhatsAppState] = useState<{ order: OrderItem; targetStage?: OrderStatus } | null>(null);
  const [activeReviewOrder, setActiveReviewOrder] = useState<OrderItem | null>(null);

  // Selected Order for tracking
  const [trackedOrderNumber, setTrackedOrderNumber] = useState<string>('SC-2026-9411');

  // Active queue count
  const activeOrdersCount = orders.filter(o => o.status !== 'COMPLETED' && o.status !== 'CANCELLED').length;

  // Handlers
  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOrderCreated = (newOrder: OrderItem) => {
    setOrders(prev => [newOrder, ...prev]);
    // Decrease slot count
    setQueueSlots(prev => prev.map(slot => {
      if (slot.time === newOrder.scheduledTimeSlot) {
        return { ...slot, availableCount: Math.max(0, slot.availableCount - 1) };
      }
      return slot;
    }));
    setTrackedOrderNumber(newOrder.orderNumber);
  };

  const handleQuickTrack = (orderNumber: string) => {
    setTrackedOrderNumber(orderNumber);
    setCurrentView('customer');
    setTimeout(() => {
      const el = document.getElementById('tracking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const now = new Date();
    const formattedNow = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    let stageTitle = 'Pembaruan Status Pengerjaan';
    let stageDesc = 'Status pengerjaan diperbarui oleh tim operasional.';

    if (newStatus === 'SHOES_RECEIVED') {
      stageTitle = 'Sepatu Tiba di Workshop';
      stageDesc = 'Pemeriksaan fisik dan inspeksi material awal telah selesai dilakukan.';
    } else if (newStatus === 'IN_TREATMENT') {
      stageTitle = 'Treatment & Pencucian Dimulai';
      stageDesc = 'Teknisi sedang melakukan proses detailing dan treatment khusus.';
    } else if (newStatus === 'DRYING_DETAILING') {
      stageTitle = 'Ruang Pengeringan & QC';
      stageDesc = 'Sepatu dalam pengeringan suhu terkontrol dan pemberian lapisan deodorizer.';
    } else if (newStatus === 'READY_PICKUP_DELIVERY') {
      stageTitle = 'Selesai & Siap Diambil/Kirim';
      stageDesc = 'Sepatu telah 100% bersih, wangi, dan lolos uji Quality Control.';
    } else if (newStatus === 'COMPLETED') {
      stageTitle = 'Pengerjaan Tuntas';
      stageDesc = 'Sepatu telah diserahkan kembali kepada pelanggan dengan garansi 48 jam.';
    }

    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const newTimelineLog = {
        status: newStatus,
        title: stageTitle,
        description: stageDesc,
        timestamp: formattedNow,
        updatedBy: 'Bima Santoso (Head Master)'
      };

      const newWaLog = {
        timestamp: formattedNow,
        stage: newStatus,
        recipient: order.customer.whatsapp,
        messageSnippet: `Pembaruan status untuk pesanan ${order.orderNumber}: ${stageTitle}`
      };

      return {
        ...order,
        status: newStatus,
        timeline: [...order.timeline, newTimelineLog],
        waNotificationHistory: [...order.waNotificationHistory, newWaLog]
      };
    }));
  };

  const handleUpdateProductStock = (productId: string, newStock: number) => {
    setCareProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: newStock } : p));
  };

  const handleAddReview = (newRev: ReviewItem) => {
    setReviews(prev => [newRev, ...prev]);
  };

  const handleAddReviewReply = (reviewId: string, reply: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, replyFromAdmin: reply } : r));
  };

  const handleBuyProduct = (product: CareProductItem) => {
    const text = encodeURIComponent(
      `Halo CS ShoeLab Studio, saya ingin memesan produk perawatan sepatu:\n\n• Produk: *${product.name}*\n• Harga: *Rp ${product.price.toLocaleString('id-ID')}*\n• Spesifikasi: *${product.volumeOrSpec}*\n\nMohon info ketersediaan stok & pengiriman ke alamat saya. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* 
        ====================================================================
        MODE PELANGGAN (CUSTOMER PORTAL)
        ====================================================================
      */}
      {currentView === 'customer' ? (
        <>
          {/* Customer Navigation Bar */}
          <Navbar
            onOpenBooking={() => handleOpenBooking()}
            activeOrdersCount={activeOrdersCount}
            onQuickTrack={handleQuickTrack}
            onRequestAdminAccess={() => setIsStaffModalOpen(true)}
          />

          <main className="flex-1">
            {/* Hero Section */}
            <HeroBanner
              onOpenBooking={() => handleOpenBooking()}
              onQuickTrack={handleQuickTrack}
              activeOrdersCount={activeOrdersCount}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />

            {/* Live Tracking Section with Before-After Slider */}
            <LiveTrackingSection
              orders={orders}
              selectedOrderNumber={trackedOrderNumber}
              onOpenReceipt={(order) => setActiveReceiptOrder(order)}
              onOpenWhatsAppModal={(order) => setActiveWhatsAppState({ order })}
              onOpenReviewModal={(order) => setActiveReviewOrder(order)}
            />

            {/* Catalog Section with 13 Treatments & Care Products */}
            <CatalogSection
              services={services}
              careProducts={careProducts}
              onBookService={(srvId) => handleOpenBooking(srvId)}
              onBuyProduct={handleBuyProduct}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            />

            {/* Customer Reviews Section */}
            <ReviewsSection
              reviews={reviews}
              orders={orders}
              onAddReview={handleAddReview}
              openModalOrder={activeReviewOrder}
              isOpenReviewModal={!!activeReviewOrder}
              onCloseReviewModal={() => setActiveReviewOrder(null)}
            />
          </main>

          {/* Customer Footer */}
          <FooterSection onRequestAdminAccess={() => setIsStaffModalOpen(true)} />

          {/* Floating WhatsApp Live CS Concierge */}
          <FloatingWhatsAppWidget />
        </>
      ) : (
        /* 
          ====================================================================
          MODE ADMIN (DEDICATED BACKOFFICE WORKSHOP CONSOLE)
          ====================================================================
        */
        <AdminConsole
          orders={orders}
          services={services}
          careProducts={careProducts}
          reviews={reviews}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onOpenWhatsAppModal={(order, targetStage) => setActiveWhatsAppState({ order, targetStage })}
          onOpenReceipt={(order) => setActiveReceiptOrder(order)}
          onAddNewOrder={(newOrder) => setOrders(prev => [newOrder, ...prev])}
          onUpdateProductStock={handleUpdateProductStock}
          onAddReviewReply={handleAddReviewReply}
          onExitAdmin={() => setCurrentView('customer')}
        />
      )}

      {/* Staff Authentication PIN Gate Modal */}
      <StaffAccessModal
        isOpen={isStaffModalOpen}
        onClose={() => setIsStaffModalOpen(false)}
        onSuccessLogin={() => {
          setIsStaffModalOpen(false);
          setCurrentView('admin');
        }}
      />

      {/* Customer Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        services={services}
        careProducts={careProducts}
        queueSlots={queueSlots}
        onOrderCreated={handleOrderCreated}
        onViewReceipt={(order) => {
          setIsBookingOpen(false);
          setActiveReceiptOrder(order);
        }}
        onTrackOrder={(orderNumber) => {
          handleQuickTrack(orderNumber);
        }}
        preselectedServiceId={preselectedServiceId}
      />

      {/* Shoe Diagnostic & Price Calculator Modal */}
      <ShoeDiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        services={services}
        onSelectTreatment={(serviceId) => {
          setIsDiagnosticOpen(false);
          handleOpenBooking(serviceId);
        }}
      />

      {/* Digital Receipt / Invoice Modal */}
      <DigitalReceiptModal
        isOpen={!!activeReceiptOrder}
        onClose={() => setActiveReceiptOrder(null)}
        order={activeReceiptOrder}
      />

      {/* WhatsApp Message Preview & Direct Trigger Modal */}
      <WhatsAppPreviewModal
        isOpen={!!activeWhatsAppState}
        onClose={() => setActiveWhatsAppState(null)}
        order={activeWhatsAppState?.order || null}
        targetStage={activeWhatsAppState?.targetStage}
      />
    </div>
  );
}
