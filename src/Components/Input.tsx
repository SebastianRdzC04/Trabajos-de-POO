interface Props {
  isOn: boolean;
  type: string;
  buttonText: string;
  value: string | number;
  // Que el tipo de children sea un objeto con las propiedades inputText y buttonText
  children: string;
  click?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonClick?: () => void;
}

function Input(props: Props) {
  const { isOn, type, buttonText, value, children, click, buttonClick } = props;

  if (isOn) {
    return (
      <>
        <input
          type={type}
          value={value}
          placeholder={children}
          onChange={click}
        />
        <button onClick={buttonClick}>{buttonText}</button>
      </>
    );
  }
  return null;
}
export default Input;
