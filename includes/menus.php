<?php
//https://developer.wordpress.org/reference/functions/add_menu_page/
//https://wordpress.org/documentation/article/roles-and-capabilities/
function up_admin_menus() {
    add_menu_page(
        __('Udemy Plus', 'udemy-plus'),
        __('Udemy Plus', 'udemy-plus'),
        'edit_theme_options',
        'up_plugin_options',
        'up_plugins_options_page',
        plugins_url('letter-u.svg', UP_PLUGIN_FILE)
    );
}