import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Registration } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FormService{

  registration!: Registration
  constructor(private http: HttpClient) { }
  
  
  postRegistrationXwwwurlencoded(register:Registration): Promise<Registration>{
    
    const url = ' https://chewyt-api.herokuapp.com/api/register'
    const record = new HttpParams()
    .set("name",register.name)
    .set("email",register.email)
    .set("phone",register.phone)
    const headers = new HttpHeaders()
    .set('content-type','application/x-www-form-urlencoded')
    .set('Access-Control-Allow-Origin','*');


    return lastValueFrom(
      this.http.post<Registration>(url,record.toString(),{headers})
    )

  }
  postRegistrationJSON(register:Registration): Promise<Registration>{
    
    const url = ' https://chewyt-api.herokuapp.com/api/register'
    
    const headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin','*');


    return lastValueFrom(
      this.http.post<Registration>(url,register.toString(),{headers})
    )

  }
  
}
