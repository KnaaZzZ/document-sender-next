"use client"

import ConnectionListItem from "@/resources/components/ListItems/ConnectionListItem";
import SavedDocumentListItem from "@/resources/components/ListItems/SavedDocumentListItem";
import ListView from "@/resources/components/ListView";
import { getNormalizedConnections } from "@/resources/mongodb/models/connections";
import { getUserById } from "@/resources/mongodb/models/users";
import { useAppDispatch, useAppSelector } from "@/resources/redux/hooks";
import { setHome } from "@/resources/redux/reducers";
import { normalizeUser } from "@/resources/types/converter";
import Link from "next/link";
import { useEffect } from "react";

const HomePage = () => {
    const home = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();

    return (
        <div>
            {home.user ? 
                <div>
                    <div>{home.user.email}</div>
                    <ListView title='Connections' data={home.connections} ListItem={ConnectionListItem} handleClick={() => {}}/>
                    <div>
                        <Link href={'/home/connections/add_connection'}>Make Connection</Link>
                        <Link href={'/home/connections/pending_connections'}>Pending Connections</Link>
                    </div>
                    <ListView title='Saved Documents' data={home.user!.savedDocuments} ListItem={SavedDocumentListItem} handleClick={() => {}}/>
                    <Link href={'/home/saved_documents/add_document'}>Add Document</Link>
                    <div>
                        <Link href={''}>Messages</Link>
                        <Link href={''}>Changes</Link>
                        <Link href={''}>Settings</Link>
                    </div>
                </div>
                :
                <div>Loading</div>
            }
            
        </div>
    )
}

export default HomePage