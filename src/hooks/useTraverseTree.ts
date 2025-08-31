import { nanoid } from "nanoid";
import type { Item, Root } from "../types";

export function useTraverseTree() {
	function insertNode(
		tree: Root,
		folderId: string,
		itemName: string,
		isFolder: boolean
	): Root {
		if (tree.id === folderId && tree.isFolder) {
			return {
				...tree,
				items: [
					{ id: nanoid(5), name: itemName, isFolder, items: [] },
					...tree.items,
				],
			};
		}

		let changed = false;
		const updatedChildren = tree.items.map((child) => {
			const updatedChild = insertNode(child, folderId, itemName, isFolder);
			if (updatedChild !== child) changed = true;
			return updatedChild;
		});

		if (!changed) return tree;

		return { ...tree, items: updatedChildren };
	}

	function deleteNode(tree: Root, folderId: string): Root | undefined {
		if (tree.id === folderId && tree.id === "1") return tree;

		if (tree.id === folderId) return undefined;

		let changed = false;
		const updatedChildren: Item[] = [];
		for (const child of tree.items) {
			const result = deleteNode(child, folderId);
			if (result !== child) changed = true;
			if (result) updatedChildren.push(result);
		}

		if (!changed) return tree;

		return { ...tree, items: updatedChildren };
	}

	function deleteNodeSafe(tree: Root, folderId: string): Root {
		const result = deleteNode(tree, folderId);
		return result || tree;
	}

	function editNode(tree: Root, folderId: string, updatedName: string): Root {
		if (tree.id === folderId) return { ...tree, name: updatedName };

		let changed = false;
		const updatedChildren = tree.items.map((child) => {
			const updatedChild = editNode(child, folderId, updatedName);
			if (updatedChild !== child) changed = true;
			return updatedChild;
		});

		if (!changed) return tree;

		return { ...tree, items: updatedChildren };
	}

	return { insertNode, deleteNode: deleteNodeSafe, editNode };
}
