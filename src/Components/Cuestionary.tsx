import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  formTitle: string;
}

function Cuestionary(props: Props) {
  const { children, title, formTitle } = props;

  return (
    <div className="cuestionary">
      <h1> {title}</h1>
      <h3>{formTitle}</h3>
      <form>{children}</form>
    </div>
  );
}
export default Cuestionary;
