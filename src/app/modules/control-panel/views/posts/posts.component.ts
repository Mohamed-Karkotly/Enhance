import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostParams } from 'src/app/models/API/post-params.interface';
import { Post } from 'src/app/models/entities/post.interface';
import { SubCategory } from 'src/app/models/entities/subcategory.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  postParams = {} as PostParams;
  subcategories: SubCategory[];
  loaded: boolean;
  constructor(
    private _cpService: ControlPanelService,
    private _storageService: StorageService,
    private _spinner: NgxSpinnerService,
    private _toast: ToastService
  ) {
    let community = this._storageService.getLocalObject('community');
    this.subcategories = community.subcategories;
    this.postParams.communityId = community.id;
    this.postParams.userCommunityId = community.userSettings.id;
    console.warn(community);
    this.posts = [];
  }

  ngOnInit(): void {
    this.getAllPosts();
    this.getPostsBySubcategory(this.subcategories[0]);
  }

  getAllPosts() {
    this._spinner.show();
    this._cpService.getAllPosts(this.postParams).subscribe((posts) => {
      this.posts = posts;
      this.loaded = true;
      this._spinner.hide();
      console.warn(posts);
    });
  }

  getPostsBySubcategory(subcategory: SubCategory) {
    this.postParams.subCategoryId = subcategory.id;
    this._spinner.show();
    this._cpService
      .getPostsBySubcategory(this.postParams)
      .subscribe((posts) => {
        this.posts = posts;
        this.loaded = true;
        this._spinner.hide();
        console.warn(posts);
      });
  }
}
