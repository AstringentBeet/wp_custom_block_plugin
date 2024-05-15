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
include(UP_PLUGIN_DIR . 'includes/register-blocks.php');

 //hooks
 add_action('init', 'up_register_blocks');