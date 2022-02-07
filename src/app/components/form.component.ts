import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration, ResponseMsg } from '../models';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form!: FormGroup
  constructor(private fb: FormBuilder, private formsvc: FormService) { }
  registration!: Registration

  ngOnInit(): void {

    this.form=this.createForm()
  }

  createForm(): FormGroup{
    return this.fb.group({
      name:this.fb.control('',[Validators.required,Validators.minLength(3)]),
      email:this.fb.control('',[Validators.required,Validators.email]),
      phone:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    })
  }

  onSubmit(){

    this.registration=this.form.value as Registration
    this.form.reset()
    console.info("Record>>>>>>",this.registration)
    this.formsvc.postRegistrationXwwwurlencoded(this.registration)
      .then(result=>{
        const info = result as unknown as ResponseMsg
        console.info("Yahoo! POST Created with 201 code. Message >>>>>",info.message)
      })
      .catch(error=>{
        const errorMsg  = error.error as ResponseMsg
        console.warn("GG bro u sucks. Err0r 400 Bad request : ",errorMsg.message)
      })
    
  }
  onSubmitJSON(){

    this.registration=this.form.value as Registration
    this.form.reset()
    console.info("Record>>>>>>",this.registration)
    this.formsvc.postRegistrationJSON(this.registration)
      .then(result=>{
        const info = result as unknown as ResponseMsg
        console.info("Yahoo! POST Created with 201 code via JSON object. Message >>>>>",info.message)
      })
      .catch(error=>{
        const errorMsg  = error.error as ResponseMsg
        console.warn("GG bro u sucks. Error 400 Bad request despite via JSON object : ",errorMsg.message)
      })
    
  }
}

