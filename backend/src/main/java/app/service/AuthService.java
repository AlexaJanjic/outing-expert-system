package app.service;

import app.dto.LoginRequest;
import app.dto.RegisterRequest;
import app.exception.ApiException;
import app.model.user.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import app.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void Register(RegisterRequest registerRequest){

        if(userRepository.existsUserByUsername(registerRequest.getUsername())){
            throw new ApiException("Username already exists");
        }

        if(userRepository.existsUserByEmail(registerRequest.getEmail())){
            throw new ApiException("Email already exists");
        }

        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setUsername(registerRequest.getUsername());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        userRepository.save(user);
    }

    public User Login(LoginRequest loginRequest){
        User user = userRepository.findByUsername(loginRequest.getUsername()).orElse(null);

        if (user == null){
            throw new ApiException("User not found");
        }

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new ApiException("Password invalid");
        }

        return user;
    }
}