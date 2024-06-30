/* eslint-disable react/prop-types */
import { useSpring, animated } from "react-spring";

const ZoomInFromBottomRight = ({ isOpen, children }) => {
  const springProps = useSpring({
    from: {
      opacity: 0,
      transform: isOpen
        ? "scale(0) translate(100%, 100%)"
        : "scale(1) translate(0%, 0%)",
    },
    to: {
      opacity: isOpen ? 1 : 0,
      transform: isOpen
        ? "scale(1) translate(0%, 0%)"
        : "scale(0) translate(100%, 100%)",
    },
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div
      style={{
        display: isOpen ? "block" : "none",
        zIndex: 1000,
        backdropFilter: "blur(1000px)",
        borderRadius: 5,
        ...springProps,
      }}
    >
      {children}
    </animated.div>
  );
};

export default ZoomInFromBottomRight;
