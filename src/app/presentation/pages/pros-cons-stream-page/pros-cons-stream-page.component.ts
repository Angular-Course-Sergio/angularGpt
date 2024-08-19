import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pros-cons-stream-page',
  standalone: true,
  templateUrl: './pros-cons-stream-page.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamPageComponent {}
