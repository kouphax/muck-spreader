import { useRecoilValue } from 'recoil';
import PropTypes from 'prop-types';
import {
  currentAccountBalanceAfter,
  currentAccountFieldValue,
  MONTHLY_RESERVE_AMOUNT,
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
          <th scope="row">Monthly Reserves</th>
          <td>n/a</td>
          <td><Money value={MONTHLY_RESERVE_AMOUNT} /></td>
          <td><Money value={MONTHLY_RESERVE_AMOUNT} /></td>
        </tr>
        <tr>
          <th scope="row">Savings Account</th>
          <td />
          <td />
          <td />
        </tr>
      </tbody>
    </table>
  );
}
