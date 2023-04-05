package com.cs4050.cinema.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cs4050.cinema.Service.MovieService;
import com.cs4050.cinema.Service.PromotionService;
import com.cs4050.cinema.Model.*;

@RestController
@RequestMapping("/promotions")
@CrossOrigin
public class PromotionController {

    private final PromotionService promotionService;
    private final MovieService movieService;

    public PromotionController(PromotionService promotionService, MovieService movieService) {
        this.promotionService = promotionService;
        this.movieService = movieService;
    } // PromotionController

    @PostMapping("/addPromotion/{movieId}")
    public HttpStatus addPromotion(@RequestBody Promotion promotion, @PathVariable Long movieId) {
        Movie movie =  movieService.getMovieById(movieId);
        if (promotion.getDiscountRate() == 0 || promotion.getPromoCode() == null) {
            return HttpStatus.BAD_REQUEST;
        } // if

        promotionService.addPromotion(promotion, movie);

        return HttpStatus.OK;
    } // addPromotion
} // PromotionController
