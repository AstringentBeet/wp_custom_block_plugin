<?php

function up_wp_head(){
    $options=get_option('up_options');

    if($options['enable_og'] != 1) {
        return;
    }

    $title = $options['og_title'];
    $description = $options['og_description'];
    $image = $options['og_image'];
    $url = site_url('/');

    if(is_single()) {
        $post_id = get_the_id();

        $new_title = get_post_meta($post_id, 'og_title', true);
        $title = empty($new_title) ? $title : $new_title;

        $new_description = get_post_meta($post_id, 'og_desription', true);
        $description = empty($new_description) ? $title : $new_description;

        $override_image = get_post_meta($post_id, 'og_override_image', true);
        $image = $override_image ? 
                get_post_meta($post_id, 'og_image', true) : 
                get_the_post_thumbnail($post_id, 'opengraph');
        $url = get_permalink($post_id);
    }


?>
    <meta property="og:title" 
        content = "<?php echo esc_attr($title)?>" />

    <meta property="og:description" 
        content="<?php echo esc_attr($description); ?>" />

    <meta property="og:image" 
        content="<?php echo esc_attr($image); ?>" />

    <meta property="og:type" 
        content="website" />

    <meta property="og:url" 
        content="<?php echo esc_attr($url) ?>" />
        
<?php
}