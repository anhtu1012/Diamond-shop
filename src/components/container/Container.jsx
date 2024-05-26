// eslint-disable-next-line react/prop-types
function Container({ children }) {
  return (
    <div
      style={{
        padding: "20px 100px",
      }}
    >
      {children}
    </div>
  );
}

export default Container;
