import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      if (cursor) {
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`;
      }

      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;

      if (follower) {
        follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`;
        follower.style.opacity = isHovering ? '0.2' : '0.5';
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => {
      isHovering = true;
    };

    const onMouseLeave = () => {
      isHovering = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    const interactiveEls = document.querySelectorAll('a, button');

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} id="cursor"></div>
      <div className="cursor-follower" ref={followerRef} id="cursorFollower"></div>
    </>
  );
};

export default CustomCursor;
