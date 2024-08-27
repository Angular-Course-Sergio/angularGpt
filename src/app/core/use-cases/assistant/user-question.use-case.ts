import { QuestionResponse } from '@interfaces/index';
import { environment } from 'environments/environment';

export const userQuestionUseCase = async (threadId: string, prompt: string) => {
  try {
    const resp = await fetch(
      `${environment.backendUri}/anya-assistant/user-question`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ threadId, question: prompt }),
      }
    );

    const replies = (await resp.json()) as QuestionResponse[];

    return replies;
  } catch (error) {
    throw new Error('Erro creating thread ID');
  }
};
