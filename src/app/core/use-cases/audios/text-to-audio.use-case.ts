import { environment } from 'environments/environment.development';

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const resp = await fetch(`${environment.backendUri}/gpt/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice }),
    });

    if (!resp.ok) throw new Error('No se pudo generar el audio');

    const file = await resp.blob();
    const audioUrl = URL.createObjectURL(file);

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo generar el audio',
      audioUrl: '',
    };
  }
};
