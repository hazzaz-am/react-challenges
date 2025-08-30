import { useState } from "react";
import { fileExplorer } from "../../data/fileExplorer";
import { useTraverseTree } from "../../hooks/useTraverseTree";
import type { Root } from "../../types";
import Folder from "./components/Folder";

export default function FileExplorerPage() {
	const [explorer, setExplorer] = useState<Root>(fileExplorer);
	const [activeFolder, setActiveFolder] = useState<string | null>(null);
	const { insertNode } = useTraverseTree();

	const handleNewTree = (
		folderId: string,
		itemName: string,
		isFolder: boolean
	) => {
		const finalTree = insertNode(explorer, folderId, itemName, isFolder);
		setExplorer(finalTree);
	};
	return (
		<div className="bg-white dark:bg-gray-900 min-h-screen p-4">
			<div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-w-md">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
					File Explorer
				</h2>
				<Folder
					handleNewTree={handleNewTree}
					activeFolder={activeFolder}
					setActiveFolder={setActiveFolder}
					explorer={explorer}
				/>
			</div>
		</div>
	);
}
