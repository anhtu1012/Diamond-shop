import "./index.scss";
// eslint-disable-next-line react/prop-types
function Container({ children }) {
  return (
    <div className="container-main"
    >
      {children}
    </div>
  );
}

export default Container;
