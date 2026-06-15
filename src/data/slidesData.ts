// Define the shape of a single slide using TypeScript
export interface SlideItem {
	id: number;
	title: string;
	subtitle: string;
	imageUrl: string;
}

// Create an array of mock data using that exact shape
export const slidesData: SlideItem[] = [
	{
		id: 1,
		title: "Whispering Woodlands",
		subtitle: "Explore deep, moss-covered forests where spirits wander.",
		imageUrl:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: 2,
		title: "The Coastal Market",
		subtitle:
			"A bustling seaside town filled with magic, trinkets, and fresh salt air.",
		imageUrl:
			"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: 3,
		title: "Skies of Wonder",
		subtitle:
			"Board a rickety airship and navigate through rolling, copper-colored clouds.",
		imageUrl:
			"https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: 4,
		title: "The Uncanny Metro",
		subtitle:
			"An abandoned underground platform frozen in time, humming with a strange, quiet electricity.",
		imageUrl:
			"https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
	},
	{
		id: 5,
		title: "Lantern-Lit Alleys",
		subtitle:
			"Wander down winding neon and paper-lantern paths in a midnight city that never sleeps.",
		imageUrl:
			"https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80",
	},
];
