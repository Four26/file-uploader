import { useEffect, useState } from "react"
import { URL } from "../api/URL";
import { isImageFile } from "../components/fileTypes";
export const Dashboard = () => {
    const [view, setView] = useState<{ id: number, file_url: string, name: string }[]>([]);

    const getData = async () => {
        try {
            const response = await fetch(`${URL}/dashboard`, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            setView(data.file);
            console.log(data)
            return data;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className=" relative grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-4 pt-4 pb-17 overflow-hidden">
            {view && Array.isArray(view) && <div>
                {view.map((item) => (
                    <div key={item.id}>
                        {isImageFile(item.name) &&
                            <div>
                                <img src={item.file_url} alt={item.name} />
                                <p>{item.name}</p>
                            </div>
                        }

                    </div>
                ))}
            </div>}
        </div>)
}
