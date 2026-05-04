import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LandingPage from './pages/LandingPage';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import CRM from './components/admin/CRM';
import Calendar from './components/admin/Calendar';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import LeadRadar from './components/admin/LeadRadar';
import Inventario from './components/admin/Inventario';
import Finanzas from './components/admin/Finanzas';
import Ajustes from './components/admin/Ajustes';
import Privacidad from './pages/Privacidad';
import Terminos from './pages/Terminos';

// Assets
const heroImage = '/Gemini_Generated_Image_cb7f6xcb7f6xcb7f.png';
const logo = '/logo.png';
const teamImage = '/happy-business-team-with-raised-hands-celebrating-their-success-in-the-office_1.jpg';
const sadImage = '/teenager-suffering-from-hangover.webp';
const happyImage = '/low-angle-happy-modern-man.webp';

const App = () => {
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Lado Público */}
        <Route path="/" element={
          <LandingPage 
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            setIsMenuOpen={setIsMenuOpen}
            isMenuOpen={isMenuOpen}
            logo={logo}
            heroImage={heroImage}
            sadImage={sadImage}
            happyImage={happyImage}
            teamImage={teamImage}
          />
        } />

        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/terminos" element={<Terminos />} />

        {/* Login Administrativo */}
        <Route path="/login-admin" element={<AdminLogin />} />

        {/* Panel Administrativo Protegido */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminLayout activeTab={activeAdminTab} setActiveTab={setActiveAdminTab}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="agenda" element={<Calendar />} />
                  <Route path="crm" element={<CRM />} />
                  <Route path="radar" element={<LeadRadar />} />
                  <Route path="inventario" element={<Inventario />} />
                  <Route path="finanzas" element={<Finanzas />} />
                  <Route path="ajustes" element={<Ajustes />} />
                  <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;