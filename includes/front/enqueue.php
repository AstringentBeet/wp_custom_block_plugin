<?php 
    
    //Refer to lesson 186 for more details behind the making of this file,
   function up_enqueue_scripts() {
        $authURLs = json_encode([
            'signup' => esc_url_raw(rest_url('up/v1/signup')),
            'signin' => esc_url_raw(rest_url('up/v1/signin'))
        ]);

        wp_add_inline_script( 
            'udemy-plus-auth-modal-view-script',
            "const up_auth_rest = {$authURLs}",
            'before'
        ); 

        wp_enqueue_style('up_editor');
    } 