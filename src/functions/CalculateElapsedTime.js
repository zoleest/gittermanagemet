export const CalculateRemainingDrinksAfterElapsedTime = function(drinks,index,elapsedTime) {



     drinks[index].drinkTime += parseInt(elapsedTime!==null?elapsedTime:1);


    return drinks[index];

}