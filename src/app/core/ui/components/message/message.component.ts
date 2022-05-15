import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from '../../interfaces/message';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass'],
})
export class MessageComponent implements OnDestroy {
  public message: Message;
  private readonly _subscription?: Subscription;

  constructor(private _messageService: MessageService) {
    this.message = { show: false, type: '', title: '', description: '' };
    this._subscription = this._messageService.messageState.subscribe((state: Message) => {
      this.message = state;
    });
  }

  /**
   * Close the message
   */
  public closeMessage(): void {
    this._messageService.hide();
  }

  ngOnDestroy() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
