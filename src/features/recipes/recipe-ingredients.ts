import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class RecipeIngredients {
  @Field((type) => ID)
  id: string

  @Field()
  recipeId: string

  @Field()
  ingredient: string

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default RecipeIngredients
