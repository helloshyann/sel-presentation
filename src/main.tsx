import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./styles/partials/_variables.scss";
import "./styles/partials/_mixins.scss";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
