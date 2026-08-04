function FloatingBottle({
  image,
  top,
  left,
  right,
  bottom,
  width = "140px",
  delay = "2.2s",
  duration = "7s",
}) {
  return (
    <img
      src={image}
      alt="Bottle"
      className="float-bottle"
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width,
        animationDelay: delay,
        animationDuration: duration,
        animationFillMode: "both",
        pointerEvents: "none",
        userSelect: "none",
        filter: "drop-shadow(0 0 35px rgba(255,200,0,0.9))",
        willChange: "transform, opacity",
        zIndex: 15,
      }}
    />
  );
}

export default FloatingBottle;