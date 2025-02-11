package com.services.auth.services;

import com.services.auth.dtos.UserSignUpRequestDto;
import com.services.auth.entities.RecoveryTokenEntity;
import com.services.auth.entities.UserEntity;
import com.services.auth.repositories.RecoveryTokenRepository;
import com.services.auth.repositories.UserRepository;
import com.services.auth.utils.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RecoveryTokenRepository recoveryTokenRepository;

    @Autowired
    JwtUtil jwt;

    @Autowired
    EmailService emailService;

    public Map<String, Object> signUp(UserSignUpRequestDto user) {
        try {
            Boolean existsByEmail = this.userRepository.existsByEmail(user.getEmail());

            if(existsByEmail) {
                throw new Exception("Error al registrarse");
            }

            UserEntity userEntity = getUserEntity(user);

            UserEntity userEntityResult = this.userRepository.save(userEntity);

            Map<String, Object> response = new HashMap<>();
             response.put("accessToken", this.jwt.generateToken(userEntityResult.getUserId()));
             response.put("user", getMappedUser(userEntityResult));
            return response;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    private static UserEntity getUserEntity(UserSignUpRequestDto user) throws ParseException {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(user.getPassword());

        UserEntity userEntity = new UserEntity();
        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setShippingAddress(user.getShippingAddress());
        userEntity.setEmail(user.getEmail());
        userEntity.setPassword(hashedPassword);

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        userEntity.setBirthDate(formatter.parse(user.getBirthDate()));
        return userEntity;
    }

    public Map<String, Object> login(String email, String password) {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            Optional<UserEntity> existingUser = this.userRepository.findByEmail(email);

            if(existingUser.isEmpty()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"correo y/o contraseña incorrectos");
            }

            if(!encoder.matches(password, existingUser.get().getPassword())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"correo y/o contraseña incorrectos");
            }

            Map<String, Object> response = new HashMap<>();

            response.put("accessToken", this.jwt.generateToken(existingUser.get().getUserId()));
            response.put("user", getMappedUser(existingUser.get()));
            return response;
        } catch (ResponseStatusException e) {
            throw new ResponseStatusException(e.getStatusCode(),e.getMessage());
        }
    }

    private Map<String, Object> getMappedUser(UserEntity user) {
        Map<String, Object> output = new HashMap<>();

        output.put("firstName", user.getFirstName());
        output.put("lastName", user.getLastName());
        output.put("shippingAddress", user.getShippingAddress());
        output.put("birthDate", user.getBirthDate());
        output.put("email", user.getEmail());
        return output;
    }

    public String requestPasswordRecovery(String email) {
        try {
            Optional<UserEntity> user = this.userRepository.findByEmail(email);

            if(user.isEmpty()) {
                throw new Exception("usuario no existe");
            }

            String token = generateRandomCode();

            RecoveryTokenEntity recoveryTokenEntity = new RecoveryTokenEntity();

            recoveryTokenEntity.setToken(token);
            recoveryTokenEntity.setUser(user.get());
            this.recoveryTokenRepository.save(recoveryTokenEntity);

            String message = "Ingresa al siguiente enlace para recuperar tu contraseña http://localhost:4000/auth/reset-password?token=" + token;

            this.emailService.sendEmail(email, "Recuperación de contraseña", message);

            return "ok";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public String resetPassword(String token, String newPassword) {
        try {
            Optional<RecoveryTokenEntity> recoveryTokenResult = this.recoveryTokenRepository.findByToken(token);

            if(recoveryTokenResult.isEmpty()) {
                throw new Error("El token es inválido o ya ha sido utilizado");
            }

            UserEntity userEntity = recoveryTokenResult.get().getUser();
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            userEntity.setPassword(encoder.encode(newPassword));
            userEntity.setRecoveryTokenEntity(null);

            this.userRepository.save(userEntity);

            return "ok";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static String generateRandomCode() {
        String charSet = "1234567890";
        int serialLength = 20;
        StringBuilder randomCode = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < serialLength; i++) {
            char randomChar = charSet.charAt(random.nextInt(charSet.length()));
            randomCode.append(randomChar);
        }

        return randomCode.toString();
    }
}
