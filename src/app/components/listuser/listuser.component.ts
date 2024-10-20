import { Component, ViewChild } from '@angular/core';
import { User } from '../../Model/User';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../Service/userservice.service';
import { commonservice } from '../../Service/commonservice';
import { UserformComponent } from "../userform/userform.component";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-listuser',
  standalone: true,
  imports: [MaterialModule, UserformComponent],
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent {
  defaultPageSize=2;
  showCreateForm: boolean = false;
  submitButtonLabel:string = 'Save';
  createMode:boolean=true;
  users:User [] = [];
  editedUser: User = {id:0,firstName: '',lastName:'',email:''}
  displayedColumns: string[] = ['id', 'firstName', 'lastName','email', 'action'];
  dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  editedcontactdetails: User = {id:0, firstName: '',lastName:'',email:''
   }
  constructor(
    private formBuilder: FormBuilder,      
    private router: Router,  
    private commonservice:commonservice,
    private userservice :UserserviceService,
    private Toast:ToastrService
  ) { 
  
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  
  }
  ngOnInit(): void {

    this.fetchContactDetails();
    
    
      }


      fetchContactDetails(): void {
    this.userservice.getUsers().subscribe(users => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }


  editContact(user: User): void {
      

    this.commonservice.editedContact={...user}
    this.commonservice.createMode=false;
    this.commonservice.submitButtonLabel='Update';
        //this.Bankpassvalue.editedBank = this.editedBank;
        this.router.navigate(['/userform']);
      }
   
   
      deleteContact(user: User): void {
        if (!user) {
          console.error('No User selected for deletion.');
          return;
        }
        const confirmDelete = confirm(`Are you sure you want to delete '${user.id}'?`);
        if (!confirmDelete) {
          return; // If user cancels, do nothing
        }
      
        this.userservice.deleteUser(user.id!).subscribe(
          () => {
            this.Toast.success('User deleted successfully');
            // Fetch banks again to update the table
            this.fetchContactDetails();
          },
          (error: any) => {
            this.Toast.error('Error deleting User:', error);
           
          }
        );

      }

      applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
       toggleFormVisibility(formType: string): void {
        if (formType === 'create') {
          this.showCreateForm = !this.showCreateForm;
          this.commonservice.createMode = this.createMode;
          this.commonservice.submitButtonLabel = this.submitButtonLabel;
          this.commonservice.editedContact='';
          this.router.navigate(['/userform']);
        }
      }
    













}
