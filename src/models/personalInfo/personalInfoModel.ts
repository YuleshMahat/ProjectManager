// models/personalInfo/personalInfoActions.ts
import personalInfo from "@/models/personalInfo/personalInfoSchema";

/**
 * Fetch personal info by filter (usually { userId })
 */
export const findPersonalInfo = (filter: any) => {
  return personalInfo.findOne(filter);
};

/**
 * Update personal info by userId (or any filter)
 * Creates if doesn't exist (upsert)
 */
export const updatePersonalInfoModel = (filter: any, updateObj: any) => {
  return personalInfo.findOneAndUpdate(filter, updateObj, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });
};
