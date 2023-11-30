// ** Icons Import
import { Code } from "react-feather";

const Footer = () => {
  return (
    <p className="clearfix mb-0">
      <span className="float-md-start d-block d-md-inline-block mt-25">
        COPYRIGHT © {new Date().getFullYear()}{" "}
        <a
          href="https://devxcell.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Devxcell
        </a>
        <span className="d-none d-sm-inline-block">, All rights Reserved</span>
      </span>
      <span className="float-md-end d-none d-md-block">
      <Code size={14} />
        Developed By 
        <a
          href="https://imrul.xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Imrul Afnan
        </a>
        <Code size={14} />
      </span>
    </p>
  );
};

export default Footer;
