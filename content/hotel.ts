export type HotelSuiteImage = {
  image: string;
  imageAlt: string;
  objectPosition: string;
};

export type HotelSuite = {
  id: string;
  title: string;
  description: string;
  highlights: readonly string[];
  image: string;
  imageAlt: string;
  objectPosition: string;
  images: readonly HotelSuiteImage[];
};

export type HotelSuiteImageRecord = {
  imagePath: string;
  imageAlt: string;
  objectPosition?: string;
};

export type HotelSuiteRecord = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  imagePath: string;
  imageAlt: string;
  objectPosition: string;
  images?: HotelSuiteImageRecord[];
};

const defaultSuites: HotelSuiteRecord[] = [
  {
    id: "garden-suite",
    title: "Garden view suite",
    description:
      "A bright private room with garden views, climbing bridge, and a cosy corner bed for afternoon naps.",
    highlights: [
      "Garden-facing glass doors",
      "Suspended wooden climbing bridge",
      "Spacious light-wood flooring",
    ],
    imagePath: "/hotel/garden-suite.jpg",
    imageAlt:
      "Garden view suite with wooden climbing bridge and outdoor light through glass doors",
    objectPosition: "center 45%",
    images: [
      {
        imagePath: "/hotel/garden-suite-exterior.jpg",
        imageAlt:
          "Garden view suite exterior with flower boxes and warm evening light",
        objectPosition: "center",
      },
      {
        imagePath: "/hotel/garden-suite-hallway.jpg",
        imageAlt:
          "Garden view suite corridor with private glass-front rooms and garden outlook",
        objectPosition: "center",
      },
      {
        imagePath: "/hotel/garden-suite-interior.jpg",
        imageAlt:
          "Garden view suite interior with designer cat tree, wooden walls, and feeding station",
        objectPosition: "center",
      },
      {
        imagePath: "/hotel/garden-suite.jpg",
        imageAlt:
          "Garden view suite with wooden climbing shelves, suspension bridge, mesh-safe doors, and light wood flooring",
        objectPosition: "center 45%",
      },
    ],
  },
  {
    id: "deluxe-suite",
    title: "Deluxe climbing suite",
    description:
      "Extra vertical space with a designer cat tree, wooden hideaway, and dedicated feeding station.",
    highlights: [
      "Designer cat tree with woven perches",
      "Wooden hideaway & feeding station",
      "Quiet wood-panelled walls",
    ],
    imagePath: "/hotel/deluxe-suite.jpg",
    imageAlt:
      "Deluxe climbing suite with designer cat tree, wooden house, and feeding bowls",
    objectPosition: "center 35%",
  },
  {
    id: "suites-hallway",
    title: "Private suite corridor",
    description:
      "Individual glass-front suites along a calm hallway — each with garden views and its own secure door.",
    highlights: [
      "Private glass-front suites",
      "Natural light & garden outlook",
      "Secure individual access",
    ],
    imagePath: "/hotel/suites-hallway.jpg",
    imageAlt:
      "Row of private cat hotel suites with glass doors and garden views",
    objectPosition: "center 40%",
  },
  {
    id: "cozy-cubby",
    title: "Cozy wall cubby",
    description:
      "Handcrafted wooden hideaways for snoozing, peeking, and feeling safely tucked away.",
    highlights: [
      "Handcrafted pine cubby with cat-head cutout",
      "Soft patterned bedding",
      "Perfect for pairs who cuddle",
    ],
    imagePath: "/hotel/cozy-cubby.jpg",
    imageAlt:
      "Ginger and grey kittens cuddling inside a handcrafted wooden wall cubby",
    objectPosition: "center 42%",
  },
  {
    id: "wall-cubby",
    title: "Garden wall cubby",
    description:
      "Elevated wooden cubby with ladder access — ideal for curious climbers who love a view.",
    highlights: [
      "Wall-mounted cubby with ladder",
      "Natural wood panel walls",
      "Quiet peek-and-rest nook",
    ],
    imagePath: "/hotel/wall-cubby.jpg",
    imageAlt:
      "Ginger kitten in an elevated wooden wall cubby with ladder access",
    objectPosition: "center 30%",
  },
  {
    id: "suite-gallery",
    title: "Royal suite collection",
    description:
      "A peek inside our cattery — warm wood finishes, secure mesh doors, and plenty of natural light.",
    highlights: [
      "Warm wood & white finishes",
      "Secure mesh-screen doors",
      "Bright, airy environment",
    ],
    imagePath: "/hotel/suite-gallery.jpg",
    imageAlt:
      "Interior corridor of luxury cat suites with wooden doors and natural light",
    objectPosition: "center 38%",
  },
];

export const hotelContent = {
  eyebrow: "Book a suite",
  title: "Choose your cat's royal room",
  description:
    "Browse our suites one at a time — use the arrows to find the perfect room for your cat.",
  pricing: {
    label: "£30–£35 per day",
    note: "Per cat, per night. Contact us for multi-cat stays.",
  },
  features: [
    "Private suites with climbing walls & cubbies",
    "Garden-view windows & mesh-safe glass doors",
    "24/7 webcam monitoring for peace of mind",
    "Stainless feeding stations & premium litter care",
  ],
  imageVersion: 4,
  suites: defaultSuites,
} as const;
