import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { ActionSService } from 'src/app/servive/action-s.service';

@Component({
  selector: 'app-activite-d',
  templateUrl: './activite-d.component.html',
  styleUrls: ['./activite-d.component.css']
})
export class ActiviteDComponent implements OnInit {
  idActivite!:number;
  act!:Activite; 

  lesActivites:Activite[]=[];

  constructor(private activatedRoute: ActivatedRoute,private router:Router,private actionSService:ActionSService) { }

  ngOnInit(): void {
    this.idActivite=this.activatedRoute.snapshot.params['id']
    console.log(this.lesActivites);
    this.actionSService.getActivite().subscribe(data=>{
      this.lesActivites=data;
      console.log(this.lesActivites);

    })

    this.activatedRoute.paramMap.subscribe(params => {
      this.idActivite = +params.get('id')!;
      this.afficherActivite();
    });
    
    this.afficherActivite()

  }

  afficherActivite() {
    this.actionSService.getActiviteid(this.idActivite).subscribe(data=>this.act=data);
  }

  onEdit(){ 
    this.router.navigate(['/admin/modifA']); 
  }

  onAddMembre(){
    this.router.navigate(['/admin/addP']); 
  }

  onDetails(id:number){
    this.router.navigate(['/admin/detailsA/'+id]); 
  }

  onDeleteAct(){
    const confirmation = window.confirm('Vous en êtes bien sûr de la suppression de cet élément ?');
    if (confirmation) {
      this.actionSService.deleteA(this.idActivite).subscribe(() => {
        alert('Suppression Réussite');
        this.router.navigate(['/admin/mainA']); 
      });
    }
  }

  onDeleteP(index: number): void {
    if (index >= 0 && index < this.act.equipe.length) {
        // Remove the team member at the specified index locally
        const deletedMember = this.act.equipe.splice(index, 1)[0];

        // Make a request to the server to update the data
        this.actionSService.updateActivite(this.idActivite, this.act).subscribe(
            updatedActivite => {
                console.log('Activity updated:', updatedActivite);
            }        
        );
    }
}


}
