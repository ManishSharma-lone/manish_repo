import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  dob: string;
}

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  student: Student = { id: 0, name: '', email: '', course: '', dob: '' };
  successMsg = '';
  errorMsg = '';
  isEdit = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const state = history.state as any;
    if (state?.student) {
      this.student = state.student;
      this.isEdit = true;
    }
  }

  addOrUpdate() {
    this.clearMessages();

    const { name, email, course, dob } = this.student;
    if (!name || !email || !course || !dob) {
      this.errorMsg = 'All fields are required!';
      return;
    }

    if (new Date(dob).getFullYear() <= 2001) {
      this.errorMsg = 'DOB must be after 2001';
      return;
    }

    const list: Student[] = JSON.parse(localStorage.getItem('students') || '[]');

    if (this.isEdit) {
      const idx = list.findIndex(s => s.id === this.student.id);
      if (idx > -1) list[idx] = this.student;
      this.successMsg = 'Student updated successfully!';
    } else {
      this.student.id = Date.now();
      list.push({ ...this.student });
      this.successMsg = 'Student added successfully!';
    }

    localStorage.setItem('students', JSON.stringify(list));

    setTimeout(() => {
      this.router.navigate(['/student-list']);
    }, 1000);
  }

  clearMessages() {
    this.successMsg = '';
    this.errorMsg = '';
  }
}
