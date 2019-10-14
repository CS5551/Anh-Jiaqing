import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer = {};
  customerForm: FormGroup;
  customer_id: String = '';
  customer_name: String = '';
  customer_email: String = '';
  customer_phone: String = '';
  customer_order: String = '';
  customer_address: String = '';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
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
    this.getCustomer(this.route.snapshot.params['id']);
  }
  getBookDetails(id) {
    this.api.getCustomer(id)
      .subscribe(data => {
        console.log(data);
        this.customer = data;
      });
  }
  onFormSubmit(form: NgForm) {
    let id = this.route.snapshot.params['id'];
    console.log(form)
    this.api.updateCustomer(id, form)
      .subscribe(res => {
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
  getCustomer(id) {
    this.api.getCustomer(id).subscribe(data => {
      id = data._id;
      this.customerForm.setValue({
        customer_id: data.customer_id,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        customer_order: data.customer_order,
        customer_address: data.customer_address
      });
    });
  }
}
