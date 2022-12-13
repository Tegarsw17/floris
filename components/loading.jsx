import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="flex justify-center my-2">
      {/* <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="success" /> */}
      <Spinner animation="border" variant="light" size="sm" />
    </div>
  );
}

export default Loading;
