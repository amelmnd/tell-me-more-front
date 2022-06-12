import { Link } from "react-router-dom";

const FormLinkIcon = ({ slug, target }) => {
  return (
    <div>
      <Link to={`/form/${slug}`} target={target}>
        <span className="icon-external-link"></span>
      </Link>
    </div>
  );
};

export default FormLinkIcon;
