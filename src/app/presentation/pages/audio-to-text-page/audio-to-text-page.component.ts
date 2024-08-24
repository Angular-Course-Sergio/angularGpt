import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  AudioToTextResponse,
  Message,
  TextMessageEvent,
} from '@interfaces/index';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxFileComponent,
  TypingLoaderComponent,
} from '@components/index';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  templateUrl: './audio-to-text-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  handleMessageWithFile(event: TextMessageEvent) {
    const text = `Transcribe el audio: ${event.file.name}`;

    this.isLoading.set(true);

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: false,
        text: text,
      },
    ]);

    this.openAiService
      .audioToText(event.file, text)
      .subscribe((resp) => this.handleResponse(resp));
  }

  handleResponse(resp: AudioToTextResponse | null) {
    this.isLoading.set(false);
    if (!resp) return;

    const text = `## Transcripción:
__Duración:__ ${Math.round(resp.duration)} segundos.
## El texto es:
${resp.text}`;

    this.messages.update((prev) => [
      ...prev,
      {
        isGpt: true,
        text: text,
      },
    ]);

    for (const segment of resp.segments) {
      const segmentText = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos.__
${segment.text}
`;

      this.messages.update((prev) => [
        ...prev,
        {
          isGpt: true,
          text: segmentText,
        },
      ]);
    }
  }
}
