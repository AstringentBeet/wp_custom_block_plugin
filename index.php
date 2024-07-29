<?php
/*
 * Plugin Name:       Udemy Plus
 * Plugin URI:        Still figuring that out.
 * Description:       A plugin for adding blocks to a theme
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            Some Rando
 * Text Domain:       udemy-plus
 * Domain Path:       /languages
 */

 if(!function_exists('add_action')) {
    echo "Seems like you found yourself in a place you shouldn't be. Nice try, though.";
    exit;
 }

 //Setup.
 define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));

 //includes 
 $rootFiles = glob(UP_PLUGIN_DIR . 'includes/*.php');
 $subDirectoryFiles = glob(UP_PLUGIN_DIR . 'includes/**/*.php');
 $allFiles = array_merge($rootFiles, $subDirectoryFiles);

 foreach ($allFiles as $fileName) include_once($fileName);

 //hooks
 register_activation_hook(__FILE__, 'up_activate_plugin');
 //'init' is used to initiate hooks after most of wp has been loaded with the exception of headers.
 add_action('init', 'up_register_blocks');
 add_action('rest_api_init', 'up_rest_api_init');
 //queues scripts for the front-end.
 add_action('wp_enqueue_scripts', 'up_enqueue_scripts');

 /**** CUSTOM POST TYPE *****/
 //jfc there are so many functions required for this.
 add_action('init', 'up_recipe_post_type');
 add_action('cuisine_add_form_fields', 'up_cuisine_add_form_fields');
 add_action('create_cuisine', 'up_save_cuisine_meta');
 add_action('cuisine_edit_form_fields', 'up_cuisine_edit_form_fields');
 add_action('edited_cuisine', 'up_save_cuisine_meta');
 add_action('saved_post_recipe', 'up_save_post_recipe');

 //custom image size
 add_action('after_setup_theme', 'up_setup_theme');
 //A filter hook is a function that returns a new or modified value.
 add_filter('image_size_names_choose', 'up_custom_image_sizes');