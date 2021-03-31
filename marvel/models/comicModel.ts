import { Events, Item, Stories, Thumbnail, Url } from "./genericModel";

export interface TextObject {
    type: string;
    language: string;
    text: string;
}

export interface Series {
    resourceURI: string;
    name: string;
}

export interface Variant {
    resourceURI: string;
    name: string;
}

export interface Collection {
    resourceURI: string;
    name: string;
}

export interface CollectedIssue {
    resourceURI: string;
    name: string;
}

export interface Date {
    type: string;
    date: any;
}

export interface Price {
    type: string;
    price: number;
}

export interface Image {
    path: string;
    extension: string;
}

export interface Creators {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface Characters {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface Comic {
    id: number;
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: string;
    description: string;
    modified: any;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: TextObject[];
    resourceURI: string;
    urls: Url[];
    series: Series;
    variants: Variant[];
    collections: Collection[];
    collectedIssues: CollectedIssue[];
    dates: Date[];
    prices: Price[];
    thumbnail: Thumbnail;
    images: Image[];
    creators: Creators;
    characters: Characters;
    stories: Stories;
    events: Events;
}
    