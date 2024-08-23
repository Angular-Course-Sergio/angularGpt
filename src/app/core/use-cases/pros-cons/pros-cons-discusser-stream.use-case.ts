import { environment } from 'environments/environment';

export const prosConsDiscusserStreamUseCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${environment.backendUri}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!resp.ok) throw new Error('No se pudo realizar la comparación');

    const reader = resp.body?.getReader();
    if (!reader) throw new Error('No se pudo generar el reader');

    const decoder = new TextDecoder();
    let text = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      console.log(text);
    }

    return null;
  } catch (error) {
    return null;
  }
};
