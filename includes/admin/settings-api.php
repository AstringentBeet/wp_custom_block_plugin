<?php

//https://developer.wordpress.org/plugins/settings/settings-api/
//https://developer.wordpress.org/apis/options/
function up_settings_api() {
    register_setting('up_options_group', 'up_options');

    add_settings_section(
        'up_options_section',
        __('Udemy Plus Sections', 'udemy-plus'),
        'up_options_section_cb',
        'up-options-page'
    );

    add_settings_field(
        'og_title_input',
        __('Open Graph Title', 'udemy-plus'),
        'og_title_input_cb',
        'up-options-page',
        'up_options_section'
    );

    add_settings_field(
        'og_image_input',
        __('Open Graph Image', 'udemy-plus'),
        'og_image_input_cb',
        'up-options-page',
        'up_options_section'
    );

    add_settings_field(
        'og_descriotion_input',
        __('Open Graph Description', 'udemy-plus'),
        'og_description_input_cb',
        'up-options-page',
        'up_options_section'
    );

    add_settings_field(
        'og_enable_input',
        __('Open Enable Title', 'udemy-plus'),
        'og_enable_input_cb',
        'up-options-page',
        'up_options_section'
    );
}

function og_title_input_cb(){
    $options = get_option('up_options');
    ?>
    <input class="regular-text" name="up_options[og_title]" 
    value="<?php echo esc_attr($options['og_title']); ?>" />
    <?php
}

function up_options_section_cb() {
    ?><h4>An alternate form for updating options with the settings API</h4>
    <?php
}

function og_image_input_cb(){
    $options = get_option('up_options');
    ?>
    <input type="hidden" name="up_options[og_img]" id="up_og_image"
      value="<?php echo esc_attr($options['og_img']); ?>">
    <img src="<?php echo esc_attr($options['og_img']); ?>"
      id="og-img-preview">
    <a href="#" class="button-primary" 
      id="og-img-btn">
      Select Image
    </a>
    <?php
  }
  
  function og_description_input_cb(){
    $options = get_option('up_options');
    ?>
    <textarea 
      name="up_options[og_description]"
      class="large-text"
    ><?php echo esc_html($options['og_description']); ?></textarea>
    <?php
  }
  
  function og_enable_input_cb(){
    $options = get_option('up_options');
    ?>
    <label for="up_enable_og"> 
      <input name="up_options[enable_og]" type="checkbox" id="up_enable_og" 
        value="1" <?php checked('1', $options['enable_og']); ?> /> 
      <span>Enable</span>
    </label>
    <?php
  }