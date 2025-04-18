import { State } from "../../hooks/types"
import { Breadcrumbs } from "../Breadcrumbs"

type Props = {
    state: State
}

export const Username = ({ state }: Props) => {
    return (
        <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
                <Breadcrumbs state={state} />
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {state.getUsername.username?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{state.getUsername.username}</span>
                </div>
            </div>
        </div>
    )
}
