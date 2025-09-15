import { URL } from "./App"

export async function getDirectSoldier(personalNumber: string) {
    const result = await fetch (`${URL}/reports/${personalNumber}`,{
        method:"GET",
        credentials:"include",
    })
    return result.json()
}

