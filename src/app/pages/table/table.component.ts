import { Component, OnInit,ViewChild } from '@angular/core';
import { UserProfile } from 'app/models/user-profile.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from 'package.service';
import { HttpClient } from "@angular/common/http";
// const cornerstoneWADOImageLoader = require('cornerstone-wado-image-loader');

declare const cornerstone;
declare const cornerstoneWADOImageLoader;

// import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
// import * as cornerstone from "cornerstone-core";
// import * as cornerstoneMath from "cornerstone-math";
// import * as cornerstoneTools from "cornerstone-tools";
// import Hammer from "hammerjs";
// import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
// import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
// import * as dicomParser from 'dicom-parser';





declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    task: any;
    items: any;
    image: any;
    closeModal: string;
    tableUploading: boolean =true;
    // constructor(
    //     private packageService: PackageService, )
    //    {
    //    this.items = this.packageService.getItem();
    //     }
    
    //   ngOnInit(): void{
    //   }




    constructor(private http:HttpClient,
        private packageService: PackageService,private modalService: NgbModal )
       {
        }
    



      ngOnInit(): void{
        this.getItemData();
    //    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    //    cornerstoneWADOImageLoader.webWorkerManager.initialize({
    //     webWorkerPath: '../../../assets/cornerstone/webworkers/cornerstoneWADOImageLoaderWebWorker.js',
    //     taskConfiguration: {
    //         'decodeTask': {
    //             codecsPath: '../../../assets/cornerstone/codecs/cornerstoneWADOImageLoaderCodecs.js'
    //         }
    //     }
    // });

      }

      getItemData()
      {
        this.http.get('http://172.31.47.15:3000/api/getpatientdata').subscribe(res=>{      
           if(res)
           {
            this.tableUploading = false;
           }
           this.items=res;
          // console.log(this.items);
          
        })
      }
      display(image)
      {
        this.image= image;
        console.log(this.image);
      }


      // loadDICOMImages(files: FileList) {
      //   if (files && files.length > 0) {
      //     let imageList = [];
      //     const fileList:Array<File> = Array.from(files);
      //     fileList.sort((a,b) => {
      //       if ( a.name > b.name ) return 1;
      //       if ( b.name > a.name ) return -1;
      //       return 0;
      //     })
      //     cornerstoneWADOImageLoader.wadouri.fileManager.purge();
      //     cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.purge();
    
      //     for (let i = 0; i < fileList.length; i++) {
      //       const dicomFile: File = fileList[i];
      //       const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(dicomFile);
      //       imageList.push(imageId);
      //     }
    
      //     this.viewPort.resetAllTools();
    
      //     this.viewPort.loadStudyImages(imageList);
    
      //   } else alert('Escolha imagens DICOM a exibir.');
      // }



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



}
