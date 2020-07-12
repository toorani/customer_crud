export class ServerActionResult<T>{
    isSuccess: boolean = true;
    result: T;
    messages: string[] = new Array<string>();
    
}