
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AppButtonComponent } from '../../../../shared/componentes/app-button/app-button.component';
import { AppInputComponent } from '../../../../shared/componentes/app-input/input.component';
import { AppSelectComponent } from '../../../../shared/componentes/app-select/app-select.component';

@Component({
  selector: 'app-inserir-itens-modal',
  standalone: true,
  imports: [
    CommonModule,
    NgbNavModule,
    ReactiveFormsModule,
    AppButtonComponent,
    AppInputComponent,
    AppSelectComponent,
  ],
  templateUrl: './inserir-itens-modal.component.html',
  styleUrl: './inserir-itens-modal.component.scss',
})
export class InserirItensModalComponent {
  activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  activeTab = 1;

  // Mock Data for "Carregar Demandas"
  demandas = [
    {
      id: '001/2024',
      titulo: 'Aquisição de materiais de escritório para o exercício de 2024',
      itens: 3,
    },
    {
      id: '002/2024',
      titulo:
        'Contratação de serviço de manutenção de equipamentos de Informática',
      itens: 2,
    },
    {
      id: '004/2024',
      titulo: 'Aquisição de mobiliário para nova sede administrativa',
      itens: 2,
    },
    {
      id: '005/2024',
      titulo: 'Contratação de consultoria em segurança da informação',
      itens: 1,
    },
    {
      id: '007/2024',
      titulo: 'Renovação de licenças Microsoft 365',
      itens: 1,
    },
    {
      id: '008/2024',
      titulo: 'Aquisição de material de higiene e limpeza',
      itens: 2,
    },
  ];

  pncpForm = this.fb.group({
    idContratacao: [''],
    ano: [''],
  });

  manualForm = this.fb.group({
    descricao: [''],
    exigirMarca: [false],
    unidade: [null],
    quantidade: [''],
  });

  unidades = [
    { id: 'u1', name: 'Unidade' },
    { id: 'u2', name: 'Caixa' },
    { id: 'u3', name: 'Pacote' },
  ];

  close() {
    this.activeModal.dismiss();
  }

  saveManual() {
    this.activeModal.close(this.manualForm.value);
  }

  // State for "Carregar Demandas"
  selectedDemanda: any = null;
  showDemandItems = false;
  
  // Mock Data for Items of a Demand
  demandItems = [
    {
      id: 1,
      descricao: 'Mesa de escritório 1,20m',
      exigirMarca: false,
      unidade: 'Unidade',
      quantidade: 50,
      selected: true,
    },
    {
      id: 2,
      descricao: 'Cadeira giratória ergonômica',
      exigirMarca: true,
      unidade: 'Unidade',
      quantidade: 50,
      selected: true,
    },
  ];

  selectDemanda(item: any) {
    this.selectedDemanda = item;
  }

  advanceToItems() {
    if (this.selectedDemanda) {
      this.showDemandItems = true;
    }
  }

  backToDemandas() {
    this.showDemandItems = false;
  }

  toggleSelectAll() {
    const allSelected = this.demandItems.every((i) => i.selected);
    this.demandItems.forEach((i) => (i.selected = !allSelected));
  }

  toggleItem(item: any) {
    item.selected = !item.selected;
  }

  loadItems() {
    const selectedItems = this.demandItems.filter((i) => i.selected);
    console.log('Loading items:', selectedItems);
    this.activeModal.close(selectedItems);
  }

  get selectedItemsCount(): number {
    return this.demandItems.filter((i) => i.selected).length;
  }

  searchPncp() {
    console.log('Buscar PNCP', this.pncpForm.value);
  }
}
