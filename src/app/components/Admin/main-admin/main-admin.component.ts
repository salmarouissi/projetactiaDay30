import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { ActionSService } from 'src/app/servive/action-s.service';
import { AuthSService } from 'src/app/servive/auth-s.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {
  lesActivites:Activite[]=[];
  
  constructor(private router:Router,private authService:AuthSService,private actionSService:ActionSService){}

  ngOnInit(): void {
    console.log(this.lesActivites);
    this.actionSService.getActivite().subscribe(data=>{
      this.lesActivites=data;
      console.log(this.lesActivites);

    })
  }
  
  onDetails(id:number){
    this.router.navigate(['/admin/detailsA/'+id]); 
  }

  onDisconnect(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
