<?php

    //This will handle the responses to our endpoint
    //In addition, this validates the
    function up_rest_api_signup_handler($request) {
        $response = ['status' => 1];
        $params = $request->get_json_params();

        if(!isset($params["email"], $params["username"], $params["password"]) || 
           empty($params["email"]) ||
           empty($params["username"]) ||
           empty($params["password"])
        ) {
            $response['error'] = 'Missing required fields';
            return $response['error'];
        }

        $email = sanitize_email($params['email']);
        $username = sanitize_text_field($params['username']);
        $password = sanitize_text_field($params['password']);

        /** prevents a duplicate username and/or email from registering **/

        if(username_exists($username)) {
            $response['error'] = 'username already exists';
            return $response;
        }

        if(!is_email($email)) {
            $response['error'] = 'invalid email';
            return $response;
        }

        if(email_exists( $email )) {
            $response['error'] = 'email already exists';
            return $response;
        }

        $userID = wp_insert_user([
            'user_login' => $username,
            'user_email' => $email,
            'user_pass' => $password
        ]);

        if(is_wp_error($userID)) {
            $response['error'] = $userID->get_error_message();
            return $response;
        }

        /** Sends email to the newly registered user */
        wp_new_user_notification($userID, null, 'user');

        /** As the name implies, sets current user, but doesn't offer 
         *  persistance (remembering the currently logged-in user) */
        wp_set_current_user($userID);

        /** Cookies are what add persistance to the web browser for logged-in users. */
        wp_set_auth_cookie($userID);

        $user = get_user_by('id', $userID);

        do_action('wp_login', $user->user_login, $user);


        $response['status'] = 2;
        return $response;
    }