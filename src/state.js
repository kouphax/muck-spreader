import { atom, selector } from 'recoil';

function isParsable(val) {
  const floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  if (!floatRegex.test(val)) {
    return false;
  }

  const parsed = parseFloat(val);
  return !Number.isNaN(parsed);
}

function getFieldValue(getter, fieldAtom, emptyIsZero) {
  const field = getter(fieldAtom);

  if (field === null || field === undefined || field.trim() === '') {
    return emptyIsZero ? 0 : NaN;
  }

  return isParsable(field) ? parseFloat(field) : NaN;
}

function monetise(value) {
  return `${value < 0 ? '-' : ''}£${value.toFixed(2)}`;
}

export const MONTHLY_RESERVE_AMOUNT = 4500;

export const currentAccountField = atom({
  key: 'currentAccountField',
  default: '',
});

export const savingsAccountField = atom({
  key: 'savingsAccountField',
  default: '',
});

export const americaExpressCreditCardField = atom({
  key: 'americaExpressCreditCardField',
  default: '',
});

export const mastercardCreditCardField = atom({
  key: 'mastercardCreditCardField',
  default: '',
});

export const incomingPaymentField = atom({
  key: 'incomingPaymentField',
  default: '',
});

export const currentAccountFieldValue = selector({
  key: 'currentAccountFieldValue',
  get: ({ get }) => getFieldValue(get, currentAccountField, true),
});

export const savingsAccountFieldValue = selector({
  key: 'savingsAccountFieldValue',
  get: ({ get }) => getFieldValue(get, savingsAccountField, true),
});

export const americaExpressCreditCardFieldValue = selector({
  key: 'americaExpressCreditCardFieldValue',
  get: ({ get }) => getFieldValue(get, americaExpressCreditCardField, true),
});

export const mastercardCreditCardFieldValue = selector({
  key: 'mastercardCreditCardFieldValue',
  get: ({ get }) => getFieldValue(get, mastercardCreditCardField, true),
});

export const incomingPaymentFieldValue = selector({
  key: 'incomingPaymentFieldValue',
  get: ({ get }) => getFieldValue(get, incomingPaymentField, false),
});

export const canBeCalculated = selector({
  key: 'canBeCalculated',
  get: ({ get }) => {
    const ca = get(currentAccountFieldValue);
    const sa = get(savingsAccountFieldValue);
    const am = get(americaExpressCreditCardFieldValue);
    const mc = get(mastercardCreditCardFieldValue);
    const ip = get(incomingPaymentFieldValue);

    return ![ca, sa, am, mc, ip].some(Number.isNaN);
  },
});

export const incomingWithDeductions = selector({
  key: 'incomingWithDeductions',
  get: ({ get }) => get(incomingPaymentFieldValue)
    - MONTHLY_RESERVE_AMOUNT
    - get(americaExpressCreditCardFieldValue)
    - get(mastercardCreditCardFieldValue),
});

export const actions = selector({
  key: 'actions',
  get: ({ get }) => {
    const am = get(americaExpressCreditCardFieldValue);
    const mc = get(mastercardCreditCardFieldValue);
    const ip = get(incomingPaymentFieldValue);
    const rs = MONTHLY_RESERVE_AMOUNT;
    const rm = get(incomingWithDeductions);
    const ready = get(canBeCalculated);

    if (ready) {
      return [
        `Transfer <strong>${monetise(ip)}</strong> from <strong>Incoming Payments</strong> to <strong>Current Account</strong>`,
        rm < 0 ? `Transfer <strong>${monetise(Math.abs(rm))}</strong> from <strong>Savings Account</strong> to <strong>Current Account</strong>` : '',
        `Transfer <strong>${monetise(rs)}</strong> from <strong>Current Account</strong> to <strong>Monthly Reserves</strong>`,
        am > 0 ? `Pay off <strong>${monetise(am)}</strong> from <strong>Current Account</strong> to <strong>American Express</strong>` : '',
        mc > 0 ? `Pay off <strong>${monetise(mc)}</strong> from <strong>Current Account</strong> to <strong>Mastercard</strong>` : '',
        rm > 0 ? `Transfer <strong>${monetise(rm)}</strong> from <strong>Current Account</strong> to <strong>Savings Account</strong>` : '',
      ].filter(Boolean);
    }

    return [];
  },
});

export const currentAccountBalanceAfter = selector({
  key: 'currentAccountBalanceAfter',
  get: ({ get }) => get(currentAccountFieldValue),
});
