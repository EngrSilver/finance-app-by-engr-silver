import { PageHeader } from './Transactions';
import './Budget.css';
import PieChart from '../PieChart';

function Button() {
  return <button className="custom-button">+ Add New Budget</button>;
}
function Spendings({
  name,
  amount,
  amountOf,
  bordercolor,
}: {
  name: string;
  amount: number;
  amountOf: number;
  bordercolor: string;
}) {
  return (
    <div className={`spendings border-l-3 border-${bordercolor}-500`}>
      <p className="Spending-name">{name}</p>
      <p className="Spending-amount">
        <span className="Spending-amountOf"> ${amount.toFixed(2)} </span>
        of ${amountOf.toFixed(2)}
      </p>
    </div>
  );
}

export default function Budget() {
  return (
    <div className="budget-page">
      <div className="head-section">
        <PageHeader value="Budget" />
        <Button />
      </div>
      <div className="budget-content">
        <div className="budgetContent-left">
          <div className="forPiechart">
            <PieChart />
            <h1 className="forPiechart-title">Spending Summary</h1>
            <Spendings
              name="Food"
              amount={200}
              amountOf={500}
              bordercolor="green"
            />
          </div>
        </div>
        <div className="budgetContent-right"></div>
      </div>
    </div>
  );
}
