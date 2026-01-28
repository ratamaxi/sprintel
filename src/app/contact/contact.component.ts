import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type HorarioItem = {
  dia: string;
  hora: string;
};

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  // Mostrado en la UI
  readonly phoneDisplay = '11 1234-5678';

  // WhatsApp en formato internacional (sin +, sin espacios)
  readonly whatsappNumber = '541112345678';

  // Email de contacto
  readonly email = 'ventas@sprintel.com.ar';

  // Horario (lo que te faltaba)
  readonly horario: HorarioItem[] = [
    { dia: 'Lunes a Viernes', hora: '09:00 a 18:00' },
    { dia: 'Sábados', hora: '09:00 a 13:00' },
    { dia: 'Domingos', hora: 'Cerrado' },
  ];

  // Links calculados
  get whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}`;
  }

  get mailtoLink(): string {
    return `mailto:${this.email}`;
  }
}
