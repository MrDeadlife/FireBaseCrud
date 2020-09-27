import { NgModule } from '@angular/core';
import { HeroeComponent } from './heroe/heroe.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [HeroeComponent, HeroesComponent],
  exports: [HeroeComponent,HeroesComponent],
  imports: [CommonModule,FormsModule,RouterModule ],
})
export class SharedModule {}
