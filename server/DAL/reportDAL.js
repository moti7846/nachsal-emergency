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
  console.log(data);
  return true;
};
