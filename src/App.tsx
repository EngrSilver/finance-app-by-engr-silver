import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Transaction from './Transactions';
import AppLayout from './AppLayout';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="transaction-page" element={<Transaction />} />
        </Route>
      </Routes>
    </Router>
  );
}
//outlett
