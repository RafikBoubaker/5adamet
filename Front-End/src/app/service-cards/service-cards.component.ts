import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-cards',
  templateUrl: './service-cards.component.html',
  styleUrls: ['./service-cards.component.css']
})
export class ServiceCardsComponent implements OnInit {
  costestimationsArray=[];
costanswersArray=[];
  

  username=localStorage.getItem("name")
  email=localStorage.getItem("email")
  phone=localStorage.getItem("phone")
  address=localStorage.getItem("address")
  constructor(private us:ServiceService, private router:Router) { }

  ngOnInit(): void {
    let tokenverify=localStorage.getItem("token")
    if(tokenverify==null || localStorage.getItem("role")!=='ServiceProvider'){
      localStorage.clear();
      alert("Unauthorized access")
   this.router.navigateByUrl("/home")
   setTimeout(()=>{
    window.location.reload();
  },10)
    }
   
    this.us.getcostestimations().subscribe(
      (res)=>{

        console.log(res)
        this.costestimationsArray=res
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )

    this.us.getcostanswers().subscribe(
      (res)=>{

        console.log('ANSWERSSS',res)
        this.costanswersArray=res
      },
      (err)=>{
        alert("Something went wrong")
        console.log(err)
      }
    )




   
  }


  askToTreat(cost){
    console.log('COST',cost.username)
    this.router.navigate(['/quoteresponse'], { queryParams: { cost: JSON.stringify(cost) }});
  }


  payme(){

    this.router.navigateByUrl("/payment")

  }


  
}
