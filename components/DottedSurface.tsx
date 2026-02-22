'use client';
import { cn } from '../lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<{
        scene: THREE.Scene;
        camera: THREE.PerspectiveCamera;
        renderer: THREE.WebGLRenderer;
        particles: THREE.Points;
        geometry: THREE.BufferGeometry;
        animationId: number;
        count: number;
    } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const SEPARATION = 150;
        const AMOUNTX = 40;
        const AMOUNTY = 60;

        // Scene setup
        const scene = new THREE.Scene();
        // Match the new eye-comfort background color #09090b
        const bgColor = 0x09090b;
        scene.fog = new THREE.Fog(bgColor, 2000, 10000);

        const camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );
        camera.position.set(0, 355, 1220);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        // renderer.setClearColor(scene.fog.color, 1);

        containerRef.current.appendChild(renderer.domElement);

        // Create particles
        const positions = new Float32Array(AMOUNTX * AMOUNTY * 3);
        const colors = new Float32Array(AMOUNTX * AMOUNTY * 3);

        // Create geometry for all particles
        const geometry = new THREE.BufferGeometry();

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
                const y = 0; // Will be animated
                const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                // Using a soft color or a hint of primary
                // Let's use a subtle gray/white
                colors[i * 3] = 0.5;
                colors[i * 3 + 1] = 0.5;
                colors[i * 3 + 2] = 0.5;

                i++;
            }
        }

        geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3),
        );
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Create material
        const material = new THREE.PointsMaterial({
            size: 5,
            vertexColors: true,
            transparent: true,
            opacity: 0.25,
            sizeAttenuation: true,
        });

        // Create points object
        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let count = 0;
        let animationId: number;

        // Animation function
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const positionAttribute = geometry.attributes.position;
            const positions = positionAttribute.array as Float32Array;

            let i = 0;
            for (let ix = 0; ix < AMOUNTX; ix++) {
                for (let iy = 0; iy < AMOUNTY; iy++) {
                    // Animate Y position with sine waves
                    positions[i * 3 + 1] =
                        Math.sin((ix + count) * 0.3) * 50 +
                        Math.sin((iy + count) * 0.5) * 50;
                    i++;
                }
            }

            positionAttribute.needsUpdate = true;
            renderer.render(scene, camera);
            count += 0.05; // Slightly slower for a more premium feel
        };

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Start animation
        animate();

        // Store references
        sceneRef.current = {
            scene,
            camera,
            renderer,
            particles,
            geometry,
            animationId,
            count,
        };

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);

            if (sceneRef.current) {
                cancelAnimationFrame(sceneRef.current.animationId);

                // Clean up Three.js objects
                sceneRef.current.geometry.dispose();
                if (Array.isArray(particles.material)) {
                    particles.material.forEach((m) => m.dispose());
                } else {
                    particles.material.dispose();
                }

                sceneRef.current.renderer.dispose();

                if (containerRef.current && sceneRef.current.renderer.domElement) {
                    containerRef.current.removeChild(
                        sceneRef.current.renderer.domElement,
                    );
                }
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn('pointer-events-none fixed inset-0 -z-10', className)}
            style={{ background: '#09090b' }}
            {...props}
        />
    );
}
