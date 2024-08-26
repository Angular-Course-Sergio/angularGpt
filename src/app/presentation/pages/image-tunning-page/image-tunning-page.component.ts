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
  GptMessageEditableImageComponent,
} from '@components/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  templateUrl: './image-tunning-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([
    {
      isGpt: true,
      text: '',
      imageInfo: {
        alt: 'Dummy image',
        url: 'http://localhost:3000/api/gpt/image-generation/1724703230665.png',
      },
    },
  ]);
  public isLoading = signal(false);
  public originalImage = signal<string | undefined>(undefined);

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

  handleImageChange(newImage: string, originalImage: string) {
    this.originalImage.set(originalImage);
  }

  generateVariation() {
    if (!this.originalImage()) return;

    this.isLoading.set(true);
    this.openAiService
      .imageVariation(this.originalImage()!)
      .subscribe((resp) => {
        this.isLoading.set(false);

        if (!resp) return;

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
