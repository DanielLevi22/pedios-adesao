import { Component, contentChild, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class AppInputComponent {
  icon = input<string | undefined>();
  placeholder = input<string>('');
  value = model<string>('');
  prefixProjected = contentChild<any>('prefix');
}
