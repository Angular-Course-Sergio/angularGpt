import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  GptMessageOrthographyComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  templateUrl: './orthography-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    GptMessageOrthographyComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
    ]);

    this.openAiService.checkOrthography(prompt).subscribe((resp) => {
      this.isLoading.set(false);

      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.message,
          info: resp,
        },
      ]);
    });
  }
}
