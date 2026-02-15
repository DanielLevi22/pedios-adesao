import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from '../../../../shared/componentes/app-button/app-button.component';

@Component({
  selector: 'app-coleta-precos-modal',
  standalone: true,
  imports: [CommonModule, AppButtonComponent],
  templateUrl: './coleta-precos-modal.component.html',
  styleUrl: './coleta-precos-modal.component.scss',
})
export class ColetaPrecosModalComponent {
  activeModal = inject(NgbActiveModal);
  mode: 'manual' | 'lia' = 'manual'; // Default to manual

  close() {
    this.activeModal.close();
  }
}
