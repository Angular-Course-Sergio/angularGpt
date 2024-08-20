import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextMessageEvent } from '@interfaces/index';

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box-file.component.html',
  styleUrl: './text-message-box-file.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [''],
    file: [null, Validators.required],
  });

  public file: File | undefined;

  @Input() placeholder: string = '';

  @Output() onMessage = new EventEmitter<TextMessageEvent>();

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt, file } = this.form.value;

    this.onMessage.emit({
      prompt,
      file: file!,
    });
    this.form.reset();
  }

  handleSelectedFile(event: any) {
    const file = event.target.files.item(0);
    this.form.controls.file.setValue(file);
  }
}
