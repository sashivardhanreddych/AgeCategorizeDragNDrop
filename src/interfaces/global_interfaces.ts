export type Status = 'age <18' | 'age 19-24' | 'age 25-45' | 'age >45';

export interface ITask {
    id:number;
    username: string;
    email: string;
    phonenumber:number;
    age: number;
    status:string;
}
