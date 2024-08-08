<?php
//https://developer.wordpress.org/reference/functions/add_menu_page/
//https://wordpress.org/documentation/article/roles-and-capabilities/
function up_admin_menus() {
    add_menu_page(
        __('Udemy Plus', 'udemy-plus'),
        __('Udemy Plus', 'udemy-plus'),
        'edit_theme_options',
        'up-plugin-options',
        // includes/admin/options-page.php
        'up_plugins_options_page',
        plugins_url('letter-u.svg', UP_PLUGIN_FILE)
    );

    add_submenu_page(
        'up-plugin-options',
        __('Alt Udemy Plus'),
        __('Alt Udemy Plus'),
        'edit_theme_options',
        'up-plugin-options-alt',
        'up_plugin_options_alt_page',
    );
}