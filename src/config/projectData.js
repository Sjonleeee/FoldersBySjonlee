import volkswagen from "../assets/images/volkswagen.jpeg";
import project1Img from "../assets/images/latestProjects/project1.png";
import popUpStoreBerlinImg from "../assets/images/popup.png";
// import meer images als nodig

export const projects = [
  // All Projects
  { 
    slug: "volkswagenproject",
    title: "Volkswagen Project",
    image: volkswagen,
    body: ["Volkswagen Project content."],
    tags: ["Graphic design", "Posters", "Clothing"],
    dropcap: "V",
  },
  {
    slug: "chromemagazine",
    title: "Chrome Magazine",
    image: project1Img,
    body: ["Chrome Magazine content."],
    tags: ["Magazine", "Design"],
    dropcap: "C",
  },
  {
    slug: "rinkitoucreativeagency",
    title: "Rinkitou Creative Agency",
    image: project1Img,
    body: ["Rinkitou Creative Agency content."],
    tags: ["Agency", "Branding"],
    dropcap: "R",
  },
  {
    slug: "popupstoreberlin",
    title: "Pop Up Store Berlin",
    image: popUpStoreBerlinImg,
    body: [
      "Thrilled to share that my very first pop-up store in collaboration with ObeyArtSpace was a huge success!",
      "Over 280 people attended — all fresh faces, young creatives, and amazing energy throughout the event. The space was filled with curiosity, community, and great vibes.",
      "A huge thank you to ObeyArtSpace for believing in the idea, and to my creative agency and everyone involved in making this happen — from the projects to the event itself. ❤️",
      "See you next year. Bigger, louder, weirder.",
    ],
    tags: ["Graphic design", "Posters", "Clothing"],
    dropcap: "T",
  },
  {
    slug: "clothingdesign",
    title: "Clothing Design",
    image: project1Img,
    body: ["Clothing Design content."],
    tags: ["Clothing", "Fashion"],
    dropcap: "C",
  },
  {
    slug: "3ddesign",
    title: "3D design",
    image: project1Img,
    body: ["3D design content."],
    tags: ["3D", "Design"],
    dropcap: "3",
  },
  // Hidden
  {
    slug: "youngerme",
    title: "Younger me",
    image: project1Img,
    body: ["Younger me project content."],
    tags: ["Hidden", "Archive"],
    dropcap: "Y",
  },
  {
    slug: "firstportfolio",
    title: "FirstPortfolio",
    image: project1Img,
    body: ["FirstPortfolio project content."],
    tags: ["Hidden", "Archive"],
    dropcap: "F",
  },
  {
    slug: "olddesigns",
    title: "Old Designs",
    image: project1Img,
    body: ["Old Designs project content."],
    tags: ["Hidden", "Archive"],
    dropcap: "O",
  },
  // Untitled
  {
    slug: "moodboard1",
    title: "Moodboard 1",
    image: project1Img,
    body: ["Moodboard 1 project content."],
    tags: ["Untitled"],
    dropcap: "M",
  },
  {
    slug: "untitled1",
    title: "Untitled 1",
    image: project1Img,
    body: ["Untitled 1 project content."],
    tags: ["Untitled"],
    dropcap: "U",
  },
  {
    slug: "untitled2",
    title: "Untitled 2",
    image: project1Img,
    body: ["Untitled 2 project content."],
    tags: ["Untitled"],
    dropcap: "U",
  },
  // Coming soon
  {
    slug: "rinkitounewcollection",
    title: "rinkitou® new collection",
    image: project1Img,
    body: ["rinkitou® new collection project content."],
    tags: ["Coming soon"],
    dropcap: "R",
  },
  {
    slug: "lettertofutureme",
    title: "Letter to future me",
    image: project1Img,
    body: ["Letter to future me project content."],
    tags: ["Coming soon"],
    dropcap: "L",
  },
];
