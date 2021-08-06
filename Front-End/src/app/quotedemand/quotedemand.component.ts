import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-quotedemand',
  templateUrl: './quotedemand.component.html',
  styleUrls: ['./quotedemand.component.css']
})
export class QuotedemandComponent  {
  services=["Cleaning","Plumbing","Carpenter","Painter","Gardening","HVAC ","Pest control","Applaince Repair"]


  fbForm: FormGroup;
  service:string;
  obj:UserCost;
  date:string;
  day:string;
  month:string;
  year:string;
  username:any;
  costanswersArray=[];



  constructor(private fb: FormBuilder, private us:ServiceService, private router: Router,private http:HttpClient){}


  ngOnInit(): void {
  let token=localStorage.getItem("token")
  if (token==null || localStorage.getItem("role")=='ServiceProvider' ){
    localStorage.clear();
    alert("Unauthorized access")
    this.router.navigateByUrl("/login")
    setTimeout(()=>{
      window.location.reload();
    },10)
   }
this.username=localStorage.getItem("name")


   this.fbForm = this.fb.group({
    username: [''],
    service: ['', Validators.required],
    city:['', Validators.required],
    description: ['', Validators.required]
  });


  this.us.getcostanswers().subscribe(
    (res)=>{

      console.log('ANSWERS',res)
      this.costanswersArray=res.filter(res =>{
        console.log('ITEMMM',res)
          return (res.username.toLocaleLowerCase().match(this.username.toLocaleLowerCase()))
        })
    },
    (err)=>{
      alert("Something went wrong")
      console.log(err)
    }
  )

  }

  createDate(){
    var numday = new Date().getDate();
    this.day = numday.toString();
    numday = new Date().getMonth();
    this.month = numday.toString();
    numday = new Date().getFullYear();
    this.year = numday.toString();
    this.date = this.day + "/" + this.month + "/" + this.year;
    return this.date;
  }



  file:File;
  incomingfile(event){

   this.file = event.target.files[0]
  
  }

  formData = new FormData()
  submit(fbForm){

    let {service,city,description} = fbForm.value

    this.date = this.createDate();

    this.formData.append("image",this.file,this.file.name)
    //this.formData.append("serviceObj",JSON.stringify(serviceObj))
 this.formData.append('username',this.username)
 this.formData.append('date',this.date)
 this.formData.append('description',description)
 this.formData.append('service',service)
 this.formData.append('city',city)

    console.log('OBJJ',this.obj)
    this.us.postcostestimation(this.formData).subscribe(
      () =>{
    
      alert('cost estimation sent we will contact you ASAP!')
   
     // form.reset();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  
    },
    (err)=>{
      console.log(err)
    })

  }

  accept(answer){
  

this.http.patch(`http://localhost:3000/costanwsers/${answer.id}/status`,{status:'ACCEPTED'}).subscribe(
      () =>{
    
      alert('Congratulation !!! cost estimation offer accepted Our Service Provider will contact you ASAP')
   
     // form.reset();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  
    },
    (err)=>{
      console.log(err)
    })
  }


  decline(answer){
    this.http.patch(`http://localhost:3000/costanwsers/${answer.id}/status`,{status:'DECLINED'}).subscribe(
      () =>{
    
      alert('Please check the others cost estimation offers')
   
     // form.reset();
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
  
    },
    (err)=>{
      console.log(err)
    })
    
  }

}

interface UserCost{
  service:string;
  username:string;
  city?:string;
  description?:string;
  date:string;

 
}
