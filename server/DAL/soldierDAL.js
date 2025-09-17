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
    const { data, error } = await supabase.from("soldiers").update({ password }).eq("personal_number", personalNumber).select().single();
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

export const getDirectSoldiersWithReportsDB = async (personalNumber) => {
    const { data, error } = await supabase.from("soldiers").select(`personal_number, name, report:report!inner (location, status, created_at, done)`).eq("commander", personalNumber);
    if (error) {
        console.log(`getDirectSoldiersWithReportsDB: ${error}`);
        return null;
    }
        const newData = data.map(item => ({
        personal_number: item.personal_number,
        name: item.name,
        location: item.report?.location,
        status: item.report?.status,
        created_at: item.report?.created_at,
        done: item.report?.done
    }));
    return newData;
};
