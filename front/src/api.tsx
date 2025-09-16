import { URL } from "./App"

export async function getDirectSoldier(personalNumber: number) {
    const result = await fetch(`${URL}/reports/${personalNumber}`, {
        method: "GET",
        credentials: "include",
    })
    return result.json()
}

export async function getSoldierDetails(personalNumber: number) {
    const result = await fetch(`${URL}/reports/soldierDetails/${personalNumber}`, {
        method: "GET",
        credentials: "include",
    })
    return result.json()
}

export async function logout() {
    const result = await fetch(`${URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
    })
    return result.json()
}

