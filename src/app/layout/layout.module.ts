import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbNavComponent } from './breadcrumb-nav/breadcrumb-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HeaderComponent, BreadcrumbNavComponent, FooterComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [HeaderComponent, BreadcrumbNavComponent, FooterComponent],
})
export class LayoutModule {}
