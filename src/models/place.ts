import { Location } from './location';

export class Place {
    constructor(public title: string, 
                public descripction: string,
                public location: Location,
                public imagePath: string ) {}
}