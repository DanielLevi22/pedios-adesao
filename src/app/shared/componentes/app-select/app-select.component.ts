import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgSelectComponent,
  NgOptionTemplateDirective,
} from '@ng-select/ng-select';

export interface SelectItem {
  id: string;
  name: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgSelectComponent, FormsModule, NgOptionTemplateDirective],
  templateUrl: './app-select.component.html',
  styleUrl: './app-select.component.scss',
})
export class AppSelectComponent {
  items = input.required<SelectItem[]>();
  placeholder = input<string>('Selecione...');
  value = model<string>('');

  ngOnInit() {
    if (!this.value()) {
      this.value.set(this.items()[0]?.id || '');
    }
  }
}
