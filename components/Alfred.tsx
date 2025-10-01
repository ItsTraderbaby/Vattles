import React, { useRef, useState, useEffect, useCallback } from "react";
import { MessageSquareText } from 'lucide-react'; // Using lucide-react for icons

interface LightParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface FlowingLightProps {
  className?: string;
  lightIntensity?: number;
  fogDensity?: number;
  particleCount?: number;
}

interface ChatMessage {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  life: number;
}

const FlowingLight: React.FC<FlowingLightProps> = ({
  className = "",
  lightIntensity = 1,
  fogDensity = 0.8,
  particleCount = 150
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const lightRef = useRef({ x: 400, y: 300 });
  const particlesRef = useRef<LightParticle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const lastChatTimeRef = useRef(0);
  const currentElementRef = useRef<HTMLElement | null>(null);

  const createParticle = useCallback((x: number, y: number): LightParticle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: Math.random() * 60 + 30,
      maxLife: Math.random() * 60 + 30,
      size: Math.random() * 3 + 1
    };
  }, []);

  const initializeParticles = useCallback(() => {
    particlesRef.current = [];
    if (canvasRef.current) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(
          Math.random() * canvasRef.current.width,
          Math.random() * canvasRef.current.height
        ));
      }
    }
  }, [particleCount, createParticle]);

  const getElementEdges = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return [];

    const x = rect.left - containerRect.left;
    const y = rect.top - containerRect.top;
    const width = rect.width;
    const height = rect.height;

    return [
      { x: x, y: y },
      { x: x + width, y: y },
      { x: x + width, y: y + height },
      { x: x, y: y + height }
    ];
  }, []);

  const getDistanceToElementEdge = useCallback((x: number, y: number, element: HTMLElement) => {
    const edges = getElementEdges(element);
    if (edges.length === 0) return Infinity;

    let minDistance = Infinity;

    for (let i = 0; i < edges.length; i++) {
      const p1 = edges[i];
      const p2 = edges[(i + 1) % edges.length];

      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;
      if (param < 0) {
        xx = p1.x;
        yy = p1.y;
      } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
      } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
      }

      const dx = x - xx;
      const dy = y - yy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      minDistance = Math.min(minDistance, distance);
    }

    return minDistance;
  }, [getElementEdges]);

  const getClosestPointOnElementEdge = useCallback((x: number, y: number, element: HTMLElement) => {
    const edges = getElementEdges(element);
    if (edges.length === 0) return { x, y };

    let minDist = Infinity;
    let closestPoint = { x, y };

    for (let i = 0; i < edges.length; i++) {
      const p1 = edges[i];
      const p2 = edges[(i + 1) % edges.length];

      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;
      if (param < 0) {
        xx = p1.x;
        yy = p1.y;
      } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
      } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
      }

      const dist = Math.sqrt((x - xx) ** 2 + (y - yy) ** 2);
      if (dist < minDist) {
        minDist = dist;
        closestPoint = { x: xx, y: yy };
      }
    }
    return closestPoint;
  }, [getElementEdges]);

    // Alfred's personality - customize messages here or connect to API
  const getAlfredMessage = useCallback((element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase();
    const className = element.className;
    const textContent = element.textContent?.trim().substring(0, 50).toLowerCase();

    // Customize Alfred's responses here - perfect spot for API integration!
    if (tagName === 'button' || className.includes('button')) {
      return "Ah, a button! Shall we give it a press, sir?";
    } else if (tagName === 'a' || className.includes('link')) {
      return "A link! I wonder where this leads us...";
    } else if (tagName === 'input' || tagName === 'textarea') {
      return "An input field! What shall we write here?";
    } else if (tagName === 'form') {
      return "A form! Time to fill in some details, perhaps?";
    } else if (className.includes('card') || className.includes('item') || className.includes('product')) {
      return "Interesting card! Let me take a closer look...";
    } else if (className.includes('header') || tagName === 'h1' || tagName === 'h2') {
      return "Ah, a heading! This seems important.";
    } else if (className.includes('footer')) {
      return "The footer! We've reached the bottom, but not the end!";
    } else if (textContent?.includes('sign up') || textContent?.includes('register')) {
      return "Oooo, a sign up card... Oh can we please!?";
    } else if (textContent?.includes('stats') || textContent?.includes('statistics')) {
      return "Stats card? Nice! I love stats!";
    } else if (textContent?.includes('contact')) {
      return "Contact information! Shall we reach out?";
    } else if (textContent?.includes('about')) {
      return "About section! Let's learn more, shall we?";
    } else {
      return "Hmm, what do we have here?";
    }
  }, []);

  const generateChat = useCallback((element: HTMLElement) => {
    const now = Date.now();
    if (now - lastChatTimeRef.current < 2500) return; // Shortened to 2.5 seconds

    const message = getAlfredMessage(element);

    if (message) {
      const rect = element.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const chatX = (rect.left - containerRect.left) + rect.width / 2;
      const chatY = (rect.top - containerRect.top) - 60; // Further from element

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: message,
          x: chatX,
          y: chatY,
          opacity: 0.7, // 70% transparent
          life: 150 // Slightly shorter duration
        }
      ]);
      lastChatTimeRef.current = now;
    }
  }, [getAlfredMessage]);

  const updateLight = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    targetRef.current.x = mouseRef.current.x - rect.left;
    targetRef.current.y = mouseRef.current.y - rect.top;

    let closestDistance = Infinity;
    let closestPoint = { x: targetRef.current.x, y: targetRef.current.y };
    let newCurrentElement: HTMLElement | null = null;

    const allElements = Array.from(document.querySelectorAll('body *')) as HTMLElement[];
    const interactiveElements = allElements.filter(el => {
      const elRect = el.getBoundingClientRect();
      // Filter out elements that are too small, hidden, or not interactive
      return elRect.width > 10 && elRect.height > 10 &&
             el.offsetParent !== null &&
             window.getComputedStyle(el).pointerEvents !== 'none' &&
             window.getComputedStyle(el).opacity !== '0' &&
             window.getComputedStyle(el).visibility !== 'hidden';
    });

    interactiveElements.forEach(el => {
      const distance = getDistanceToElementEdge(targetRef.current.x, targetRef.current.y, el);
      if (distance < 80 && distance < closestDistance) { // Check proximity
        closestDistance = distance;
        closestPoint = getClosestPointOnElementEdge(targetRef.current.x, targetRef.current.y, el);
        newCurrentElement = el;
      }
    });

    // If the light is close to an element, update currentElementRef
    if (newCurrentElement && closestDistance < 80) {
      if (currentElementRef.current !== newCurrentElement) {
        currentElementRef.current = newCurrentElement;
        generateChat(newCurrentElement);
      }
    } else {
      currentElementRef.current = null;
    }

    // Smooth movement towards target or closest edge
    const lerpFactor = 0.08;
    lightRef.current.x += (closestPoint.x - lightRef.current.x) * lerpFactor;
    lightRef.current.y += (closestPoint.y - lightRef.current.y) * lerpFactor;
  }, [getDistanceToElementEdge, getClosestPointOnElementEdge, generateChat]);

  const updateParticles = useCallback(() => {
    particlesRef.current.forEach((particle) => {
      // Attract particles to light
      const dx = lightRef.current.x - particle.x;
      const dy = lightRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0) {
        const force = 0.02;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }

      // Apply velocity with damping
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update life
      particle.life--;

      // Respawn particle if dead or too far
      if (particle.life <= 0 || distance > 200) {
        const angle = Math.random() * Math.PI * 2;
        const spawnDistance = 100 + Math.random() * 50;
        particle.x = lightRef.current.x + Math.cos(angle) * spawnDistance;
        particle.y = lightRef.current.y + Math.sin(angle) * spawnDistance;
        particle.life = particle.maxLife;
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
      }
    });
  }, []);

      const updateChatMessages = useCallback(() => {
    setChatMessages(prev =>
      prev
        .map(msg => ({
          ...msg,
          life: msg.life - 1,
          opacity: Math.min((msg.life / 150) * 0.7, 0.7) // Start fading immediately, max 70% opacity
        }))
        .filter(msg => msg.life > 0)
    );
  }, []);

  // Alfred's welcome message on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatMessages([{
                id: 'welcome',
        text: "Hello. I am Alfred. Welcome to Vattles, Vattler!",
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 100,
        opacity: 0.7,
        life: 300 // 5 seconds for welcome message, starts fading immediately
      }]);
    }, 500); // Show after half a second

    return () => clearTimeout(timer);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw fog effect (will invert based on background due to difference blend mode)
    const fogGradient = ctx.createRadialGradient(
      lightRef.current.x, lightRef.current.y, 0,
      lightRef.current.x, lightRef.current.y, 120 * fogDensity
    );
    fogGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 * lightIntensity})`);
    fogGradient.addColorStop(0.3, `rgba(255, 255, 255, ${0.2 * lightIntensity})`);
    fogGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.08 * lightIntensity})`);
    fogGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = fogGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw particles (will invert based on background)
    particlesRef.current.forEach(particle => {
      const alpha = (particle.life / particle.maxLife) * lightIntensity;
      const distance = Math.sqrt(
        (particle.x - lightRef.current.x) ** 2 +
        (particle.y - lightRef.current.y) ** 2
      );
      const proximityAlpha = Math.max(0, 1 - distance / 100);

      ctx.save();
      ctx.globalAlpha = alpha * proximityAlpha * 0.9;
      ctx.fillStyle = 'white';
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'white';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw main light core (will invert based on background)
    const coreGradient = ctx.createRadialGradient(
      lightRef.current.x, lightRef.current.y, 0,
      lightRef.current.x, lightRef.current.y, 15
    );
    coreGradient.addColorStop(0, `rgba(255, 255, 255, ${1 * lightIntensity})`);
    coreGradient.addColorStop(0.5, `rgba(255, 255, 255, ${0.8 * lightIntensity})`);
    coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.save();
    ctx.fillStyle = coreGradient;
    ctx.shadowBlur = 25;
    ctx.shadowColor = 'white';
    ctx.beginPath();
    ctx.arc(lightRef.current.x, lightRef.current.y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [lightIntensity, fogDensity]);

  const animate = useCallback(() => {
    updateLight();
    updateParticles();
    updateChatMessages();
    draw();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateLight, updateParticles, updateChatMessages, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initializeParticles(); // Re-initialize particles on resize
    };

    resizeCanvas();
    initializeParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, initializeParticles]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-screen bg-background overflow-hidden ${className}`}
    >
            <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20 alfred-canvas"
      />

            {chatMessages.map(msg => (
        <div
          key={msg.id}
          className="alfred-chat-message"
          style={{
            '--chat-x': `${msg.x}px`,
            '--chat-y': `${msg.y}px`,
            '--chat-opacity': msg.opacity
          } as React.CSSProperties}
        >
          <MessageSquareText className="h-3 w-3" />
          <span>{msg.text}</span>
        </div>
      ))}

      <div className="absolute bottom-8 left-8 text-muted-foreground text-sm z-10">
        <p>Move your cursor to guide the flowing light</p>
        <p className="text-xs mt-1">Light follows element edges and reacts to proximity</p>
      </div>
    </div>
  );
};

export default function FlowingLightDemo() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <FlowingLight />
      {/* Example elements for the light to interact with */}
      <div className="absolute top-1/4 left-1/4 w-64 h-40 bg-background/10 backdrop-blur-md border border-border/20 rounded-xl shadow-2xl p-6 text-foreground z-30" id="example-card-1">
        <h3 className="text-xl font-bold mb-2">Welcome Card</h3>
        <p className="text-sm text-muted-foreground">This is a sample card. The light orb will interact with its edges.</p>
        <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">Learn More</button>
      </div>
      <div className="absolute top-1/2 right-1/4 w-56 h-32 bg-background/10 backdrop-blur-md border border-border/20 rounded-lg shadow-xl p-4 text-foreground z-30" id="example-card-2">
        <h4 className="font-semibold">Stats Overview</h4>
        <p className="text-xs text-muted-foreground mt-1">Users: 1.2M</p>
        <p className="text-xs text-muted-foreground">Revenue: $500K</p>
      </div>
      <button className="absolute bottom-1/4 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors z-30" id="signup-button">
        Sign Up Now!
      </button>
      <a href="#" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-blue-400 hover:text-blue-300 transition-colors z-30" id="about-link">
        About Us
      </a>
      <input type="text" placeholder="Enter your email" className="absolute bottom-1/3 left-1/4 p-2 rounded-md bg-background/20 border border-border/40 text-foreground placeholder-muted-foreground z-30" id="email-input" />
    </div>
  );
}
