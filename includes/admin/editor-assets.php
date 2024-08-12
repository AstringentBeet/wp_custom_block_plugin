<?php

function up_enqueue_block_assets(){
    wp_enqueue_script('up_editor');
    wp_enqueue_style('up_neon');
}