import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppRoutingModule } from "../app-routing.module";

type TipoTejido = 'Lisa' | 'Twill' | 'Reps';

interface MeshSpec {
  tipo: TipoTejido;
  malla: string;       // ej: "14" o "12/90"
  diametroMm: string;  // ej: "0.6" o "0.40/0.3"
  luzMm: string;       // ej: "1.21" o "0.012"
  areaAbiertaPct?: string; // ej: "44.88" (no siempre disponible)
}

@Component({
  selector: 'app-productos',
  imports: [CommonModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
  standalone: true,
})
export class ProductosComponent {
  // --- UI state ---
  activeTab = signal<'descripcion' | 'especificaciones' | 'usos'>('descripcion');
  filtroTipo = signal<TipoTejido | 'Todos'>('Todos');
  filtroTexto = signal<string>('');

  // --- Data (del link) ---
  readonly producto = {
    nombre: 'Telas metálicas de acero inoxidable',
    subtitulo: 'AISI 304 / 316',
    descripcion:
      'Malla de alambres metálicos cruzados longitudinal y transversalmente, formando una trama firme autoajustada con espacios libres. Se utiliza para filtrar líquidos y gases, tamizar polvos, contener objetos, zarandear materiales a granel, proteger y más.',
    anchosDisponiblesMm: ['1000', '1220', '1300', '1600'],
    materiales: ['AISI 304', 'AISI 316'],
  };

  // Tabla (resumen completo de la página)
  readonly specs: MeshSpec[] = [
    // Lisas (bloque 2–40)
    { tipo: 'Lisa', malla: '2', diametroMm: '1.65', luzMm: '11.05', areaAbiertaPct: '75.7' },
    { tipo: 'Lisa', malla: '3', diametroMm: '1.5', luzMm: '6.97', areaAbiertaPct: '67.71' },
    { tipo: 'Lisa', malla: '4', diametroMm: '1.2', luzMm: '5.15', areaAbiertaPct: '65.78' },
    { tipo: 'Lisa', malla: '5', diametroMm: '1', luzMm: '4.08', areaAbiertaPct: '64.5' },
    { tipo: 'Lisa', malla: '6', diametroMm: '0.9', luzMm: '3.33', areaAbiertaPct: '62' },
    { tipo: 'Lisa', malla: '7', diametroMm: '0.8', luzMm: '2.83', areaAbiertaPct: '60.77' },
    { tipo: 'Lisa', malla: '8', diametroMm: '0.8', luzMm: '2.38', areaAbiertaPct: '55.96' },
    { tipo: 'Lisa', malla: '8', diametroMm: '1', luzMm: '2.18', areaAbiertaPct: '46.93' },
    { tipo: 'Lisa', malla: '10', diametroMm: '0.6', luzMm: '1.94', areaAbiertaPct: '58.34' },
    { tipo: 'Lisa', malla: '10', diametroMm: '1', luzMm: '1.54', areaAbiertaPct: '36.76' },
    { tipo: 'Lisa', malla: '12', diametroMm: '0.6', luzMm: '1.52', areaAbiertaPct: '51.34' },
    { tipo: 'Lisa', malla: '12', diametroMm: '0.7', luzMm: '1.42', areaAbiertaPct: '44.8' },
    { tipo: 'Lisa', malla: '14', diametroMm: '0.35', luzMm: '1.46', areaAbiertaPct: '65.14' },
    { tipo: 'Lisa', malla: '14', diametroMm: '0.5', luzMm: '1.31', areaAbiertaPct: '52.48' },
    { tipo: 'Lisa', malla: '14', diametroMm: '0.6', luzMm: '1.21', areaAbiertaPct: '44.88' },
    { tipo: 'Lisa', malla: '16', diametroMm: '0.4', luzMm: '1.19', areaAbiertaPct: '55.96' },
    { tipo: 'Lisa', malla: '16', diametroMm: '0.6', luzMm: '0.99', areaAbiertaPct: '38.69' },
    { tipo: 'Lisa', malla: '18', diametroMm: '0.4', luzMm: '1.01', areaAbiertaPct: '51.34' },
    { tipo: 'Lisa', malla: '18', diametroMm: '0.5', luzMm: '0.91', areaAbiertaPct: '41.69' },
    { tipo: 'Lisa', malla: '20', diametroMm: '0.3', luzMm: '0.97', areaAbiertaPct: '58.34' },
    { tipo: 'Lisa', malla: '20', diametroMm: '0.41', luzMm: '0.86', areaAbiertaPct: '45.86' },
    { tipo: 'Lisa', malla: '25', diametroMm: '0.16', luzMm: '0.86', areaAbiertaPct: '70.98' },
    { tipo: 'Lisa', malla: '25', diametroMm: '0.3', luzMm: '0.72', areaAbiertaPct: '49.66' },
    { tipo: 'Lisa', malla: '25', diametroMm: '0.35', luzMm: '0.67', areaAbiertaPct: '42.97' },
    { tipo: 'Lisa', malla: '30', diametroMm: '0.18', luzMm: '0.67', areaAbiertaPct: '62' },
    { tipo: 'Lisa', malla: '30', diametroMm: '0.25', luzMm: '0.6', areaAbiertaPct: '49.66' },
    { tipo: 'Lisa', malla: '30', diametroMm: '0.3', luzMm: '0.55', areaAbiertaPct: '41.69' },
    { tipo: 'Lisa', malla: '40', diametroMm: '0.2', luzMm: '0.44', areaAbiertaPct: '46.93' },
    { tipo: 'Lisa', malla: '40', diametroMm: '0.24', luzMm: '0.4', areaAbiertaPct: '38.69' },

    // Twill (intercalados)
    { tipo: 'Twill', malla: '—', diametroMm: '0.25', luzMm: '0.39', areaAbiertaPct: '36.76' },
    { tipo: 'Twill', malla: '—', diametroMm: '0.25', luzMm: '0.26', areaAbiertaPct: '25.79' },
    { tipo: 'Twill', malla: '—', diametroMm: '0.2', luzMm: '0.22', areaAbiertaPct: '27.83' },
    { tipo: 'Twill', malla: '—', diametroMm: '0.16', luzMm: '0.158', areaAbiertaPct: '24.61' },

    // Lisas (45–500)
    { tipo: 'Lisa', malla: '45', diametroMm: '0.2', luzMm: '0.36', areaAbiertaPct: '41.69' },
    { tipo: 'Lisa', malla: '45', diametroMm: '0.25', luzMm: '0.31', areaAbiertaPct: '31.03' },
    { tipo: 'Lisa', malla: '50', diametroMm: '0.2', luzMm: '0.31', areaAbiertaPct: '36.76' },
    { tipo: 'Lisa', malla: '50', diametroMm: '0.23', luzMm: '0.28', areaAbiertaPct: '29.95' },
    { tipo: 'Lisa', malla: '60', diametroMm: '0.17', luzMm: '0.25', areaAbiertaPct: '35.81' },
    { tipo: 'Lisa', malla: '70', diametroMm: '0.15', luzMm: '0.21', areaAbiertaPct: '34.41' },
    { tipo: 'Lisa', malla: '80', diametroMm: '0.12', luzMm: '0.198', areaAbiertaPct: '38.69' },
    { tipo: 'Lisa', malla: '80', diametroMm: '0.14', luzMm: '0.178', areaAbiertaPct: '31.25' },
    { tipo: 'Lisa', malla: '100', diametroMm: '0.1', luzMm: '0.154', areaAbiertaPct: '36.76' },
    { tipo: 'Lisa', malla: '120', diametroMm: '0.09', luzMm: '0.122', areaAbiertaPct: '33.04' },
    { tipo: 'Lisa', malla: '150', diametroMm: '0.065', luzMm: '0.104', areaAbiertaPct: '37.96' },
    { tipo: 'Lisa', malla: '180', diametroMm: '0.05', luzMm: '0.091', areaAbiertaPct: '41.69' },
    { tipo: 'Lisa', malla: '200', diametroMm: '0.05', luzMm: '0.077', areaAbiertaPct: '36.76' },
    { tipo: 'Lisa', malla: '230', diametroMm: '0.04', luzMm: '0.07', areaAbiertaPct: '40.68' },
    { tipo: 'Lisa', malla: '250', diametroMm: '0.04', luzMm: '0.062', areaAbiertaPct: '36.76' },
    { tipo: 'Lisa', malla: '300', diametroMm: '0.035', luzMm: '0.05', areaAbiertaPct: '34.41' },
    { tipo: 'Lisa', malla: '325', diametroMm: '0.035', luzMm: '0.043', areaAbiertaPct: '30.49' },
    { tipo: 'Lisa', malla: '350', diametroMm: '0.035', luzMm: '0.038', areaAbiertaPct: '26.8' },
    { tipo: 'Lisa', malla: '400', diametroMm: '0.03', luzMm: '0.034', areaAbiertaPct: '27.83' },
    { tipo: 'Lisa', malla: '500', diametroMm: '0.025', luzMm: '0.026', areaAbiertaPct: '25.79' },

    // Reps (la tabla del sitio muestra malla / diámetro / luz)
    { tipo: 'Reps', malla: '12/90', diametroMm: '0.40/0.3', luzMm: '0.25' },
    { tipo: 'Reps', malla: '24/110', diametroMm: '0.36/0.25', luzMm: '0.125' },
    { tipo: 'Reps', malla: '30/150', diametroMm: '0.18/0.14', luzMm: '0.1' },
    { tipo: 'Reps', malla: '50/250', diametroMm: '0.14/0.12', luzMm: '0.063' },
    { tipo: 'Reps', malla: '80/700', diametroMm: '0.06/0.05', luzMm: '0.04' },
    { tipo: 'Reps', malla: '200/1400', diametroMm: '0.05/0.03', luzMm: '0.012' },
  ];

  readonly totalSpecs = this.specs.length;

  readonly filteredSpecs = computed(() => {
    const tipo = this.filtroTipo();
    const q = this.filtroTexto().trim().toLowerCase();

    return this.specs.filter((row) => {
      const byTipo = tipo === 'Todos' ? true : row.tipo === tipo;
      if (!byTipo) return false;

      if (!q) return true;

      const hay = [
        row.tipo,
        row.malla,
        row.diametroMm,
        row.luzMm,
        row.areaAbiertaPct ?? '',
      ]
        .join(' ')
        .toLowerCase();

      return hay.includes(q);
    });
  });

  constructor() {}

  setTab(tab: 'descripcion' | 'especificaciones' | 'usos') {
    this.activeTab.set(tab);
  }

  setTipo(tipo: TipoTejido | 'Todos') {
    this.filtroTipo.set(tipo);
  }

  onBuscar(texto: string) {
    this.filtroTexto.set(texto);
  }

  scrollToPresupuesto() {
  document.getElementById('presupuesto')?.scrollIntoView({ behavior: 'smooth' });
}

readonly galleryImages = [
  {
    src: '../../assets/img/img1.jpeg',
    alt: 'Producto 03',
    title: 'Tela inox - detalle 03',
  },
    {
    src: '../../assets/img/img5.jpeg',
    alt: 'Producto 06',
    title: 'Tela inox - detalle 06',
  },
  {
    src: '../../assets/img/img2.jpeg',
    alt: 'Producto 04',
    title: 'Tela inox - detalle 04',
  },
  {
    src: '../../assets/img/img3.jpeg',
    alt: 'Producto 05',
    title: 'Tela inox - detalle 05',
  },
  {
    src: '../../assets/img/img4.jpeg',
    alt: 'Producto 06',
    title: 'Tela inox - detalle 06',
  },
];

}
