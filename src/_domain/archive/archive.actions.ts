"use server";
import connect from "@/lib/db";
import { Tag } from "./archive.models";
import { slugfy } from "@/lib/utils";
import { MongoServerError } from "mongodb";
import { TagStoreResponseType, TagType } from "./archive.schema";

// get all tags
export const getAllTags = async (): Promise<TagType[] | []> => {
  await connect();

  const tags = await Tag.find().lean().select("-_id value label");

  return tags;
};

//  create a new tag
export const createTags = async (
  label: string,
): Promise<TagStoreResponseType> => {
  try {
    await connect();

    const tag = new Tag({
      label: label,
      value: slugfy(label),
    });

    const newTag = (await tag.save()).toJSON();

    return {
      tag: {
        label: newTag.label,
        value: newTag.value,
      },
    };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return {
        error: "This tag has already been registered",
      };
    }

    return {
      error: "Error attempting to create a new tag",
    };
  }
};
