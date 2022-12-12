export const CalculateAmount = function (Drinks, ConsumeRate, consumationTime, maxElapsedTime) {

    let filteredDrinks = Drinks.filter(drink=>{return drink.drinkTime < maxElapsedTime});

    if (filteredDrinks.length > 0) {



        let sortedDrinks = filteredDrinks.sort((a, b) => {
            return a.drinkTime - b.drinkTime
        });
        let maxTime = sortedDrinks[0].drinkTime + 1;

        let amountPerTimeLocal = Array(maxTime).fill(0);


        for (let drinkCount = 0; drinkCount < Drinks.length; drinkCount++) {


            let remainingAlcohol = ((parseFloat(Drinks[drinkCount].drinkValue) * 100 * 0.789 * (Drinks[drinkCount].drinkAmount / 100)))


            let realElapsedTime =  Drinks[drinkCount].drinkTime <= 30?0:Drinks[drinkCount].drinkTime-consumationTime;


            for (let remainingTimes = ((maxTime - 1) - realElapsedTime); (remainingTimes <= (maxTime - 1) && remainingAlcohol > 0); remainingTimes++) {
                if ((amountPerTimeLocal[remainingTimes] + remainingAlcohol) <= ConsumeRate) {
                    amountPerTimeLocal[remainingTimes] = amountPerTimeLocal[remainingTimes] + remainingAlcohol;
                    remainingAlcohol = 0;

                } else {

                    if (remainingTimes < (maxTime - 1)) {
                        remainingAlcohol -= ConsumeRate - amountPerTimeLocal[remainingTimes];
                        amountPerTimeLocal[remainingTimes] = ConsumeRate;


                    } else {
                        amountPerTimeLocal[remainingTimes] += remainingAlcohol;
                    }

                }


            }


        }


        return amountPerTimeLocal[(maxTime-1)];
    }

}
