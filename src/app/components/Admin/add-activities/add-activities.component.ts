import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { Role } from 'src/app/role';
import { ActionSService } from 'src/app/servive/action-s.service';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.css']
})
export class AddActivitiesComponent implements OnInit{
  lesActivites:Activite[]=[];
  activityForm!:FormGroup;


  constructor(private router:Router,private formBuilder:FormBuilder , private actionSService:ActionSService) { }
  lesroles=Object.values(Role);

  ngOnInit(): void {
    this.activityForm=this.formBuilder.nonNullable.group({
      id:[],
      name:[''],
      technology:[''],
      description:[''],
      image : ['assets/default.jpg'],
      equipe:this.formBuilder.array([])
    })
    console.log(this.lesActivites);
    this.actionSService.getActivite().subscribe(data=>{
      this.lesActivites=data;
      console.log(this.lesActivites);

    })
  }

  public get lesequipes(){
    return this.activityForm.get('equipe') as FormArray ;
  }

  onAjouter(){
    this.lesequipes.push(this.formBuilder.group(
      {
        firstName: ['' ],
        lastName: ['' ],
        role: [Role.Chef ],
        image : ['assets/default.jpg'],
        linkdin: ['' ]

      }
    ));
  }
  
  onDetails(id:number){
    this.router.navigate(['/admin/detailsA/'+id]); 
  }
  
}
