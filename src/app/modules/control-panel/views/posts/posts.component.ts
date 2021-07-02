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
  categoryPosts: Post[];
  postParams = {} as PostParams;
  subcategories: SubCategory[];
  community: any;
  loaded: boolean;
  constructor(
    private _cpService: ControlPanelService,
    private _storageService: StorageService,
    private _spinner: NgxSpinnerService,
    private _toast: ToastService
  ) {
    this.community = this._storageService.getLocalObject('community');
    this.subcategories = this.community.subcategories;
    this.postParams.communityId = this.community.id;
    this.postParams.userCommunityId = this.community.userSettings.id;
    this.posts = [];
  }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this._spinner.show();
    this._cpService.getAllPosts(this.postParams).subscribe((posts) => {
      this.posts = posts;
      console.warn(this.posts);

      this.loaded = true;
      this._spinner.hide();
    });
  }

  getPostsBySubcategory(subcategory: any) {
    //TODO: Handle getting posts by category on tab click
    console.warn(subcategory);

    /* this.postParams.subCategoryId = subcategory.id;
    this._spinner.show();
    this._cpService
      .getPostsBySubcategory(this.postParams)
      .subscribe((posts) => {
        this.categoryPosts = posts;
        this.loaded = true;
        this._spinner.hide();
        console.warn('Category POSTS', this.categoryPosts);
      }); */
  }

  deletePost(post: Post, index: number) {
    this._spinner.show();
    this._cpService
      .deletePost(post.id, this.community.id, this.community.userSettings.id)
      .subscribe(
        () => {
          this._spinner.hide();
          this.posts.splice(index, 1);
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
