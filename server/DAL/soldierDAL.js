import supabase from "../db/connect.js";

export const getSoldierByIdDB = async (id) => {
    const { data, error } = await supabase.from("soldiers").select("*").eq("personal_number", id).single();        
    if (error) {
        console.log(`getSoldierDB: ${error}`);
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

export const updateSoldierDB = async (id, password) => {    
    const { data, error } = await supabase.from("soldiers").update({ password }).eq("personal_number", id).select();
    if (error) {
        console.log(`updateSoldierDB: ${error}`);
        return null;
    }
    return data;
}