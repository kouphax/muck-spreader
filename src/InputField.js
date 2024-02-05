import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';

export default function InputField({ label, atom }) {
  const [text, setText] = useRecoilState(atom);
  return (
    <label>
      {label}
      <input
        type="text"
        placeholder="0.00"
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />
    </label>
  );
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  atom: PropTypes.any.isRequired,
};
