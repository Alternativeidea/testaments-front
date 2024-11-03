'use server'

import { revalidatePath } from 'next/cache'

export async function invalidateCacheByPath(path: string) {
    revalidatePath(path)
}
