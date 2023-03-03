import {Component, OnInit} from '@angular/core';
import {RxStompService} from "../../pages/home/service/rx-stomp.service";
import {Message} from "../../model/message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit{

  messages: string[] = [];
  constructor(private rxStompService: RxStompService) {}

  ngOnInit(): void {
    this.rxStompService.watch('/topic/broadcast').subscribe((message) => {
      console.log(message.body)
      this.messages.push(message.body);
    });
    this.rxStompService.watch('/user/jefao/private').subscribe((message) => {
      console.log(message.body)
      this.messages.push(message.body);
    });
  }

  sendPublicMessage() {
    const message: Message = {
      action: 'SEND_MESSAGE',
      controlNumber: 100023,
      from: 'user1',
      to: 'user2',
      message: 'publilco'
    };
    this.rxStompService.publish({ destination: '/wip/public', body: JSON.stringify(message) });
  }

  sendPrivateMessage() {
    const message: Message = {
      action: 'SEND_MESSAGE',
      controlNumber: 100023,
      from: 'user1',
      to: 'user2',
      message: 'privado'
    };
    this.rxStompService.publish({ destination: '/wip/private-message', body: JSON.stringify(message) });
  }



}
