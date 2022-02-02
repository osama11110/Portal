import { Component } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from 'package.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent  {
  closeModal: string;
  fileUpload : File = null;
  file_uploaded : boolean = false;
  fileName: any;
  fileAdded: boolean = false;
  fileUploading: boolean = false;

  // userName: string = '';
  // userAge: string = '';
  // userGender: string='';
  // userAddress: string = '';
  // userSymptom: string = '';


  // myForm = new FormGroup({

  // });



  
  
  constructor(private modalService: NgbModal, private packageService: PackageService, private http:HttpClient) {}
    
  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {
    // console.log(f.value);  // { first: '', last: '' }
    this.packageService.addToTask(f.value);
    this.http.post('http://172.31.47.15:3000/api/postpatientdata', f.value ).subscribe(res=> {
      console.log(res);
      if(res)
      {
    swal.fire({title: 'Success!',
    text: 'User has been Added',
    icon: 'success',
    confirmButtonText: 'ok'});
  }
  });
  }
  
     
  handleFileInput(files: FileList)
  { 
    this.fileUploading = true
    this.fileUpload = files.item(0);
    this.fileAdded = true;
    this.fileName = this.fileUpload.name;

    const formData = new FormData();
    formData.append("file", this.fileUpload, this.fileUpload.name)
    this.http.post('http://172.31.47.15:3000/uploadfile', formData)
    .subscribe(responseData => {
      if(responseData)
      {
        this.file_uploaded = true;
        this.fileUploading = false;
      }
    }
    ,error => {
      console.log("Error occurred while uploading" + error.message);
    });
    this.file_uploaded = false;
  }


      
}
  