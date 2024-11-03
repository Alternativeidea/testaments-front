import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChangeEvent, useEffect, useState } from 'react'

interface CharacteristicsFormProps {
    characteristics: Characteristic[]
    categoryId: string | null
    onCharacteristicsChange: (newCharacteristics: Characteristic[]) => void;
}

const categoryRanges: { [key: string]: [number, number] } = {
    1: [3, 8], // Nepremičnina
    2: [8, 12], // Plovila
    3: [0, 3], // Vozilo
    7: [14, 16], // Zemljišče
    5: [12, 14], // Nakit/Zlatnina
    6: [16, 20], // Umetnine
    4: [20, 22], // Poslovni Modeli
    8: [22, 24] // Ostalo
}

export default function CharacteristicsForm({ characteristics, categoryId, onCharacteristicsChange } : CharacteristicsFormProps) {
    const [range, setRange] = useState<[number, number]>([0, 0])
    const [inputs, setInputs] = useState<{ [key: string]: string }>({})

    useEffect(() => {
        if (categoryId && categoryRanges[categoryId]) {
            setRange(categoryRanges[categoryId])

            const newInputs: { [key: string]: string } = {}
            characteristics.slice(categoryRanges[categoryId][0], categoryRanges[categoryId][1]).forEach(({ charId }) => {
                newInputs[charId] = ''
            })
            setInputs(newInputs)
        }
    }, [categoryId, characteristics])

    const handleInputChange = (charId: string, value: string) => {
        const updatedInputs = {
            ...inputs,
            [charId]: value
        }
        setInputs(updatedInputs)

        const updatedCharacteristics = Object.keys(updatedInputs).map(id => ({
            charId: id,
            text: updatedInputs[id],
            icon: characteristics.find(char => char.charId === id)?.icon || '',
            name: characteristics.find(char => char.charId === id)?.name || ''
        }))

        onCharacteristicsChange(updatedCharacteristics)
    }

    return (
        <>
            {categoryId !== null &&
                <div className='flex flex-col gap-4'>
                    {characteristics.slice(range[0], range[1]).map(({ name, text, charId }) => (
                        name === 'Vrsta goriva'
                            ? <FormField key={charId}
                                name={charId}
                                render={({ ...field }) => (
                                    <FormItem className='flex flex-col w-full'>
                                        <FormLabel>Gorivo</FormLabel>
                                        <Select onValueChange={(value) => {
                                            handleInputChange(charId.toString(), value)
                                        }}
                                        {...field}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-full'>
                                                    <SelectValue placeholder='Izberi' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className='w-full z-[999]'>
                                                <SelectItem value={'Bencin'}>Bencin</SelectItem>
                                                <SelectItem value={'Dizel'}>Dizel</SelectItem>
                                                <SelectItem value={'Plin'}>Plin</SelectItem>
                                                <SelectItem value={'Plin / Bencin'}>Plin / Bencin</SelectItem>
                                                <SelectItem value={'Elektrika'}>Elektrika</SelectItem>
                                                <SelectItem value={'Bencin / Elektrika'}>Bencin / Elektrika</SelectItem>
                                                <SelectItem value={'Vodik'}>Vodik</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            : <>
                                <FormLabel>{name}</FormLabel>
                                <Input
                                    value={inputs[charId]}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(charId, e.target.value)}
                                    name={charId}
                                    placeholder={text}
                                />
                            </>))}
                </div>
            }
        </>
    )
}
