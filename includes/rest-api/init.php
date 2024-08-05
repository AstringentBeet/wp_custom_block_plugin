<?php

    function up_rest_api_init() {
        register_rest_route('up/v1', '/signup',[
            //The static class below contains the same value as POST.
            //The main benefits of using this class is for readability,
            //consistency, error reduction, and maintainability. 
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => 'up_rest_api_signup_handler',
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('up/v1', '/signin', [
            'methods' => WP_REST_Server::EDITABLE,
            'callback' => 'up_rest_api_signin_handler',
            'permission_callback' => '__return_true'
        ]);

        register_rest_route('up/v1', '/rate', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => 'up_rest_api_add_rating_handler',
            'permission_callback' => 'is_user_logged_in'
        ]);

        register_rest_route('up/v1', '/daily-recipe', [
            'methods'   =>  WP_REST_Server::READABLE,
            'callback'  =>  'up_rest_api_daily_recipe_handler',
            'permission_callback' => '__return_true'
        ]);
    }