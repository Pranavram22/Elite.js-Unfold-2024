import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TaskManagement from './pages/TaskManagement';
import FinancialManagement from './pages/FinancialManagement';
import CustomerSupport from './pages/CustomerSupport';
import DigitalPayments from './pages/DigitalPayments';
import SmartContracts from './pages/SmartContracts';
import Reports from './pages/Reports';
import Team from './pages/Team';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/finance" element={<FinancialManagement />} />
          <Route path="/support" element={<CustomerSupport />} />
          <Route path="/payments" element={<DigitalPayments />} />
          <Route path="/contracts" element={<SmartContracts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;