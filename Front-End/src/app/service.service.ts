import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
 
  API_SERVER = "http://localhost:3000";
  
 constructor(private hc:HttpClient) {}

//users autentification
 postadminsignup(userobj):Observable<any>{
  return this.hc.post(`${this.API_SERVER}/auth/admins/signup`,userobj)
}

postSPsignup(userobj):Observable<null>{
  return this.hc.post<null>(`${this.API_SERVER}/auth/serviceprovider/signup`,userobj)
}


postusersignup(userobj):Observable<null>{
  return this.hc.post<null>(`${this.API_SERVER}/auth/users/signup`,userobj)
}


 getadminlogin(userObj):Observable<{ accessToken: string }>{
return this.hc.post<{ accessToken: string }>(`${this.API_SERVER}/auth/signin`,userObj)
 }

 getuserlogin(userObj){
  return this.hc.post<any>(`${this.API_SERVER}/auth/signin`,userObj)
//   .pipe(map(user => {
//     // store user details and jwt token in local storage to keep user logged in between page refreshes
//     console.log(user)
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     localStorage.setItem('id_token', JSON.stringify(user.token));
//     // this.currentUserSubject.next(user);
//     return user;
// }));
   }


//serviceProvider
getserviceproviders():Observable<any>{
  return this.hc.get(`${this.API_SERVER}/serviceproviders/getall`)
}


deleteprovider(providerObj):Observable<any>{
  return this.hc.delete(`${this.API_SERVER}/serviceproviders/${providerObj}`)
}



//users

getusers():Observable<any>{
  return this.hc.get(`${this.API_SERVER}/users/getall`)
}

deleteuser(userObj):Observable<any>{
  return this.hc.delete(`${this.API_SERVER}/users/${userObj}`)
}



//services
  postservices(servicesObj):Observable<null>{
    return this.hc.post<null>(`${this.API_SERVER}/services/createservices`,servicesObj)
  }


  getservices():Observable<any>{
    return this.hc.get(`${this.API_SERVER}/services/getservices`)
  }


  deleteservices(serviceObj):Observable<any>{
    return this.hc.delete(`${this.API_SERVER}/services/deleteservices/${serviceObj}`)
  }


//cart
  addtocart(cartObj):Observable<any>{
    return this.hc.post(`${this.API_SERVER}/cart/addtocart`,cartObj)
  }


  getservicetocart():Observable<any>{
    return this.hc.get(`${this.API_SERVER}/cart/getitems`)
       }


   
  //  getcart(username):Observable<any>{
  //    return this.hc.post("/cart/getitems",username)
  //  }


   deletefrmcart(cartItemId):Observable<any>{
    return this.hc.delete(`${this.API_SERVER}/cart/${cartItemId}`)
      }
 
      
      //contact
      postcontactdata(contactObj):Observable<any>{
        return this.hc.post(`${this.API_SERVER}/contacts/new-mail`,contactObj)
      }
   

      //reviews

      postreview(reviewObj):Observable<any>{
        return this.hc.post(`${this.API_SERVER}/reviews/addreview`,reviewObj)
      }
      

      getreviews():Observable<any>{
        return this.hc.get(`${this.API_SERVER}/reviews/getreviews`)
      }


      deletereview(reviewObj):Observable<any>{
        return this.hc.delete(`${this.API_SERVER}/reviews/${reviewObj}`)
      }



      //cost estimation

      postcostestimation(costObj):Observable<null>{
        return this.hc.post<null>(`${this.API_SERVER}/costestimations/createcost`,costObj)
      }



      getcostestimations():Observable<any>{
        return this.hc.get(`${this.API_SERVER}/costestimations/getcosts`)
      }


      //cost answers


      postcreateanswer(answerObj):Observable<null>{
        return this.hc.post<null>(`${this.API_SERVER}/costanwsers/createanswer`,answerObj)
      }



      getcostanswers():Observable<any>{
        return this.hc.get(`${this.API_SERVER}/costanwsers/getanswers`)
      }



    patchanswerstatus(id,status):Observable<any>{
      return this.hc.patch(`${this.API_SERVER}/costanwsers/${id}/status`,status)
    }
      



    
   getUserDetails(serviceId):Observable<any>{
    return this.hc.get(`/services/getservices/${serviceId}`)
      }
   updateservices(serviceObj):Observable<any>{
        return this.hc.put("/services/updateservice",serviceObj)
      }
      
   getmainservices(location):Observable<any>{
        return this.hc.get(`/services/getmainservices/${location}`)
          }

   deletecartfrmadmin(serviceObj):Observable<any>{
     return this.hc.put("/cart/cartdeletefrmadmin",serviceObj)
   }

   getprofessionaldetails():Observable<any>{
     return this.hc.get("/professional/getdetails")
   }

}