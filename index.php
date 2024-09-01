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
define('UP_PLUGIN_FILE', __FILE__);
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
add_action('init', 'up_register_custom_post_type');
add_action('cuisine_add_form_fields', 'up_cuisine_add_form_fields');
add_action('create_cuisine', 'up_save_cuisine_meta');
add_action('cuisine_edit_form_fields', 'up_cuisine_edit_form_fields');
add_action('edited_cuisine', 'up_save_cuisine_meta');
add_action('saved_post_recipe', 'up_save_post_recipe');

//custom image size
add_action('after_setup_theme', 'up_setup_theme');
//A filter hook is a function that returns a new or modified value.
add_filter('image_size_names_choose', 'up_custom_image_sizes');
//https://developer.wordpress.org/reference/hooks/rest_this-post_type_query/
add_filter('rest_recipe_query', 'up_rest_recipe_query', 10, 2);
add_action('admin_menu', 'up_admin_menus');
add_action('admin_post_up_save_options', 'up_save_options');
add_action('admin_enqueue_scripts', 'up_admin_enqueue');
add_action('init', 'up_register_assets');
add_action('admin_init', 'up_settings_api');
add_action('enqueue_block_assets', 'up_enqueue_block_assets');
add_action('wp_head', 'up_wp_head');
add_action('init', 'up_load_php_translations');
add_action('wp_enqueue_scripts', 'up_load_block_translations', 100);