import {EventType} from './enum';

export interface IEvent {
  index: number;
  title: string;
  type: EventType;
  place: string;
  time: string;
  money: number;
  text: string;
}
