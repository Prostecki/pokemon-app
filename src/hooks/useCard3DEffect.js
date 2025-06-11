import { useRef } from "react";
import { useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function useCard3DEffect(rotationRange = 40.5) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const halfRotationRange = rotationRange / 2;

  // Spring settings for smoother animation
  const xSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 400, damping: 25 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  // Mouse move handler for 3D effect
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * rotationRange;
    const mouseY = (e.clientY - rect.top) * rotationRange;

    const rX = (mouseY / height - halfRotationRange) * -1;
    const rY = mouseX / width - halfRotationRange;

    x.set(rX);
    y.set(rY);
  };

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    ref,
    transform,
    handleMouseMove,
    handleMouseLeave,
  };
}
