import { useState } from 'react';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import './App.css';
import home from '../public/assets/icons/nav-overview.svg';
import budg from '../public/assets/icons/nav-budgets.svg';
import trans from '../public/assets/icons/nav-transactions.svg';
import recur from '../public/assets/icons/nav-recurring-bills.svg';
import pots from '../public/assets/icons/nav-pots.svg';
import { MdOutlineArrowRight } from 'react-icons/md';

const menuItems = [
  {
    icon: home,
    alt: 'Home',
    label: 'Overview',
  },
  {
    icon: trans,
    alt: 'Transaction',
    label: 'Transaction',
  },
  {
    icon: budg,
    alt: 'Budget',
    label: 'Budget',
  },
  {
    icon: pots,
    alt: 'Pot',
    label: 'Pot',
  },
  {
    icon: recur,
    alt: 'Recurring Bills',
    label: 'Recurring Bills',
  },
];

const TransactionUser = [
  {
    image: 'https://i.pravatar.cc/48',
    name: 'Emmanuel Richardson',
    amount: '+$100.00',
    date: 'Sep 19, 2024',
    id: crypto.randomUUID(),
  },
  {
    image: 'https://i.pravatar.cc/48',
    name: 'Jane Doe',
    amount: '-$50.00',
    date: 'Sep 20, 2024',
    id: crypto.randomUUID(),
  },
  {
    image: 'https://i.pravatar.cc/48',
    name: 'John Smith',
    amount: '+$200.00',
    date: 'Sep 21, 2024',
    id: crypto.randomUUID(),
  },
  {
    image: 'https://i.pravatar.cc/48',
    name: 'Alice Johnson',
    amount: '-$75.00',
    date: 'Sep 22, 2024',
    id: crypto.randomUUID(),
  },
];

type HeaderProps = {
  children: React.ReactNode;
};

function Header({ children }: HeaderProps) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}

function Aside() {
  const [minimized, setMinimized] = useState(false);

  const handleClick = () => {
    setMinimized(!minimized);
  };

  return (
    <aside className={`sidebar ${minimized ? 'minimized' : ''}`}>
      <div className="top-items">
        <Header>{minimized ? 'f' : 'finance'}</Header>
        <ul className="liste p-0">
          {menuItems.map((item, index) => {
            return (
              <li className={`item ${index === 0 ? 'active' : ''}`} key={index}>
                <img
                  src={item.icon}
                  alt={item.alt}
                  style={{ fill: 'purple', width: '20px', height: '20px' }}
                />
                {
                  <label
                    className={`sidebar-list-text ${minimized ? 'hide' : ''}`}>
                    {item.label}
                  </label>
                }
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bottom-item">
        <ul className="liste p-0">
          <li className="item" onClick={() => handleClick()}>
            {minimized ? <FaArrowCircleLeft /> : <FaArrowCircleRight />}
            <label className="sidebar-list-text">
              {minimized ? '' : 'minimize'}
            </label>
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
    width: '250px',
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

function Pots() {
  return (
    <div className="pots">
      <div className="pots-header flex">
        <h3>Pots</h3>
        <div className="flex align-center see-details">
          <p>see details</p>
          <MdOutlineArrowRight />
        </div>
      </div>
      <div className="pots-body">
        <div className="pots-section-one">
          <img src={pots} alt="" style={{ width: '25px' }} />
          <div>
            <p className="total-saved">Total Saved</p>
            <h2 className="total-saved-amount">$1,000</h2>
          </div>
        </div>
        <div className="section-two">
          <div className="pot-values" style={{ borderLeft: '3px solid gray' }}>
            <p className="pot-name">Total Saved</p>
            <h2 className="pot-amount">$1,000</h2>
          </div>
          <div
            className="pot-values"
            style={{ borderLeft: '3px solid purple' }}>
            <p className="pot-name">Total Saved</p>
            <h2 className="pot-amount">$1,000</h2>
          </div>
          <div className="pot-values" style={{ borderLeft: '3px solid green' }}>
            <p className="pot-name">Total Saved</p>
            <h2 className="pot-amount">$1,000</h2>
          </div>
          <div className="pot-values" style={{ borderLeft: '3px solid red' }}>
            <p className="pot-name">Total Saved</p>
            <h2 className="pot-amount">$1,000</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllHeader({
  children,
  heading,
  button,
}: {
  children: React.ReactNode;
  heading: string;
  button: string;
}) {
  return (
    <div className="all-header transactions-header flex">
      <h2>{heading}</h2>
      <div className="flex align-center see-details">
        <p>{button}</p>
        {children}
      </div>
    </div>
  );
}

function Transactions() {
  return (
    <div className="transactions">
      <AllHeader heading="Transactions" button="see details">
        <FaArrowCircleRight />
      </AllHeader>
      <div className="transaction-body">
        {TransactionUser.map((user) => (
          <div className="transaction-item" key={user.id}>
            <div className="transaction-item-left">
              <div className="user-image-container">
                <img className="user-image" src={user.image} alt={user.name} />
              </div>
              <p>{user.name}</p>
            </div>
            <div className="transaction-item-right">
              <p className="transaction-amount">{user.amount}</p>
              <p className="transaction-date">{user.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Budget() {
  return (
    <div>
      <h1>this is budget</h1>
    </div>
  );
}
function Recurring() {
  return (
    <div>
      <h1>this is recur</h1>
    </div>
  );
}

function Main() {
  const styleForAllBalance: React.CSSProperties = {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 'px',
    padding: '1rem',
  };
  const style: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '1em',
    gridTemplateColumns: 'repeat(2, 1fr)',
  };

  return (
    <main className="main-bar ">
      <Header>Dashboard</Header>
      <div className="all-balance" style={styleForAllBalance}>
        <Bal color="white" bgColor="black" amountColor="white" />
        <Bal color="gray" bgColor="white" amountColor="black" />
        <Bal color="gray" bgColor="white" amountColor="black" />
      </div>
      <div className="left-right grid" style={style}>
        <div className="pots-trsn left">
          <Pots />
          <Transactions />
        </div>
        <div className="budget-recurr">
          <Budget />
          <Recurring />
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="app">
      <Aside />
      <Main />
    </div>
  );
}
