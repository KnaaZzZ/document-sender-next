import React from 'react'

type ListViewType = {
    title: string,
    data: any[],
    ListItem: React.ElementType,
    handleClick: (key: string) => void
}
const ListView = ({title, data, ListItem, handleClick}: ListViewType) => {
    return (
        <div>
            <div>
                {title}
            </div>
            <div>
                {data.map((object, index) => {
                    return (
                        <ListItem key={index} index={index} data={object} handleClick={(key: string) => {handleClick(key)}}/>
                    )
                })}
            </div>
        </div>
    )
}

export default ListView