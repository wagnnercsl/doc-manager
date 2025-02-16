import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';
import { RecoverPasswordRoutingModule } from './recover-password-routing.module';
import { RecoverPasswordComponent } from './recover-password.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecoverPasswordRoutingModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class RecoverPasswordModule { }
