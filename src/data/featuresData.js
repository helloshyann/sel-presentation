"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featuresData = void 0;
var featuresData = exports.featuresData = [{
  id: 1,
  tag: "Consideration #1",
  title: "Architectural Data Modeling",
  question: "How do we build a slider so that a non-technical user can easily add new slides later without breaking the layout?",
  why: "If the text and image placements are placed directly into the structural code, a developer has to manually rewrite the code each time a product changes or a new promotion launches.",
  how: "We separate the design template from the content using TypeScript to map out predictable properties (id, tag, title, description, imageUrl, buttonText, buttonUrl). The slider loops through the list and adds the content to the template automatically, making it easy to add, remove, or swap slides."
}, {
  id: 2,
  tag: "Consideration #2",
  title: "Responsive Screen Adaption",
  question: "How do we handle responsive presentation across desktop, tablet, and mobile displays?",
  why: "Wide, multi-column layouts look great on desktop, but can break aspect ratios and overflow off-screen on tablets and mobile viewports.",
  how: "We can utilize responsive SCSS breakpoint mixins to apply single-column styles when specific screen sizes are detected."
}, {
  id: 3,
  tag: "Consideration #3",
  title: "Smart Autoplay with Reading Protection",
  question: "How do we safely automate slide progression without frustrating someone who is actively trying to read the text or click a button?",
  why: "Auto-advancing slides while a user is actively reading or trying to click a CTA button creates a frustrating user experience.",
  how: "First, we have the interval timer automatically pause when it detects the user's cursor has entered the element. Then, we add a manual play/pause toggle button with the slider's navigation dots for further accessability. Now, if a user hovers over a card or clicks the pause button, the automatic timer freezes and won't wake up until the user moves their move away or hits play again."
}, {
  id: 4,
  tag: "Consideration #4",
  title: "Button Smash Protection",
  question: "How do we prevent the slider from visually breaking if a user starts rapidly clicking through the navigation arrows?",
  why: "If a user gets impatient and quickly clicks through the navigation while the slider is in the middle of a moving transition, the system can get confused about which slide it is displaying and cause layout drifts or blank slides.",
  how: "We introduce a safety lock that allows the system to temporarily ignore extra clicks when a user clicks an arrow button, allowing  time for the current slide to finish transitioning. Once it stops, the system unlocks the buttons for the next click."
}, {
  id: 5,
  tag: "Consideration #5",
  title: "Create a Seamless, Infinite Loop",
  question: "How do we keep the slider spinning smoothly like a carousel without snapping or visually rewinding when it reaches the last slide?",
  why: "If the slider hits the last slide and suddenly fast-rewinds all the way back to the beginning, it looks jarring and unpolished. The carousel must feel like an endless, circular track.",
  how: "We create an expanded array that duplicates the last slide at the very beginning and the first slide at the very end of the deck. The moment the clone of Slide 1 finishes animating into view, the track instantly drops its CSS animation transition and snaps back to the real Slide 1 position completely undetected by the eye."
}];