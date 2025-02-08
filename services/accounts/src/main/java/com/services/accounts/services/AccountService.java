package com.services.accounts.services;

import com.services.accounts.dtos.UpdateProfileRequestDto;
import com.services.accounts.entities.UserEntity;
import com.services.accounts.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    UserRepository userRepository;


    public Optional<UserEntity> getProfile(Integer userId) {

        return this.userRepository.findById(Long.valueOf(userId));
    }

    public UserEntity updateProfile(UpdateProfileRequestDto input, Integer userId) {

        try {
            Optional<UserEntity> userEntity = this.getProfile(userId);

            if(userEntity.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
            }
            UserEntity updatedUserEntity = getUpdatedUserEntity(input, userEntity.get());

            return this.userRepository.save(updatedUserEntity);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private UserEntity getUpdatedUserEntity(UpdateProfileRequestDto input, UserEntity userEntity) throws ParseException {
        userEntity.setFirstName(input.getFirstName());
        userEntity.setLastName(input.getLastName());
        userEntity.setShippingAddress(input.getShippingAddress());

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        userEntity.setBirthDate(formatter.parse(input.getBirthDate()));

        return userEntity;
    }
}
