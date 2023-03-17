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
  // private readonly controlNumber: number;
  // readonly agent: string;

  whatsapp = '5511938065778'
  controlNumber = 100023
  private readonly userSubscribe: Subscription
  private readonly queueSubscribe: Subscription

  constructor(private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute) {
    
    // this.controlNumber = this.activatedRoute.snapshot.queryParams['number'];
    // this.agent = this.activatedRoute.snapshot.queryParams['agent'];
    const websocketUser = `${this.controlNumber}-${this.whatsapp}`
    this.userSubscribe = this.rxStompService.watch(`/user/${websocketUser}/private`).subscribe((message) => {
      const messageID = message.headers['message-id']
      console.log(messageID.substring(0, messageID.lastIndexOf('-')))
      console.log(JSON.parse(message.body))
      this.messages.push(message.body);
    });

    this.queueSubscribe = this.rxStompService.watch(`/user/${(this.controlNumber)}/queue`).subscribe((message) => {
      console.log(message.body)
      this.messages.push(message.body);
    });
  }

  ngOnInit(): void {}

  sendPrivateMessage() {
    const message: Message = {
      action: 'SEND_MESSAGE',
      controlNumber: this.controlNumber,
      whatsapp: this.whatsapp,
    };
    this.rxStompService.publish({ destination: '/wip/action-message', body: JSON.stringify(message) });
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
    this.queueSubscribe.unsubscribe();
  }

  loadChat() {
    const message: Message = {
      action: 'LOAD_CHAT',
      controlNumber: this.controlNumber,
      whatsapp: this.whatsapp,
    };
    this.rxStompService.publish({ destination: '/wip/action-message', body: JSON.stringify(message) });
  }

  loadQueue() {
    const message: Message = {
      action: 'LOAD_QUEUE',
      controlNumber: this.controlNumber,
      whatsapp: this.whatsapp,
    };
    this.rxStompService.publish({ destination: '/wip/action-message', body: JSON.stringify(message) });
  }

  contactAttended() {
    const message: Message = {
      action: 'CONTACT_ATTENDED',
      controlNumber: this.controlNumber,
      whatsapp: this.whatsapp,
    };
    this.rxStompService.publish({ destination: '/wip/action-message', body: JSON.stringify(message) });
  }
}
