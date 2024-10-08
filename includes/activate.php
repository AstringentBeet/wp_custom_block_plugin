<?php

function up_activate_plugin() {
    if(version_compare(get_bloginfo('version'), '5.9', '<')) {
        wp_die(__("you must update wordpress to use this function", "udemy-plus"));
    }

    up_register_custom_post_type();
    flush_rewrite_rules();

    global $wpdb;
    $tableName = "{$wpdb->prefix}recipe_rating";
    $charsetCollate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE {$tableName} (
                ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
                post_id bigint(20) unsigned NOT NULL,
                user_id bigint(20) unsigned NOT NULL,
                rating float(3,2) unsigned NOT NULL
            ) ENGINE='InnoDB' {$charsetCollate};";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    dbDelta($sql);

    //https://ogp.me/
    //Basically allows parts of your website to be previewable by turning it into a graph.
    // read the rest by visiting the link; I'm exhausted...
    $options = get_option('up_options');

    if(!$options) {
        add_option('up_options', [
            'og_title'  =>  get_bloginfo('name'),
            'og_img'    =>  '',
            'og_description'    =>  get_bloginfo('description'),
            'enable_og'   =>    1
        ]);
    }
}