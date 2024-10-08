<?php
//https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#advanced-usage
//https://developer.wordpress.org/reference/functions/wp_register_script/
function up_register_assets() {
    wp_register_style(
        'up_admin',
        plugins_url('/build/admin/index.css', UP_PLUGIN_FILE),
    );

    $adminAssets = include(UP_PLUGIN_DIR . 'build/admin/index.asset.php');

    wp_register_script(
        'up_admin',
        plugins_url('/build/admin/index.js', UP_PLUGIN_FILE),
        $adminAssets['dependencies'],
        $adminAssets['version'],
        true
    );

    $editor_asset = include(UP_PLUGIN_DIR . 'build/block-editor/index.asset.php');
   
    wp_register_script(
        'up_editor',
        plugins_url('/build/block-editor/index.js', UP_PLUGIN_FILE),
        $editor_asset['dependencies'],
        $editor_asset['version'],
        true
    );
    wp_register_style(
        'up_editor',
        plugins_url('/build/block-editor/index.css', UP_PLUGIN_FILE),
    );
}