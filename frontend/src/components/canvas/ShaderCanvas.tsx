'use client';

import React, { useEffect, useRef } from 'react';

interface ShaderCanvasProps {
  className?: string;
}

export function ShaderCanvas({ className = 'fixed inset-0 w-full h-full pointer-events-none z-0' }: ShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_isDark;
      varying vec2 v_texCoord;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Technical grid pattern
        vec2 grid = fract(uv * 40.0);
        float line = smoothstep(0.0, 0.05, grid.x) * smoothstep(1.0, 0.95, grid.x) *
                     smoothstep(0.0, 0.05, grid.y) * smoothstep(1.0, 0.95, grid.y);
        
        // Wave animation based on time and mouse
        float dist = distance(uv, mouse);
        float pulse = sin(dist * 10.0 - u_time * 1.5) * 0.5 + 0.5;
        
        // Cyber-Creative Palette
        vec3 blue = vec3(0.14, 0.38, 0.92); 
        vec3 violet = vec3(0.48, 0.22, 0.92); 
        
        // Background color adaptation for Light / Dark
        vec3 darkBg = mix(vec3(0.04, 0.04, 0.05), vec3(0.07, 0.07, 0.09), pulse * 0.15);
        vec3 lightBg = mix(vec3(0.97, 0.98, 0.99), vec3(0.94, 0.95, 0.98), pulse * 0.1);
        vec3 bg = mix(lightBg, darkBg, u_isDark);
        
        vec3 accent = mix(blue, violet, uv.x + sin(u_time * 0.4) * 0.5);
        float glowIntensity = mix(0.12, 0.25, u_isDark);
        float glow = exp(-dist * 3.5) * pulse * glowIntensity;
        
        float lineIntensity = mix(0.03, 0.08, u_isDark);
        vec3 finalColor = mix(bg, accent, (1.0 - line) * lineIntensity);
        finalColor += accent * glow;
        
        // Digital dust particles
        float dust = noise(uv + u_time * 0.01);
        if (dust > 0.994) finalColor += accent * mix(0.2, 0.4, u_isDark);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function compileShader(type: number, src: string) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uIsDark = gl.getUniformLocation(prog, 'u_isDark');

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    function render(t: number) {
      if (!gl || !canvas) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains('dark') ? 1.0 : 0.0;
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      if (uIsDark) gl.uniform1f(uIsDark, isDark);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
