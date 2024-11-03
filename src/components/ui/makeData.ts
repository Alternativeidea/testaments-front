/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker'

export type Person = {
  id: string
  firstName: string
  lastName: string
  age: number
  email: string
  visits: number
  createdAt: string
  status: 'suspended' | 'inactive' | 'active' | 'pokojni'
  ambassador: 'yes' | 'no'
  membership: 'free' | 'premium'
  subRows?: Person[]
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

const newPerson = (): Person => {
    return {
        id: 'u0',
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int(40),
        email: faker.internet.email(),
        visits: faker.number.int(1000),
        ambassador: faker.helpers.arrayElement(['yes', 'no']),
        status: faker.helpers.shuffle<Person['status']>([
            'suspended',
            'inactive',
            'active',
            'pokojni'
        ])[0]!,
        membership: 'free',
        createdAt: new Date().toString()
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!
        return range(len).map((d): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }

    return makeDataLevel()
}
