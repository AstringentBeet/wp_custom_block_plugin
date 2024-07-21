<?php

function up_activate_plugin() {
    if(version_compare(get_bloginfo('version'), '5.9', '<')) {
        wp_die(__("you must update wordpress to use this function", "udemy-plus"));
    }

    up_recipe_post_type();
    flush_rewrite_rules();
}