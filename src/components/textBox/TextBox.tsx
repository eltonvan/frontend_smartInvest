import "./textBox.scss"




type Props = {
    title: string;
    text: string;
};

export const TextBox = (props: Props) => {
  return (
    <div>
    <div className="pageTitle"><h1>{props.title}</h1></div>
    <div className="pageText"><h2>{props.text}</h2></div>
    <div className="btnPanel">
    <div className="btn">I am an Investor</div>
    <div className="btn">I am a Trader</div>
    <div className="btn">SignUp now!</div>
    </div>
    </div>
  );
};
