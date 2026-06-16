import { Slider } from "./components/Slider";
import { slidesData } from "./data/slidesData";

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
							<a className="nav-link" href="/app.html">
								Considerations
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/code.html">
								The Code
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="https://github.com/helloshyann/sel-presentation"
								target="_blank"
							>
								The Repo
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

			{/* Injecting our beautiful custom slider */}
			<section className="interactive-showcase">
				<Slider slides={slidesData} />
			</section>
		</main>
	);
}

export default App;
