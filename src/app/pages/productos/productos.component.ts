import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TejidoArtisticoComponent } from 'src/app/components/tejido-artistico/tejido-artistico.component';

type ProductoKey = 'telas' | 'artistico' | 'disco' | 'packs' | 'zarandas';
type TipoMalla =
  | 'AISI 304'
  | 'AISI 316 / 316L'
  | 'Reps'
  | 'Acero negro'
  | 'Especiales 304';

interface MeshSpecInox {
  tipo: TipoMalla;
  malla: string;
  diametroMm: string;
  luzMm: string;
  areaAbiertaPct?: string;
  pesoKgM2?: string;
  filtradoAbsolutouM?: string;
  filtradoNominaluM?: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TejidoArtisticoComponent],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  // ---------------- UI ----------------
  activeTab = signal<'descripcion' | 'especificaciones' | 'usos'>('descripcion');
  selectedProductoKey = signal<ProductoKey>('telas');

  // Selector visual (cards con imagen)
  readonly productos = [
    {
      key: 'telas' as const,
      title: 'Telas metálicas',
      subtitle: 'Acero inoxidable AISI 304 / 316',
      img: '../../assets/img/img1.jpeg',
    },
    {
      key: 'artistico' as const,
      title: 'Tejido artístico',
      subtitle: 'Decoración / arquitectura',
      img: '../../assets/img/img6.jpg',
    },
    {
      key: 'disco' as const,
      title: 'Discos filtrantes',
      subtitle: 'Stock permanente, todos los diámetros',
      img: '../../assets/img/img7.jpg',
    },
    {
      key: 'packs' as const,
      title: 'Packos filtrantes',
      subtitle: 'Filtración industrial multicapa',
      img: '../../assets/img/img8.png',
    },
    {
      key: 'zarandas' as const,
      title: 'Zarandas clasificatorias',
      subtitle: 'Fabricadas a medida en largo y ancho',
      img: '../../assets/img/img9.png',
    },
  ];

  selectProducto(key: ProductoKey) {
    this.selectedProductoKey.set(key);
    this.activeTab.set('descripcion');

    if (key === 'telas') {
      this.filtroTipo.set('Todos');
      this.filtroTexto.set('');
    }
  }

  setTab(tab: 'descripcion' | 'especificaciones' | 'usos') {
    this.activeTab.set(tab);
  }

  // ---------------- DATA PRODUCTOS ----------------
  readonly productoTelas = {
    nombre: 'Telas metálicas de acero inoxidable',
    subtitulo: 'AISI 304 / 316',
    descripcion:
      'Malla de alambres metálicos cruzados longitudinal y transversalmente, formando una trama firme autoajustada con espacios libres. Se utiliza para filtrar líquidos y gases, tamizar polvos, contener objetos, zarandear materiales a granel, proteger y más.',
    anchosDisponiblesMm: ['1000', '1220', '1300', '1600'],
    materiales: ['AISI 304', 'AISI 316'],
    usos: [
      'Filtrado de líquidos y gases',
      'Tamizado de polvos',
      'Zarandeo de materiales a granel',
      'Contención / separación',
      'Protección y resguardo',
    ],
  };

  readonly productoArtistico = {
    nombre: 'Tejido artístico',
    subtitulo: 'Decoración / arquitectura',
    descripcion:
      'Tejido metálico de uso decorativo y arquitectónico. En la pestaña de especificaciones vas a ver la tabla completa (luz libre, diámetro, ancho máx y peso).',
    anchosDisponiblesMm: ['Consultar'],
    materiales: ['Acero'],
    usos: ['Fachadas', 'Cielorrasos', 'Divisores', 'Revestimientos', 'Decoración'],
  };

  readonly productoDisco = {
    nombre: 'Discos filtrantes',
    subtitulo: 'Stock permanente, todos los diámetros',
    descripcion:
      'Contamos con un gran stock de matrices para cortes de discos para extrusión, de todos los diámetros. Son utilizados en diversas industrias y fabricados en planta industrial propia. Consulte por fabricación en medidas especiales.',
    anchosDisponiblesMm: ['Todos los diámetros'],
    materiales: ['AISI 304', 'AISI 316'],
    usos: [
      'Extrusión industrial',
      'Filtrado en línea de proceso',
      'Diversas industrias (alimenticia, química, plásticos)',
      'Medidas estándar y especiales a pedido',
    ],
  };

  readonly productoPacks = {
    nombre: 'Packos filtrantes',
    subtitulo: 'Filtración industrial multicapa',
    descripcion:
      'Los packos filtrantes son sistemas de filtración compuestos por múltiples capas de mallas metálicas precisamente ensambladas para proporcionar una filtración progresiva y altamente eficiente. Esta configuración en capas permite capturar partículas de diferentes tamaños, optimizando el proceso de filtración y extendiendo la vida útil del sistema. Contamos con un gran stock de matrices para cortes de discos para extrusión, de distintos diámetros. También armamos packos de telas envueltos con aro de aluminio o soldados por punto.',
    anchosDisponiblesMm: ['Consultar'],
    materiales: ['AISI 304', 'AISI 316'],
    usos: [
      'Filtración progresiva multicapa',
      'Extrusión industrial (cortes de disco)',
      'Procesos con requerimientos de alta presión',
      'Configuraciones con aro de aluminio o soldadura por punto',
      'Soluciones estándar y personalizadas',
    ],
  };

  readonly productoZarandas = {
    nombre: 'Zarandas clasificatorias',
    subtitulo: 'Fabricadas a medida en largo y ancho',
    descripcion:
      'Fabricadas con alambre de aleación de acero que resiste la abrasión y el desgaste prematuro. Se proveen a medida en largo y ancho, y pueden ser fabricadas con o sin borde de sujeción, recubierto o no de chapa. Son utilizadas en diversas industrias y fabricadas en planta industrial.',
    anchosDisponiblesMm: ['A medida'],
    materiales: ['Aleación de acero'],
    usos: [
      'Clasificación y separación de materiales a granel',
      'Minería y canteras',
      'Industria de la construcción',
      'Áridos y granulados',
      'Reciclado de materiales',
      'Industria alimenticia y agroindustrial',
    ],
  };

  readonly productoActual = computed(() => {
    const key = this.selectedProductoKey();
    switch (key) {
      case 'telas':     return this.productoTelas;
      case 'artistico': return this.productoArtistico;
      case 'disco':     return this.productoDisco;
      case 'packs':     return this.productoPacks;
      case 'zarandas':  return this.productoZarandas;
    }
  });

  // ---------------- TABLA INOX (filtros + tabla en productos) ----------------
  filtroTipo = signal<TipoMalla | 'Todos'>('Todos');
  filtroTexto = signal<string>('');

  readonly specsInox: MeshSpecInox[] = [
    // --- AISI 304 ---
    { tipo: 'AISI 304', malla: '2',   diametroMm: '1.60',  luzMm: '11.10', areaAbiertaPct: '76.39', pesoKgM2: '2.47' },
    { tipo: 'AISI 304', malla: '3',   diametroMm: '1.50',  luzMm: '6.97',  areaAbiertaPct: '67.71', pesoKgM2: '3.24' },
    { tipo: 'AISI 304', malla: '4',   diametroMm: '1.20',  luzMm: '5.15',  areaAbiertaPct: '65.78', pesoKgM2: '2.77' },
    { tipo: 'AISI 304', malla: '5',   diametroMm: '1.00',  luzMm: '4.08',  areaAbiertaPct: '64.50', pesoKgM2: '2.43' },
    { tipo: 'AISI 304', malla: '6',   diametroMm: '0.90',  luzMm: '3.33',  areaAbiertaPct: '62.00', pesoKgM2: '2.36' },
    { tipo: 'AISI 304', malla: '7',   diametroMm: '0.80',  luzMm: '2.83',  areaAbiertaPct: '60.77', pesoKgM2: '2.17' },
    { tipo: 'AISI 304', malla: '8',   diametroMm: '0.80',  luzMm: '2.38',  areaAbiertaPct: '55.96', pesoKgM2: '2.47' },
    { tipo: 'AISI 304', malla: '8',   diametroMm: '1.00',  luzMm: '2.18',  areaAbiertaPct: '46.93', pesoKgM2: '3.91' },
    { tipo: 'AISI 304', malla: '10',  diametroMm: '0.50',  luzMm: '2.04',  areaAbiertaPct: '64.50', pesoKgM2: '1.19' },
    { tipo: 'AISI 304', malla: '10',  diametroMm: '0.60',  luzMm: '1.94',  areaAbiertaPct: '58.34', pesoKgM2: '1.69' },
    { tipo: 'AISI 304', malla: '10',  diametroMm: '0.70',  luzMm: '1.84',  areaAbiertaPct: '52.48', pesoKgM2: '2.29' },
    { tipo: 'AISI 304', malla: '10',  diametroMm: '1.00',  luzMm: '1.54',  areaAbiertaPct: '36.76', pesoKgM2: '4.80' },
    { tipo: 'AISI 304', malla: '12',  diametroMm: '0.40',  luzMm: '1.72',  areaAbiertaPct: '65.78', pesoKgM2: '0.90' },
    { tipo: 'AISI 304', malla: '12',  diametroMm: '0.60',  luzMm: '1.52',  areaAbiertaPct: '51.34', pesoKgM2: '2.05' },
    { tipo: 'AISI 304', malla: '12',  diametroMm: '0.70',  luzMm: '1.42',  areaAbiertaPct: '44.80', pesoKgM2: '2.71' },
    { tipo: 'AISI 304', malla: '14',  diametroMm: '0.35',  luzMm: '1.46',  areaAbiertaPct: '65.14', pesoKgM2: '0.80' },
    { tipo: 'AISI 304', malla: '14',  diametroMm: '0.50',  luzMm: '1.31',  areaAbiertaPct: '52.48', pesoKgM2: '1.66' },
    { tipo: 'AISI 304', malla: '14',  diametroMm: '0.60',  luzMm: '1.21',  areaAbiertaPct: '44.80', pesoKgM2: '2.37' },
    { tipo: 'AISI 304', malla: '16',  diametroMm: '0.60',  luzMm: '0.99',  areaAbiertaPct: '38.69', pesoKgM2: '2.71' },
    { tipo: 'AISI 304', malla: '18',  diametroMm: '0.50',  luzMm: '0.91',  areaAbiertaPct: '41.69', pesoKgM2: '2.14' },
    { tipo: 'AISI 304', malla: '20',  diametroMm: '0.30',  luzMm: '0.97',  areaAbiertaPct: '58.34', pesoKgM2: '0.84' },
    { tipo: 'AISI 304', malla: '20',  diametroMm: '0.41',  luzMm: '0.86',  areaAbiertaPct: '45.86', pesoKgM2: '1.67' },
    { tipo: 'AISI 304', malla: '20',  diametroMm: '0.50',  luzMm: '0.77',  areaAbiertaPct: '36.76', pesoKgM2: '2.44' },
    { tipo: 'AISI 304', malla: '25',  diametroMm: '0.30',  luzMm: '0.72',  areaAbiertaPct: '49.66', pesoKgM2: '1.08' },
    { tipo: 'AISI 304', malla: '25',  diametroMm: '0.35',  luzMm: '0.67',  areaAbiertaPct: '42.97', pesoKgM2: '1.48' },
    { tipo: 'AISI 304', malla: '30',  diametroMm: '0.25',  luzMm: '0.60',  areaAbiertaPct: '49.66', pesoKgM2: '0.86' },
    { tipo: 'AISI 304', malla: '30',  diametroMm: '0.30',  luzMm: '0.55',  areaAbiertaPct: '41.69', pesoKgM2: '1.34' },
    { tipo: 'AISI 304', malla: '35',  diametroMm: '0.25',  luzMm: '0.48',  areaAbiertaPct: '42.97', pesoKgM2: '1.05' },
    { tipo: 'AISI 304', malla: '40',  diametroMm: '0.20',  luzMm: '0.44',  areaAbiertaPct: '46.93', pesoKgM2: '0.80' },
    { tipo: 'AISI 304', malla: '40',  diametroMm: '0.25',  luzMm: '0.39',  areaAbiertaPct: '36.76', pesoKgM2: '1.19' },
    { tipo: 'AISI 304', malla: '45',  diametroMm: '0.20',  luzMm: '0.36',  areaAbiertaPct: '41.69', pesoKgM2: '0.90' },
    { tipo: 'AISI 304', malla: '45',  diametroMm: '0.25',  luzMm: '0.31',  areaAbiertaPct: '31.03', pesoKgM2: '1.29' },
    { tipo: 'AISI 304', malla: '50',  diametroMm: '0.20',  luzMm: '0.31',  areaAbiertaPct: '36.76', pesoKgM2: '1.00' },
    { tipo: 'AISI 304', malla: '60',  diametroMm: '0.17',  luzMm: '0.25',  areaAbiertaPct: '35.81', pesoKgM2: '0.88' },
    { tipo: 'AISI 304', malla: '70',  diametroMm: '0.15',  luzMm: '0.21',  areaAbiertaPct: '34.41', pesoKgM2: '0.80' },
    { tipo: 'AISI 304', malla: '80',  diametroMm: '0.12',  luzMm: '0.20',  areaAbiertaPct: '38.69', pesoKgM2: '0.58' },
    { tipo: 'AISI 304', malla: '80',  diametroMm: '0.14',  luzMm: '0.18',  areaAbiertaPct: '31.25', pesoKgM2: '0.79' },
    { tipo: 'AISI 304', malla: '100', diametroMm: '0.10',  luzMm: '0.15',  areaAbiertaPct: '36.76', pesoKgM2: '0.51' },
    { tipo: 'AISI 304', malla: '120', diametroMm: '0.09',  luzMm: '0.12',  areaAbiertaPct: '33.04', pesoKgM2: '0.49' },
    { tipo: 'AISI 304', malla: '150', diametroMm: '0.06',  luzMm: '0.11',  areaAbiertaPct: '41.69', pesoKgM2: '0.29' },
    { tipo: 'AISI 304', malla: '200', diametroMm: '0.05',  luzMm: '0.08',  areaAbiertaPct: '36.76', pesoKgM2: '0.28' },
    // --- AISI 316 / 316L ---
    { tipo: 'AISI 316 / 316L', malla: '230', diametroMm: '0.040', luzMm: '0.0704', areaAbiertaPct: '4.49',  pesoKgM2: '0.1859' },
    { tipo: 'AISI 316 / 316L', malla: '250', diametroMm: '0.040', luzMm: '0.0616', areaAbiertaPct: '3.73',  pesoKgM2: '0.2020' },
    { tipo: 'AISI 316 / 316L', malla: '300', diametroMm: '0.040', luzMm: '0.0447', areaAbiertaPct: '2.36',  pesoKgM2: '0.2425' },
    { tipo: 'AISI 316 / 316L', malla: '325', diametroMm: '0.035', luzMm: '0.0432', areaAbiertaPct: '2.38',  pesoKgM2: '0.2011' },
    { tipo: 'AISI 316 / 316L', malla: '350', diametroMm: '0.035', luzMm: '0.0376', areaAbiertaPct: '1.95',  pesoKgM2: '0.2166' },
    { tipo: 'AISI 316 / 316L', malla: '400', diametroMm: '0.028', luzMm: '0.0355', areaAbiertaPct: '1.98',  pesoKgM2: '0.1584' },
    { tipo: 'AISI 316 / 316L', malla: '500', diametroMm: '0.025', luzMm: '0.0258', areaAbiertaPct: '1.31',  pesoKgM2: '0.1578' },
    // --- Reps (Tejido holandés) ---
    { tipo: 'Reps', malla: '12/90',    diametroMm: '0.40/0.30', luzMm: '—', filtradoAbsolutouM: '270–300', filtradoNominaluM: '211', pesoKgM2: '2.46' },
    { tipo: 'Reps', malla: '24/110',   diametroMm: '0.36/0.25', luzMm: '—', filtradoAbsolutouM: '115–128', filtradoNominaluM: '110', pesoKgM2: '2.39' },
    { tipo: 'Reps', malla: '30/150',   diametroMm: '0.25/0.18', luzMm: '—', filtradoAbsolutouM: '90–105',  filtradoNominaluM: '90',  pesoKgM2: '1.7009' },
    { tipo: 'Reps', malla: '30/150 316L', diametroMm: '0.25/0.18', luzMm: '—', filtradoAbsolutouM: '90–105', filtradoNominaluM: '90', pesoKgM2: '1.7009' },
    { tipo: 'Reps', malla: '50/250',   diametroMm: '0.14/0.12', luzMm: '—', filtradoAbsolutouM: '52–57',   filtradoNominaluM: '55',  pesoKgM2: '1.0115' },
    { tipo: 'Reps', malla: '80/700',   diametroMm: '0.11/0.08', luzMm: '—', filtradoAbsolutouM: '35–44',   filtradoNominaluM: '35',  pesoKgM2: '1.3759' },
    { tipo: 'Reps', malla: '200/1400', diametroMm: '0.07/0.04', luzMm: '—', filtradoAbsolutouM: '12–14',   filtradoNominaluM: '10',  pesoKgM2: '0.8132' },
    // --- Acero negro ---
    { tipo: 'Acero negro', malla: '12/90',  diametroMm: '0.40/0.30', luzMm: '—', filtradoAbsolutouM: '270–300', filtradoNominaluM: '211', pesoKgM2: '2.50' },
    { tipo: 'Acero negro', malla: '24/110', diametroMm: '0.35/0.25', luzMm: '—', filtradoAbsolutouM: '115–128', filtradoNominaluM: '110', pesoKgM2: '2.27' },
    // --- Especiales AISI 304 ---
    { tipo: 'Especiales 304', malla: '2',   diametroMm: '1.25', luzMm: '2.00', areaAbiertaPct: '81.28', pesoKgM2: '6.13' },
    { tipo: 'Especiales 304', malla: '2.5', diametroMm: '1.25', luzMm: '2.50', areaAbiertaPct: '76.91', pesoKgM2: '5.53' },
    { tipo: 'Especiales 304', malla: '3',   diametroMm: '1.25', luzMm: '3.00', areaAbiertaPct: '72.65', pesoKgM2: '4.88' },
    { tipo: 'Especiales 304', malla: '3',   diametroMm: '1.50', luzMm: '3.00', areaAbiertaPct: '67.72', pesoKgM2: '7.02' },
  ]

  readonly totalSpecs = computed(() => {
    return this.selectedProductoKey() === 'telas' ? this.specsInox.length : 0;
  });

  readonly filteredSpecs = computed(() => {
    if (this.selectedProductoKey() !== 'telas') return [];

    const tipo = this.filtroTipo();
    const q = this.filtroTexto().trim().toLowerCase();

    return this.specsInox.filter((row) => {
      const byTipo = tipo === 'Todos' ? true : row.tipo === tipo;
      if (!byTipo) return false;

      if (!q) return true;

      const hay = [
        row.tipo, row.malla, row.diametroMm, row.luzMm,
        row.areaAbiertaPct ?? '', row.pesoKgM2 ?? '',
        row.filtradoAbsolutouM ?? '', row.filtradoNominaluM ?? '',
      ].join(' ').toLowerCase();

      return hay.includes(q);
    });
  });

  setTipo(tipo: TipoMalla | 'Todos') {
    this.filtroTipo.set(tipo);
  }

  onBuscar(texto: string) {
    this.filtroTexto.set(texto);
  }

  // ---------------- GALERÍA (sidebar) ----------------
  readonly galleryImages = [
    { src: '../../assets/img/img1.jpeg', alt: 'Producto 01', title: 'Telas Metálicas' },
    { src: '../../assets/img/img2.jpeg', alt: 'Producto 02', title: 'Rollo de Tejido metálico' },
    { src: '../../assets/img/img8.png', alt: 'Producto 03', title: 'Pacokos' },
    { src: '../../assets/img/img7.jpg', alt: 'Producto 04', title: 'Discos Filtrantes' },
    { src: '../../assets/img/img9.png', alt: 'Producto 05', title: 'Zarandas' },
  ];
}
