function Smoke() {
  return (
    <>
      <div
        className="smoke"
        style={{
          left: "10%",
          bottom: "0%",
          animationDelay: "0s",
        }}
      ></div>

      <div
        className="smoke"
        style={{
          right: "10%",
          bottom: "0%",
          animationDelay: "2s",
        }}
      ></div>

      <div
        className="smoke"
        style={{
          left: "45%",
          bottom: "0%",
          animationDelay: "4s",
        }}
      ></div>
    </>
  );
}

export default Smoke;