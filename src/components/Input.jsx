import InputMask from 'react-input-mask';
function Input(props) {
  const { mask, placeholder, className, value, onChange, label, ...things } = props
  return (
    <div className='form-floating mb-3'>
      <InputMask
        {...things}
        mask={mask}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}>
      </InputMask>
      <label>{label}</label>
    </div>
  );
}

export default Input