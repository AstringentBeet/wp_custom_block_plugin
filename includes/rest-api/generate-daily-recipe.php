<?php

function up_generate_daily_recipe() {
    global $wpdb;
    $id = $wpdb->get_var(
        "SELECT ID FROM {$wpdb->posts}
         WHERE post_status='publish' AND post_type='recipe'
         ORDER BY RAND() LIMIT 1"
    );

    //https://developer.wordpress.org/apis/transients/
    set_transient('up_daily_recipe_id', $id, DAY_IN_SECONDS);
    return $id;
}