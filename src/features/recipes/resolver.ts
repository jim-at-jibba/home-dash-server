import {Arg, Ctx, Mutation, Query, Resolver} from "type-graphql"
import {MyContext} from "../../types/my-context"
import GetRecipeByIdInput from "./get-recipe-by-id-input"
import RecipeIngredients from "./recipe-ingredients"
import RecipeInput from "./recipe-input"
import RecipeSteps from "./recipe-steps"
import {v4 as uuidv4} from "uuid"
import {logger} from "../../utils/logger"
import RecipeDetails from "./recipe-details"
import RecipeFull from "./recipe"
import FoodCategories from "./food-categories"
import FoodCategoryInput from "./FoodCategoryInput"

@Resolver()
class RecipesResolver {
  @Query((returns) => RecipeFull)
  async getRecipeById(@Arg("input") input: GetRecipeByIdInput, @Ctx() ctx: MyContext): Promise<RecipeFull> {
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
        "r.created_at",
        "r.updated_at",
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
      ...recipe,
      ingredients: recipeIngredients,
      steps: recipeSteps,
    }
  }

  @Query((returns) => [RecipeDetails])
  async getRecipes(@Ctx() ctx: MyContext): Promise<[RecipeDetails]> {
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
        "r.created_at",
        "r.updated_at",
        "cats.food_category_name",
        "courses.food_course_name",
      )
      .orderBy("r.created_at", "desc")

    logger.info({recipesDetails})

    return recipesDetails as [RecipeDetails]
  }

  @Query((returns) => [RecipeSteps])
  async getRecipeStepsByRecipeId(
    @Arg("input") input: GetRecipeByIdInput,
    @Ctx() ctx: MyContext,
  ): Promise<[RecipeSteps]> {
    const {db} = ctx

    console.log("WHAT")

    const recipeSteps = (await db("recipe_steps").select("*").where("recipe_id", "=", input.id)) as [RecipeSteps]

    logger.info(recipeSteps)

    return recipeSteps
  }

  @Mutation((returns) => RecipeFull)
  async createRecipe(@Arg("input") input: RecipeInput, @Ctx() ctx: MyContext) {
    console.log({input})
    const {db} = ctx
    try {
      const newRecipeId = await db.transaction(async (trx) => {
        const {ingredients, steps, ...recipe} = input

        const ids = await trx("recipes").insert(
          {
            id: uuidv4(),
            recipe_name: recipe.name,
            recipe_description: recipe.description,
            food_course_id: recipe.courseId,
            food_category_id: recipe.categoryId,
            recipe_image: recipe.recipeImage,
            prep_time: recipe.prepTime,
            cook_time: recipe.cookTime,
            serves: recipe.serves,
          },
          "id",
        )

        logger.info(ids)
        const completeIngredients = ingredients.map((ingredient) => ({
          id: uuidv4(),
          recipe_id: ids[0],
          ingredient: ingredient.ingredient,
        }))

        const completeSteps = steps.map((step) => ({
          id: uuidv4(),
          recipe_id: ids[0],
          step_number: step.stepNumber,
          step_description: step.stepDescription,
        }))

        // console.log({ids, completeIngredients, completeSteps})
        const ingredientInserts = await trx("recipe_ingredients").insert(completeIngredients, "id")
        const stepInserts = await trx("recipe_steps").insert(completeSteps, "id")

        console.log(ingredientInserts.length + " new ingredients saved.")
        console.log(stepInserts.length + " new steps saved.")

        return ids[0]
      })

      console.log({newRecipeId})

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
          "r.created_at",
          "r.updated_at",
          "cats.food_category_name",
          "courses.food_course_name",
        )
        .where("r.id", "=", newRecipeId)

      const recipeIngredients = (await db("recipe_ingredients").select("*").where("recipe_id", "=", newRecipeId)) as [
        RecipeIngredients,
      ]

      const recipeSteps = (await db("recipe_steps").select("*").where("recipe_id", "=", newRecipeId)) as [RecipeSteps]

      const recipe = recipesDetails[0]

      return {
        ...recipe,
        ingredients: recipeIngredients,
        steps: recipeSteps,
      }
    } catch (error) {
      logger.error(error)
    }
  }

  @Mutation((returns) => FoodCategories)
  async createFoodCategory(@Arg("input") input: FoodCategoryInput, @Ctx() ctx: MyContext) {
    const {db} = ctx

    try {
      const category = await db("food_categories").insert(
        {
          id: uuidv4(),
          food_category_name: input.name,
        },
        "*",
      )

      console.log("category", category)

      return category[0]
    } catch (error) {
      logger.error(error)
    }
  }
}

export default RecipesResolver
