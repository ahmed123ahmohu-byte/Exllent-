export default function ParticleBackground() {
  const particles = Array.from({ length: 16 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((item) => (
        <span
          key={item}
          className="absolute rounded-full bg-cyan-400/30 blur-[1px]"
          style={{
            width: `${6 + (item % 5) * 5}px`,
            height: `${6 + (item % 5) * 5}px`,
            left: `${(item * 13) % 100}%`,
            top: `${(item * 19) % 100}%`,
            animation: `float ${4 + (item % 5)}s ease-in-out ${item * 0.2}s infinite`
          }}
        />
      ))}
    </div>
  );
}
