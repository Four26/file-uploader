import { Link, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { State } from "../hooks/types";

type Props = {
    state: State
}

export const Breadcrumbs = ({ state }: Props) => {
    const { folderId } = useParams();
    const data = state.fileFolderData.data;

    const getFullPath = () => {
        const path = [];
        let currentId = folderId ? Number(folderId) : null

        while (currentId) {
            const folder = data.find(item => item.id === currentId && item.type === 'folder');
            if (folder) {
                path.unshift(folder);
                currentId = folder.parent_id;
            } else {
                break;
            }
        }
        return path;
    }

    const folderPath = getFullPath();

    return (
        <div className="flex items-center text-sm mb-4">
            <Link to="/dashboard" className="text-blue-600 hover:underline">
                My Drive
            </Link>
            {folderPath.map((folder, index) => (
                <span key={folder.id} className="flex items-center">
                    <FaChevronRight className="mx-2 text-gray-400 text-xs" />
                    {index === folderPath.length - 1 ? (
                        <span className="text-gray-600">{folder.name}</span>
                    ) : (
                        <Link to={`/dashboard/folders/${folder.id}`} className="text-blue-600 hover:underline" >
                            {folder.name}
                        </Link>
                    )}
                </span>
            ))
            }
        </div >
    );
}