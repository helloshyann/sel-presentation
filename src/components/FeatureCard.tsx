import React from "react";
import { type FeatureItem } from "../data/featuresData";

interface FeatureCardProps {
	card: FeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => {
	const { tag, title, description } = card;

	return (
		<div className="feature-card uniform-layout-card">
			<div className="card-content-column">
				{tag && <span className="card-tag">{tag}</span>}
				<h3 className="card-title">{title}</h3>
				<p className="card-description">{description}</p>
			</div>
		</div>
	);
};
