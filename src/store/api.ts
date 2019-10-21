import axios from 'axios';
import { UserSubmit, UserResponse, ArticlesResponse, User, Profile, ProfileResponse, UpdateUser, RegisterUser, NewArticle, Article, ArticleResponse, CommentsResponse, CommentResponse, NewComment, DeleteComment, TagsResponse } from './models';

export const conduitApi = axios.create({
    baseURL: 'https://conduit.productionready.io/api',
});

export function setJWT(JWT: string) {
    conduitApi.defaults.headers.common.Authorization = `Token ${JWT}`;
}

export function clearJWT(JWT: string) {
  delete conduitApi.defaults.headers.common.Authorization;
}

export async function loginUser(user: UserSubmit): Promise<User> {
   // try {
    const response = await conduitApi.post('/users/login', {
            user,
        });
    return (response.data as UserResponse).user;

    // catch (error) {
    //     console.log(error)
    // }
}

export async function fetchUser(): Promise<User> {
    const response = await conduitApi.get('/user');
    return (response.data as UserResponse).user;
}

export async function fetchProfile(userName: string): Promise<Profile> {
    const response = await conduitApi.get(`/profiles/${userName}`);
    return (response.data as ProfileResponse).profile;
}

export async function getGlobalFeed() {
    const response = await conduitApi.get('articles');
    return response.data as ArticlesResponse;
}

export async function getFeedByUser() {
    const response = await conduitApi.get('/articles/feed');
    return response.data as ArticlesResponse;
}

export async function updateUserDetails(user: UpdateUser): Promise<User> {
    const response = await conduitApi.put('user', user);
    return (response.data as UserResponse).user;
}

export async function registerUser(user: RegisterUser): Promise<User> {
    // console.log(newUser);
    const response = await conduitApi.post('users', {
        user,
    });
    return (response.data as UserResponse).user;

}

export async function CreateNewArticle(article: NewArticle): Promise<Article> {
    const reponse = await conduitApi.post('articles', {
        article,
    });
    return (reponse.data as Article);

}

export async function EditArticle(article: NewArticle): Promise<ArticleResponse> {
    const response = await conduitApi.put(`/articles/${article.slug}`, {
        article,
    });
    return response.data as ArticleResponse;
}

export async function deleteArticle(slug: string) {
    return await conduitApi.delete(`/articles/${slug}`);
}

export async function getArticleBySlug(slug: string): Promise<ArticleResponse> {
    const response = await conduitApi.get(`articles/${slug}`);
    return response.data as ArticleResponse;
}

export async function getArticleByQuery(query: string): Promise<ArticlesResponse> {
    const response = await conduitApi.get(`articles/?${query}`);
    return response.data as ArticlesResponse;
}

export async function getComments(slug: string): Promise<CommentsResponse> {
    const response = await conduitApi.get(`/articles/${slug}/comments`);
    return response.data as CommentsResponse;
}

export async function createComment(comment: NewComment): Promise<CommentResponse> {
    const response = await conduitApi.post(`/articles/${comment.slug}/comments`, {
        comment,
    });
    return response.data as CommentResponse;
}

export async function deleteComment(comment: DeleteComment) {
    await conduitApi.delete(`/articles/${comment.slug}/comments/${comment.id}`);
}

export async function favoriteArticle(slug: string): Promise<ArticleResponse> {
    const response = await conduitApi.post(`articles/${slug}/favorite`);
    return response.data as ArticleResponse;
}

export async function unFavoriteArticle(slug: string): Promise<ArticleResponse> {
    const response = await conduitApi.delete(`articles/${slug}/favorite`);
    return response.data as ArticleResponse;
}

export async function followUser(username: string): Promise<Profile> {
    const response = await conduitApi.post(`/profiles/${username}/follow`);
    return (response.data as ProfileResponse).profile;
}

export async function unFollowUser(username: string): Promise<Profile> {
    const response = await conduitApi.delete(`/profiles/${username}/follow`);
    return (response.data as ProfileResponse).profile;
}

export async function getTags() {
    const response = await conduitApi.get('/tags');
    return response.data as TagsResponse;
}
