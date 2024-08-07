import { Spinner } from "reactstrap";

const PageSpinner = function () {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-dark">
      <Spinner animation="border" color="light" />
    </div>
  );
};

export default PageSpinner;
