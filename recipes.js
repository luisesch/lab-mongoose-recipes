const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: String,
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

let promise1 = Recipe.create({
  title: "Mashed Potatoes",
  level: "Easy Peasy",
  ingredients: ["potatoes", "milk", "butter", "salt"],
  cuisine: "International"
})
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

let promise2 = Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.name);
    });
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

let promise3 = Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  { duration: 100 }
)
  .then(console.log("Successfully updated Rigatoni"))
  .catch(err => {
    console.log("An error happened:", err);
  });

let promise4 = Recipe.deleteOne({ title: "Carrot Cake" })
  .then(console.log("Successfully deleted Carrot Cake"))
  .catch(err => {
    console.log("An error happened:", err);
  });

Promise.all([promise1, promise2, promise3, promise4])
  .then(mongoose.connection.close())
  .catch(err => console.error(err));
