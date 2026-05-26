import { Component, inject } from '@angular/core';
import { DrawerService } from '../../../core/services/drawer.service';

@Component({
  selector: 'app-drawer-overlay',
  standalone: false,
  templateUrl: './drawer-overlay.component.html',
  styleUrl: './drawer-overlay.component.css',
})
export class DrawerOverlayComponent {
  private drawerService = inject(DrawerService);
  isOpen$ = this.drawerService.isOpen$;
  close(): void { this.drawerService.close(); }
}
