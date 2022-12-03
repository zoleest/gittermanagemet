export const TimeOutCounter = function(context,elapsedTime,CalculateRemainingDrinksAfterElapsedTime,CalculateAmount) {

    context.drunkenDrinks = CalculateRemainingDrinksAfterElapsedTime(context.drunkenDrinks, elapsedTime);
    context.amount = CalculateAmount(context.drunkenDrinks, context.consumeRate);
    localStorage.setItem('drinks', JSON.stringify(context.drunkenDrinks));
    localStorage.setItem('lastUpdate', Date());
    context.updateDisplay();
}