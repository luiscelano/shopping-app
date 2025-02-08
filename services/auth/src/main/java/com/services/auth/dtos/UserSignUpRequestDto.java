package com.services.auth.dtos;

import java.util.Map;

public class UserSignUpRequestDto {
    private String firstName;
    private String lastName;
    private String shippingAddress;
    private String email;
    private String password;
    private String birthDate;

    public UserSignUpRequestDto(Map<String, Object> input) {
        this.firstName = input.get("firstName").toString();
        this.lastName = input.get("lastName").toString();
        this.shippingAddress = input.get("shippingAddress").toString();
        this.email = input.get("email").toString();
        this.password = input.get("password").toString();
        this.birthDate = input.get("birthDate").toString();
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getBirthDate() {
        return birthDate;
    }
}
