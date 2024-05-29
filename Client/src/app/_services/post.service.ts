import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addpost } from '../_models/AddPost';
import { post } from '../_models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  // Add a post
  addPost(model: any) {
    return this.http.post(this.baseUrl + 'post/add-post', model);
  }
  // Delete a post
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}post/delete-post/${id}`);
  }
  // Update a post
  updatePost(model: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}post/update-post`, model);
  }

  // Get all posts
  getAllPosts(): Observable<post[]> {
    return this.http.get<post[]>(`${this.baseUrl}post/blogs`);
  }

  // Get posts by username
  getPostsByUsername(username: string): Observable<post[]> {
    return this.http.get<post[]>(`${this.baseUrl}post/view-Posts/${username}`);
  }
  // get photoUrl
  getPhotoUser(username: string) {
    return this.http.get(this.baseUrl + 'post/user-Photo/' + username);
  }
}
