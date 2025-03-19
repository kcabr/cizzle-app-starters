import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  time: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  tags: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
};

// Mock data - would be replaced with a database in production
const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish with eggs, cheese, and pancetta.",
    time: 25,
    difficulty: "medium",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "100g Pecorino Romano, grated",
      "50g Parmesan, grated",
      "Freshly ground black pepper",
      "Salt",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil and cook the spaghetti until al dente.",
      "While the pasta is cooking, heat a large skillet over medium heat and cook the pancetta until crispy.",
      "In a bowl, whisk together the eggs, Pecorino Romano, Parmesan, and black pepper.",
      "When the pasta is done, reserve 1/2 cup of pasta water and drain.",
      "Working quickly, add the pasta to the skillet with the pancetta, then remove from heat.",
      "Add the egg mixture and toss quickly to coat the pasta, adding reserved pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra cheese and black pepper on top.",
    ],
    imageUrl: "https://placehold.co/600x400/orange/white?text=Carbonara",
    tags: ["pasta", "italian", "dinner", "quick"],
    authorId: "101",
    authorName: "Chef Mario",
    createdAt: "2023-08-15T14:30:00Z",
  },
  {
    id: "2",
    title: "Avocado Toast",
    description:
      "Simple and nutritious breakfast with ripe avocados on toasted bread.",
    time: 10,
    difficulty: "easy",
    ingredients: [
      "2 slices of sourdough bread",
      "1 ripe avocado",
      "1 lemon, juiced",
      "Red pepper flakes",
      "Salt and pepper to taste",
      "Extra virgin olive oil",
      "Optional: 2 eggs for poaching",
    ],
    instructions: [
      "Toast the bread slices until golden brown.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Add lemon juice, salt, and pepper to the avocado and mash with a fork.",
      "Spread the mashed avocado on the toast.",
      "Drizzle with olive oil and sprinkle with red pepper flakes.",
      "Optional: Top with a poached egg for extra protein.",
    ],
    imageUrl: "https://placehold.co/600x400/green/white?text=Avocado+Toast",
    tags: ["breakfast", "vegetarian", "healthy", "quick"],
    authorId: "102",
    authorName: "Nutrition Sarah",
    createdAt: "2023-09-20T08:15:00Z",
  },
  {
    id: "3",
    title: "Chocolate Chip Cookies",
    description:
      "Classic homemade cookies with a perfect chewy center and crisp edges.",
    time: 45,
    difficulty: "easy",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups semi-sweet chocolate chips",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, mix flour, baking soda, and salt.",
      "In a large bowl, cream together butter and both sugars until smooth.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Gradually blend in the dry ingredients.",
      "Fold in chocolate chips.",
      "Drop by rounded tablespoons onto ungreased baking sheets.",
      "Bake for 9 to 11 minutes or until golden brown.",
      "Let stand on baking sheet for 2 minutes before removing to cool on wire racks.",
    ],
    imageUrl: "https://placehold.co/600x400/brown/white?text=Chocolate+Cookies",
    tags: ["dessert", "baking", "cookies", "chocolate"],
    authorId: "103",
    authorName: "Baker Bob",
    createdAt: "2023-10-05T16:45:00Z",
  },
  {
    id: "4",
    title: "Thai Green Curry",
    description:
      "Aromatic and spicy Thai curry with coconut milk and fresh vegetables.",
    time: 40,
    difficulty: "medium",
    ingredients: [
      "2 tbsp green curry paste",
      "1 can (400ml) coconut milk",
      "400g chicken breast, sliced",
      "1 red bell pepper, sliced",
      "1 zucchini, sliced",
      "1 cup green beans, trimmed",
      "2 tbsp fish sauce",
      "1 tbsp palm sugar or brown sugar",
      "Fresh Thai basil leaves",
      "Lime wedges for serving",
      "2 cups jasmine rice, cooked",
    ],
    instructions: [
      "Heat a large pan or wok over medium heat.",
      "Add 2 tablespoons of coconut milk and the curry paste, stirring until fragrant.",
      "Add the chicken and cook until no longer pink.",
      "Pour in the remaining coconut milk and bring to a simmer.",
      "Add the vegetables and cook until tender but still crisp, about 5-7 minutes.",
      "Season with fish sauce and sugar, adjusting to taste.",
      "Stir in the Thai basil leaves just before serving.",
      "Serve hot over jasmine rice with lime wedges on the side.",
    ],
    imageUrl: "https://placehold.co/600x400/green/white?text=Thai+Curry",
    tags: ["thai", "dinner", "spicy", "curry"],
    authorId: "104",
    authorName: "Thai Chef Chai",
    createdAt: "2023-11-12T19:30:00Z",
  },
  {
    id: "5",
    title: "Berry Smoothie Bowl",
    description:
      "Nutritious breakfast bowl packed with berries, banana, and healthy toppings.",
    time: 15,
    difficulty: "easy",
    ingredients: [
      "1 cup mixed frozen berries",
      "1 frozen banana",
      "1/2 cup Greek yogurt",
      "1/4 cup almond milk",
      "For toppings: sliced fresh fruits, granola, chia seeds, honey, coconut flakes",
    ],
    instructions: [
      "Add frozen berries, banana, Greek yogurt, and almond milk to a blender.",
      "Blend until smooth, adding more almond milk if needed to reach desired consistency.",
      "Pour into a bowl.",
      "Top with fresh fruits, granola, chia seeds, a drizzle of honey, and coconut flakes.",
      "Serve immediately and enjoy with a spoon!",
    ],
    imageUrl: "https://placehold.co/600x400/purple/white?text=Smoothie+Bowl",
    tags: ["breakfast", "healthy", "vegetarian", "quick"],
    authorId: "102",
    authorName: "Nutrition Sarah",
    createdAt: "2023-12-01T07:45:00Z",
  },
];

// Server function to get all recipes
export const getAllRecipes = createServerFn({ method: "GET" }).handler(() => {
  // Simulating server-side data fetch delay
  return new Promise<Recipe[]>((resolve) => {
    setTimeout(() => resolve(mockRecipes), 500);
  });
});

// Server function to search recipes
export const searchRecipes = createServerFn({ method: "GET" })
  .validator((query: string) => query)
  .handler(({ data: query }) => {
    // Simulating server-side search with delay
    return new Promise<Recipe[]>((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const results = mockRecipes.filter(
          (recipe) =>
            recipe.title.toLowerCase().includes(lowerQuery) ||
            recipe.description.toLowerCase().includes(lowerQuery) ||
            recipe.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
        resolve(results);
      }, 500);
    });
  });

// Server function to get recipe by ID
export const getRecipeById = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(({ data: id }) => {
    // Simulating server-side data fetch with delay
    return new Promise<Recipe>((resolve, reject) => {
      setTimeout(() => {
        const recipe = mockRecipes.find((r) => r.id === id);
        if (recipe) {
          resolve(recipe);
        } else {
          reject(new Error(`Recipe with ID ${id} not found`));
        }
      }, 500);
    });
  });

// React Query options for fetching all recipes
export const allRecipesQueryOptions = () =>
  queryOptions({
    queryKey: ["recipes"],
    queryFn: () => getAllRecipes(),
  });

// React Query options for searching recipes
export const searchRecipesQueryOptions = (query: string) =>
  queryOptions({
    queryKey: ["recipes", "search", query],
    queryFn: () => searchRecipes({ data: query }),
  });

// React Query options for fetching a recipe by ID
export const recipeByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["recipes", id],
    queryFn: () => getRecipeById({ data: id }),
  });
