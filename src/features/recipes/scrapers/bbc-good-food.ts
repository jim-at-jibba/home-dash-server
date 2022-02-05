import got from "got"
import cheerio from "cheerio"

interface ScrappedRecipe {
  recipe_name: string
  recipe_description: string
  ingredients: Array<string>
  categories: Array<string>
  steps: Array<string>
  cook_time: string
  prep_time: string
  serves: string
}

export async function bbcScraper(url: string): Promise<ScrappedRecipe | null> {
  return got(url)
    .then((response) => {
      const $ = cheerio.load(response.body)
      // @ts-ignore
      const recipe_name = $(".post-header__title").children().text()
      const recipe_description = $(".post-header__body").find(".editor-content").children().text()
      const prep_time = $("li.body-copy-small:nth-child(1) > span:nth-child(2) > time:nth-child(1)")
        .text()
        .split(" ")[0]
      const cook_time = $("li.body-copy-small:nth-child(2) > span:nth-child(2) > time:nth-child(1)")
        .text()
        .split(" ")[0]
      const serves = $(".post-header__servings > div:nth-child(2)").text().split(" ")[1]
      const catsContainer = $(".terms-icons-list").find("span.terms-icons-list__text")
      const categories = []
      for (let i = 0; i < catsContainer.length; i++) {
        const urlText = $(catsContainer[i]).text()
        categories.push(urlText)
      }
      const ingredientsContainer = $(".recipe__ingredients > section:nth-child(2) > ul:nth-child(1)").children()
      const ingredients = []
      for (let i = 0; i < ingredientsContainer.length; i++) {
        const ingredientText = $(ingredientsContainer[i]).text()
        ingredients.push(ingredientText)
      }

      // console.log($('.recipe__ingredients > section:nth-child(2) > ul:nth-child(1)').children())
      const stepsContainer = $(".recipe__method-steps .grouped-list__list").children()
      const steps = []
      for (let i = 0; i < stepsContainer.length; i++) {
        const stepText = $(stepsContainer[i]).find(".editor-content").text()
        steps.push(stepText)
      }

      const recipe = {
        recipe_name,
        recipe_description,
        cook_time,
        prep_time,
        serves,
        categories,
        steps,
        ingredients,
      }

      return recipe
    })
    .catch((err) => {
      console.log(err)
      return null
    })
}
