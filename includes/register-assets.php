<?php
//https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#advanced-usage
//https://developer.wordpress.org/reference/functions/wp_register_script/
function up_register_assets() {
    wp_register_style(
        'up_admin',
        plugins_url('/build/admin/main.css', UP_PLUGIN_FILE),
    );

    $adminAssets = include(UP_PLUGIN_DIR . 'build/admin/index.asset.php');

    wp_register_script(
        'up_admin',
        plugins_url('/build/admin/index.js', UP_PLUGIN_FILE),
        $adminAssets['dependencies'],
        $adminAssets['version'],
        true
    );
}