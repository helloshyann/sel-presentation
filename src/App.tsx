import "./App.scss";
import { Slider } from "./components/Slider";
import { slidesData } from "./data/slidesData";

function App() {
	return (
		<main className="page-wrapper">
			<header className="hero-header">
				<h1>The Wanderer's Archives</h1>
				<p>A single-page showcase of atmospheric realms.</p>
			</header>

			{/* Injecting our beautiful custom slider */}
			<section className="interactive-showcase">
				<Slider slides={slidesData} />
			</section>
		</main>
	);
}

export default App;
