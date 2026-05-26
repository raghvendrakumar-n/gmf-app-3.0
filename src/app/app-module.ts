import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './features/auth/auth.module';
import { ChatModule } from './features/chat/chat.module';
import { DrawerModule } from './features/drawer/drawer.module';
import { AssessmentModule } from './features/assessment/assessment.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    App,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    ChatModule,
    DrawerModule,
    AssessmentModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule {}
