export interface Root {
	id: string;
	name: string;
	isFolder: boolean;
	items: Item[];
}

export interface Item {
	id: string;
	name: string;
	isFolder: boolean;
	items: Item[];
}
