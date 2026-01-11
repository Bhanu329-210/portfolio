import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Carousel = ({ items, showCarousel = true, cardsPerView = 1 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef(null);

    // Calculate width percentage for each card based on cardsPerView
    // In the original code: const cardWidth = 75 / cardsPerView; 
    // But typically for a full carousel taking 100% width, it should be 100 / cardsPerView.
    // The provided code used 75, likely for a specific look. 
    // I'll adjust to 100 to fit the container properly for a standard carousel.
    // Calculate width percentage for each card relative to the container
    // The container holds (cardsPerView + 1) items.
    // So each item takes up 100 / (cardsPerView + 1) percent of the container width.
    const cardWidth = 100 / (cardsPerView + 1);

    const nextSlide = () => {
        if (isAnimating || !showCarousel || !items) return;

        // Don't allow navigation if there aren't enough cards
        if (items.length <= cardsPerView) return;

        setIsAnimating(true);
        const nextIndex = (currentIndex + 1) % items.length;

        if (containerRef.current) {
            // Apply slide out animation
            containerRef.current.style.transition = "transform 500ms ease";
            containerRef.current.style.transform = `translateX(-${cardWidth}%)`;

            // After animation completes, reset position and update index
            setTimeout(() => {
                setCurrentIndex(nextIndex);
                if (containerRef.current) {
                    containerRef.current.style.transition = "none";
                    containerRef.current.style.transform = "translateX(0)";

                    // Force reflow
                    void containerRef.current.offsetWidth;

                    setIsAnimating(false);
                }
            }, 500);
        }
    };

    const prevSlide = () => {
        if (isAnimating || !showCarousel || !items) return;
        if (items.length <= cardsPerView) return;

        setIsAnimating(true);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;

        if (containerRef.current) {
            // First move instantly to the "left" position (simulating previous card being there)
            containerRef.current.style.transition = "none";
            containerRef.current.style.transform = `translateX(-${cardWidth}%)`;

            // Update the index immediately so the "previous" card becomes the first in the visible list
            setCurrentIndex(prevIndex);

            // Force reflow
            void containerRef.current.offsetWidth;

            // Then animate back to 0 (center)
            containerRef.current.style.transition = "transform 500ms ease";
            containerRef.current.style.transform = "translateX(0)";

            setTimeout(() => {
                setIsAnimating(false);
            }, 500);
        }
    };

    // Calculate which cards to show
    const getVisibleCards = () => {
        if (!showCarousel || !items) return items || [];

        const visibleCards = [];
        const totalCards = items.length;

        // For loop logic: we need enough cards to fill views + 1 buffer for animation?
        // The original code rendered `cardsPerView + 1` cards.
        // If we have items [A, B, C, D] and cardsPerView=1.
        // Index 0: Visible [A, B] (B is buffer for sliding right).
        // If we slide right, we move -100%. A goes out, B takes place. 
        // Then we reset transform to 0 and switch index to 1 (Card B).
        // So yes, we need cardsPerView + 1.

        for (let i = 0; i < cardsPerView + 1; i++) {
            const index = (currentIndex + i) % totalCards;
            visibleCards.push(items[index]);
        }

        return visibleCards;
    };

    if (!items || items.length === 0) {
        return <div>No card data available</div>;
    }

    // The simplified math for widths:
    // Container width needs to be wide enough to hold (cardsPerView + 1) items.
    // If the visible area (parent) is 100%, and we want to show `cardsPerView` items:
    // Each item is `100% / cardsPerView`.
    // The flex container, holding `cardsPerView + 1` items, must be `(cardsPerView + 1) * (100% / cardsPerView)` wide relative to the parent.
    // Example: 1 view. Item = 100%. Container holds 2 items -> 200% width.
    const containerWidth = (cardsPerView + 1) * 100 / cardsPerView;
    const itemWidth = 100 / (cardsPerView + 1); // Relative to the flex container

    return (
        <div className="w-full px-4 relative group">
            {/* Carousel Controls */}
            {showCarousel && items.length > cardsPerView && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-between z-20 px-2 lg:-mx-12">
                    <button
                        onClick={prevSlide}
                        className="pointer-events-auto bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm border border-white/10"
                        disabled={isAnimating}
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="pointer-events-auto bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all duration-300 backdrop-blur-sm border border-white/10"
                        disabled={isAnimating}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            )}

            {/* Cards Container Wrapper - limits visible area */}
            <div className="overflow-hidden w-full max-w-sm mx-auto sm:max-w-md md:max-w-xl">
                {/* Sliding Cards Container */}
                <div
                    ref={containerRef}
                    className="flex"
                    style={{
                        transform: "translateX(0)",
                        width: showCarousel ? `${containerWidth}%` : '100%'
                    }}
                >
                    {getVisibleCards().map((item, idx) => (
                        <div
                            key={`card-${currentIndex}-${idx}`}
                            style={{
                                width: showCarousel ? `${itemWidth}%` : `${100 / items.length}%`
                            }}
                            className="px-4 flex justify-center"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
