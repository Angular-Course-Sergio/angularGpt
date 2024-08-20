import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chat-message/chat-message.component';
import { MyMessageComponent } from '@components/chat-bubbles/my-message/my-message.component';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  templateUrl: './orthography-page.component.html',
  imports: [CommonModule, ChatMessageComponent, MyMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {}
