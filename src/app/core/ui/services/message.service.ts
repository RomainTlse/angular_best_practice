import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private _message: Subject<Message> = new Subject<Message>();
  public messageState = this._message.asObservable();

  /**
   * show the message
   */
  public show(message: Message): void {
    this._message.next(message);
  }

  /**
   * hide the message
   */
  public hide(): void {
    this._message.next(<Message>{ show: false, type: '', title: '', description: '' });
  }
}
