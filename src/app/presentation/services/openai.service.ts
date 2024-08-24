import { Injectable } from '@angular/core';
import {
  orthographyUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  translateTextUseCase,
  textToAudioUseCase,
} from '@use-cases/index';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  checkOrthography(prompt: string) {
    return from(orthographyUseCase(prompt));
  }

  prosConsDiscusser(prompt: string) {
    return from(prosConsDiscusserUseCase(prompt));
  }

  prosConsDiscusserStream(prompt: string, abortSignal: AbortSignal) {
    return prosConsDiscusserStreamUseCase(prompt, abortSignal);
  }

  translateText(prompt: string, lang: string) {
    return from(translateTextUseCase(prompt, lang));
  }

  textToAudio(prompt: string, voice: string) {
    return from(textToAudioUseCase(prompt, voice));
  }
}
