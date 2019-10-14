import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerForm: FormGroup;
  customer_id: String = '';
  customer_name: String = '';
  customer_email: String = '';
  customer_phone: String = '';
  customer_order: String = '';
  customer_address: String = '';

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'customer_id': [null, Validators.required],
      'customer_name': [null, Validators.required],
      'customer_email': [null, Validators.required],
      'customer_phone': [null, Validators.required],
      'customer_order': [null, Validators.required],
      'customer_address': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postCustomer(form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
