export interface TagProps {
    title: string;
    link: string;
    // color: string;
}

export interface BlogItemProps {
    id: string
    title?: string
    description?: string
    image: string
    timeStamp?: Date
    link?: string
    slug?: string
    tags?: TagProps[]
    ratio?: string
}