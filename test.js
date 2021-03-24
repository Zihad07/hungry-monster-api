const obj = {
    "strIngredient1": "Potatoes",
    "strIngredient2": "Milk",
    "strIngredient3": "Butter",
    "strIngredient4": "Mustard",
    "strIngredient5": "Spring Onions",
    "strIngredient6": "Spring Onions",
    "strIngredient7": "",
    "strIngredient8": "",
    "strIngredient9": "",
    "strIngredient10": "",
    "strIngredient11": "",
    "strIngredient12": "",
    "strIngredient13": "",
    "strIngredient14": "",
    "strIngredient15": "",
    "strIngredient16": "",
    "strIngredient17": "",
    "strIngredient18": "",
    "strIngredient19": "",
    "strIngredient20": "",
}


// obj.forEach((value, key) => {
//     console.log(key)
// });

const asArray = Object.entries(obj);
console.log(asArray);
const result = asArray.filter(([key, value]) => {
    // if (value[0].includes('strIngredient') && value[1].length) {
    //     return value;
    // }
    return value[1];
});

console.log(result);

const ingredients = [];
for (key in obj) {
    // console.log(key)
    if (`${key}`.includes('strIngredient') && obj[key].length) {
        ingredients.push(obj[key])
    }
    // console.log(obj[key])
}

console.table(ingredients)