package main

type Recipe struct {
	id               string
	name             string
	creationDate     int
	modificationDate int
	tags             []Tag
	times            Time
	images           Image
	ingredientGroups IngredientGroup
	stepGroups       StepGroup
}

type Tag struct {
	name   string
	colour Colour
}

type Colour struct {
	r int
	g int
	b int
}

type Time struct {
	prep int
	cook int
}

type Image struct {
	url string
	alt string
}

type IngredientGroup struct {
	name        string
	ingredients []Ingredient
}

type Ingredient struct {
	name   string
	amount string
	unit   string
}

type StepGroup struct {
	name  string
	steps []Step
}

type Step struct {
	text string
}

type User struct {
	username    string
	displayName string
	password    string
	salt        string
	pronouns    string
	bio         string
}
