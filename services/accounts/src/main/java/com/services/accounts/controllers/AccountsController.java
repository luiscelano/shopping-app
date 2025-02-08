package com.services.accounts.controllers;

import com.services.accounts.dtos.UpdateProfileRequestDto;
import com.services.accounts.entities.UserEntity;
import com.services.accounts.services.AccountService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/accounts")
public class AccountsController {

    @Autowired
    AccountService accountService;

    @GetMapping("/profile")
    public Optional<UserEntity> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Claims claims = (Claims) authentication.getDetails();
        return this.accountService.getProfile(Integer.parseInt(claims.get("userId").toString()));
    }

    @PatchMapping("/profile")
    public UserEntity updateProfile(@RequestBody UpdateProfileRequestDto request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Claims claims = (Claims) authentication.getDetails();
        return this.accountService.updateProfile(request, Integer.parseInt(claims.get("userId").toString()));
    }
}
