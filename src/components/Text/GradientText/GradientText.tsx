import "./GradientText.css";

type Props = {
  text: string;
  gradient: string;
};

interface CSSVars extends React.CSSProperties {
  "--gradient": string;
}

const GradientText = ({ text, gradient }: Props) => {
  const cssVars: CSSVars = { "--gradient": `${gradient}` };

  return (
    <span style={cssVars} className="rainbow-text">
      {text}
    </span>
  );
};

export default GradientText;
