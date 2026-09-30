const canvas = document.querySelector('.ambient__canvas');
const context = canvas?.getContext('2d', { alpha: false });

if (context) {
  const hero = canvas.closest('.hero');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const colors = [
    [5, 13, 20],     // Near black
    [12, 38, 56],    // Dark blue
    [18, 76, 79],    // Teal
    [59, 104, 79],   // Muted green
  ];
  const stops = [0, 0.34, 0.68, 1];
  let animationFrame = 0;
  let lastFrame = 0;
  let elapsed = 0;

  function draw(time) {
    const { width, height } = canvas;
    if (!width || !height) return;

    const image = context.createImageData(width, height);
    const pixels = image.data;

    for (let row = 0; row < height; row += 1) {
      const y = row / height;
      for (let column = 0; column < width; column += 1) {
        const x = column / width;
        const warpedX = x
          + 0.075 * Math.sin(7 * y + time * 0.4)
          + 0.04 * Math.sin(12 * y - 3 * x - time * 0.26);
        const warpedY = y + 0.08 * Math.sin(5 * x - time * 0.36);
        const phase = 9 * (warpedY - 0.5 * warpedX)
          + 1.2 * Math.sin(4 * warpedX + time * 0.23);
        const field = 0.48
          + 0.27 * Math.sin(phase - time * 0.32)
          + 0.14 * Math.sin(phase * 0.53 + 3 * warpedX + time * 0.16)
          + 0.08 * Math.sin(6 * warpedX + 4 * warpedY - time * 0.2);
        const value = Math.max(0, Math.min(1, field));

        let band = 0;
        while (band < stops.length - 2 && value > stops[band + 1]) band += 1;
        const mix = (value - stops[band]) / (stops[band + 1] - stops[band]);
        const smoothMix = mix * mix * (3 - 2 * mix);
        const shade = 0.78 + 0.14 * x + 0.08 * y;
        const index = (row * width + column) * 4;

        for (let channel = 0; channel < 3; channel += 1) {
          pixels[index + channel] = shade * (
            colors[band][channel] * (1 - smoothMix)
            + colors[band + 1][channel] * smoothMix
          );
        }
        pixels[index + 3] = 255;
      }
    }

    context.putImageData(image, 0, 0);
  }

  function resize() {
    const { width, height } = hero.getBoundingClientRect();
    const scale = Math.min(0.5, 360 / width, 300 / height);
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    draw(elapsed);
  }

  function stop() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    lastFrame = 0;
  }

  function tick(now) {
    animationFrame = requestAnimationFrame(tick);
    if (now - lastFrame < 1000 / 24) return;
    elapsed += lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
    lastFrame = now;
    draw(elapsed);
  }

  function updateMotion() {
    stop();
    if (motionPreference.matches) {
      draw(0);
    } else if (!document.hidden) {
      animationFrame = requestAnimationFrame(tick);
    }
  }

  new ResizeObserver(resize).observe(hero);
  motionPreference.addEventListener('change', updateMotion);
  document.addEventListener('visibilitychange', updateMotion);
  resize();
  updateMotion();
}
