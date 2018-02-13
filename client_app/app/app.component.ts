import { Component } from '@angular/core';

import { User } from './common/models/user';
import { ContextService } from './common/services/context.service'
import { AuthService } from './common/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ContextService, AuthService],
})
export class AppComponent {
  private user: User;
  form: FormGroup;

  constructor(private context: ContextService, public auth: AuthService , private fb: FormBuilder) {
    auth.handleAuthentication();
  }
ngOnInit(){
  this.form = this.fb.group ({
    date: ''
  });
}
  ngAfterViewInit() {
  }
}
