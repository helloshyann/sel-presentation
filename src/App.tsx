import { Slider } from "./components/Slider";
import { slidesData } from "./data/slidesData";

function App() {
	return (
		<main className="page-wrapper">
			<header className="hero-header">
				<div>
					<img src="src/assets/srs-fake-logo.png" className="fake-logo" />
					<h1>
						<span>Shyann's</span>
						<span>Responsive</span>
						<span>Slider</span>
					</h1>
				</div>
			</header>

			{/* Injecting our beautiful custom slider */}
			<section className="interactive-showcase">
				<Slider slides={slidesData} />
			</section>
		</main>
	);
}

export default App;
