<?php

function up_enqueue_block_assets(){
    $editor_asset = include(UP_PLUGIN_DIR . 'build/block-editor/index.asset.php');
   
    wp_enqueue_script(
        'up_editor',
        plugins_url('/build/block-editor/index.js', UP_PLUGIN_FILE),
        $editor_asset['dependencies'],
        $editor_asset['version'],
        true
    );
    wp_enqueue_style(
        'up_editor',
        plugins_url('/build/block-editor/index.css', UP_PLUGIN_FILE),
    );
}