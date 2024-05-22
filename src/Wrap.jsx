// eslint-disable-next-line react/prop-types
function Wrap({ children }) {
  return (
    <div
      style={{
        padding: "10px 80px",
      }}
    >
      {children}
    </div>
  );
}

export default Wrap;
