import { useRecoilValue } from 'recoil';
import {
  actions,
  americaExpressCreditCardField,
  currentAccountField,
  incomingPaymentField,
  mastercardCreditCardField,
  savingsAccountField,
} from './state';
import InputField from './InputField';
import BalanceSheet from './BalanceSheet';

export default function App() {
  const steps = useRecoilValue(actions);

  return (
    <main className="container">
      <article>
        <h2>Payments</h2>
        <InputField label="Combined total of Incoming Payments" atom={incomingPaymentField} />
      </article>
      <div className="grid">
        <article>
          <h2>Bank Account Balances</h2>
          <div>
            <InputField label="Current account" atom={currentAccountField} />
          </div>
          <div>
            <InputField label="Savings account" atom={savingsAccountField} />
          </div>
        </article>
        <article>
          <h2>Credit Card Debts</h2>
          <div>
            <InputField label="American express" atom={americaExpressCreditCardField} />
          </div>
          <div>
            <InputField label="Mastercard" atom={mastercardCreditCardField} />
          </div>
        </article>
      </div>
      {
        steps.length > 0 && (
        <article>
          <h2>Actions</h2>
          <ul>
            { steps.map((action) => <li dangerouslySetInnerHTML={{ __html: action }} />) }
          </ul>
        </article>
        )
      }
      {
        steps.length > 0 && (
          <article>
            <h2>Balance Sheet</h2>
            <BalanceSheet />
          </article>
        )
      }
    </main>
  );
}
