import { Component, forwardRef, input, model, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

export interface SelectItem {
  id: string;
  name: string;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgSelectModule, FormsModule],
  templateUrl: './app-select.component.html',
  styleUrl: './app-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true,
    },
  ],
})
export class AppSelectComponent implements ControlValueAccessor {
  items = input.required<SelectItem[]>();
  placeholder = input<string>('Selecione...');
  bindLabel = input<string>('name');
  bindValue = input<string>('id');
  clearable = input<boolean>(true);
  searchable = input<boolean>(true);

  value = signal<string | null>(null);
  isDisabled = signal<boolean>(false);

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    this.value.set(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onModelChange(value: string | null) {
    this.value.set(value);
    this.onChange(value);
  }

  onBlur() {
    this.onTouched();
  }
}
