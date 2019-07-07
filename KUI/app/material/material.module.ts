import { NgModule } from '@angular/core';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {CarouselModule} from 'primeng/carousel';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { 
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule, 
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatSlideToggleModule
} from '@angular/material';

const materials = [
  MatSidenavModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatCardModule,
  MatExpansionModule,
  MatCarouselModule,
  MatFormFieldModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatSlideToggleModule
]

@NgModule({
  imports: [materials],
  exports: [materials]
})
export class MaterialModule { }
