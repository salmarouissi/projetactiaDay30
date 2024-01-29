import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { ActionSService } from 'src/app/servive/action-s.service';

@Component({
  selector: 'app-modif-activities',
  templateUrl: './modif-activities.component.html',
  styleUrls: ['./modif-activities.component.css']
})
export class ModifActivitiesComponent implements OnInit{
  lesActivites:Activite[]=[];

  constructor(private router:Router, private actionSService:ActionSService) { }

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
}
