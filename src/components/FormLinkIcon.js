import { Link } from "react-router-dom";

const FormLinkIcon = ({ slug }) => {
  return (
    <div>
      <Link to={`/form/${slug}`}>
        <span className="icon-external-link"></span>
      </Link>
    </div>
  );
};

export default FormLinkIcon;
