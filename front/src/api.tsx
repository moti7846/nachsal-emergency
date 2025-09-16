import { URL } from "./App"

export async function getDirectSoldier(personalNumber: number) {
    const result = await fetch (`${URL}/reports/${personalNumber}`,{
        method:"GET",
        credentials:"include",
    })
    return result.json()
}

