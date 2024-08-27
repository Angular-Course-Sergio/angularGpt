import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ChatMessageComponent,
  MyMessageComponent,
  TextMessageBoxComponent,
  TypingLoaderComponent,
} from '@components/index';
import { Message } from '@interfaces/index';
import { OpenAIService } from '@services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
  ],
  templateUrl: './assistant-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit {
  public openAiService = inject(OpenAIService);

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);

  public threadId = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.openAiService.createThread().subscribe((id) => {
      this.threadId.set(id);
    });
  }

  handleMessage(prompt: string) {
    this.isLoading.set(true);
    this.messages.update((prev) => [...prev, { text: prompt, isGpt: false }]);

    this.openAiService
      .postQuestion(this.threadId()!, prompt)
      .subscribe((replies) => {
        this.isLoading.set(false);

        const reply = replies[replies.length - 1];

        for (const message of reply.content) {
          this.messages.update((prev) => [
            ...prev,
            {
              text: message,
              isGpt: reply.role === 'assistant',
            },
          ]);
        }
      });
  }
}
