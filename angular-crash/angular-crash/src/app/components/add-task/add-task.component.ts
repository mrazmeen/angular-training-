import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UiService} from "../../services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  // @ts-ignore
  text: string;
  // @ts-ignore
  day: string;
  reminder: boolean = false;
  // @ts-ignore
  showAddTask: boolean;
  // @ts-ignore
  subscription: Subscription;


  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value => (this.showAddTask= value)));
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a task!");
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    // @ts-ignore
    this.onAddTask.emit(newTask);


    this.text = '';
    this.day = '';
    this.reminder = false;

  }

}
