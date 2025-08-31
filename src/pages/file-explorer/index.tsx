import { useState } from "react";
import { fileExplorer } from "../../data/fileExplorer";
import { useTraverseTree } from "../../hooks/useTraverseTree";
import type { Root } from "../../types";
import Folder from "./components/Folder";

export default function FileExplorerPage() {
	const [explorer, setExplorer] = useState<Root>(fileExplorer);
	const [activeFolder, setActiveFolder] = useState<string | null>(null);
	const { insertNode, deleteNode, editNode } = useTraverseTree();

	const handleNewTree = (
		folderId: string,
		itemName: string,
		isFolder: boolean
	) => {
		const finalTree = insertNode(explorer, folderId, itemName, isFolder);
		setExplorer(finalTree);
	};

	const handleDeleteFolder = (folderId: string) => {
		const finalTree = deleteNode(explorer, folderId);
		setExplorer(finalTree);
	};

	const handleEditName = (folderId: string, updatedName: string) => {
		const finalTree = editNode(explorer, folderId, updatedName);
		setExplorer(finalTree);
	};

	return (
		<div className="bg-[#1f1f1f] min-h-screen p-4">
			<div className="bg-[#181818] border border-gray-700 rounded-lg p-4 max-w-md">
				<h2 className="text-lg font-semibold text-gray-200 mb-3 border-b border-gray-700 pb-2">
					File Explorer
				</h2>
				<Folder
					handleNewTree={handleNewTree}
					onDeleteFolder={handleDeleteFolder}
					activeFolder={activeFolder}
					setActiveFolder={setActiveFolder}
					onEditName={handleEditName}
					explorer={explorer}
				/>
			</div>
		</div>
	);
}
