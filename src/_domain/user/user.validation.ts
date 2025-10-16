"use server";
import { connect } from "@/lib/db";
import { User } from "./user.model";

/**
 * verify if there is other user by CPF
 */
export const userCPFisUnique = async (cpf: string): Promise<boolean> => {
  try {
    await connect();
    const user = await User.findOne({ cpf }).select("_id").lean();
    if (user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * verify if there is other user by EMAIL
 */
export const userEMAILisUnique = async (email: string): Promise<boolean> => {
  try {
    await connect();
    const user = await User.findOne({ email }).select("_id").lean();
    if (user) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
