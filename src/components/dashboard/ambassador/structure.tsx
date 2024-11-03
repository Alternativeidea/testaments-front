import { getTree } from '@/lib/services/tree'
import AmbassadorStructure from './ambasssador-structure'

export async function Structure() {
    const tree: TreeProps = await getTree()
    const firstLevels = tree.tree.filter(user => user.relativeLevel === 1)

    for (const f of firstLevels) {
        for (const t of tree.tree) {
            if (t.relativeArray.includes(f.id.toString())) {
                if (f.relativeArray.length < t.relativeArray.length) {
                    f.relativeArray = t.relativeArray
                }
            }
        }
    }

    for (const f of firstLevels) {
        if (f.relativeArray.length > 1) {
            const index = f.relativeArray.indexOf(f.id.toString())
            if (index > -1) {
                f.relativeArray.splice(index, 1)
            }
        }
    }

    return (
        <AmbassadorStructure firstLevels={firstLevels} />
    )
}
