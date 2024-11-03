interface TreeItemProps {
    id: number
    hierarchy: string
    name: string
    createdAt: Date
    relativeLevel: number
    relativeArray: string[]
}

interface TreeProps {
    tree: TreeItemProps[]
    sums: {
        directs: number
        indirects: number
    }
}
