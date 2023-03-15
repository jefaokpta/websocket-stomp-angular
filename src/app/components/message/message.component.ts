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

  agent = '2000'
  controlNumber = 100023
  private readonly userSubscribe: Subscription
  private readonly queueSubscribe: Subscription

  constructor(private rxStompService: RxStompService,
              private activatedRoute: ActivatedRoute) {

    // this.controlNumber = this.activatedRoute.snapshot.queryParams['number'];
    // this.agent = this.activatedRoute.snapshot.queryParams['agent'];

    this.userSubscribe = this.rxStompService.watch(`/user/${this.agent}/private`).subscribe((message) => {
      console.log(message.headers)
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
      agent: this.agent,
    };
    this.rxStompService.publish({ destination: '/wip/private-message', body: JSON.stringify(message) });
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
    this.queueSubscribe.unsubscribe();
  }

  loadChat() {
    const message: Message = {
      action: 'LOAD_CHAT',
      controlNumber: this.controlNumber,
      agent: this.agent,
      contactId: 1
    };
    this.rxStompService.publish({ destination: '/wip/private-message', body: JSON.stringify(message) });
  }

  loadQueue() {
    const message: Message = {
      action: 'LOAD_QUEUE',
      controlNumber: this.controlNumber,
      agent: this.agent,
    };
    this.rxStompService.publish({ destination: '/wip/queue-message', body: JSON.stringify(message) });
  }
}
