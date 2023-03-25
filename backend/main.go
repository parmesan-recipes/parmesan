package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/api/v1/recipe/:id", func(c *gin.Context) {
	})

	router.POST("/api/v1/recipe/:id", func(c *gin.Context) {
	})

	router.PUT("/api/v1/recipe/:id", func(c *gin.Context) {
	})

	router.DELETE("/api/v1/recipe/:id", func(c *gin.Context) {
	})

	router.GET("/api/v1/user/:id", func(c *gin.Context) {
	})

	router.POST("/api/v1/user", func(c *gin.Context) {
	})

	router.DELETE("/api/v1/user", func(c *gin.Context) {
	})

	router.Run("localhost:8080")
}
