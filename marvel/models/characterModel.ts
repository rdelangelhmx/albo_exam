import { Comics, Events, Item, Series, Stories, Thumbnail, Url } from "./genericModel";

export interface Character {
    id: number;
    name: string;
    description: string;
    modified: Date;
    thumbnail: Thumbnail;
    resourceURI: string;
    comics: Comics;
    series: Series;
    stories: Stories;
    events: Events;
    urls: Url[];
}
