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
  TextMessageBoxSelectComponent,
  TypingLoaderComponent,
} from '@components/index';
import { TextMessageBoxEvent, Option } from '@interfaces/index';
import { Message } from '@interfaces/message.interface';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  templateUrl: './text-to-audio-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TextMessageBoxSelectComponent,
    TypingLoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public voices = signal<Option[]>([
    { id: 'alloy', text: 'Alloy' },
    { id: 'echo', text: 'Echo' },
    { id: 'fable', text: 'Fable' },
    { id: 'onyx', text: 'Onyx' },
    { id: 'nova', text: 'Nova' },
    { id: 'shimmer', text: 'Shimmer' },
  ]);

  handleMessageWithSelect(event: TextMessageBoxEvent) {}
}
