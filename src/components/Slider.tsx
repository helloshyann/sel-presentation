import React, { useState, useEffect } from "react";
import { type SlideItem } from "../data/slidesData";
import "../styles/slider.scss";

interface SliderProps {
	slides: SlideItem[];
}

export const Slider: React.FC<SliderProps> = ({ slides }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isPaused, setIsPaused] = useState<boolean>(false);

	// Determine the maximum index we can slide to without showing empty space
	const visibleSlides = 3;
	const maxIndex = slides.length - visibleSlides;

	// Handler to advance forward
	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
	};

	// Handler to go backward
	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? maxIndex : prevIndex - 1,
		);
	};

	// Autoplay Logic with Pause State Listener
	useEffect(() => {
		// If the user is hovering, do not spin up the timer
		if (isPaused) return;

		// Set a 10-second interval (10000 milliseconds)
		const timer = setInterval(() => {
			nextSlide();
		}, 10000);

		// CRITICAL CLEANUP: Wipes the timer when the component unmounts or pause changes
		return () => clearInterval(timer);
	}, [isPaused, currentIndex]); // Dependencies re-trigger the effect cleanly

	if (!slides || slides.length === 0) {
		return <div className="slider-empty">No slides available.</div>;
	}

	return (
		<div
			className="slider-container"
			onMouseEnter={() => setIsPaused(true)} // Pauses timer on cursor enter
			onMouseLeave={() => setIsPaused(false)} // Resumes timer on cursor leave
		>
			<div className="slider-window">
				<div
					className="slider-track"
					style={{
						// We shift by (100 / 3)% per index to step exactly 1 card width
						transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
					}}
				>
					{slides.map((slide) => (
						<div
							key={slide.id}
							className="slide-card"
							style={{
								backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${slide.imageUrl})`,
							}}
						>
							<div className="slide-content">
								<h2>{slide.title}</h2>
								<p>{slide.subtitle}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Navigation Controls */}
			<button className="nav-btn prev" onClick={prevSlide}>
				&larr;
			</button>
			<button className="nav-btn next" onClick={nextSlide}>
				&rarr;
			</button>

			{/* Pagination Dots (Only render up to the max navigable index) */}
			<div className="slider-dots">
				{Array.from({ length: maxIndex + 1 }).map((_, index) => (
					<span
						key={index}
						className={`dot ${index === currentIndex ? "active" : ""}`}
						onClick={() => setCurrentIndex(index)}
					/>
				))}
			</div>
		</div>
	);
};
