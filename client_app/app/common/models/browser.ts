import { User } from '../models/user';

export class Browser {
    static getData(key: string): Object { 
        let obj = window['DATA'][key];
        return obj; 
    }
}