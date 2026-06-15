import React, { useState, useEffect, useRef } from "react";
import { type SlideItem } from "../data/slidesData";
import "../styles/slider.scss";

interface SliderProps {
	slides: SlideItem[];
}

export const Slider: React.FC<SliderProps> = ({ slides }) => {
	if (!slides || slides.length === 0)
		return <div className="slider-empty">No slides available.</div>;

	// Real slide count
	const totalRealSlides = slides.length;

	// State tracks our position relative to the expanded track array (Index 1 is the first REAL slide)
	const [virtualIndex, setVirtualIndex] = useState<number>(1);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
	const [isPaused, setIsPaused] = useState<boolean>(false);

	// Create our expanded track array: [ Last Slide, ...All Real Slides, First Slide ]
	const expandedSlides = [slides[totalRealSlides - 1], ...slides, slides[0]];

	const nextSlide = () => {
		// Prevent button-smashing during an active transition swap
		if (!isTransitioning) return;
		setVirtualIndex((prev) => prev + 1);
	};

	const prevSlide = () => {
		if (!isTransitioning) return;
		setVirtualIndex((prev) => prev - 1);
	};

	// Invisible Reset Handler: Runs automatically whenever a CSS slide transition finishes
	const handleTransitionEnd = () => {
		// Case A: We just slid forward onto the cloned first slide at the very end
		if (virtualIndex === expandedSlides.length - 1) {
			setIsTransitioning(false); // Disables CSS transition animation
			setVirtualIndex(1); // Instantly snaps back to the real first slide
		}
		// Case B: We just slid backward onto the cloned last slide at the very beginning
		else if (virtualIndex === 0) {
			setIsTransitioning(false); // Disables CSS transition animation
			setVirtualIndex(totalRealSlides); // Instantly snaps to the real last slide
		}
	};

	// Re-enable animations on the next tick after an instant snap reset happens
	useEffect(() => {
		if (!isTransitioning) {
			// Force a tiny layout recalculation window, then flip transitions back on
			const raf = requestAnimationFrame(() => {
				setIsTransitioning(true);
			});
			return () => cancelAnimationFrame(raf);
		}
	}, [isTransitioning]);

	// Autoplay Loop Logic (10 seconds)
	useEffect(() => {
		if (isPaused) return;
		const timer = setInterval(() => {
			nextSlide();
		}, 10000);
		return () => clearInterval(timer);
	}, [isPaused, virtualIndex, isTransitioning]);

	// Math to map our extended indices back to a clean 0-4 range for our pagination dots
	const getActiveDotIndex = () => {
		if (virtualIndex === 0) return totalRealSlides - 1;
		if (virtualIndex === expandedSlides.length - 1) return 0;
		return virtualIndex - 1;
	};

	return (
		<div
			className="slider-container"
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
		>
			<div className="slider-window">
				<div
					className="slider-track"
					onTransitionEnd={handleTransitionEnd}
					style={{
						transform: `translateX(-${virtualIndex * 100}%)`,
						// Dynamically remove the transition styling during the 0ms snap reset phase
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
									className="slider-button"
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

			<button className="nav-btn prev" onClick={prevSlide}>
				&larr;
			</button>
			<button className="nav-btn next" onClick={nextSlide}>
				&rarr;
			</button>

			<div className="slider-dots">
				{slides.map((_, index) => (
					<span
						key={index}
						className={`dot ${index === getActiveDotIndex() ? "active" : ""}`}
						onClick={() => {
							if (!isTransitioning) return;
							setVirtualIndex(index + 1);
						}}
					/>
				))}
			</div>
		</div>
	);
};
