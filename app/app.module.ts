import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
 import {HttpClientModule} from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StaticComponent } from './static/static.component';
import { map } from 'rxjs/operators';
import {UploadComponent} from './upload/upload.component';
import { HttpModule,JsonpModule } from '@angular/http';
// import 'rxjs/add/operator/map';
import {  ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { CheckBoxModule  } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { SharedModule } from './shared/shared.module';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccessServiceService } from "src/app/service/access-service.service";
import { AccessComponent } from "src/app/access/access.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './material-module';
import {DataService} from './service/data.service';
import {EditDialogComponent} from './view/dialogs/edit/edit.dialog.component';
import { AddDialogComponent } from './view/dialogs/add/add.dialog.component';
import { DetailDialogComponent } from './view/dialogs/details/details.dialog.component';
import { Issue } from 'src/app/view/models/issue';
import { TemplateComponent } from './template/template.component';
import { MatDialog, MatTabsModule } from '@angular/material';
import 'hammerjs';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    EditDialogComponent,
    DetailDialogComponent,
    AddDialogComponent,
    routingComponents,
    LoginComponent,
    PageNotFoundComponent,
    StaticComponent,
    routingComponents,
    AccessComponent,
    TemplateComponent,
    HelpComponent
  ],
  imports: [
    
    AppRoutingModule, 
    DemoMaterialModule,
     FormsModule,HttpClientModule,
SharedModule, CheckBoxModule,GridAllModule, UploaderModule,
     DialogModule, FormsModule, CommonModule, ReactiveFormsModule, HttpModule, JsonpModule, BrowserModule,NgxPaginationModule, BrowserAnimationsModule

  ],
    entryComponents: [
    AddDialogComponent,
    EditDialogComponent,
    DetailDialogComponent
  ],
  providers: [DatePipe,UploadComponent,AccessServiceService,DataService,Issue],
  bootstrap: [AppComponent]
})
export class AppModule { }
