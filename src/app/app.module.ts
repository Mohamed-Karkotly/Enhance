import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './guards/auth/auth.guard';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error-pages/error404/error404.component';
import { Error500Component } from './components/error-pages/error500/error500.component';
import { AuthInterceptor } from './interceptors/Auth/auth.interceptor';
import { ErrorInterceptor } from './interceptors/Error/error.interceptor';
import { LoggerInterceptor } from './interceptors/Logger/logger.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorPagesModule } from './components/error-pages/error-pages.module';
import { LandingPageModule } from './components/landing-page/landing-page.module';
import { ReusableComponentsModule } from './reusable-components/reusable-components.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgbModule,
    LandingPageModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
//translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/translation/');
}
