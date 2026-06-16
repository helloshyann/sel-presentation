// Define the shape of a single slide using TypeScript
export interface SlideItem {
	id: number;
	tag: string;
	title: string;
	description: string;
	imageUrl: string;
	buttonText: string;
	buttonUrl: string;
}

// Create an array of mock data using that exact shape
export const slidesData: SlideItem[] = [
	{
		id: 1,
		tag: "Product",
		title: "Coming Soon: The SEL‑T35 Time-Domain Power Monitor",
		description:
			"Capture every disturbance, including harmonics, distortion, and subsynchronous oscillations (SSO). The SEL-T35 streams high-precision ac and dc voltage and current measurements to Synchrowave software for wide-area, real-time data analysis, trending, and alarming.",
		imageUrl: "src/assets/MKTGREN-560_T35_computerMonitor_WaveScreen_01.webp",
		buttonText: "Learn More",
		buttonUrl:
			"https://selinc.com/mktg/never-miss-an-event-with-the-sel-t35-time-domain-power-monitor/",
	},
	{
		id: 2,
		tag: "Now Available",
		title: "Expanded I/O Modules for the SEL-751",
		description:
			"Scale into new applications and support future needs by ordering the SEL-751 Feeder Protection Relay with up to four integrated I/O modules. Each module adds 21 programmable inputs or 12 contact outputs.",
		imageUrl: "src/assets/751.webp",
		buttonText: "Learn more about the SEL-751",
		buttonUrl: "https://selinc.com/products/751/",
	},
	{
		id: 3,
		tag: "Product",
		title: "New Ethernet Switches: High Speed, Small Form Factor",
		description:
			"Board a rickety airship and navigate through rolling, copper-colored clouds.",
		imageUrl: "src/assets/MKTGREN-584_2743_44_Duo_LF_high_01.webp",
		buttonText: "Learn More",
		buttonUrl: "https://selinc.com/mktg/2743-2744-managed-ethernet-switches/",
	},
	{
		id: 4,
		tag: "Solution",
		title:
			"Puget Sound Energy Collaborates With Customers for Community Microgrid",
		description:
			"Storm seasons on Samish Island, Washington, left the remote fire station and community facing frequent and prolonged power outages. Discover how one resident’s idea sparked a collaboration between Puget Sound Energy, SEL, and three homeowners to create a microgrid that delivers reliable, resilient backup power for critical services and serves as a living lab for future energy projects.",
		imageUrl: "src/assets/PSE_Samish_2025-218.webp",
		buttonText: "Learn More",
		buttonUrl: "https://selinc.com/highlights/puget-sound-energy-pse/",
	},
	{
		id: 5,
		tag: "Product",
		title:
			"Upgrade Legacy Transformer Relays With Space-Efficient SEL-487E Options",
		description:
			"The SEL‑487E Transformer Protection Relay is now available in smaller form factors, including a 3U version. Simplify retrofits in control houses where space is limited, and enable advanced protection upgrades by using flexible analog input options tailored to your application.",
		imageUrl: "src/assets/MKTGREN-659_487E_3U_RM_LF_01.webp",
		buttonText: "Learn More",
		buttonUrl: "https://selinc.com/products/487e/",
	},
];
