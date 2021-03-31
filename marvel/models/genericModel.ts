export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Item {
    resourceURI: string;
    name: string;
    type: string;
}
    
export interface Url {
    type: string;
    url: string;
}

export interface Events {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface Stories {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface Series {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

export interface Comics {
    available: number;
    collectionURI: string;
    items: Item[];
    returned: number;
}

