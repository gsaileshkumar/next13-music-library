import { ImageType } from "@solely/simple-fm";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1488372759477-a7f4aa078cb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80";

export const getImage = (imageArray: ImageType[]) => {
  if (imageArray && imageArray.length) {
    const imageUrl = imageArray[1].url;
    return imageUrl ? imageUrl : DEFAULT_IMAGE;
  }
  return DEFAULT_IMAGE;
};
