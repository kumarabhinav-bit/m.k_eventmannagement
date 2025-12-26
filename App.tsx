import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminInquiries from './pages/admin/Inquiries';
import AdminBookings from './pages/admin/Bookings';
import AdminServices from './pages/admin/ServicesManager';
import AdminGallery from './pages/admin/GalleryManager';
import AdminSettings from './pages/admin/Settings';
import AdminTestimonials from './pages/admin/TestimonialsManager';
import AdminAbout from './pages/admin/AboutManager';
import AdminTeam from './pages/admin/TeamManager';
import AdminFAQ from './pages/admin/FAQManager';
import AdminExport from './pages/admin/ExportManager';

// Mock Auth Guard
const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const PublicLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
    <FloatingButtons />
  </div>
);

const App: React.FC = () => {
  return (
    <AdminProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="faq" element={<AdminFAQ />} />
            <Route path="export" element={<AdminExport />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </Router>
    </AdminProvider>
  );
};

export default App;