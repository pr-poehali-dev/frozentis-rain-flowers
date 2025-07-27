import React, { useState, useEffect } from 'react';

interface RainDrop {
  id: number;
  left: number;
  animationDelay: number;
}

interface Flower {
  id: number;
  left: number;
  type: string;
  animationDelay: number;
}

const Index = () => {
  const [clickCount, setClickCount] = useState(0);
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [isRaining, setIsRaining] = useState(false);

  const flowerEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '💐', '🌿'];

  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
    
    // Создаем дождь при каждом клике
    createRain();
    
    // После 3 кликов добавляем цветы
    if (clickCount >= 2) {
      createFlowers();
    }
  };

  const createRain = () => {
    setIsRaining(true);
    const newDrops: RainDrop[] = [];
    
    for (let i = 0; i < 50; i++) {
      newDrops.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2
      });
    }
    
    setRainDrops(prev => [...prev, ...newDrops]);
    
    // Убираем дождь через 3 секунды
    setTimeout(() => {
      setIsRaining(false);
      setRainDrops([]);
    }, 3000);
  };

  const createFlowers = () => {
    const newFlowers: Flower[] = [];
    
    for (let i = 0; i < 12; i++) {
      newFlowers.push({
        id: Date.now() + i,
        left: (i * 8) + Math.random() * 5,
        type: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
        animationDelay: i * 0.2
      });
    }
    
    setFlowers(prev => [...prev, ...newFlowers]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-900 relative overflow-hidden">
      {/* Земляной фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(92,51,23,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,69,25,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(101,67,33,0.3),transparent_50%)]" />
      
      {/* Дождь */}
      {isRaining && rainDrops.map(drop => (
        <div
          key={drop.id}
          className="absolute w-1 h-8 bg-gradient-to-b from-primary/70 to-primary/30 rounded-full animate-rain-fall pointer-events-none"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.animationDelay}s`,
            top: '-2rem'
          }}
        />
      ))}
      
      {/* Центральный контент */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center px-8">
          <h1
            onClick={handleTitleClick}
            className="font-fantasy text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent cursor-pointer transition-all duration-300 hover:scale-105 animate-magical-glow select-none"
            style={{
              textShadow: '0 0 30px rgba(232, 213, 255, 0.6)',
              filter: 'drop-shadow(0 4px 20px rgba(232, 213, 255, 0.4))'
            }}
          >
            frozentis
          </h1>
          
          {/* Счетчик кликов (скрытый, но функциональный) */}
          <div className="mt-8 text-muted-foreground font-modern text-lg opacity-60">
            {clickCount === 0 && "Нажми на надпись ✨"}
            {clickCount === 1 && "Красиво! Нажми еще 🌧️"}
            {clickCount === 2 && "Еще раз! 💫"}
            {clickCount >= 3 && "Магия свершилась! 🌸"}
          </div>
        </div>
      </div>
      
      {/* Цветы внизу экрана */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center pointer-events-none">
        {flowers.map(flower => (
          <div
            key={flower.id}
            className="absolute bottom-0 text-4xl md:text-5xl animate-flower-grow"
            style={{
              left: `${flower.left}%`,
              animationDelay: `${flower.animationDelay}s`
            }}
          >
            {flower.type}
          </div>
        ))}
      </div>
      
      {/* Декоративные звездочки */}
      <div className="absolute top-20 left-20 text-fairy-lavender/40 text-2xl animate-pulse">✨</div>
      <div className="absolute top-40 right-32 text-fairy-mint/40 text-xl animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
      <div className="absolute bottom-40 left-16 text-fairy-pink/40 text-3xl animate-pulse" style={{animationDelay: '2s'}}>💫</div>
      <div className="absolute top-60 left-1/3 text-fairy-sage/40 text-lg animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
      <div className="absolute bottom-60 right-20 text-fairy-lavender/40 text-2xl animate-pulse" style={{animationDelay: '1.5s'}}>🌟</div>
    </div>
  );
};

export default Index;