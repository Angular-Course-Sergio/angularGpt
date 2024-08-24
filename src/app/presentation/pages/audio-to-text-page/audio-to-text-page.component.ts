import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Message, TextMessageEvent } from '@interfaces/index';
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
    console.log(event);
  }
}
