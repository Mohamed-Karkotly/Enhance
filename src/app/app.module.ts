import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './guards/auth/auth.guard';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error-pages/error404/error404.component';
import { Error500Component } from './components/error-pages/error500/error500.component';
import { LandingPageComponent } from './components/landing-page/landing-page/landing-page.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { SignUpComponent } from './components/landing-page/sign-up/sign-up.component';
import { SocialMediaComponent } from './shared/social-media/social-media.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthInterceptor } from './interceptors/Auth/auth.interceptor';
import { ErrorInterceptor } from './interceptors/Error/error.interceptor';
import { LoggerInterceptor } from './interceptors/Logger/logger.interceptor';
import { NavbarComponent } from './shared/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    Error500Component,
    LandingPageComponent,
    LoginComponent,
    SignUpComponent,
    SocialMediaComponent,
    FooterComponent,
    NavbarComponent,
  ],
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
