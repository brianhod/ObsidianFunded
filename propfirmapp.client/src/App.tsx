import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsAndConditions from './components/TermsAndConditions';
import Dashboard from './components/Dashboard';
import PurchaseEvaluation from './components/PurchaseEvaluation';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Registration';
import RiskManagementTool from './components/RiskManagementTool';
import RegistrationSuccessfulPage from './components/RegistrationSuccessful';
import TraderSupportCenter from './components/Support';
import TradingRules from './components/TradingRules';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/terms" element={<TermsAndConditions />} />
                    <Route path="/purchase" element={<PurchaseEvaluation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/risktools" element={<RiskManagementTool />} />
                    <Route path="/registrationdone" element={<RegistrationSuccessfulPage />} />
                    <Route path="/support" element={<TraderSupportCenter />} />
                    <Route path="/rules" element={<TradingRules />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};


export default App
