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
	const [isPaused, setIsPaused] = useState<boolean>(false);

	// Safety guard to block button-smashing during an active animation frame
	const isClickableRef = useRef<boolean>(true);

	// Expanded track array for seamless infinite looping [ Last, Real 1-5, First ]
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

	useEffect(() => {
		let timer: NodeJS.Timeout;

		const startTimer = () => {
			if (isPaused) return;
			timer = setInterval(() => {
				nextSlide();
			}, 6000);
		};

		const stopTimer = () => {
			clearInterval(timer);
		};

		const handleVisibilityChange = () => {
			if (document.hidden) {
				stopTimer();
			} else {
				startTimer();
			}
		};

		startTimer();
		document.addEventListener("visibilitychange", handleVisibilityChange);

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
						// Simple math: Shift left by exactly 100% per index
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
