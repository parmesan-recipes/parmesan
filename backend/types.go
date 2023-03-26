package main

type Recipe struct {
	Id               string            `json:"id"`
	Name             string            `json:"name"`
	CreationDate     int               `json:"creationDate"`
	ModificationDate int               `json:"modificationDate"`
	Tags             []Tag             `json:"tags"`
	Times            Time              `json:"time"`
	Images           []Image           `json:"images"`
	IngredientGroups []IngredientGroup `json:"ingredientGroups"`
	StepGroups       []StepGroup       `json:"stepGroups"`
}

type Tag struct {
	Name   string `json:"name"`
	Colour Colour `json:"color"`
}

type Colour struct {
	R int `json:"r"`
	G int `json:"g"`
	B int `json:"b"`
}

type Time struct {
	Prep int `json:"prep"`
	Cook int `json:"cook"`
}

type Image struct {
	Url     string `json:"url"`
	Alt     string `json:"alt"`
	Caption string `json:"caption"`
}

type IngredientGroup struct {
	Name        string       `json:"name"`
	Ingredients []Ingredient `json:"ingredients"`
}

type Ingredient struct {
	Name   string `json:"name"`
	Amount int    `json:"amount"`
	Unit   string `json:"unit"`
}

type StepGroup struct {
	Name  string `json:"name"`
	Steps []Step `json:"steps"`
}

type Step struct {
	Text string `json:"text"`
}

type User struct {
	Username    string
	DisplayName string
	Password    string
	Salt        string
	Pronouns    string
	Bio         string
}
