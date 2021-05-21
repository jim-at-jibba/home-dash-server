import {Field, ID, ObjectType} from "type-graphql"

@ObjectType()
class FoodCategories {
  @Field((type) => ID)
  id: string

  @Field({name: "name"})
  food_category_name: string

  @Field({name: "createdAt"})
  created_at: Date

  @Field({name: "updatedAt"})
  updated_at: Date
}

export default FoodCategories
