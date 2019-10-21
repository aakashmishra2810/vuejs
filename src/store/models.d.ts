export interface User {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
}

export interface UpdateUser {
    email?: string;
    username?: string;
    bio?: string;
    image?: string;
    password?: string;
}

export interface RegisterUser {
     username: string;
     email: string;
     password: string;
 }
export interface Profile {
    username: string;
    bio?: string;
    image?: string;
    following: boolean;
}

export interface UserSubmit {
    email: string;
    password: string;
}
export interface Article {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
}
export interface Author {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}
export interface UserResponse {
    user: User;
}

export interface ProfileResponse {
    profile: Profile;
}

export interface ArticleResponse {
    article?: Article | null;
}

export interface ArticlesResponse {
    articles?: (Article)[] | null;
    articlesCount: number;
}


export interface NewArticle {
    slug?: string | null;
    title: string;
    description: string;
    body: string;
    tagList?: (string)[] | null;
}

export interface Comment {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: Author;
}

export interface CommentsResponse {
    comments?: (Comment)[] | null;
}

export interface NewComment {
    body: string;
    slug: string;
}

export interface CommentResponse {
    comment: Comment;

}

export interface DeleteComment {
    id: number;
    slug: string;
}

export interface TagsResponse {
    tags?: (string)[] | null;
}


