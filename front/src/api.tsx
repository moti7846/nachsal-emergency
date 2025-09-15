import { URL } from "./App"


// export function getSoldiers(params:type) {
    
// }
export async function getDirectSoldier(personalNumber: string) {
    const result = await fetch (`${URL}/reports/${personalNumber}`,{
        method:"GET",
        credentials:"include",
    })
    return result

}


// export function name(params:type) {
    
// }
// export function name(params:type) {
    
// }
// export function name(params:type) {
    
// }