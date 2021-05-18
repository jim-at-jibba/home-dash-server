import {Arg, Ctx, Query, Resolver} from "type-graphql"
import {MyContext} from "../../types/my-context"
import GetRecipeByIdInput from "./get-recipe-by-id-input"
import Recipes from "./recipe"
import RecipeIngredients from "./recipe-ingredients"
import RecipeSteps from "./recipe-steps"

@Resolver()
class RecipesResolver {
  @Query((returns) => Recipes)
  async getRecipeById(@Arg("input") input: GetRecipeByIdInput, @Ctx() ctx: MyContext): Promise<Recipes> {
    const {db} = ctx

    const recipesDetails = await db("recipes as r")
      .join("food_courses as courses", "courses.id", "r.food_course_id")
      .join("food_categories as cats", "cats.id", "r.food_category_id")
      .select(
        "r.id",
        "r.recipe_name",
        "r.recipe_description",
        "r.recipe_image",
        "r.cook_time",
        "r.prep_time",
        "r.serves",
        "cats.food_category_name",
        "courses.food_course_name",
      )
      .where("r.id", "=", input.id)

    const recipeIngredients = (await db("recipe_ingredients").select("*").where("recipe_id", "=", input.id)) as [
      RecipeIngredients,
    ]

    const recipeSteps = (await db("recipe_steps").select("*").where("recipe_id", "=", input.id)) as [RecipeSteps]

    console.log({recipesDetails, recipeIngredients, recipeSteps})

    const recipe = recipesDetails[0]

    return {
      id: recipe.id,
      name: recipe.recipe_name,
      description: recipe.recipe_description,
      category: recipe.food_category_name,
      course: recipe.food_course_name,
      ingredients: recipeIngredients,
      steps: recipeSteps,
      image: recipe.recipe_image,
      cookTime: recipe.cook_time,
      prepTime: recipe.prep_time,
      serves: recipe.serves,
    }
  }
}

export default RecipesResolver
