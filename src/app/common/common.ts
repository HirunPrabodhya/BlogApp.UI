export const postUrl = "https://localhost:7011/api";
export interface UserType{
    id:number;
    name:string;
}
export interface User{
    firstName:string;
    lastName:string;
    bio?: string;
    email: string;
    password:string;
    userTypeId: number;
}
export interface Category{
    id:number;
    name:string;
    description:string;
    imageUrl:string;
}
export interface categoryResolved{
    categories:Category[] | [];
    error?:string | '';
}
export interface PostResolved{
    posts:Post[] | [];
    error:string | '';
}
export interface Login{
    email:string;
    password:string
}
export interface Post{
    id?:number;
    title:string;
    content:string;
    summary:string;
    thumbnail:string;
    publishDate:Date;
    updateDate?:Date | null;
    userId:number | null;
    categoryId:number;
}
export interface PostDetail{
    id?:number;
    title:string;
    content:string;
    summary:string;
    thumbnail:string;
    publishDate:Date;
    firstName:string;
    lastName:string;
}