import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TypingLoaderComponent,
} from '@components/index';
import {
  Message,
  TextMessageBoxEvent,
  TextMessageEvent,
} from '@interfaces/index';
import { OpenAIService } from '@services/openai.service';
import { TextMessageBoxComponent } from "../../presentation/components/text-boxes/text-message-box/text-message-box.component";

@Component({
  selector: 'app-chat-template',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
],
  templateUrl: './chat-template.component.html',
  styleUrl: './chat-template.component.css',
})
export class ChatTemplateComponent {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([]);
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
