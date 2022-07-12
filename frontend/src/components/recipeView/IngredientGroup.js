export function IngredientGroup(props) {
  const {ingredientGroup} = props;
  
  return (<section>
    <h5>{ingredientGroup.name}</h5>
  
    <ul>
      {ingredientGroup.ingredients.map((ingredient, ingredientIndex) => {
        return (
          <li key={ingredientIndex} className='ingredient'>
            <span>{ingredient.name}</span>
            <span>{`${ingredient.amount}${ingredient.unit}`}</span>
          </li>
        )
      })}
    </ul>

  </section>)
}
