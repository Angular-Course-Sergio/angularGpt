import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TextMessageBoxFileComponent,
  TextMessageBoxSelectComponent,
  TypingLoaderComponent,
} from '@components/index';
import {
  Message,
  TextMessageBoxEvent,
  TextMessageEvent,
} from '@interfaces/index';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  templateUrl: './orthography-page.component.html',
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {
  public messages = signal<Message[]>([
    { text: 'Hola mundo', isGpt: true },
    { text: 'Hola GPT', isGpt: false },
  ]);
  public isLoading = signal(false);

  handleMessage(prompt: string) {
    console.log(prompt);
  }

  handleMessageWithFile(event: TextMessageEvent) {
    console.log(event);
  }

  handleMessageWithSelect(event: TextMessageBoxEvent) {
    console.log(event);
  }
}
