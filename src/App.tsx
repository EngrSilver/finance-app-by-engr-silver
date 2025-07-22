import React from 'react';
import './App.css';
import home from '../public/assets/icons/nav-overview.svg';
import budg from '../public/assets/icons/nav-budgets.svg';
import trans from '../public/assets/icons/nav-transactions.svg';
import recur from '../public/assets/icons/nav-recurring-bills.svg';
import pots from '../public/assets/icons/nav-pots.svg';
import minimize from '../public/assets/icons/minimize-menu.svg';

type HeaderProps = {
  children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
function Aside() {
  return (
    <aside className="sidebar bg-amber-200">
      <div className="top-items">
        <Header>Finance</Header>
        <ul className="liste p-0">
          <li className="item active">
            <img
              src={home}
              alt="Home"
              style={{ width: '18px', height: '18px' }}
            />
            <label>Overview</label>
          </li>
          <li className="item">
            <img src={trans} alt="Budgets" />
            <label>Transaction</label>
          </li>
          <li className="item">
            <img src={budg} alt="Budgets" />
            <label>Budget</label>
          </li>
          <li className="item">
            <img src={pots} alt="Budgets" />
            <label>Pot</label>
          </li>
          <li className="item">
            <img src={recur} alt="Budgets" />
            <label>Recurring Bills</label>
          </li>
        </ul>
      </div>
      <div className="bottom-item">
        <ul className="liste p-0">
          <li className="item">
            <img
              src={minimize}
              alt="Home"
              style={{ width: '18px', height: '18px' }}
            />
            <label>Minimize menu</label>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function Bal({
  color,
  bgColor,
  amountColor,
}: {
  color?: string;
  bgColor?: string;
  amountColor?: string;
}) {
  const style: React.CSSProperties = {
    color: color,
    backgroundColor: bgColor,
    fontWeight: 'bold',
    width: '300px',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
  };

  return (
    <div className="balance p-4 rounded-lg" style={style}>
      <span style={{ color: color }}>Current Balance</span>
      <p
        className="text-xl font-bold"
        style={amountColor ? { color: amountColor } : {}}>
        {' '}
        $4,836.00
      </p>
    </div>
  );
}

function Main() {
  const styleForAllBalance: React.CSSProperties = {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '1rem',
    padding: '1rem',
  };

  return (
    <main className="main-bar bg-amber-300">
      <Header>Dashboard</Header>
      <div className="all-balance" style={styleForAllBalance}>
        <Bal color="white" bgColor="black" amountColor="white" />
        <Bal color="gray" bgColor="white" amountColor="black" />
        <Bal color="gray" bgColor="white" amountColor="black" />
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="app bg-amber-400">
      <Aside />
      <Main />
    </div>
  );
}
