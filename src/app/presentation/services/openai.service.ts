import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsDiscusserUseCase } from '@use-cases/index';
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
}
