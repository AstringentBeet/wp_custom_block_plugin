<?php

    function up_rest_api_signin_handler($request) {
        $response = ['status' => 1];
        $params = $request->get_json_params();

        if(!isset($params['user_login'], $params['password']) || 
        empty($params['user_login']) ||
        empty($params['password'])
     ) {
        $response['error'] = 'Missing login or password';
         return $response;
     }

    $login = $params['user_login'];
    $password = sanitize_text_field($params['password']);

    if(is_email($login)) {
        $login = sanitize_email($login);
        $user = get_user_by('email', $login);
        if ($user) {
            $login = $user->user_login; // Get the actual username
        } else {
            $response['error'] = 'Email not found';
            return $response;
        }
    } else {
        $login = sanitize_text_field($login); // Sanitize as a text field if it's not an email
    }

    $user = wp_signon([
        'user_login' => $login,
        'user_password' => $password,
        'remember' => true
    ]);

    if(is_wp_error($user)) {
        $response['error'] = $user->get_error_message();
        return $response;
    }

     $response['status'] = 2;
     return $response;
    }