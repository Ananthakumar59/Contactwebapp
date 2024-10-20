import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../Model/User';
import { UserserviceService } from '../../Service/userservice.service';
import { Router } from '@angular/router';
import { commonservice } from '../../Service/commonservice';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent {
  ContactForm!: FormGroup;
  showCreateForm: boolean=false;
  @Input() editedContact!: User; 
  @Input() createMode: boolean | undefined;
@Input() submitButtonLabel:string='Save';
states: any[] = []; 
  districts:any[]=[];
  Banks:any[]=[];
  cashbookData: any;
 


 constructor(
 private formBuilder: FormBuilder, 
    private userservice: UserserviceService,   
   
    private router: Router,
   
private Bankpassvalue: commonservice,

 ){

  { 
    this.createMode = this.Bankpassvalue.createMode;
    this.submitButtonLabel = this.Bankpassvalue.submitButtonLabel;
    this.editedContact = this.Bankpassvalue.editedContact;

  }

 }

 ngOnInit(): void {
  // const userId = localStorage.getItem('userId');
  this.ContactForm = this.formBuilder.group({
  id:['', Validators.required],
  //  userCashBookId: ['', Validators.required],
   firstName: ['', Validators.required],      
   lastName:['',Validators.required],
    email: ['', Validators.required],
   
    
  });
  
  if (this.editedContact) {

   
    this.ContactForm.patchValue({
     id:this.editedContact.id,
      firstName: this.editedContact.firstName,
      lastName: this.editedContact.lastName,
      email: this.editedContact.email,
    
      
    });
    }

    

  }
    onSubmit(): void {
      if (this.ContactForm.valid) {
        this.cashbookData = this.ContactForm.value;
       
        
        const createdBy=this.cashbookData.userName;
         const data = { ...this.cashbookData,createdBy:createdBy }
  
  
      
        if (this.createMode) {
        this.userservice.addUser(data).subscribe(
          response => {
           
            this.ContactForm.reset(); // Reset form after successful submission
            this.ContactForm.patchValue({ active: false });
            this.router.navigate(['/listuser']);
          },
          error => {
            console.error('Error posting bank data:', error);
          }
        );
      }
  else{

    this.cashbookData = this.ContactForm.value;
       
        

  
    const data = { ...this.cashbookData}
  
    this.userservice.updateUser(this.editedContact.id,data).subscribe(
      response => {
        // Handle success
      
        setTimeout(() => {
          this.router.navigate(['/listuser']); // Replace '/bank' with the actual route path of your bank component
      }, 1000);
        // Optionally, you can emit an event to inform parent components about the update
      },
      error => {
        // Handle error
        console.error('Error updating bank data:', error);
      }
       );
      }
  }
  
  }


  goBack(): void {
    //this.showCreateForm=true;
    this.router.navigate(['/listuser']);
    }
  
}
