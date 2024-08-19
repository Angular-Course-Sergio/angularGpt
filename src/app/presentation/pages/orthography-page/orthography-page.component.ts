import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  templateUrl: './orthography-page.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {}
