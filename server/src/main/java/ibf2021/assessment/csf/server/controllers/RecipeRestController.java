package ibf2021.assessment.csf.server.controllers;

/* Write your request hander in this file */
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ibf2021.assessment.csf.server.models.Recipe;
import ibf2021.assessment.csf.server.services.RecipeService;

import jakarta.json.Json;
import jakarta.json.JsonObject;

import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(path = "/api/recipe", produces = MediaType.APPLICATION_JSON_VALUE)
public class RecipeRestController {

    private final Logger logger = Logger.getLogger(RecipeRestController.class.getName());
	
    private Recipe r;
	private Optional<Recipe> optRecipe;

	@Autowired
	private RecipeService recipeSvc;

	//Listens to POST requests and takes in JSON type
    @GetMapping(path = "/{id}")
	public ResponseEntity<String> getRecipebyId (@PathVariable String id) {
		
        optRecipe = recipeSvc.getRecipeById(id);
        
        if (optRecipe.isPresent()) {
            logger.info("Cache hit %s".formatted(id));
            r=optRecipe.get();
			logger.log(Level.INFO, "\nReceipe is\n" + r);

            return ResponseEntity.status(HttpStatus.OK).body(r.toString());
        }
        else{
            
            final JsonObject resp = Json.createObjectBuilder()
                         .add("message", "RecipeId does not exist")
                         .build();

	logger.log(Level.INFO, "\nresp is \n " + resp);

                     return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp.toString());
        }      
	}
       
    @PostMapping(consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> postRecipen(@RequestBody Recipe r){

        String id = r.getId();
        logger.info("POST >> recipeId %s".formatted(id));

        recipeSvc.addRecipe(r);
        logger.info(r.toString());
        
        final JsonObject resp = Json.createObjectBuilder()
             .add("message", "Added to javaMap")
             .build();
         return ResponseEntity.status(HttpStatus.CREATED).body(resp.toString());
        
    }   
}
