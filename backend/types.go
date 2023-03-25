package main

type Recipe struct {
	Id               string
	Name             string
	CreationDate     int
	ModificationDate int
	Tags             []Tag
	Times            Time
	Images           []Image
	IngredientGroups []IngredientGroup
	StepGroups       []StepGroup
}

type Tag struct {
	Name   string
	Colour Colour
}

type Colour struct {
	R int
	G int
	B int
}

type Time struct {
	Prep int
	Cook int
}

type Image struct {
	Url string
	Alt string
}

type IngredientGroup struct {
	Name        string
	Ingredients []Ingredient
}

type Ingredient struct {
	Name   string
	Amount int
	Unit   string
}

type StepGroup struct {
	Name  string
	Steps []Step
}

type Step struct {
	Text string
}

type User struct {
	Username    string
	DisplayName string
	Password    string
	Salt        string
	Pronouns    string
	Bio         string
}
