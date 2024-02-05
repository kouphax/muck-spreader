import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import {
  currentAccountBalanceAfter,
  currentAccountFieldValue, incomingWithDeductions,
  savingsAccountFieldValue,
} from './state';

function Money({ value }) {
  let classname = '';

  if (value < 0) {
    classname = 'negative';
  } else if (value > 0) {
    classname = 'positive';
  }

  return <span className={classname}>{`£${value.toFixed(2)}`}</span>;
}

Money.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function BalanceSheet() {
  const currentAccountBefore = useRecoilValue(currentAccountFieldValue);
  const currentAccountAfter = useRecoilValue(currentAccountBalanceAfter);
  const savingsAccountBefore = useRecoilValue(savingsAccountFieldValue);
  const totalSaved = useRecoilValue(incomingWithDeductions);

  return (
    <table>
      <thead>
        <th scope="col" />
        <th scope="col">Before</th>
        <th scope="col">After</th>
        <th scope="col">Change</th>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Current Account</th>
          <td><Money value={currentAccountBefore} /></td>
          <td><Money value={currentAccountAfter} /></td>
          <td><Money value={currentAccountBefore - currentAccountAfter} /></td>
        </tr>
        <tr>
          <th scope="row">Savings Account</th>
          <td><Money value={savingsAccountBefore} /></td>
          <td><Money value={savingsAccountBefore + totalSaved} /></td>
          <td><Money value={totalSaved} /></td>
        </tr>
      </tbody>
    </table>
  );
}
