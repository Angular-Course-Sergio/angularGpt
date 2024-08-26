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
    console.log(prompt);
  }


}
