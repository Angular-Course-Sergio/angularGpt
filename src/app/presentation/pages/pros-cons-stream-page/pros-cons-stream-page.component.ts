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
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  templateUrl: './pros-cons-stream-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public abortSignal = new AbortController();

  async handleMessage(prompt: string) {
    this.isLoading.set(true);

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt,
      },
      {
        isGpt: true,
        text: '...',
      },
    ]);

    const stream = this.openAiService.prosConsDiscusserStream(
      prompt,
      this.abortSignal.signal
    );
    this.isLoading.set(false);
    for await (const text of stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message: string) {
    this.messages().pop();

    const messages = this.messages();

    this.messages.set([
      ...messages,
      {
        isGpt: true,
        text: message,
      },
    ]);
  }
}
