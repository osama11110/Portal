import { Injectable } from "@angular/core";
import { UserProfile } from "app/models/user-profile.model";

@Injectable()

export class PackageService
{
    private taskItem: UserProfile;

    
    setItem(item: any)
    {
        this.taskItem = item;
    }
    getItem()
    {
        return this.taskItem;
    }


    addToTask(item: UserProfile)
    {
        // console.log(item);
        this.taskItem = item;
        
       
    }



}