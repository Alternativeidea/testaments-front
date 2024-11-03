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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { getAdminAmbassadors } from '@/lib/services/admin/ambassadors'
import { getUsersCSV } from '@/lib/services/admin/users'
import { FilterX } from 'lucide-react'
import { Button } from './button'
import { Icons } from './icons'
import Pagination from './pagination'

interface DataFilterOptionsProps {
    value: string
    label: string
}
interface DataFilterProps {
    name: string
    column: string
    options: DataFilterOptionsProps[]
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  children?: React.ReactNode
  title: string
  filterOptions?: DataFilterProps[],
  csvString?: string
}

export function DataTableV2<TData, TValue>({
    children,
    columns,
    data,
    title,
    filterOptions,
    csvString
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState('')
    const rowsPerPage = 6
    const [startIndex, setStartIndex] = React.useState<number>(0)
    const [disable, setDisable] = React.useState<boolean>(false)
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

    const handleClick = async () => {
        try {
            setDisable(true)
            let data = null
            if (csvString === 'users') {
                data = await getUsersCSV()
            } else {
                data = await getAdminAmbassadors('?csv=true')
            }
            console.log(data.url)
            window.open(data.url, '_blank', 'noopener,noreferrer')
            setDisable(false)
        } catch (err) {
            console.log(err)
            setDisable(false)
        }
    }

    const Filters = () => {
        return (
            <>
                {filterOptions?.map((filter) => (
                    <GenericFilter
                        key={filter.column}
                        name={filter.name}
                        column={filter.column}
                        options={filter.options}
                    />
                ))}
                {columnFilters.length > 0 &&
                <Button variant={'light'} size={'default'} onClick={() => setColumnFilters([])}>
                    <FilterX/>
                </Button>}
            </>
        )
    }

    const GenericFilter = ({ column, options, name } : DataFilterProps) => {
        return (
            <Select
                value={table.getColumn(column)?.getFilterValue() as string}
                onValueChange={(event) => {
                    table.getColumn(column)?.setFilterValue(event)
                    setStartIndex(0)
                    setEndIndex(rowsPerPage)
                }}>
                <SelectTrigger className="w-full text-body-medium outline-none">
                    <SelectValue className="w-[280px]" placeholder={name}/>
                </SelectTrigger>
                <SelectContent className='w-full'>
                    <SelectGroup>
                        <SelectLabel className='w-full'>{name}</SelectLabel>
                        {options.map(({ label, value }) => (
                            <SelectItem
                                key={`item-${value}`}
                                className='w-full' value={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        )
    }

    return (
        <div className='flex flex-col gap-y-6 w-full min-h-[600px] pt-8'>
            <div className='flex flex-col lg:flex-row w-full justify-between items-center gap-y-6'>
                <div className='w-fit'>
                    <h3 className='font-baskerville text-h5'>{title}</h3>
                </div>
                <div className='flex w-full lg:w-fit gap-x-2 items-center justify-start overflow-x-scroll no-scrollbar'>
                    {children}
                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => {
                            setGlobalFilter(String(value))
                            setStartIndex(0)
                            setEndIndex(rowsPerPage)
                        }}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Išči"
                    />
                    {filterOptions && <Filters/>}
                    { csvString && <div className='flex gap-x-2 h-full'>
                        <Button
                            className='flex justify-between items-center gap-x-2'
                            onClick={handleClick}
                            disabled={disable}
                        >
                            <Icons.ArrowUpCircle/>
                            <p className=''>Izvozi CSV</p>
                        </Button>
                    </div> }
                </div>
            </div>
            <Table>
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
                                    className='bg-primary-light-gray/20 border-b-8 !h-24 border-primary-white font-[500] text-body-big text-primary-medium-gray'
                                >
                                    {row.getVisibleCells().map((cell, i) => (
                                        <TableCell key={i} className='min-w-[120px]'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )
                        : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-[600px] text-center">
                                    Nobenega rezultata.
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
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
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
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
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}
