export const CalculateRemainingDrinksAfterElapsedTime = function(drinks,elapsedTime) {



  for (let movableDrinksIteral = 0; movableDrinksIteral < drinks.length; movableDrinksIteral++) {
        drinks[movableDrinksIteral].drinkTime += parseInt(elapsedTime!==null?elapsedTime:1);
    }

    return drinks;

}