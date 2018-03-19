export function inputValidation(requiredInput, targetComponent) 
{
	for(let key in requiredInput)
	{
		if(targetComponent.state.input[key] === "")
		{
			alert("Please input value in " + requiredInput[key]);
			return false;
		}
	}
	return true;
}