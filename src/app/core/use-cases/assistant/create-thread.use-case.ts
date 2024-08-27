import { environment } from 'environments/environment';

export const createThreadUseCase = async () => {
  try {
    const resp = await fetch(
      `${environment.backendUri}/anya-assistant/create-thread`,
      {
        method: 'POST',
      }
    );

    const { id } = (await resp.json()) as { id: string };

    return id;
  } catch (error) {
    throw new Error('Erro creating thread ID');
  }
};
