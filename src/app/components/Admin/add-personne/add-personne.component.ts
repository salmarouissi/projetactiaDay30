import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { Role } from 'src/app/role';
import { ActionSService } from 'src/app/servive/action-s.service';

@Component({
  selector: 'app-add-personne',
  templateUrl: './add-personne.component.html',
  styleUrls: ['./add-personne.component.css']
})
export class AddPersonneComponent implements OnInit{
  lesActivites:Activite[]=[];
  ajoutPersonneForm!:FormGroup
  lesroles=Object.values(Role);
  lesactivite?:Activite;

  constructor(private router:Router,private formBuilder:FormBuilder, private actionSService:ActionSService) { }

  ngOnInit(): void {
    this.actionSService.getActivite().subscribe(data=>{
      this.lesActivites=data;
      this.lesactivite = this.lesActivites.length > 0 ? this.lesActivites[0] : undefined;
    })
    this.ajoutPersonneForm = this.formBuilder.nonNullable.group(
      {
      nom:[''],
      prenom:[''],
      role:[''],
      img:['assets/images/layout_img/bg1.png'],
      linkdin:['']
      }
    )
  }
  
  onDetails(id:number){
    this.router.navigate(['/admin/detailsA/'+id]); 
  }

  onAddPForm() {
    if (this.lesactivite && this.lesactivite.equipe) {
      const newPerson = {
        lastName: this.ajoutPersonneForm.get('nom')?.value,
        firstName: this.ajoutPersonneForm.get('prenom')?.value,
        role: this.ajoutPersonneForm.get('role')?.value,
        image: this.ajoutPersonneForm.get('img')?.value,
        linkdin: this.ajoutPersonneForm.get('linkdin')?.value
      };

      this.lesactivite.equipe.push(newPerson);

      this.actionSService.updateAct(this.lesactivite.id, this.lesactivite).subscribe(() => {
        this.router.navigate(['/admin/mainA']);
      });
    } else {
    console.error('Lesactivite or its equipe property is undefined.');
    // Handle the error or provide a default behavior.
  }
  }
}
