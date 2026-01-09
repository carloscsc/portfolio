"use server";
import connect from "@/lib/db";
import { Category, Tag } from "./archive.models";
import { slugfy } from "@/lib/utils";
import { MongoServerError } from "mongodb";
import {
  CategStoreResponseType,
  CategType,
  TagStoreResponseType,
  TagType,
} from "./archive.schema";

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

/**
 * categories
 */

// get all tags
export const getAllCategories = async (): Promise<CategType[] | []> => {
  await connect();

  const categ = await Category.find().lean().select("-_id value label");

  return categ;
};

//  create a new tag
export const createCategory = async (
  label: string,
): Promise<CategStoreResponseType> => {
  try {
    await connect();

    const category = new Category({
      label: label,
      value: slugfy(label),
    });

    const newCateg = (await category.save()).toJSON();

    return {
      category: {
        label: newCateg.label,
        value: newCateg.value,
      },
    };
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return {
        error: "This category has already been registered",
      };
    }

    return {
      error: "Error attempting to create a new category",
    };
  }
};
