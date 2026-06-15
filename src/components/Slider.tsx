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

	// CRITICAL GUARD: Prevents click-smashing from running out of bounds
	const isClickableRef = useRef<boolean>(true);

	// Create our expanded track array: [ Last Slide, ...All Real Slides, First Slide ]
	const expandedSlides = [slides[totalRealSlides - 1], ...slides, slides[0]];

	const nextSlide = () => {
		// If the lock is active, reject the click completely
		if (!isClickableRef.current) return;
		isClickableRef.current = false; // Engage lock immediately
		setVirtualIndex((prev) => prev + 1);
	};

	const prevSlide = () => {
		if (!isClickableRef.current) return;
		isClickableRef.current = false; // Engage lock immediately
		setVirtualIndex((prev) => prev - 1);
	};

	// Invisible Reset Handler: Runs automatically whenever a CSS slide transition finishes
	const handleTransitionEnd = () => {
		// Case A: We just slid forward onto the cloned first slide at the very end
		if (virtualIndex === expandedSlides.length - 1) {
			setIsTransitioning(false); // Disables CSS transition animation
			setVirtualIndex(1); // Instantly snaps back to the real first slide
		}
		// Case B: Slid backward onto the cloned last slide at the very beginning
		else if (virtualIndex === 0) {
			setIsTransitioning(false);
			setVirtualIndex(totalRealSlides);
		} else {
			// If we are moving between regular slides, unlock the buttons immediately
			isClickableRef.current = true;
		}
	};

	// Re-enable animations on the next tick after an instant snap reset happens
	useEffect(() => {
		if (!isTransitioning) {
			// Force a tiny layout recalculation window, then flip transitions back on
			const raf = requestAnimationFrame(() => {
				setIsTransitioning(true);
				// Release the click lock safely AFTER the slide has reset positions
				isClickableRef.current = true;
			});
			return () => cancelAnimationFrame(raf);
		}
	}, [isTransitioning]);

	// Autoplay Loop Logic + Browser Tab Focus Visibility Guard
	useEffect(() => {
		let timer: NodeJS.Timeout;

		const startTimer = () => {
			if (isPaused) return;
			timer = setInterval(() => {
				nextSlide();
			}, 10000);
		};

		const stopTimer = () => {
			clearInterval(timer);
		};

		// Safety check: Monitor if the user minimizes or changes tabs
		const handleVisibilityChange = () => {
			if (document.hidden) {
				stopTimer(); // Halt everything while tab is backgrounded
			} else {
				startTimer(); // Wake up cleanly when they click back
			}
		};

		// Initialize
		startTimer();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		// Cleanup lifecycle event hooks cleanly
		return () => {
			stopTimer();
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, [isPaused, virtualIndex, isTransitioning]);

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
							if (!isTransitioning || !isClickableRef.current) return;
							setVirtualIndex(index + 1);
						}}
					/>
				))}
			</div>
		</div>
	);
};
