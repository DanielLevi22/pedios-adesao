
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppButtonComponent } from '../../../shared/componentes/app-button/app-button.component';
import { AppHeaderComponent } from '../../../shared/componentes/app-header/app-header.component';
import { AppInputComponent } from '../../../shared/componentes/app-input/input.component';
import {
  AppSelectComponent,
  SelectItem,
} from '../../../shared/componentes/app-select/app-select.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InserirItensModalComponent } from '../components/inserir-itens-modal/inserir-itens-modal.component';
import { ColetaPrecosModalComponent } from '../components/coleta-precos-modal/coleta-precos-modal.component';

@Component({
  selector: 'app-nova-pesquisa',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppHeaderComponent,
    AppButtonComponent,
    AppInputComponent,
    AppSelectComponent,
  ],
  templateUrl: './nova-pesquisa.component.html',
  styleUrl: './nova-pesquisa.component.scss',
})
export class NovaPesquisaComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    macrorregiao: [null],
    regiao: [null],
    valorMinimo: ['0,00'],
    valorMaximo: ['0,00'],
    minimoFontes: ['3'],
    metodoCalculo: ['Mediana'],
    fonteDados: ['PNCP'],
    formaPesquisa: ['MelhoresPrecos'],
    descricaoGeral: [''],
  });

  // Mock data for selects
  macrorregioes: SelectItem[] = [
    { id: 'todas', name: 'Todas' },
    { id: 'norte', name: 'Norte' },
    { id: 'nordeste', name: 'Nordeste' },
    { id: 'centro-oeste', name: 'Centro-Oeste' },
    { id: 'sudeste', name: 'Sudeste' },
    { id: 'sul', name: 'Sul' },
  ];

  regioes: SelectItem[] = [
    { id: 'todas', name: 'Todas' },
    { id: 'AC', name: 'Acre' },
    { id: 'AL', name: 'Alagoas' },
    { id: 'AP', name: 'Amapá' },
    { id: 'AM', name: 'Amazonas' },
    { id: 'BA', name: 'Bahia' },
    { id: 'CE', name: 'Ceará' },
    { id: 'DF', name: 'Distrito Federal' },
    { id: 'ES', name: 'Espírito Santo' },
    { id: 'GO', name: 'Goiás' },
    { id: 'MA', name: 'Maranhão' },
    { id: 'MT', name: 'Mato Grosso' },
    { id: 'MS', name: 'Mato Grosso do Sul' },
    { id: 'MG', name: 'Minas Gerais' },
    { id: 'PA', name: 'Pará' },
    { id: 'PB', name: 'Paraíba' },
    { id: 'PR', name: 'Paraná' },
    { id: 'PE', name: 'Pernambuco' },
    { id: 'PI', name: 'Piauí' },
    { id: 'RJ', name: 'Rio de Janeiro' },
    { id: 'RN', name: 'Rio Grande do Norte' },
    { id: 'RS', name: 'Rio Grande do Sul' },
    { id: 'RO', name: 'Rondônia' },
    { id: 'RR', name: 'Roraima' },
    { id: 'SC', name: 'Santa Catarina' },
    { id: 'SP', name: 'São Paulo' },
    { id: 'SE', name: 'Sergipe' },
    { id: 'TO', name: 'Tocantins' },
  ];

  metodosCalculo: SelectItem[] = [
    { id: 'Mediana', name: 'Mediana' },
    { id: 'Media', name: 'Média' },
    { id: 'MenorPreco', name: 'Menor Preço' },
  ];

  fontesDados: SelectItem[] = [
    { id: 'PNCP', name: 'PNCP' },
    { id: 'ComprasNet', name: 'ComprasNet' },
  ];

  formasPesquisa: SelectItem[] = [
    { id: 'MelhoresPrecos', name: 'Escolher melhores preços com a LIA' },
    { id: 'Manual', name: 'Escolher preços manualmente' },
  ];

  // Selected items from Modal
  selectedItems = signal<any[]>([]);
  isLoading = signal(false); // Loading state for skeletons

  // Computed progress
  progress = computed(() => {
    const total = this.selectedItems().length;
    const completed = 0; // Logic for completed items can be added later
    return { 
      total, 
      completed, 
      pending: total - completed, 
      percentage: total > 0 ? (completed / total) * 100 : 0 
    };
  });

  totalValue = computed(() => {
    return this.selectedItems().reduce((acc, item) => {
        // Assuming item has a 'valorUnitario' or similar, currently using mock or 0
        // The modal mock data doesn't have price, so we'll mock it or assume 0 for now
        // If the item doesn't have a value, treating as 0.
        return acc + (item.quantidade * (item.valorUnitario || 0));
    }, 0);
  });

  removeItem(item: any) {
    this.selectedItems.update((items) => items.filter((i) => i !== item));
  }

  private ngbModalService = inject(NgbModal);

  goBack() {
    this.router.navigate(['/']); // Adjust as needed
  }

  saveDraft() {
    console.log('Salvar Rascunho', this.form.value);
  }

  generateReport() {
    console.log('Gerar Relatório', this.form.value);
  }

  search() {
    console.log('Pesquisar/Coletar', this.form.value);
    // Determine mode based on selection
    const isLia = this.form.get('formaPesquisa')?.value === 'MelhoresPrecos';
    
    const modalRef = this.ngbModalService.open(ColetaPrecosModalComponent, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      modalDialogClass: 'modal-rounded' // Optional class if we want to style the dialog container specifically
    });

    modalRef.componentInstance.mode = isLia ? 'lia' : 'manual';
    
    // Simulate loading state
    this.isLoading.set(true);
    
    // Mock delay to show the skeleton/modal state
    setTimeout(() => {
        this.isLoading.set(false);
        modalRef.close();
        
        // Populate items with mock results
        this.selectedItems.update(items => items.map(item => {
            const basePrice = item.valorUnitario || 100; // Fallback if no price
            return {
                ...item,
                status: 'Coletado', 
                badgeClass: 'bg-orange-light text-orange', 
                expanded: false,
                itemsFoundCount: 8,
                foundItems: this.getMockFoundItems(basePrice) // Dynamic quotes based on price
            };
        }));
    }, 3000);
  }

  toggleExpand(item: any) {
      this.selectedItems.update(items => items.map(i => {
          if (i === item) {
              return { ...i, expanded: !i.expanded };
          }
          return i;
      }));
  }

  toggleQuote(item: any, quote: any) {
    if (item.status === 'Concluído') return; // Prevent changes if already concluded

    // toggle selection
    quote.selected = !quote.selected;
    
    // update parent item stats
    this.updateItemStats(item);
  }

  updateItemStats(item: any) {
      const selectedQuotes = item.foundItems.filter((q: any) => q.selected);
      
      // Update count
      item.selectedQuotesCount = selectedQuotes.length;
      
      // Update Average Value
      if (item.selectedQuotesCount > 0) {
          const total = selectedQuotes.reduce((sum: number, q: any) => sum + q.valor, 0);
          item.valorUnitario = total / item.selectedQuotesCount;
      } else {
          item.valorUnitario = 0; // or null/undefined
      }

      // Update Suppliers Text
      item.selectedFornecedores = selectedQuotes.map((q: any) => q.fornecedor);
      
      this.selectedItems.update(items => [...items]);
  }

  concludeItem(item: any) {
      item.status = 'Concluído';
      item.badgeClass = 'bg-success text-white'; // Green badge
      item.expanded = false; // Collapse details
      this.selectedItems.update(items => [...items]);
  }

  getMockFoundItems(basePrice: number) {
      // Helper to vary price by +/- 20%
      const vary = (price: number) => price * (0.8 + Math.random() * 0.4);
      
      return [
          { fornecedor: 'Distribuidora de Materiais LTDA', cnpj: '12.345.678/0001-23', descricao: 'Manutenção preventiva de computadores, material de alta qualidade.', valor: vary(basePrice), fonte: 'PNCP', badge: 'bg-primary', selected: false },
          { fornecedor: 'Comércio Nacional de Suprimentos S/A', cnpj: '98.765.432/0001-99', descricao: 'Manutenção preventiva de computadores, pacote com 100 unidades.', valor: vary(basePrice), fonte: 'PNCP', badge: 'bg-primary', selected: false },
          { fornecedor: 'Tech Solutions Importação EIRELI', cnpj: '55.444.333/0001-22', descricao: 'Manutenção preventiva de computadores, kit sortido.', valor: vary(basePrice), fonte: 'Web', badge: 'bg-success', selected: false },
           { fornecedor: 'Papelaria Central LTDA', cnpj: '11.222.333/0001-44', descricao: 'Manutenção preventiva de computadores, pacote econômico.', valor: vary(basePrice), fonte: 'PNCP', badge: 'bg-primary', selected: false },
           { fornecedor: 'Global Supply Comércio ME', cnpj: '22.333.444/0001-55', descricao: 'Manutenção preventiva premium, corpo em material reciclado.', valor: vary(basePrice), fonte: 'Web', badge: 'bg-success', selected: false },
           { fornecedor: 'Office Premium Distribuidora LTDA', cnpj: '33.444.555/0001-66', descricao: 'Manutenção preventiva escolar aprovado pelo INMETRO.', valor: vary(basePrice), fonte: 'PNCP', badge: 'bg-primary', selected: false },
           { fornecedor: 'Brasil Atacadista de Escritório S/A', cnpj: '44.555.666/0001-77', descricao: 'Lote atacado com 500 unidades, entrega fracionada.', valor: vary(basePrice), fonte: 'PNCP', badge: 'bg-primary', selected: false },
           { fornecedor: 'Mega Suprimentos e Logística EIRELI', cnpj: '66.777.888/0001-99', descricao: 'Caixa com 25 unidades, tinta importada secagem rápida.', valor: vary(basePrice), fonte: 'Web', badge: 'bg-success', selected: false },
      ];
  }

  openInserirItens() {
    const modalRef = this.ngbModalService.open(InserirItensModalComponent, {
      size: 'xl',
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(
      (result) => {
        if (result && Array.isArray(result)) {
           this.selectedItems.update(items => [...items, ...result]);
           // Optionally set descricaoGeral based on first item or similar logic
        }
      },
      (reason) => {
        // Dismissed
      }
    );
  }
}
