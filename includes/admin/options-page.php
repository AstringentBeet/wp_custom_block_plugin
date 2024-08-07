<?php

//https://developer.wordpress.org/news/2023/08/01/understand-and-use-wordpress-nonces-properly/#what-if-i-tell-you-that-wordpress-nonce-is-not-a-nonce
function up_plugins_options_page() {

    $options = get_option('up_options');
    ?>
    <div class ="wrap">
    <h1><?php esc_html_e('Udemy Plus Settings', 'udemy-plus' ); ?></h1>

    <?php 

        if(isset($_GET['status']) && $_GET['status'] == '1') {
            ?>
            <div class="notice notice-success inline">
                <p>
                    <?php esc_html_e('Options udated successfully!', 'udemy-plus'); ?>
                </p>
            </div>
            <?php
        }

    ?>

        <form novalidate="novalidate" method ="POST" action="admin-post.php">
            <input type="hidden" name="action" value="up_save_options"/>
            <?php wp_nonce_field('up_options_verify'); ?>
            <table class="form-table">
                <tbody>
                <!-- Open Graph Title -->
                <tr>
                    <th>
                    <label for="up_og_title">
                        <?php esc_html_e('Open Graph Title', 'udemy-plus'); ?>
                    </label>
                    </th>
                    <td>
                    <input name="up_og_title" type="text" id="up_og_title"
                        class="regular-text" 
                        value="<?php echo esc_attr($options['og_title']); ?>"
                        />
                    </td>
                </tr>
                <!-- Open Graph Image -->
                <tr>
                    <th>
                    <label for="up_og_image">
                        <?php esc_html_e('Open Graph Image', 'udemy-plus'); ?>
                    </label>
                    </th>
                    <td>
                    <input type="hidden" name="up_og_image" id="up_og_image"
                    value="<?php echo esc_attr($options['og_img']); ?>"
                    />
                    <img id="og-img-preview" src="<?php echo esc_attr($options['og_img']); ?>">
                    <a href="#" class="button-primary" id="og-img-btn">
                        Select Image
                    </a>
                    </td>
                </tr>
                <!-- Open Graph Description -->
                <tr>
                    <th>
                    <label for="up_og_description">
                        <?php esc_html_e('Open Graph Description', 'udemy-plus'); ?>
                    </label>
                    </th>
                    <td>
                    <textarea 
                        id="up_og_description" 
                        name="up_og_description"
                        class="large-text"
                    ><?php echo esc_html($options['og_description']); ?></textarea>
                    </td>
                </tr>
                <!-- Enable Open Graph -->
                <tr>
                    <th>
                    <?php esc_html_e('Open Graph', 'udemy-plus'); ?>
                    </th>
                    <td>
                    <label for="up_enable_og"> 
                    <input name="up_enable_og" type="checkbox" id="up_enable_og" 
                        value="1" <?php checked('1', $options['enable_og']); ?> /> 
                    <span>Enable</span>
                    </label>
                    </td>
                </tr>
                </tbody>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}