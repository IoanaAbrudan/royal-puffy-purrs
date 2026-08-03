export type CatListingImage = {
  image: string;
  imageAlt: string;
};

export type CatListingImageRecord = {
  imagePath: string;
  imageAlt: string;
};

export type CatListing = {
  id: string;
  name: string;
  breed: string;
  age: string;
  temperament: string;
  color: string;
  status: "coming-soon" | "available";
  priceGbp?: number;
  image?: string;
  imageAlt?: string;
  images?: readonly CatListingImage[];
};

export type CatListingRecord = {
  id: string;
  name: string;
  breed: string;
  age: string;
  temperament: string;
  color: string;
  status: "coming-soon" | "available";
  priceGbp?: number;
  imagePath?: string;
  imageAlt?: string;
  images?: CatListingImageRecord[];
};

const defaultCats: CatListingRecord[] = [
  {
    id: "duchess-mabel",
    name: "Duchess Mabel",
    breed: "British Shorthair",
    age: "Kitten",
    temperament:
      "A beautiful blue British Shorthair with a plush coat and striking amber eyes. Calm and cuddly on her favourite cushion, and curious and playful on our wooden climbing steps — lovingly raised in our cattery.",
    color: "Blue",
    status: "available",
    priceGbp: 650,
    imagePath: "/cats/duchess-mabel-1.jpg",
    imageAlt:
      "Duchess Mabel, a blue British Shorthair kitten with amber eyes resting on a cushion",
    images: [
      {
        imagePath: "/cats/duchess-mabel-1.jpg",
        imageAlt:
          "Duchess Mabel, a blue British Shorthair kitten with amber eyes resting on a cushion in our cattery",
      },
      {
        imagePath: "/cats/duchess-mabel-2.jpg",
        imageAlt:
          "Duchess Mabel, a blue British Shorthair kitten exploring the wooden climbing steps",
      },
    ],
  },
];

export const catsContent = {
  imageVersion: 2,
  cats: defaultCats,
} as const;
