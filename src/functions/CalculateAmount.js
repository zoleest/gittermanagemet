export const CalculateAmount = function(Drinks, ConsumeRate) {


    console.log(ConsumeRate);


    let amountPerHourLocal = Array(24).fill(0);
    let filteredDrinks = Drinks.filter(drink=>{return drink.displayed});




    for (let drinkCount = 0; drinkCount < filteredDrinks.length; drinkCount++) {



        let remainingAlcohol = ((parseFloat(filteredDrinks[drinkCount].drinkValue) * 100 * 0.789 * (filteredDrinks[drinkCount].drinkAmount / 100)))





        for (let remainingHours = (23- filteredDrinks[drinkCount].drinkTime);( remainingHours <= 23 && remainingAlcohol > 0); remainingHours++) {
            if ((amountPerHourLocal[remainingHours] + remainingAlcohol) <= ConsumeRate) {
                amountPerHourLocal[remainingHours] = amountPerHourLocal[remainingHours] + remainingAlcohol;
                remainingAlcohol = 0;

            } else {

                if (remainingHours < 23) {
                    remainingAlcohol -=  ConsumeRate - amountPerHourLocal[remainingHours];
                    amountPerHourLocal[remainingHours] = ConsumeRate;


                } else {
                    amountPerHourLocal[remainingHours] += remainingAlcohol;
                }

            }




        }




    }



    return amountPerHourLocal[23];
}
