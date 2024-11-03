'use client'
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from '@tanstack/react-table'
import * as React from 'react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Card } from './card'
import { Input } from './input'
import Pagination from './pagination'
import { Skeleton } from './skeleton'

interface DataFilterOptionsProps {
    value: string
    label: string
}
interface DataFilterProps {
    name: string
    column: string
    options: DataFilterOptionsProps[]
}
interface DataMinimalProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  children?: React.ReactNode
  loading: boolean
  filterOptions?: DataFilterProps[]
  empty: string
}

export function DataTableMinimal<TData, TValue>({
    children,
    columns,
    data,
    loading,
    empty
}: DataMinimalProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState('')
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = React.useState<number>(0)
    const [endIndex, setEndIndex] = React.useState<number>(rowsPerPage)
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            globalFilter
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel() // client side filtering
    })
    const pages = Math.ceil(table.getRowModel().rows?.length / rowsPerPage)

    return (
        <div className='flex flex-col w-full max-h-[820px]'>
            <div className='flex flex-col lg:flex-row w-full justify-between items-center'>
                <div className='flex w-full gap-x-2 items-center justify-start overflow-x-scroll no-scrollbar'>
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        empty={empty}
                        onChange={value => {
                            setGlobalFilter(String(value))
                            setStartIndex(0)
                            setEndIndex(rowsPerPage)
                        }}
                        className={'font-lg shadow border border-block w-full'}
                    />
                    {children}
                </div>
            </div>
            <>
                {loading
                    ? <div className='flex flex-col gap-y-2 w-full pt-2'>
                        <Skeleton className='w-full h-[100px]'/>
                        <Skeleton className='w-full h-[100px]'/>
                        <Skeleton className='w-full h-[100px]'/>
                        <Skeleton className='w-full h-[100px]'/>
                    </div>
                    : <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className='border-none h-fit'>
                                    {headerGroup.headers.map((header, i) => {
                                        return (
                                            <TableHead key={i} className='font-semibold h-fit text-primary-medium-gray border-none pb-2'>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody className='!border-none gap-y-4 pb-auto pt-0'>
                            {table.getRowModel().rows?.length
                                ? (
                                    table.getRowModel().rows.slice(startIndex, endIndex).map((row) => (
                                        <TableRow
                                            key={`${'item' + row.id}`}
                                            data-state={row.getIsSelected() && 'selected'}
                                            className='bg-primary-light-gray/20 border-b-8 !h-24 border-primary-white font-[500] text-body-big text-primary-medium-gray !gap-x-2'
                                        >
                                            {row.getVisibleCells().map((cell, i) => (
                                                <TableCell key={i} className='px-1'>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )
                                : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="w-full h-fit text-center p-0">
                                            <Card className='w-full h-fit bg-primary-light-gray/20 border-none p-4'>
                                                <p className='text-h6'>Nimate {empty}</p>
                                            </Card>
                                        </TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>}
            </>
            <Pagination
                startIndex={startIndex}
                endIndex={endIndex}
                updateStartIndex={setStartIndex}
                updateEndIndex={setEndIndex}
                pages={pages}
                rowsPerPage={rowsPerPage}
            />
        </div>
    )
}

function DebouncedInput({
    value: initialValue,
    empty,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    empty: string
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)
        return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return (
        <Input
            className='flex w-full h-12'
            placeholder={`Najdi ${empty}`}
            {...props}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}
