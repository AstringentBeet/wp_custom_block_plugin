<?php

//https://developer.wordpress.org/reference/functions/do_settings_sections/
//https://developer.wordpress.org/plugins/settings/settings-api/

function up_plugin_options_alt_page() {
    ?>

    <div class = "wrap">
        <form method = "POST" action="options.php">
            <?php 
                settings_fields('up_options_group'); 
                do_settings_sections('up-options-page');
                submit_button();
            ?>
        </form>
    </div>

    <?php
}