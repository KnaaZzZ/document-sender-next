import { ConnectionType } from "@/resources/types";
import { useRouter } from "next/navigation";



type ConnectionListItemType = {
    index: string,
    data: ConnectionType,
}
const ConnectionListItem = ({index, data}: ConnectionListItemType) => {
    const navigate = useRouter();

    return (
        <button onClick={() => {navigate.push(`/home/connections/connection/${index}`)}}>
            <div>
                {data.connectionUser!.name.replace(".", " ")}
            </div>
            <div>
                {data.connectionUser!.email}
            </div>
        </button>
    )
}

export default ConnectionListItem