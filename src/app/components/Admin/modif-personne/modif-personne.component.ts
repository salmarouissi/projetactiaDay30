import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { ActionSService } from 'src/app/servive/action-s.service';

@Component({
  selector: 'app-modif-personne',
  templateUrl: './modif-personne.component.html',
  styleUrls: ['./modif-personne.component.css']
})
export class ModifPersonneComponent implements OnInit{
  lesActivites:Activite[]=[];
  


  constructor(private router:Router,private formBuilder:FormBuilder , private actionSService:ActionSService) { }

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
