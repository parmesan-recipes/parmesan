export function StepGroup (props) {
  const { stepGroup } = props

  return (
    <section>
      <h5>{stepGroup.name}</h5>

      <ol className='numberedList'>
        {stepGroup.steps.map((step, stepIndex) => {
          return (
            <li key={stepIndex} className='step'>
              <p>{step.text}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
