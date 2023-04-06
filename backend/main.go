package main

import (
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("../frontend/build", true)))

	router.NoRoute(func(c *gin.Context) {
		c.File("../frontend/build/index.html")
	})

	/* recipe */

	router.GET("/api/v1/recipe/:id", func(c *gin.Context) {
		id := c.Param("id")
		if id == "" {
			// if blank, return full recipe list (planned)
		} else {
			recipe, err := GetRecipe(id)
			if err != nil {
				panic(err) // crash
			}
			c.JSON(http.StatusOK, recipe) //c.json says ok and returns the recipe
		}
	})

	/*router.POST("/api/v1/recipe", func(c *gin.Context) {
		id := createRecipe(c.Request.Body) //returns uuid
	})

	router.PUT("/api/v1/recipe/:id", func(c *gin.Context) {
		id := updateRecipe()
	})

	router.DELETE("/api/v1/recipe/:id", func(c *gin.Context) {
		id := deleteRecipe()
		// kill recipe
	})*/

	/* user */

	/*router.GET("/api/v1/user/:id", func(c *gin.Context) {
		id := c.Param("id")
		user := getUser(id)
		if id == "string that is an ID" {
			user = user                 // if filled, user id remains
			c.JSON(http.StatusOK, user) //c.json says ok and returns the user
		} else if id != "string that is an ID" {
			c.Status(http.StatusUnauthorized) //c.status unauthorized
		}
	})

	router.POST("/api/v1/user", func(c *gin.Context) {
	})

	router.DELETE("/api/v1/user", func(c *gin.Context) {
	})*/

	router.Run("localhost:8080")
}
