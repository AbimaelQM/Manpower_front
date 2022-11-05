import { DialogRef } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { LoginService } from '../../services/login-service.service';
import { MatAccordion } from '@angular/material/expansion';
import { ModalCadastroJobComponent } from '../modal-cadastro-job/modal-cadastro-job.component';
import { ModalCadastroSkillComponent } from '../modal-cadastro-skill/modal-cadastro-skill.component';
import { ModalCadastroTeamComponent } from '../modal-cadastro-team/modal-cadastro-team.component';
import { ModalCadastroPersonComponent } from '../modal-cadastro-person/modal-cadastro-person.component';
import { ModalCadastroOthersComponent } from '../modal-cadastro-others/modal-cadastro-others.component';

@Component({
  selector: 'app-menuside',
  templateUrl: './menuside.component.html',
  styleUrls: ['./menuside.component.scss']
})
export class MenusideComponent implements OnInit {

  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  constructor(
    private loginService: LoginService,
    public dialog: MatDialog
  ) { }

  @Output()
  private eventNewSkill = new EventEmitter();
  @Output()
  private eventNewPerson = new EventEmitter();
  @Output()
  private eventNewJob = new EventEmitter();
  @Output()
  private eventNewTeam = new EventEmitter();

  @Output()
  private eventNavTbTeam =new EventEmitter();

  public active = false;

  ngOnInit(): void {
  }

  area_opcao = 'oculto'
  id_icon = '';

  showButtons(active: boolean): void {


    this.active = active;

    if (this.active) {

      this.area_opcao = 'visivel'
      this.id_icon = 'icon-plus-open'

    } else {

      this.area_opcao = 'oculto';
      this.id_icon = 'icon-plus-close'

    }
  }
  
  openModalRegisterJob() {

    this.showButtons(false)
  
    const modal = this.dialog.open(ModalCadastroJobComponent, {
      minWidth: '100px',
      minHeight:'100px',
      // width: "40%",
      // height: '90%',
      panelClass: ['modal-container'],
      autoFocus: false,
      disableClose:true
    })

    modal.afterClosed().subscribe((data)=>{
      
      if(data?.createJob){
        
        this.eventNewJob.emit({message:"Novo Job"});
      }
    })
  }

  openModalRegisterSkill() {

    this.showButtons(false)
    const modal = this.dialog.open(ModalCadastroSkillComponent, {

      minWidth: '600px',
      minHeight:'100px',
      panelClass: ['modal-container'],
      autoFocus: false,
      disableClose:true
    })

    modal.afterClosed().subscribe((data)=>{
      
      if(data?.createSkill){
        // Informa ao componente pai que a tab que está a tabela que mostra o novo elemento criado
        this.eventNewSkill.emit({message:"Nova skill"});
      }
    })
  }

  openModalRegisterTeam() {

    this.showButtons(false)
    const modal = this.dialog.open(ModalCadastroTeamComponent, {

      panelClass: ['modal-container'],
      autoFocus: false,
      disableClose:true
    })
    modal.afterClosed().subscribe((data)=>{
      if(data?.createPerson){
        this.eventNewTeam.emit({message:"Novo Team"});
      }
    })


    modal.afterClosed().subscribe((data)=>{

      if(data?.newJob){
        this.eventNewTeam.emit({message:"new team"})
      }
    })
  }
  openModalRegisterPerson() {

    this.showButtons(false)
    const modal = this.dialog.open(ModalCadastroPersonComponent, {
      panelClass: ['modal-container'],
      autoFocus: false,
      disableClose:true
    })

    modal.afterClosed().subscribe((data)=>{
      if(data?.createPerson){
        this.eventNewPerson.emit({message:"Nova person"});
      }
    })
  }

  openModalRegisterOthers() {

    this.showButtons(false)
    const modal = this.dialog.open(ModalCadastroOthersComponent, {
      panelClass: ['modal-container'],
      autoFocus: false,
      disableClose:true
    })

    modal.afterClosed().subscribe((data)=>{
      if(data?.createPerson){
        this.eventNewPerson.emit({message:"Nova person"});
      }
    })
  }

  navTeam(){
    
    this.eventNavTbTeam.emit()
  }
  logout() {

    this.loginService.confirmaLogout()
  }


}
