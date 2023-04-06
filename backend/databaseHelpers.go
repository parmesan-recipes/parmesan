package main

import (
	"context"
	"encoding/json"
	"io"
	"os"

	_ "github.com/go-kivik/couchdb/v3"
	"github.com/go-kivik/kivik/v3"
	"github.com/google/uuid"
)

func DBConnect() *kivik.Client {
	client, err := kivik.New("couch", os.Getenv("COUCHDB_CONN_STRING"))
	if err != nil {
		panic(err)
	}
	return client
}

func GetRecipe(id string) (Recipe, error) {
	client := DBConnect().DB(context.TODO(), "recipes")
	row := client.Get(context.TODO(), id)
	defer row.Body.Close()

	var recipe Recipe
	byteArr, err := io.ReadAll(row.Body)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal((byteArr), &recipe)
	if err != nil {
		panic(err)
	}
	return recipe, nil
}

func GetUser(id string) (User, error) {
	client := DBConnect().DB(context.TODO(), "users")
	row := client.Get(context.TODO(), id)
	defer row.Body.Close()
	if row.Body != nil {
		panic(row.Err.Error())
	}
	var user User
	byteArr, err := io.ReadAll(row.Body)
	if err != nil {
		panic(err)
	}
	err = json.Unmarshal((byteArr), &user)
	if err != nil {
		panic(err)
	}
	return user, nil
}

func CreateRecipe(recipe io.ReadCloser) string {
	byteArr, err := io.ReadAll(recipe)
	if err != nil {
		panic(err)
	}
	var recipeUnmarshal Recipe
	json.Unmarshal((byteArr), &recipeUnmarshal)
	uuid := uuid.New().String()
	client := DBConnect().DB(context.TODO(), "recipes")
	_, err = client.Put(context.TODO(), uuid, recipeUnmarshal)
	if err != nil {
		panic(err)
	}
	return uuid
}

func CreateUser(user io.ReadCloser) string {
	byteArr, err := io.ReadAll(user)
	if err != nil {
		panic(err)
	}
	var userUnmarshal User
	json.Unmarshal((byteArr), &userUnmarshal)
	uuid := uuid.New().String()
	client := DBConnect().DB(context.TODO(), "users")
	_, err = client.Put(context.TODO(), uuid, userUnmarshal)
	if err != nil {
		panic(err)
	}
	return uuid
}
