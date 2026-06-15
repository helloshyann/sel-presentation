import React, { useState } from "react";
import { type SlideItem } from "../data/slidesData";

// Tell our component it expects an array of slides as a "prop"
interface SliderProps {
	slides: SlideItem[];
}

export const Slider: React.FC<SliderProps> = ({ slides }) => {
	// This state tracker will keep track of which slide index is currently active
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	// If there are no slides, don't break the page
	if (!slides || slides.length === 0) {
		return <div className="slider-empty">No slides available.</div>;
	}

	// Handlers to go back and forth
	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
		);
	};

	return (
		<div className="slider-container">
			{/* The window crops everything outside of it */}
			<div className="slider-window">
				{/* The track moves horizontally based on the active index */}
				<div
					className="slider-track"
					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
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

			{/* Slide Indicators / Pagination Dots */}
			<div className="slider-dots">
				{slides.map((_, index) => (
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
