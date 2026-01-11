import { useEffect, useRef } from "react";

const COLOR = "#FFFFFF";
const HIT_COLOR = " #808080"; // Changed to black to "erase" text like in the original demo concept often seen
const BACKGROUND_COLOR = "transparent"; // Made transparent to overlay on existing background if needed, or keep black
const BALL_COLOR = "#3B82F6"; // White ball
const PADDLE_COLOR = "#FFFFFF"; // White paddles
const LETTER_SPACING = 1;
const WORD_SPACING = 4;

const PIXEL_MAP = {
    P: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ],
    R: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 0, 1],
    ],
    O: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
    ],
    M: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
    ],
    T: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ],
    I: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 1],
    ],
    N: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
    ],
    G: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
    ],
    S: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 1],
        [1, 1, 1, 1],
    ],
    A: [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
    ],
    L: [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
    ],
    Y: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
    ],
    U: [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
    ],
    D: [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
    ],
    E: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
    ],
    // Extra letters needed for "BHANU PRAKASH"
    B: [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
    ],
    H: [
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
    ],
    K: [
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0],
        [1, 0, 0, 1],
    ],
    F: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
    ],
    K_LETTER: [ // duplicate K if needed or use alias
        [1, 0, 0, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0],
        [1, 0, 0, 1],
    ]
};

// Aliases for safety
PIXEL_MAP[' '] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
];


export function AnimatedHeroSection() {
    const canvasRef = useRef(null);
    const pixelsRef = useRef([]);
    const ballRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 });
    const paddlesRef = useRef([]);
    const scaleRef = useRef(1);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000);
            initializeGame();
        };

        const initializeGame = () => {
            const scale = scaleRef.current;
            const LARGE_PIXEL_SIZE = 22 * scale;
            const SMALL_PIXEL_SIZE = 8 * scale;
            const BALL_SPEED = 6 * scale;

            pixelsRef.current = [];
            const words = ["BHANU", "PRAKASH"]; // Changed text to USER's name

            const calculateWordWidth = (word, pixelSize) => {
                return (
                    word.split("").reduce((width, letter) => {
                        const letterInfo = PIXEL_MAP[letter.toUpperCase()];
                        const letterWidth = letterInfo ? letterInfo[0].length : 3;
                        return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize;
                    }, 0) -
                    LETTER_SPACING * pixelSize
                );
            };

            const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE);
            const totalWidthSmall = calculateWordWidth(words[1], LARGE_PIXEL_SIZE); // Both large? user said "Hero section only"

            const totalWidth = Math.max(totalWidthLarge, totalWidthSmall);

            // Center texts
            const startX1 = (canvas.width - totalWidthLarge) / 2;
            const startX2 = (canvas.width - totalWidthSmall) / 2;

            const letterHeight = 5 * LARGE_PIXEL_SIZE;
            const gap = 3 * LARGE_PIXEL_SIZE; // Increased gap to add visual "margin bottom" between lines
            const totalH = letterHeight * 2 + gap;

            const startY1 = (canvas.height - totalH) / 2;
            // Shift text slightly UP (subtract from Y) to create more visual space at bottom if desired, or just use the gap logic
            // User asked for margin bottom. Increasing gap helps.
            const startY2 = startY1 + letterHeight + gap;

            // FIRST WORD
            let currentX = startX1;
            words[0].split("").forEach((letter) => {
                const map = PIXEL_MAP[letter.toUpperCase()];
                if (map) {
                    for (let i = 0; i < map.length; i++) {
                        for (let j = 0; j < map[i].length; j++) {
                            if (map[i][j]) {
                                pixelsRef.current.push({
                                    x: currentX + j * LARGE_PIXEL_SIZE,
                                    y: startY1 + i * LARGE_PIXEL_SIZE,
                                    size: LARGE_PIXEL_SIZE,
                                    hit: false
                                });
                            }
                        }
                    }
                    currentX += (map[0].length + LETTER_SPACING) * LARGE_PIXEL_SIZE;
                }
            });

            // SECOND WORD
            currentX = startX2;
            words[1].split("").forEach((letter) => {
                const map = PIXEL_MAP[letter.toUpperCase()];
                if (map) {
                    for (let i = 0; i < map.length; i++) {
                        for (let j = 0; j < map[i].length; j++) {
                            if (map[i][j]) {
                                pixelsRef.current.push({
                                    x: currentX + j * LARGE_PIXEL_SIZE,
                                    y: startY2 + i * LARGE_PIXEL_SIZE,
                                    size: LARGE_PIXEL_SIZE,
                                    hit: false
                                });
                            }
                        }
                    }
                    currentX += (map[0].length + LETTER_SPACING) * LARGE_PIXEL_SIZE;
                }
            });

            // Initialize ball position near the top right corner
            const ballStartX = canvas.width * 0.9;
            const ballStartY = canvas.height * 0.1;

            ballRef.current = {
                x: ballStartX,
                y: ballStartY,
                dx: -BALL_SPEED,
                dy: BALL_SPEED,
                radius: LARGE_PIXEL_SIZE / 2,
            };

            const paddleWidth = LARGE_PIXEL_SIZE * 0.5; // Reduced thickness (bar size)
            const paddleLength = 25 * LARGE_PIXEL_SIZE;

            paddlesRef.current = [
                {
                    x: 10, // Added slight offset from wall
                    y: canvas.height / 2 - paddleLength / 2,
                    width: paddleWidth,
                    height: paddleLength,
                    targetY: canvas.height / 2 - paddleLength / 2,
                    isVertical: true,
                },
                {
                    x: canvas.width - paddleWidth - 10,
                    y: canvas.height / 2 - paddleLength / 2,
                    width: paddleWidth,
                    height: paddleLength,
                    targetY: canvas.height / 2 - paddleLength / 2,
                    isVertical: true,
                },
                {
                    x: canvas.width / 2 - paddleLength / 2,
                    y: 0,
                    width: paddleLength,
                    height: paddleWidth,
                    targetY: canvas.width / 2 - paddleLength / 2,
                    isVertical: false,
                },
                {
                    x: canvas.width / 2 - paddleLength / 2,
                    y: canvas.height - paddleWidth,
                    width: paddleLength,
                    height: paddleWidth,
                    targetY: canvas.width / 2 - paddleLength / 2,
                    isVertical: false,
                },
            ];
        };

        const updateGame = () => {
            const ball = ballRef.current;
            const paddles = paddlesRef.current;

            ball.x += ball.dx;
            ball.y += ball.dy;

            // Wall collision fallback
            if (ball.y < 0 || ball.y > canvas.height) ball.dy = -ball.dy;
            if (ball.x < 0 || ball.x > canvas.width) ball.dx = -ball.dx;

            // Paddle Collision Logic
            paddles.forEach((paddle) => {
                if (paddle.isVertical) {
                    if (
                        ball.x - ball.radius < paddle.x + paddle.width &&
                        ball.x + ball.radius > paddle.x &&
                        ball.y > paddle.y &&
                        ball.y < paddle.y + paddle.height
                    ) {
                        ball.dx = -ball.dx;
                    }
                } else {
                    if (
                        ball.y - ball.radius < paddle.y + paddle.height &&
                        ball.y + ball.radius > paddle.y &&
                        ball.x > paddle.x &&
                        ball.x < paddle.x + paddle.width
                    ) {
                        ball.dy = -ball.dy;
                    }
                }
            });

            // AI Paddle Movement
            paddles.forEach((paddle) => {
                const speed = 0.08;
                if (paddle.isVertical) {
                    paddle.targetY = ball.y - paddle.height / 2;
                    paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY));
                    paddle.y += (paddle.targetY - paddle.y) * speed;
                } else {
                    paddle.targetY = ball.x - paddle.width / 2;
                    paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY));
                    paddle.x += (paddle.targetY - paddle.x) * speed;
                }
            });

            // Pixel Collision (Breakout/Pong Hybrid)
            pixelsRef.current.forEach((pixel) => {
                if (
                    !pixel.hit &&
                    ball.x + ball.radius > pixel.x &&
                    ball.x - ball.radius < pixel.x + pixel.size &&
                    ball.y + ball.radius > pixel.y &&
                    ball.y - ball.radius < pixel.y + pixel.size
                ) {
                    pixel.hit = true; // "Break" the pixel

                    // Simple reflection
                    const centerX = pixel.x + pixel.size / 2;
                    const centerY = pixel.y + pixel.size / 2;
                    if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
                        ball.dx = -ball.dx;
                    } else {
                        ball.dy = -ball.dy;
                    }
                }
            });
        };

        const drawGame = () => {
            if (!ctx) return;

            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Pixels
            pixelsRef.current.forEach((pixel) => {
                // Only draw if not hit (or draw different color if hit)
                if (!pixel.hit) {
                    ctx.fillStyle = COLOR;
                    ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
                } else {
                    // Optional: Draw 'hit' color or just disappearing
                    ctx.fillStyle = HIT_COLOR;
                    ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
                }
            });

            // Draw Ball
            ctx.fillStyle = BALL_COLOR;
            ctx.beginPath();
            ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2);
            ctx.fill();

            // Draw Paddles
            ctx.fillStyle = PADDLE_COLOR;
            paddlesRef.current.forEach((paddle) => {
                ctx.beginPath();
                // 5px border radius as requested
                // Note: roundRect is supported in modern browsers. If strict compat needed, allow fallback roughly.
                if (ctx.roundRect) {
                    ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 5);
                } else {
                    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
                }
                ctx.fill();
            });
        };

        const gameLoop = () => {
            updateGame();
            drawGame();
            requestAnimationFrame(gameLoop);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        const animationId = requestAnimationFrame(gameLoop);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-10 backdrop-blur-sm" // positioned absolute within relative hero
            aria-label="Interactive Hero Animation"
        />
    );
}
