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

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './text-message-box.component.html',
  styleUrl: './text-message-box.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  public fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: ['', Validators.required],
  });

  @Input() placeholder: string = '';
  @Input() disableCorrections: boolean = false;

  @Output() onMessage = new EventEmitter<string>();

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt } = this.form.value;
    console.log(prompt);

    this.onMessage.emit(prompt!);
    this.form.reset();
  }
}
