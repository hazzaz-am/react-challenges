import { nanoid } from "nanoid";
import type { Item, Root } from "../types";

export function useTraverseTree() {
	function insertNode(
		tree: Root,
		folderId: string,
		itemName: string,
		isFolder: boolean
	) {
		if (tree.id === folderId && tree.isFolder) {
			tree.items.unshift({
				id: nanoid(5),
				name: itemName,
				isFolder,
				items: [],
			});
			return tree;
		}

		let latestNode: Item[] = [];
		latestNode = tree.items.map((ob) => {
			return insertNode(ob, folderId, itemName, isFolder);
		});

		return { ...tree, items: latestNode };
	}

	function deleteNode() {}

	function editNode() {}

	return { insertNode, deleteNode, editNode };
}
