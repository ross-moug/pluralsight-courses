import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Event,
  Session
} from '../../models';
import { EventService } from '../../services/event.service';

@Component({
  templateUrl: './events-details.component.html',
  styles: [`
      .container {
          padding-left: 20px;
          padding-right: 20px
      }

      .event-image {
          height: 100px;
      }

      a {
          cursor: pointer;
      }
  `]
})
export class EventsDetailsComponent implements OnInit {
  event: Event;
  addMode: boolean;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    console.log(this.event);
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: Session): void {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));
    session.id = nextId;
    this.event.sessions.push(session);
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession(): void {
    this.addMode = false;
  }
}
