import { ImageGenerationResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

type GeneratedImage = ImageGenerationResponse | null;

export const imageVariatonUseCase = async (
  originalImage: string
): Promise<GeneratedImage> => {
  try {
    const resp = await fetch(`${environment.backendUri}/image-variation`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ originalImage }),
    });

    const data = await resp.json();

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
