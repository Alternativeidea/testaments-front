import { Button } from './button'
import { Icons } from './icons'

interface PaginationProps {
    startIndex: number
    endIndex: number
    rowsPerPage: number
    pages: number
    updateStartIndex: (value: number) => void
    updateEndIndex: (value: number) => void
}

export default function Pagination({ startIndex, endIndex, rowsPerPage, pages, updateStartIndex, updateEndIndex }: PaginationProps) {
    const currentIndex = startIndex / rowsPerPage + 1

    return (
        <>
            {pages > 1 &&
                <div className="flex items-center justify-center space-x-2">
                    <Button
                        variant='link'
                        size='sm'
                        className={startIndex === 0 ? 'pointer-events-none opacity-50' : ''}
                        onClick={() => {
                            const newStartIndex = Math.max(startIndex - rowsPerPage, 0)
                            const newEndIndex = newStartIndex + rowsPerPage
                            updateStartIndex(newStartIndex)
                            updateEndIndex(newEndIndex)
                        }}
                        disabled={startIndex === 0}
                    >
                        <Icons.ArrowLeft className='w-4' />
                    </Button>
                    <div className="flex gap-x-4 w-fit items-center justify-center text-sm text-primary-dark-gray">
                        {currentIndex === 1 && <span className='min-w-2'/>}
                        {currentIndex > 1 && (
                            <button
                                onClick={() => {
                                    const newStartIndex = (currentIndex - 2) * rowsPerPage
                                    const newEndIndex = newStartIndex + rowsPerPage
                                    updateStartIndex(newStartIndex)
                                    updateEndIndex(newEndIndex)
                                }}
                                className="cursor-pointer"
                            >
                                {currentIndex - 1}
                            </button>
                        )}
                        <button className="font-bold cursor-pointer">
                            {currentIndex}
                        </button>
                        {currentIndex < pages && (
                            <button
                                onClick={() => {
                                    const newStartIndex = currentIndex * rowsPerPage
                                    const newEndIndex = newStartIndex + rowsPerPage
                                    updateStartIndex(newStartIndex)
                                    updateEndIndex(newEndIndex)
                                }}
                                className="cursor-pointer"
                            >
                                {currentIndex + 1}
                            </button>
                        )}
                    </div>
                    <Button
                        variant='link'
                        size="sm"
                        className={endIndex >= (rowsPerPage * pages) ? 'pointer-events-none opacity-50' : ''}
                        onClick={() => {
                            const newStartIndex = Math.min(startIndex + rowsPerPage, rowsPerPage * (pages - 1))
                            const newEndIndex = newStartIndex + rowsPerPage
                            updateStartIndex(newStartIndex)
                            updateEndIndex(newEndIndex)
                        }}
                        disabled={endIndex >= (rowsPerPage * pages)}
                    >
                        <Icons.ArrowRight className='w-4' />
                    </Button>
                </div>
            }
        </>
    )
}
