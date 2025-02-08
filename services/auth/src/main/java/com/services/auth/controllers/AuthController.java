package com.services.auth.controllers;

import com.services.auth.dtos.UserSignUpRequestDto;
import com.services.auth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    UserService userService;

    @PostMapping("/signup")
    public Map<String, Object> signUp(@RequestBody Map<String, Object> request) {
        UserSignUpRequestDto userRequest = new UserSignUpRequestDto(request);
        return this.userService.signUp(userRequest);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, Object> request) {
        return this.userService.login(request.get("email").toString(), request.get("password").toString());
    }


    @PostMapping("/password/recovery/request")
    public String requestPasswordRecovery(@RequestBody Map<String, Object> request) {
        return this.userService.requestPasswordRecovery(request.get("email").toString());
    }

    @PostMapping("/password/reset")
    public String resetPassword(@RequestBody Map<String, Object> request) {
        return this.userService.resetPassword(request.get("recoveryToken").toString(), request.get("newPassword").toString());
    }
}
