package com.services.accounts.dtos;

public class UpdateProfileRequestDto {
    private String firstName;
    private String lastName;
    private String shippingAddress;
    private String birthDate;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public String getBirthDate() {
        return birthDate;
    }
}
