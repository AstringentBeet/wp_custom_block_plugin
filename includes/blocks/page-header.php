<?php

    function up_page_header_render_cb($atts) {
        $content = isset($atts['content']) ? $atts['content'] : "";
        $showCategory = isset($atts['showCategory']) ? $atts['showCategory'] : false;

        if($showCategory) {
            $heading = get_the_archive_title();
        } else {
            $heading = esc_html($content);
        }

        ob_start();
?>

        <div class = "wp-block-udemy-plus-page-header">
            <div class="inner-page-header">
                <h1><?php echo $heading; ?></h1>
            </div>
        </div>

<?php
        $output = ob_get_contents();
        ob_end_clean();
        return $output;
    }