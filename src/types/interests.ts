export interface PrimaryImage {
  url: string;
  width: number;
  height: number;
}

export interface Interest {
  id: string;
  name: string;
  primaryImage: PrimaryImage;
  description?: string;
  isSubgenre?: boolean;
}

export interface Category {
  category: string;
  interests: Interest[];
}

export interface InterestData {
  categories: Category[];
}

// Type guards for runtime type checking
export const isInterest = (
  obj: { id: unknown; name: unknown; 
    primaryImage: { 
      url: unknown; width: unknown; height: unknown; 
    }; }): obj is Interest => {
  return (
    typeof obj === 'object' &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.primaryImage === 'object' &&
    typeof obj.primaryImage.url === 'string' &&
    typeof obj.primaryImage.width === 'number' &&
    typeof obj.primaryImage.height === 'number'
  );
};

export const isCategory = (obj: { category: unknown; interests: Interest[] }): obj is Category => {
  return (
    typeof obj === 'object' &&
    typeof obj.category === 'string' &&
    Array.isArray(obj.interests) &&
    obj.interests.every(isInterest)
  );
};