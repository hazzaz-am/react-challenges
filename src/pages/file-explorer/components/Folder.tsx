import {
	ChevronDown,
	ChevronRight,
	Edit3,
	File,
	FileText,
	Folder as FolderIcon,
	FolderOpen,
	FolderPlus,
	Trash2,
} from "lucide-react";
import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { cn } from "../../../lib/utils";
import type { Root } from "../../../types";
import style from "../styles/index.module.css";
import { toast } from "sonner";

interface IProps {
	explorer: Root;
	handleNewTree: (
		folderId: string,
		itemName: string,
		isFolder: boolean
	) => void;
	activeFolder?: string | null;
	setActiveFolder?: (folderId: string | null) => void;
	onDeleteFolder: (folderId: string) => void;
	onEditName: (folderId: string, updatedName: string) => void;
}

export default function Folder({
	explorer,
	handleNewTree,
	activeFolder,
	setActiveFolder,
	onDeleteFolder,
	onEditName,
}: IProps) {
	const [expand, setExpand] = useState<boolean>(false);
	const [showInput, setShowInput] = useState({
		visible: false,
		isFolder: false,
	});
	const [showActions, setShowActions] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editValue, setEditValue] = useState<string>(explorer.name);

	const isActive = activeFolder === explorer.id;

	const handleNewFolder = (e: MouseEvent<HTMLButtonElement>, isFolder: any) => {
		e.stopPropagation();
		setExpand(true);
		setShowInput({
			visible: true,
			isFolder,
		});
	};

	const handleFolderClick = () => {
		if (explorer.isFolder) {
			setExpand(!expand);
			setActiveFolder?.(explorer.id);
		}
	};

	const handleEditSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const newName = e.currentTarget.value.trim();
			if (newName && newName !== explorer.name) {
				onEditName(explorer.id, newName);
			}
			setIsEditing(false);
		} else if (e.key === "Escape") {
			setEditValue(explorer.name);
			setIsEditing(false);
		}
	};

	const onAddFolder = (e: KeyboardEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		if (e.key === "Enter" && value.trim().length > 0) {
			handleNewTree(explorer.id, value, showInput.isFolder);
			setShowInput({ ...showInput, visible: false });
		}
	};

	const handleDeleteFileOrFolder = (
		e: MouseEvent<HTMLButtonElement>,
		folderId: string
	) => {
		e.stopPropagation();
		if (folderId === "1") {
			toast.error("You can't delete root folder");
			return;
		}
		onDeleteFolder(folderId);
	};

	if (explorer.isFolder) {
		return (
			<div className="select-none">
				<div
					className={cn(
						"flex items-center justify-between group rounded-sm px-2 py-1 cursor-pointer transition-all duration-200 border border-transparent",
						isActive
							? "bg-blue-900/50 border-blue-700"
							: "hover:bg-blue-950/30 hover:border-blue-800",
						style.folder
					)}
					onClick={handleFolderClick}
					onMouseEnter={() => setShowActions(true)}
					onMouseLeave={() => setShowActions(false)}
				>
					<div className="flex items-center gap-1 min-w-0 flex-1">
						<div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
							{expand ? (
								<ChevronDown className="w-3 h-3 text-gray-400" />
							) : (
								<ChevronRight className="w-3 h-3 text-gray-400" />
							)}
						</div>
						<div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
							{expand ? (
								<FolderOpen className="w-4 h-4 text-amber-400" />
							) : (
								<FolderIcon className="w-4 h-4 text-blue-400" />
							)}
						</div>
						{isEditing ? (
							<input
								type="text"
								value={editValue}
								onChange={(e) => setEditValue(e.target.value)}
								onKeyDown={handleEditSubmit}
								onBlur={() => setIsEditing(false)}
								className="bg-gray-800 border border-blue-500 rounded px-1 py-0.5 text-sm text-gray-200 outline-none min-w-0 flex-1"
								autoFocus
							/>
						) : (
							<span className="text-sm text-gray-200 truncate font-medium">
								{explorer.name}
							</span>
						)}
					</div>

					<div
						className={cn(
							"flex items-center gap-1 transition-opacity duration-200",
							showActions || isActive ? "opacity-100" : "opacity-0"
						)}
					>
						<button
							className="p-1.5 hover:bg-green-900/50 rounded-md transition-all duration-200 flex items-center justify-center border border-transparent hover:border-green-700"
							onClick={(e) => handleNewFolder(e, false)}
							title="New File"
						>
							<File className="w-3.5 h-3.5 text-green-400 hover:text-green-300" />
						</button>
						<button
							className="p-1.5 hover:bg-amber-900/50 rounded-md transition-all duration-200 flex items-center justify-center border border-transparent hover:border-amber-700"
							onClick={(e) => handleNewFolder(e, true)}
							title="New Folder"
						>
							<FolderPlus className="w-3.5 h-3.5 text-amber-400 hover:text-amber-300" />
						</button>
						<button
							className="p-1.5 hover:bg-blue-900/50 rounded-md transition-all duration-200 flex items-center justify-center border border-transparent hover:border-blue-700"
							title="Edit"
							onClick={() => setIsEditing(true)}
						>
							<Edit3 className="w-3.5 h-3.5 text-blue-400 hover:text-blue-300" />
						</button>
						<button
							className="p-1.5 hover:bg-red-900/50 rounded-md transition-all duration-200 flex items-center justify-center border border-transparent hover:border-red-700"
							title="Delete"
							onClick={(e) => handleDeleteFileOrFolder(e, explorer.id)}
						>
							<Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-red-300" />
						</button>
					</div>
				</div>

				<div
					className={cn(
						"ml-4 border-l border-gray-700 pl-2",
						expand ? "block" : "hidden"
					)}
				>
					{showInput.visible && (
						<div className="flex items-center gap-1 py-0.5 px-1">
							<div className="w-4 h-4 flex items-center justify-center"></div>
							<div className="w-4 h-4 flex items-center justify-center">
								{showInput.isFolder ? (
									<FolderIcon className="w-4 h-4 text-blue-400" />
								) : (
									<FileText className="w-4 h-4 text-gray-400" />
								)}
							</div>
							<input
								type="text"
								className="bg-transparent border border-blue-500 rounded px-1 py-0.5 text-sm text-gray-200 outline-none  min-w-0 flex-1"
								autoFocus
								onKeyDown={onAddFolder}
								onBlur={() => setShowInput({ ...showInput, visible: false })}
								placeholder={showInput.isFolder ? "Folder name" : "File name"}
							/>
						</div>
					)}

					{explorer.items.map((item) => {
						return (
							<Folder
								onEditName={onEditName}
								onDeleteFolder={onDeleteFolder}
								handleNewTree={handleNewTree}
								activeFolder={activeFolder}
								setActiveFolder={setActiveFolder}
								key={item.id}
								explorer={item}
							/>
						);
					})}
				</div>
			</div>
		);
	} else {
		return (
			<div
				className="flex items-center justify-between group py-1 px-2 rounded-sm transition-all duration-200 cursor-pointer hover:bg-gray-800/50 border border-transparent hover:border-gray-700"
				onMouseEnter={() => setShowActions(true)}
				onMouseLeave={() => setShowActions(false)}
			>
				<div className="flex items-center gap-1 min-w-0 flex-1">
					<div className="w-4 h-4 flex items-center justify-center"></div>
					<div className="w-4 h-4 flex items-center justify-center">
						<FileText className="w-4 h-4 text-gray-400" />
					</div>
					{isEditing ? (
						<input
							type="text"
							value={editValue}
							onChange={(e) => setEditValue(e.target.value)}
							onKeyDown={handleEditSubmit}
							onBlur={() => setIsEditing(false)}
							className="bg-gray-800 border border-blue-500 rounded px-1 py-0.5 text-sm text-gray-200 outline-none min-w-0 flex-1"
							autoFocus
						/>
					) : (
						<span className="text-sm text-gray-200 truncate">
							{explorer.name}
						</span>
					)}
				</div>

				<div
					className={cn(
						"flex items-center gap-1 transition-opacity duration-200",
						showActions ? "opacity-100" : "opacity-0"
					)}
				>
					<button
						className="p-1.5 hover:bg-blue-900/50 rounded-md transition-all duration-200 flex items-center justify-center border border-transparent hover:border-blue-700"
						title="Edit"
						onClick={() => setIsEditing(true)}
					>
						<Edit3 className="w-3.5 h-3.5 text-blue-400 hover:text-blue-300" />
					</button>
					<button
						className="p-1.5 hover:bg-red-900/50 rounded-md transition-all duration-200 flex items-center justify-center border border-transparent hover:border-red-700"
						title="Delete"
						onClick={(e) => handleDeleteFileOrFolder(e, explorer.id)}
					>
						<Trash2 className="w-3.5 h-3.5 text-red-400 hover:text-red-300" />
					</button>
				</div>
			</div>
		);
	}
}
