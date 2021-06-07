import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/Auth/auth.interceptor';
import { ErrorInterceptor } from './interceptors/Error/error.interceptor';
import { LoggerInterceptor } from './interceptors/Logger/logger.interceptor';
import { LandingPageModule } from './modules/landing-page/landing-page.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './modules/auth/auth.module';
import { ControlPanelModule } from './modules/control-panel/control-panel.module';
import { SidenavService } from './services/sidenav.service';
import { ErrorPagesModule } from './modules/error-pages/error-pages.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
    AuthModule,
    LandingPageModule,
    ControlPanelModule,
    ErrorPagesModule,
    LayoutModule,
    ControlPanelModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggerInterceptor,
      multi: true,
    },
    SidenavService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
//translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/translation/');
}
