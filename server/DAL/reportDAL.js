import supabase from "../db/connect.js";

export const createReportDB = async (obj, personalNumber) => {
  const { data, error } = await supabase
    .from("report")
    .update(obj)
    .eq("personal_number", Number(personalNumber));
  if (error) {
    console.log("insertReportDB: ", error);
    return false;
  }
  return true;
};

export const setAlertOnTrueDB = async (personalNumber) => {
  const { data, error } = await supabase
    .from("report")
    .update({ alert_on: true })
    .eq("personal_number", Number(personalNumber));
  if (error) {
    console.log("setlAlertOnTrueDB: ", error);
    throw error;
  }
  return true;
};

export const isAlertOnTrueDB = async (personalNumber) => {
  const { data, error } = await supabase
    .from("report")
    .select("alert_on")
    .eq("personal_number", Number(personalNumber))
    .single();
  if (error) {
    console.log("isAlertOnTrueDB: ", error);
    throw error;
  }
  return data;
};
