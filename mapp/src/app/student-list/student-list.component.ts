import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  dob: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.students = JSON.parse(localStorage.getItem('students') || '[]');
  }

  editStudent(s: Student) {
    this.router.navigate(['/add-student'], { state: { student: s } });
  }

  deleteStudent(s: Student) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.students = this.students.filter(st => st.id !== s.id);
      localStorage.setItem('students', JSON.stringify(this.students));
    }
  }
}
