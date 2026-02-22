
import React, { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';

const CardStream: React.FC = () => {
    const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(120);
    const [direction, setDirection] = useState(1);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        if (!isVisible) return;

        const canvas = canvasRef.current;
        const scannerCanvas = scannerCanvasRef.current;
        const cardLine = cardLineRef.current;

        if (!canvas || !scannerCanvas || !cardLine) return;

        const ctx = canvas.getContext('2d');
        const scannerCtx = scannerCanvas.getContext('2d');

        if (!ctx || !scannerCtx) return;

        // Set canvas sizes
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            scannerCanvas.width = scannerCanvas.offsetWidth;
            scannerCanvas.height = scannerCanvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle system
        const particles: Array<{ x: number, y: number, vx: number, vy: number, size: number }> = [];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        // Card animation
        let cardPosition = 0;

        const animate = () => {
            if (!isPaused) {
                // Clear canvases
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                scannerCtx.clearRect(0, 0, scannerCanvas.width, scannerCanvas.height);

                // Draw particles
                ctx.fillStyle = 'rgba(191, 245, 73, 0.3)';
                particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fill();
                });

                // Draw scanner line
                const scannerX = (Date.now() / 20) % scannerCanvas.width;
                const gradient = scannerCtx.createLinearGradient(scannerX - 50, 0, scannerX + 50, 0);
                gradient.addColorStop(0, 'rgba(191, 245, 73, 0)');
                gradient.addColorStop(0.5, 'rgba(191, 245, 73, 0.5)');
                gradient.addColorStop(1, 'rgba(191, 245, 73, 0)');

                scannerCtx.fillStyle = gradient;
                scannerCtx.fillRect(scannerX - 50, 0, 100, scannerCanvas.height);

                // Animate cards
                cardPosition += (speed / 60) * direction;
                if (cardLine) {
                    cardLine.style.transform = `translateX(${cardPosition}px)`;

                    // Reset position when out of view
                    if (Math.abs(cardPosition) > 2000) {
                        cardPosition = 0;
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isVisible, isPaused, speed, direction]);

    const toggleAnimation = () => setIsPaused(!isPaused);
    const resetPosition = () => {
        if (cardLineRef.current) {
            cardLineRef.current.style.transform = 'translateX(0px)';
        }
    };
    const changeDirection = () => setDirection(d => d * -1);

    return (
        <section
            ref={sectionRef as React.RefObject<HTMLElement>}
            className="relative py-20 bg-black overflow-hidden"
            style={{ minHeight: '600px' }}
        >
            {/* Controls */}
            <div className={`flex justify-center gap-4 mb-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <button
                    onClick={toggleAnimation}
                    className="cursor-pointer px-6 py-3 bg-[#1A1A1A] border border-[#282828] text-white rounded-full font-bold text-sm hover:bg-[#222] hover:border-primary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                    aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
                >
                    {isPaused ? '▶️ Play' : '⏸️ Pause'}
                </button>
                <button
                    onClick={resetPosition}
                    className="cursor-pointer px-6 py-3 bg-[#1A1A1A] border border-[#282828] text-white rounded-full font-bold text-sm hover:bg-[#222] hover:border-primary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Reset position"
                >
                    🔄 Reset
                </button>
                <button
                    onClick={changeDirection}
                    className="cursor-pointer px-6 py-3 bg-[#1A1A1A] border border-[#282828] text-white rounded-full font-bold text-sm hover:bg-[#222] hover:border-primary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Change direction"
                >
                    ↔️ Direction
                </button>
            </div>

            {/* Speed Indicator */}
            <div className={`text-center mb-8 text-[#99A1AF] font-bold text-sm ${isVisible ? 'animate-fade-in delay-100' : 'opacity-0'}`}>
                Speed: <span className="text-primary">{speed}</span> px/s
            </div>

            {/* Animation Container */}
            <div className="relative w-full h-[400px] max-w-7xl mx-auto">
                {/* Particle Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 1 }}
                />

                {/* Scanner Canvas */}
                <canvas
                    ref={scannerCanvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ zIndex: 2 }}
                />

                {/* Scanner Line (CSS) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(191, 245, 73, 0.1) 50%, transparent 100%)',
                        animation: 'scan 3s linear infinite',
                        zIndex: 3
                    }}
                />

                {/* Card Stream */}
                <div className="absolute inset-0 flex items-center overflow-hidden" style={{ zIndex: 4 }}>
                    <div
                        ref={cardLineRef}
                        className="flex gap-6 whitespace-nowrap"
                    >
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="inline-block w-64 h-40 bg-[#0A0A0A] border border-[#282828] rounded-2xl p-6 flex-shrink-0 hover:border-primary/50 transition-all duration-300"
                            >
                                <div className="h-4 w-3/4 bg-[#1A1A1A] rounded mb-4" />
                                <div className="h-3 w-1/2 bg-[#1A1A1A] rounded mb-2" />
                                <div className="h-3 w-2/3 bg-[#1A1A1A] rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inspiration Credit */}
            <div className={`text-center mt-12 text-xs text-[#99A1AF] ${isVisible ? 'animate-fade-in delay-200' : 'opacity-0'}`}>
                Inspired by{' '}
                <a
                    href="https://evervault.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer text-primary hover:underline transition-all duration-200 focus:outline-none focus:underline"
                >
                    @evervault.com
                </a>
            </div>

            <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
        </section>
    );
};

export default CardStream;
