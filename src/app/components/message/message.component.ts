import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompService} from "../../pages/home/service/rx-stomp.service";
import {Message} from "../../model/message";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy{

  messages: string[] = [];

  whatsapp = '5511938065778'
  controlNumber = 900023
  agent = '2000'
  private readonly userSubscribe: Subscription

  constructor(private rxStompService: RxStompService) {

    const websocketUser = `${this.controlNumber}-${this.agent}`
    this.userSubscribe = this.rxStompService.watch(`/user/${websocketUser}/private`).subscribe((message) => {
      const messageID = message.headers['message-id']
      console.log(messageID.substring(0, messageID.lastIndexOf('-')))
      console.log(JSON.parse(message.body))
      this.messages.push(message.body);
    });

  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }

  loadQueue() {
    const message: Message = {
      action: 'LOAD_QUEUE',
      controlNumber: this.controlNumber,
      whatsapp: this.whatsapp,
      agent: '2000',
      departments: [
        {
          id: 1,
          title: 'Atendimento',
        },
        {
          id: 2,
          title: 'Financeiro',
        },
      ],
    };
    this.rxStompService.publish({ destination: '/wip/action-message', body: JSON.stringify(message) });
  }

}
