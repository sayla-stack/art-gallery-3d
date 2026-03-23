import { useState, useRef, useEffect } from 'react';

export default function Joystick({ onChange, className = "joystick-container" }) {
    const [stickPosition, setStickPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const baseRef = useRef(null);
    const maxDistance = 50;

    const handleStart = (e) => {
        setIsDragging(true);
        handleMove(e);
    };

    const handleMove = (e) => {
        if (!isDragging && e.type !== 'pointerdown' && e.type !== 'touchstart') return;

        const base = baseRef.current;
        if (!base) return;

        const rect = base.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX);

        const limitedDistance = Math.min(distance, maxDistance);
        const x = Math.cos(angle) * limitedDistance;
        const y = Math.sin(angle) * limitedDistance;

        setStickPosition({ x, y });

        if (onChange) {
            onChange({
                x: x / maxDistance,
                y: y / maxDistance
            });
        }
    };

    const handleEnd = () => {
        setIsDragging(false);
        setStickPosition({ x: 0, y: 0 });
        if (onChange) {
            onChange({ x: 0, y: 0 });
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('pointermove', handleMove);
            window.addEventListener('pointerup', handleEnd);
            window.addEventListener('touchmove', handleMove, { passive: false });
            window.addEventListener('touchend', handleEnd);
            return () => {
                window.removeEventListener('pointermove', handleMove);
                window.removeEventListener('pointerup', handleEnd);
                window.removeEventListener('touchmove', handleMove);
                window.removeEventListener('touchend', handleEnd);
            };
        }
    }, [isDragging]);

    return (
        <div
            className={className}
            ref={baseRef}
            onPointerDown={handleStart}
            onTouchStart={handleStart}
            style={{
                touchAction: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2000,
                pointerEvents: 'auto'
            }}
        >
            <div
                className="joystick-stick"
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    transform: `translate(${stickPosition.x}px, ${stickPosition.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
}
