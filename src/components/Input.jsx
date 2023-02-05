import InputMask from 'react-input-mask';
function Input(props) {
  return (
    <div className='form-floating mb-3'>
      <InputMask
        mask={props.mask}
        placeholder={props.placeholder}
        className={props.className}
        value={props.value}
        onChange={props.onChange}>
      </InputMask>
      <label htmlFor={props.htmlFor}>{props.label}</label>
    </div>
  );
}

export default Input