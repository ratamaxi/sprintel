import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface ArtSpec {
  luzLibre: string;   // ej: "12 x 12"
  diametro: string;   // ej: "2"
  anchoMax: string;   // ej: "2"
  peso: string;       // ej: "4,2"
}

@Component({
  selector: 'app-tejido-artistico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tejido-artistico.component.html',
  styleUrls: ['./tejido-artistico.component.scss'],
})
export class TejidoArtisticoComponent {
  filtroTexto = signal<string>('');

  // Tabla tomada del link (si alguna fila en el HTML venía sin dato, queda "—")
  readonly specs: ArtSpec[] = [
    { luzLibre: '8 x 8',  diametro: '1,5',  anchoMax: '1,5', peso: '4' },
    { luzLibre: '10 x 10', diametro: '1,5', anchoMax: '1,5', peso: '3,3' },
    { luzLibre: '10 x 10', diametro: '2',   anchoMax: '2',   peso: '5' },

    { luzLibre: '12 x 12', diametro: '1,5', anchoMax: '1,5', peso: '2,7' },
    { luzLibre: '12 x 12', diametro: '2',   anchoMax: '2',   peso: '4,2' },
    { luzLibre: '12 x 12', diametro: '2,5', anchoMax: '2,5', peso: '6,6' },

    { luzLibre: '15 x 15', diametro: '1,5', anchoMax: '1,5', peso: '2,1' },
    { luzLibre: '15 x 15', diametro: '2',   anchoMax: '2',   peso: '3,3' },
    { luzLibre: '15 x 15', diametro: '2,5', anchoMax: '2,5', peso: '5,1' },
    { luzLibre: '15 x 15', diametro: '3',   anchoMax: '3',   peso: '7' },
    { luzLibre: '15 x 15', diametro: '4',   anchoMax: '4',   peso: '12' },

    { luzLibre: '18 x 18', diametro: '1,5', anchoMax: '1,5', peso: '1,6' },
    { luzLibre: '18 x 18', diametro: '2',   anchoMax: '2',   peso: '2,5' },
    { luzLibre: '18 x 18', diametro: '2,5', anchoMax: '2,5', peso: '3,9' },
    { luzLibre: '18 x 18', diametro: '3',   anchoMax: '3',   peso: '5,3' },
    { luzLibre: '18 x 18', diametro: '4',   anchoMax: '4',   peso: '9,1' },

    { luzLibre: '20 x 20', diametro: '1,5', anchoMax: '1,5', peso: '1,3' },
    { luzLibre: '20 x 20', diametro: '2',   anchoMax: '2',   peso: '2,1' },
    { luzLibre: '20 x 20', diametro: '2,5', anchoMax: '2,5', peso: '3,2' },
    { luzLibre: '20 x 20', diametro: '3',   anchoMax: '3',   peso: '4,4' },
    { luzLibre: '20 x 20', diametro: '4',   anchoMax: '4',   peso: '7,6' },

    { luzLibre: '25 x 25', diametro: '2',   anchoMax: '2',   peso: '1,7' },
    { luzLibre: '25 x 25', diametro: '2,5', anchoMax: '2,5', peso: '2,6' },
    { luzLibre: '25 x 25', diametro: '3',   anchoMax: '3',   peso: '3,6' },
    { luzLibre: '25 x 25', diametro: '4',   anchoMax: '4',   peso: '6,2' },

    { luzLibre: '30 x 30', diametro: '2',   anchoMax: '2',   peso: '1,4' },
    { luzLibre: '30 x 30', diametro: '2,5', anchoMax: '2,5', peso: '2,1' },
    { luzLibre: '30 x 30', diametro: '3',   anchoMax: '3',   peso: '2,9' },
    { luzLibre: '30 x 30', diametro: '4',   anchoMax: '4',   peso: '5' },
    { luzLibre: '30 x 30', diametro: '5',   anchoMax: '5',   peso: '7,7' },

    { luzLibre: '35 x 35', diametro: '2,5', anchoMax: '2,5', peso: '1,8' },
    { luzLibre: '35 x 35', diametro: '3',   anchoMax: '3',   peso: '2,5' },
    { luzLibre: '35 x 35', diametro: '4',   anchoMax: '4',   peso: '4,3' },
    { luzLibre: '35 x 35', diametro: '5',   anchoMax: '5',   peso: '6,6' },
    { luzLibre: '35 x 35', diametro: '6',   anchoMax: '3',   peso: '9,3' },

    { luzLibre: '40 x 40', diametro: '2',    anchoMax: '2', peso: '1,2' },
    { luzLibre: '40 x 40', diametro: '2,5',  anchoMax: '2,5', peso: '1,8' },
    { luzLibre: '40 x 40', diametro: '3',    anchoMax: '3', peso: '2,4' },
    { luzLibre: '40 x 40', diametro: '2,5',  anchoMax: '5', peso: '2,3' },
    { luzLibre: '40 x 40', diametro: '3',    anchoMax: '3', peso: '3,2' },
    { luzLibre: '40 x 40', diametro: '3,25', anchoMax: '4', peso: '3,6' },
    { luzLibre: '40 x 40', diametro: '3,5',  anchoMax: '5', peso: '4,5' },
    { luzLibre: '40 x 40', diametro: '4',    anchoMax: '6', peso: '5,5' },
    { luzLibre: '40 x 40', diametro: '5',    anchoMax: '3', peso: '8' },
    { luzLibre: '40 x 40', diametro: '6',    anchoMax: '4', peso: '11' },

    // últimas filas (en el HTML que se ve desde el inspector aparecían sin el último dato)
    { luzLibre: '45 x 45', diametro: '3',    anchoMax: '5', peso: '5,5' },
    { luzLibre: '45 x 45', diametro: '3,25', anchoMax: '3', peso: '—' },
    { luzLibre: '45 x 45', diametro: '3,65', anchoMax: '4', peso: '—' },
    { luzLibre: '45 x 45', diametro: '4',    anchoMax: '5', peso: '—' },
    { luzLibre: '45 x 45', diametro: '5',    anchoMax: '6', peso: '—' },
    { luzLibre: '45 x 45', diametro: '6',    anchoMax: '3', peso: '—' },

    { luzLibre: '50 x 50', diametro: '3,25', anchoMax: '6', peso: '—' },
    { luzLibre: '50 x 50', diametro: '3,5',  anchoMax: '3', peso: '—' },
    { luzLibre: '50 x 50', diametro: '3,65', anchoMax: '4', peso: '—' },
    { luzLibre: '50 x 50', diametro: '4',    anchoMax: '5', peso: '—' },
    { luzLibre: '50 x 50', diametro: '5',    anchoMax: '3', peso: '—' },
    { luzLibre: '50 x 50', diametro: '6',    anchoMax: '4', peso: '—' },
  ];

  readonly total = computed(() => this.specs.length);

  readonly filtered = computed(() => {
    const q = this.filtroTexto().trim().toLowerCase();
    if (!q) return this.specs;

    return this.specs.filter((r) => {
      const hay = [r.luzLibre, r.diametro, r.anchoMax, r.peso].join(' ').toLowerCase();
      return hay.includes(q);
    });
  });

  onBuscar(texto: string) {
    this.filtroTexto.set(texto);
  }
}
