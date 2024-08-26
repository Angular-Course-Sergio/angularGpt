import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
  TextMessageBoxComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-image-generation-page',
  standalone: true,
  templateUrl: './image-generation-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageGenerationPageComponent {
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

    this.openAiService.imageGeneration(prompt).subscribe((resp) => {
      if (!resp) return;

      this.isLoading.set(false);
      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: resp.revised_prompt,
          imageInfo: {
            url: resp.url,
            alt: resp.revised_prompt,
          },
        },
      ]);
    });
  }
}
