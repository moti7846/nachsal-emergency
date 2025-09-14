import supabase  from "../db/connect.js";

export const getSoldierByIdDB = async (id) => {
    const { data, error } = await supabase.from("soldiers").select("*").eq("id", id).single();
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

export const updateSoldierDB = async (name, password) => {
    const { data, error } = await supabase.from("soldiers").update({ "password": password }).eq("name", name);
    if (error) {
        console.log(`updateSoldierDB: ${error}`);
        return null;
    }
    return data;
}