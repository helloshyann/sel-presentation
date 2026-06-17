import React from "react";
import { FeatureCard } from "./FeatureCard";
import { featuresData } from "../data/featuresData";
import "../styles/features.scss";

export const FeatureGrid: React.FC = () => {
	return (
		<section className="features-section-wrapper">
			<h2>Design & Development Considerations</h2>
			<div className="features-uniform-grid">
				{featuresData.map((card) => (
					<FeatureCard key={card.id} card={card} />
				))}
			</div>
		</section>
	);
};
