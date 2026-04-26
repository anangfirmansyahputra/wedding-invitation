"use client";

import { useEffect, useRef } from "react";

export default function BubbleParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Bubble class
    class Bubble {
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.radius = Math.random() * 15 + 3; // 3-18px
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.radius + Math.random() * 100;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -Math.random() * 1 - 0.3; // Upward movement
        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if off screen
        if (this.y < -this.radius) {
          this.y = canvas.height + this.radius + Math.random() * 100;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        // Create gradient for bubble effect
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.2})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity * 0.1})`);

        ctx.fillStyle = gradient;
        ctx.fill();

        // Add border
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }

    // Create bubbles
    const bubbles: Bubble[] = [];
    const bubbleCount = 50;

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = new Bubble();
      // Randomize initial y position
      bubble.y = Math.random() * canvas.height;
      bubbles.push(bubble);
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        mixBlendMode: "screen"
      }}
    />
  );
}
