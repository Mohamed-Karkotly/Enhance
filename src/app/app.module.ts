import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './guards/auth/auth.guard';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error-pages/error404/error404.component';
import { Error500Component } from './components/error-pages/error500/error500.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingPageComponent } from './components/landing-page/landing-page/landing-page.component';
import { LoginComponent } from './components/landing-page/login/login.component';
import { SignUpComponent } from './components/landing-page/sign-up/sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    Error500Component,
    NavbarComponent,
    LandingPageComponent,
    LoginComponent,
    SignUpComponent,
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
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
//translation loader factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/translation/");
}
