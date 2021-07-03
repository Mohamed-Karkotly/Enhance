import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostParams } from 'src/app/models/API/post-params.interface';
import { Post } from 'src/app/models/entities/post.interface';
import { SubCategory } from 'src/app/models/entities/subcategory.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ControlPanelService } from '../../control-panel.service';

export enum VotingStates {
  upVote = 1,
  clear = 0,
  downVote = -1,
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(700, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PostsComponent implements OnInit {
  voteState: VotingStates;
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
    this.loaded = false;
    this.posts = [];
    this._spinner.show();
    this._cpService.getAllPosts(this.postParams).subscribe((posts) => {
      this.posts = posts;
      this.posts.forEach((post) => {
        post.createdAt = new Date(post.createdAt);
      });
      this.loaded = true;
      this._spinner.hide();
    });
  }

  getPostsBySubcategory(event: any) {
    this.categoryPosts = [];
    if (event.index == 0) {
      this.getAllPosts();
      return;
    }
    this.postParams.subCategoryId = this.subcategories[event.index - 1].id;
    this._spinner.show();
    this._cpService
      .getPostsBySubcategory(this.postParams)
      .subscribe((posts) => {
        this.categoryPosts = posts;
        this.loaded = true;
        this._spinner.hide();
      });
  }

  upVote(post: Post) {
    switch (post.userVoteValue) {
      case 1:
        this.voteState = VotingStates.upVote;
        post.userVoteValue = 0;
        post.votes--;
        this.clearVote(post);
        return;
      case 0:
        this.voteState = VotingStates.clear;
        post.userVoteValue = 1;
        post.votes++;
        this.postUpVote(post);
        return;
      case -1:
        this.voteState = VotingStates.downVote;
        post.userVoteValue = 1;
        post.votes += 2;
        this.postUpVote(post);
        return;
      default:
        break;
    }
  }

  downVote(post: Post) {
    switch (post.userVoteValue) {
      case -1:
        post.userVoteValue = 0;
        post.votes++;
        this.clearVote(post);
        return;
      case 0:
        this.voteState = VotingStates.clear;
        post.userVoteValue = -1;
        post.votes--;
        this.postDownVote(post);
        return;
      case 1:
        this.voteState = VotingStates.upVote;
        post.userVoteValue = -1;
        post.votes -= 2;
        this.postDownVote(post);
        return;
      default:
        break;
    }
  }

  clearVote(post: Post) {
    this._cpService
      .postResetVote(post.id, this.community.userSettings.id)
      .subscribe(
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
  }

  postUpVote(post: Post) {
    this._cpService
      .postUpVote(post.id, this.community.userSettings.id)
      .subscribe(
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
  }

  postDownVote(post: Post) {
    this._cpService
      .postDownVote(post.id, this.community.userSettings.id)
      .subscribe(
        (res) => {},
        (err) => {
          console.error(err);
        }
      );
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
