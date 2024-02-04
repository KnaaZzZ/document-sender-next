import { SavedDocumentType } from '@/resources/types';
import { useRouter } from 'next/navigation';
import React from 'react'

type SavedDocumentListItemType = {
    index: string,
    data: SavedDocumentType
}

const SavedDocumentListItem = ({index, data}: SavedDocumentListItemType) => {
    const navigate = useRouter();
    
    return (
        <button onClick={() => {navigate.push(`/home/saved_documents/saved_document/${index}`)}}>
            <div>
                {data.name}
            </div>
        </button>
    )
}

export default SavedDocumentListItem