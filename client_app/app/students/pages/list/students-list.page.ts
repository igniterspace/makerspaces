import { Component } from '@angular/core';
import { StudentsService }      from '../../../common/services/student.service';
import { Student }      from '../../../common/models/student';

@Component({
  templateUrl: './students-list.page.html',
  styleUrls: ['./students-list.page.css']
})

export class StudentsListPage {

  private studentsService: StudentsService;
  private students: Student[];

  constructor(private os: StudentsService) {
    this.studentsService = os;
  }

  getStudents(): void {
    //this.studentsService.getStudents().then(students => this.students = students);
  }

  ngOnInit(): void {
    this.getStudents();
  }
}
