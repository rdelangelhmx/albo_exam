import { Comics, Events, Item, Series, Stories, Thumbnail, Url } from "./genericModel";

export interface Creator {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    suffix: string;
    fullName: string;
    modified: Date;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Comics;
    series: Series;
    stories: Stories;
    events: Events;
    urls: Url[];
}
