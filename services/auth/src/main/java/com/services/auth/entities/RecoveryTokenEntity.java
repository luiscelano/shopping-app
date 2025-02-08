package com.services.auth.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "recoveryTokens")
public class RecoveryTokenEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recoveryTokenId;

    @Column(nullable = false)
    private String token;

    @Column(insertable=false, updatable=false)
    private Integer userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private UserEntity user;

    public Integer getRecoveryTokenId() {
        return recoveryTokenId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
