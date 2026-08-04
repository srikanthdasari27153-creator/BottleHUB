function Particles() {
  return (
    <>
      {[...Array(40)].map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-40px",
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </>
  );
}

export default Particles;