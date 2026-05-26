import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerOverlayComponent } from './drawer-overlay/drawer-overlay.component';
import { DrawerPanelComponent } from './drawer-panel/drawer-panel.component';

@NgModule({
  declarations: [DrawerOverlayComponent, DrawerPanelComponent],
  imports: [CommonModule],
  exports: [DrawerOverlayComponent, DrawerPanelComponent],
})
export class DrawerModule {}
