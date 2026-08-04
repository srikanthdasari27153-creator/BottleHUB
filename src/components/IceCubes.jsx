function IceCubes() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="ice-cube"
          style={{
            left: `${8 + Math.random() * 84}%`,
            top: `${10 + Math.random() * 70}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 4}s`,
          }}
        />
      ))}
    </>
  );
}

export default IceCubes;