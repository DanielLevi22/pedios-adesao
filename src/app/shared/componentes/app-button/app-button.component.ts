import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'light'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'status'
  | 'status-ativo'
  | 'retificar'
  | 'retificar-ativo';

type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './app-button.component.html',
  styleUrl: './app-button.component.scss',
})
export class AppButtonComponent {
  variant = input<ButtonVariant>('light');
  size = input<ButtonSize>('md');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);
  routerLink = input<string | any[]>();
  customClass = input<string | string[]>('');
  onClick = output<Event>();

  getClasses(): string {
    const classes = ['btn'];

    const sizeMap = {
      sm: 'py-1 px-2',
      md: 'py-2 px-3',
      lg: 'py-3 px-4',
    };
    classes.push(sizeMap[this.size()]);

    const variant = this.variant();

    const variantMap: Record<string, string[]> = {
      status: ['btn-outline-success'],
      'status-ativo': ['btn-success', 'text-white'],
      retificar: ['btn-outline-danger'],
      'retificar-ativo': ['btn-danger', 'text-white'],
    };

    if (variantMap[variant]) {
      classes.push(...variantMap[variant]);
    } else {
      classes.push(`btn-${variant}`);
    }

    if (this.fullWidth()) {
      classes.push('w-100');
    }

    const custom = this.customClass();
    if (custom) {
      if (Array.isArray(custom)) {
        classes.push(...custom);
      } else {
        classes.push(custom);
      }
    }

    return classes.join(' ');
  }
}
