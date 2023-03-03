import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {MessageComponent} from "../../components/message/message.component";
import {RxStompService} from "./service/rx-stomp.service";
import {rxStompServiceFactory} from "./service/rx-stomp-service-factory";


@NgModule({
  declarations: [
    HomeComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [
    { provide: RxStompService, useFactory: rxStompServiceFactory}
  ]
})
export class HomeModule { }
