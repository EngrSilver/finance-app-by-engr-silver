import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './Home';
import Transaction from './componentPages/Transactions';
import AppLayout from './AppLayout';
import Budget from './componentPages/Budget';
import Pots from './componentPages/Pots';
import RecurringBills from './componentPages/RecurringBills';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="transaction-page" element={<Transaction />} />
          <Route path="budget-page" element={<Budget />} />
          <Route path="pots-page" element={<Pots />} />
          <Route path="recurringBills-page" element={<RecurringBills />} />
        </Route>
      </Routes>
    </Router>
  );
}
//outlett
