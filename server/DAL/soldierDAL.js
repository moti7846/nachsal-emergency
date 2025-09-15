import supabase from "../db/connect.js";

export const getSoldierByIdDB = async (personalNumber) => {
    const { data, error } = await supabase.from("soldiers").select("*").eq("personal_number", personalNumber).single();        
    if (error) {
        console.log(`getSoldierByIdDB: ${error}`);
        return null;
    }
    return data;
}

export const getSoldiersDB = async () => {
    const { data, error } = await supabase.from("soldiers").select("*");
    if (error) {
        console.log(`getSoldiersDB: ${error}`);
        return null;
    }
    return data;
}

export const addSoldierDB = async (obj) => {
    const { data, error } = await supabase.from("soldiers").insert(obj);
    if (error) {
        console.log(`addSoldierDB: ${error}`);
        return null;
    }
    return data;
}

export const updateSoldierDB = async (personalNumber, password) => {    
    const { data, error } = await supabase.from("soldiers").update({ password }).eq("personal_number", personalNumber).select();
    if (error) {
        console.log(`updateSoldierDB: ${error}`);
        return null;
    }
    return data;
}

export const getDirectSoldiersDB = async (personalNumber) => {
    const { data, error } = await supabase.from("soldiers").select("*").eq("commander", personalNumber);        
    if (error) {
        console.log(`getDirectSoldiersDB: ${error}`);
        return null;
    }
    return data;
}
