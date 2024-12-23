import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/common/AuthProvider';
import DesktopLayout from './components/DesktopLayout';
import MobileLayout from './components/MobileLayout';
import LoginForm from './components/auth/LoginForm';
import ErrorBoundary from './components/common/ErrorBoundary';

const AppContent: React.FC = () => {
  const { session, loading } = useAuth();
  const isMobile = window.innerWidth <= 768;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      {!session ? (
        <LoginForm />
      ) : (
        isMobile ? (
          <MobileLayout />
        ) : (
          <Routes>
            <Route path="/*" element={<DesktopLayout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )
      )}
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;