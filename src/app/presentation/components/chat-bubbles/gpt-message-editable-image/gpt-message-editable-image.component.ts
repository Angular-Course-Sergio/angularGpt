import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [],
  templateUrl: './gpt-message-editable-image.component.html',
  styleUrl: './gpt-message-editable-image.component.css',
})
export class GptMessageEditableImageComponent implements AfterViewInit {
  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string; alt: string };

  @Output() onSelectedImage = new EventEmitter<string>();

  public originalImage = signal<HTMLImageElement | null>(null);

  ngAfterViewInit(): void {
    if (!this.canvasElement) return;

    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.imageInfo.url;

    this.originalImage.set(image);

    image.onload = () => {
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }

  handleClick() {
    this.onSelectedImage.emit(this.imageInfo.url);
  }
}
