
import React from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import TermsAndConditions from './components/TermsAndConditions';
import Dashboard from './components/Dashboard';
import PurchaseEvaluation from './components/PurchaseEvaluation';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/purchase" element={<PurchaseEvaluation />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
