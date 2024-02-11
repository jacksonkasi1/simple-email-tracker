import { Context } from 'hono';

// Utility function to fetch an image and return it as a buffer
export const fetchImageToBuffer = async (c: Context, imageUrl: string): Promise<ArrayBuffer> => {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return arrayBuffer;
};
