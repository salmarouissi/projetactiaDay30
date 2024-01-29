import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activite } from 'src/app/Class/Activite/activite';
import { ActionSService } from 'src/app/servive/action-s.service';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css']
})
export class ShowActivitiesComponent implements OnInit{
  lesActivites:Activite[]=[];

  constructor(private router:Router, private actionSService:ActionSService) { }

  ngOnInit(): void {
    this.loadActivites();
  }

  loadActivites(): void {
    this.actionSService.getActivite().subscribe(data => {
      this.lesActivites = data;
    });
  }
  
  onDetails(id:number){
    this.router.navigate(['/admin/detailsA/'+id]); 
  }


  deleteAct(id: number): void {
    const confirmation = window.confirm('Vous en êtes bien sûr de la suppression de cet élément ?');
    if (confirmation) {
      this.actionSService.deleteA(id).subscribe(() => {
        alert('Suppression Réussite');
        this.loadActivites();
      });
    }
  }
}
