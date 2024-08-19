import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  templateUrl: './text-to-audio-page.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {}
