import React, { useState, useEffect, useRef } from "react";
import { type SlideItem } from "../data/slidesData";
import "../styles/slider.scss";

interface SliderProps {
	slides: SlideItem[];
}

export const Slider: React.FC<SliderProps> = ({ slides }) => {
	if (!slides || slides.length === 0)
		return <div className="slider-empty">No slides available.</div>;

	const totalRealSlides = slides.length;
	const [virtualIndex, setVirtualIndex] = useState<number>(1);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

	const [isHoverPaused, setIsHoverPaused] = useState<boolean>(false);
	const [isManuallyPaused, setIsManuallyPaused] = useState<boolean>(false);

	const isClickableRef = useRef<boolean>(true);

	const expandedSlides = [slides[totalRealSlides - 1], ...slides, slides[0]];

	const nextSlide = () => {
		if (!isClickableRef.current) return;
		isClickableRef.current = false;
		setVirtualIndex((prev) => prev + 1);
	};

	const prevSlide = () => {
		if (!isClickableRef.current) return;
		isClickableRef.current = false;
		setVirtualIndex((prev) => prev - 1);
	};

	const handleTransitionEnd = () => {
		if (virtualIndex === expandedSlides.length - 1) {
			setIsTransitioning(false);
			setVirtualIndex(1);
		} else if (virtualIndex === 0) {
			setIsTransitioning(false);
			setVirtualIndex(totalRealSlides);
		} else {
			isClickableRef.current = true;
		}
	};

	useEffect(() => {
		if (!isTransitioning) {
			const raf = requestAnimationFrame(() => {
				setIsTransitioning(true);
				isClickableRef.current = true;
			});
			return () => cancelAnimationFrame(raf);
		}
	}, [isTransitioning]);

	// Autoplay Effect Engine
	useEffect(() => {
		let timer: NodeJS.Timeout | null = null;

		const startTimer = () => {
			// Check states BEFORE spinning up a new interval instance
			if (isHoverPaused || isManuallyPaused) {
				return;
			}

			timer = setInterval(() => {
				nextSlide();
			}, 6000);
		};

		const stopTimer = () => {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		};

		// Tab focus monitoring
		const handleVisibilityChange = () => {
			if (document.hidden) {
				stopTimer();
			} else {
				startTimer();
			}
		};

		// Initialize timer
		startTimer();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// This return function runs every single time a dependency changes.
		// It guarantees the old timer is completely killed before a new state takes over.
		return () => {
			stopTimer();
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};

		// Add both pause states so the hook destroys and rebuilds perfectly
	}, [isHoverPaused, isManuallyPaused, virtualIndex, isTransitioning]);

	const getActiveDotIndex = () => {
		if (virtualIndex === 0) return totalRealSlides - 1;
		if (virtualIndex === expandedSlides.length - 1) return 0;
		return virtualIndex - 1;
	};

	return (
		<div
			className="slider-container"
			onMouseEnter={() => setIsHoverPaused(true)}
			onMouseLeave={() => setIsHoverPaused(false)}
		>
			<div className="slider-window">
				<div
					className="slider-track"
					onTransitionEnd={handleTransitionEnd}
					style={{
						transform: `translateX(-${virtualIndex * 100}%)`,
						transition: isTransitioning
							? "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
							: "none",
					}}
				>
					{expandedSlides.map((slide, index) => (
						<div key={`${slide.id}-virtual-${index}`} className="slide-card">
							<div className="slide-text-side">
								<span className="product-label">{slide.tag}</span>
								<h2>{slide.title}</h2>
								<p>{slide.description}</p>
								<a
									href={slide.buttonUrl}
									className="slide-button"
									target={
										slide.buttonUrl.startsWith("http") ? "_blank" : "_self"
									}
									rel="noopener noreferrer"
								>
									{slide.buttonText}
								</a>
							</div>

							<div className="slide-image-side">
								<img src={slide.imageUrl} alt={slide.title} />
							</div>
						</div>
					))}
				</div>
			</div>

			{/* --- Control Row --- */}
			<div className="slider-controls-row">
				<button
					className="nav-btn prev"
					onClick={prevSlide}
					aria-label="Previous Slide"
				>
					&larr;
				</button>

				<button
					className="nav-btn next"
					onClick={nextSlide}
					aria-label="Next Slide"
				>
					&rarr;
				</button>
			</div>

			<div className="slider-dots">
				<button
					className={`toggle-pause-button ${isManuallyPaused ? "paused" : "playing"}`}
					onClick={() => setIsManuallyPaused(!isManuallyPaused)}
					aria-label={
						isManuallyPaused ? "Play slider autoplay" : "Pause slider autoplay"
					}
				>
					{isManuallyPaused ? (
						// Play Icon SVG
						<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
							<path d="M8 5v14l11-7z" />
						</svg>
					) : (
						// Pause Icon SVG
						<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
							<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
						</svg>
					)}
				</button>

				{slides.map((_, index) => (
					<span
						key={index}
						className={`dot ${index === getActiveDotIndex() ? "active" : ""}`}
						onClick={() => {
							if (!isTransitioning || !isClickableRef.current) return;
							setVirtualIndex(index + 1);
						}}
					/>
				))}
			</div>
		</div>
	);
};
