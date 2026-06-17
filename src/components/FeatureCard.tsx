import React from "react";
import { type FeatureItem } from "../data/featuresData";

interface FeatureCardProps {
	card: FeatureItem;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ card }) => {
	const { tag, title, question, why, how } = card;

	return (
		<div className="feature-card uniform-layout-card">
			<div className="card-content-column">
				{tag && <span className="card-tag">{tag}</span>}
				<h3 className="card-title">{title}</h3>
				<p className="card-question">{question}</p>
				<h4>Why?</h4>
				<p className="card-description">{why}</p>
				<h4>How?</h4>
				<p className="card-description">{how}</p>
			</div>
		</div>
	);
};
