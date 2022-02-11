package ibf2021.assessment.csf.server.controllers;

/* Write your request hander in this file */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.services.RecipeService;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(path="/api/recipes", produces=MediaType.APPLICATION_JSON_VALUE)
public class RecipesRestController {

    private final Logger logger = Logger.getLogger(RecipesRestController.class.getName());
	
	@Autowired
	private RecipeService recipeSvc;

	//Listens to GET requests and return any results
	@GetMapping
	public ResponseEntity<String> getAllRecipes() {

        logger.log(Level.INFO, "\nEntered getAllRecipes\n");

		return ResponseEntity.ok(recipeSvc.getAllRecipes().toString());
	}

}
