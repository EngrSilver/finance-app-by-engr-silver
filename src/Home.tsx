import { useState, useEffect } from 'react';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import './App.css';
import home from '../public/assets/icons/nav-overview.svg';
import budg from '../public/assets/icons/nav-budgets.svg';
import trans from '../public/assets/icons/nav-transactions.svg';
import recur from '../public/assets/icons/nav-recurring-bills.svg';
import pots from '../public/assets/icons/nav-pots.svg';
import { MdOutlineArrowRight } from 'react-icons/md';
import PieChart from './PieChart';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    icon: home,
    alt: 'Home',
    label: 'Overview',
    path: '',
  },
  {
    icon: trans,
    alt: 'Transaction',
    label: 'Transaction',
    path: 'transaction-page',
  },
  {
    icon: budg,
    alt: 'Budget',
    label: 'Budget',
    path: 'budget-page',
  },
  {
    icon: pots,
    alt: 'Pot',
    label: 'Pot',
    path: 'pots-page',
  },
  {
    icon: recur,
    alt: 'Recurring Bills',
    label: 'Recurring Bills',
    path: 'recurringBills-page',
  },
];

const TransactionUser = [
  (() => {
    const id = crypto.randomUUID();
    return {
      image: `https://i.pravatar.cc/48?u=${id}`,
      name: 'Emmanuel Richardson',
      amount: '+$100.00',
      date: 'Sep 19, 2024',
      id,
    };
  })(),
  (() => {
    const id = crypto.randomUUID();
    return {
      image: `https://i.pravatar.cc/48?u=${id}`,
      name: 'Jane Doe',
      amount: '-$50.00',
      date: 'Sep 20, 2024',
      id,
    };
  })(),
  (() => {
    const id = crypto.randomUUID();
    return {
      image: `https://i.pravatar.cc/48?u=${id}`,
      name: 'John Smith',
      amount: '+$200.00',
      date: 'Sep 21, 2024',
      id,
    };
  })(),
  (() => {
    const id = crypto.randomUUID();
    return {
      image: `https://i.pravatar.cc/48?u=${id}`,
      name: 'Alice Johnson',
      amount: '-$75.00',
      date: 'Sep 22, 2024',
      id,
    };
  })(),
];

export function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

type HeaderProps = {
  children: React.ReactNode;
};
//                                                            HEADER COMPONENT

function Header({ children }: HeaderProps) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
//                                                            SIDEBAR COMPONENT

export function Aside({
  isMobile,
  minimized,
  setMinimized,
}: {
  isMobile?: boolean;
  minimized?: boolean;
  setMinimized?: (value: boolean) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = () => {
    setMinimized?.(!minimized);
  };

  return (
    <aside className={`sidebar ${minimized ? 'minimized' : ''}`}>
      <div className="top-items">
        {!isMobile && <Header>{minimized ? 'f' : 'finance'}</Header>}
        <ul className="list p-0">
          {menuItems.map((item, index) => {
            return (
              <Link to={`/dashboard/${item.path}`}>
                <li
                  key={index}
                  className={`item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}>
                  <img
                    src={item.icon}
                    alt={item.alt}
                    style={{ fill: 'purple', width: '20px', height: '20px' }}
                  />
                  {
                    <label
                      className={`sidebar-list-text ${
                        minimized ? 'hide' : ''
                      }`}>
                      {item.label}
                    </label>
                  }
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      {!isMobile && (
        <div className="bottom-item">
          <ul className="liste p-0">
            <li className="item" onClick={() => handleClick()}>
              {minimized ? <FaArrowCircleRight /> : <FaArrowCircleLeft />}
              <label className="sidebar-list-text">
                {minimized ? '' : 'minimize'}
              </label>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
}
//                                                            BALANCE COMPONENT
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
type PotsSectionTwoProps = {
  display?: string;
  name1?: string;
  name2?: string;
  name3?: string;
  name4?: string;
};

function PotsSectionTwo({
  display,
  name1,
  name2,
  name3,
  name4,
}: PotsSectionTwoProps) {
  return (
    <div className="section-two" style={{ display: display }}>
      <div className="pot-values" style={{ borderLeft: '3px solid gray' }}>
        <p className="pot-name">{name1}</p>
        <h2 className="pot-amount">$1,000</h2>
      </div>
      <div className="pot-values" style={{ borderLeft: '3px solid purple' }}>
        <p className="pot-name">{name2}</p>
        <h2 className="pot-amount">$1,000</h2>
      </div>
      <div className="pot-values" style={{ borderLeft: '3px solid green' }}>
        <p className="pot-name">{name3}</p>
        <h2 className="pot-amount">$1,000</h2>
      </div>
      <div className="pot-values" style={{ borderLeft: '3px solid red' }}>
        <p className="pot-name">{name4}</p>
        <h2 className="pot-amount">$1,000</h2>
      </div>
    </div>
  );
}

//                                                            POTS COMPONENT
function Pots() {
  return (
    <div className="pots">
      <AllHeader heading="Pots" button="see details">
        <MdOutlineArrowRight />
      </AllHeader>
      <div className="pots-body">
        <div className="pots-section-one">
          <img src={pots} alt="" style={{ width: '25px' }} />
          <div>
            <p className="total-saved">Total Saved</p>
            <h2 className="total-saved-amount">$1,000</h2>
          </div>
        </div>
        <PotsSectionTwo
          display="grid"
          name1="Savings"
          name2="Concert Tickets"
          name3="Gifts"
          name4="New Laptop"
        />
      </div>
    </div>
  );
}
//                                                            ALL-HEADER COMPONENT

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
//                                                            TRANSACTIONS COMPONENT

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
//                                                            BUDGET COMPONENT

export function Budget() {
  return (
    <div className="budget">
      <AllHeader heading="Budget" button="see details">
        <MdOutlineArrowRight />
      </AllHeader>
      <div className="budget-body">
        <div className="left-item">
          <PieChart />
        </div>
        <div className="right-item">
          <PotsSectionTwo
            display="flex"
            name3="Entertainment"
            name1="bills"
            name2="dinning out"
            name4="Personal Care"
          />
        </div>
      </div>
    </div>
  );
}

//                                                            RECURRING COMPONENT
function RecurringComponent({
  bordercolor,
  recurName,
  recurAmount,
}: {
  bordercolor?: string;
  recurName?: string;
  recurAmount?: number;
}) {
  return (
    <div className="recur" style={{ borderLeft: `3px solid ${bordercolor}` }}>
      <p>{recurName}</p>
      <h3>${recurAmount}.00</h3>
    </div>
  );
}

//                                                            RECURRING COMPONENT

function Recurring() {
  return (
    <div className="recurring">
      <AllHeader heading="recurring" button="see details">
        <MdOutlineArrowRight />
      </AllHeader>
      <div className="recurring-body">
        <RecurringComponent
          bordercolor="red"
          recurName="Subscription"
          recurAmount={1999}
        />
        <RecurringComponent
          bordercolor="green"
          recurName="Utilities"
          recurAmount={500}
        />
        <RecurringComponent
          bordercolor="purple"
          recurName="Rent"
          recurAmount={1200}
        />
      </div>
    </div>
  );
}
//                                                            MAIN COMPONENT

function Main() {
  const styleForAllBalance: React.CSSProperties = {
    marginTop: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '14px',
    padding: '1rem',
  };
  const style: React.CSSProperties = {
    border: '1px solid #ccc',
    padding: '1em',
    gap: '30px',
  };

  return (
    <main>
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
//                                                                APP COMPONENT

export default function Home() {
  return (
    <div>
      <Main />
    </div>
  );
}
