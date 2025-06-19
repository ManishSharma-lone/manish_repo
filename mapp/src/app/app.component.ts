import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
onRouteActivate($event: any) {
throw new Error('Method not implemented.');
}
  students: any[] = [];
  message = '';
  type: 'success' | 'error' = 'success';

  addStudentToList(student: any) {
    this.students.push(student);
    this.showNotification('Student added successfully!', 'success');
  }

  clearStudents() {
    this.students = [];
    this.showNotification('All students cleared!', 'success');
  }

  showNotification(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.type = type;
    setTimeout(() => this.message = '', 3000);
  }
}
