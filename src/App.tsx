import { Slider } from "./components/Slider";
import { slidesData } from "./data/slidesData";
import { FeatureGrid } from "./components/FeatureGrid";

function App() {
	return (
		<main className="page-wrapper">
			<header className="hero-header">
				<a className="hero-logo" href="/index.html">
					<img src="src/assets/srs-fake-logo.png" />
					<h1>
						<span>Shyann's</span>
						<span>Responsive</span>
						<span>Slider</span>
					</h1>
				</a>

				<nav className="navbar">
					<ul className="navbar-list">
						<li className="nav-item">
							<a
								className="nav-link active"
								aria-current="page"
								href="/index.html"
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="https://github.com/helloshyann/sel-presentation"
								target="_blank"
							>
								Repository
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="https://helloshyann.com"
								target="_blank"
							>
								Portfolio
							</a>
						</li>
					</ul>
				</nav>
			</header>

			<section className="slider-showcase">
				<Slider slides={slidesData} />
			</section>
			<FeatureGrid />
			<footer>
				<a href="https://selinc.com/" target="_blank">
					Made for SEL
				</a>
			</footer>
		</main>
	);
}

export default App;
