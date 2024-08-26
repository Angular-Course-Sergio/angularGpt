import { ImageGenerationResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

type GeneratedImage = ImageGenerationResponse | null;

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<GeneratedImage> => {
  try {
    const resp = await fetch(`${environment.backendUri}/image-generation`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ prompt, originalImage, maskImage }),
    });

    const data = (await resp.json());

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
