function FireSparks() {
  return (
    <>
      {[...Array(35)].map((_, i) => (
        <span
          key={i}
          className="fire-spark"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-40px",
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </>
  );
}

export default FireSparks;