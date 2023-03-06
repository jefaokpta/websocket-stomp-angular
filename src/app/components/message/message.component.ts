import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from "../../pages/home/service/rx-stomp.service";
import {Message} from "../../model/message";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy{

  messages: string[] = [];
  private readonly controlNumber: number;
  private readonly user: string;
  private readonly userSubcribe: Subscription
  private readonly queueSubcribe: Subscription

  constructor(private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute) {

    this.controlNumber = this.activatedRoute.snapshot.queryParams['number'];
    this.user = this.activatedRoute.snapshot.queryParams['user'];

    this.userSubcribe = this.rxStompService.watch(`/user/${(this.user)}/private`).subscribe((message) => {
      console.log(JSON.parse(message.body))
      this.messages.push(message.body);
    });

    this.queueSubcribe = this.rxStompService.watch(`/user/${(this.controlNumber)}/queue`).subscribe((message) => {
      console.log(message.body)
      this.messages.push(message.body);
    });
  }

  ngOnInit(): void {

  }

  sendPrivateMessage() {
    const message: Message = {
      action: 'SEND_MESSAGE',
      controlNumber: this.controlNumber,
      from: 'user1',
      to: this.user,
      message: 'privado'
    };
    this.rxStompService.publish({ destination: '/wip/private-message', body: JSON.stringify(message) });
  }

  ngOnDestroy(): void {
    this.userSubcribe.unsubscribe();
    this.queueSubcribe.unsubscribe();
  }

}
