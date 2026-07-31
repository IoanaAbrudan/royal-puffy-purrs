export type CatListing = {
  id: string;
  name: string;
  breed: string;
  age: string;
  temperament: string;
  color: string;
  status: "coming-soon" | "available";
  image?: string;
  imageAlt?: string;
};

export type CatListingRecord = {
  id: string;
  name: string;
  breed: string;
  age: string;
  temperament: string;
  color: string;
  status: "coming-soon" | "available";
  imagePath?: string;
  imageAlt?: string;
};

const defaultCats: CatListingRecord[] = [
  {
    id: "duchess-mabel",
    name: "Duchess Mabel",
    breed: "British Shorthair",
    age: "Growing in our cattery",
    temperament: "Calm, cuddly, playful with feather toys",
    color: "Blue cream",
    status: "coming-soon",
  },
];

export const catsContent = {
  imageVersion: 1,
  cats: defaultCats,
} as const;
