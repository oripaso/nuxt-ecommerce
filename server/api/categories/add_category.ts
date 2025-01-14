import { defineEventHandler, readBody } from "h3";
import { addCategory } from "../../services/addCategory";

export default defineEventHandler(async (event) => {
  try {
    // read the data from request body
    const body = await readBody(event);
    console.log(body);
    
    const { category_name, category_id } = body;

    // validate the input
    if (!category_name || typeof category_id !== "number") {
      throw new Error(
        "Invalid input: category_name and category_id are required."
      );
    }

    // call the function to add the category
    const newCategory = await addCategory({ category_name, category_id });

    // return a response to the client
    return {
      status: 201,
      message: "Category added successfully!",
      data: newCategory,
    };
  } catch (error) {
    // assert that error is an instance of Error to safely access its message
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Error adding category:", errorMessage);

    return {
      status: 500,
      message: errorMessage || "Failed to add category.",
    };
  }
});
