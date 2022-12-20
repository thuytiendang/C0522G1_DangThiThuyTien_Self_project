package com.example.service.decentralization;




import com.example.dto.decentralization.IUserEmailDto;
import com.example.model.decentralization.User;

import java.util.List;
import java.util.Optional;


public interface IUserService {
    String existsByUserName(String username);

    Optional<User> findUserByUsername(String username);

    List<User> findAll();

    Optional<User> findByUsername(String name);

    Optional<IUserEmailDto> findByEmail(String email);

    Optional<IUserEmailDto> findByUsernameDto(String username);

    void updatePassword(User user, String newPassword);

    void saveCreateGmail(User user);

    Optional<User> showUsername(String username);

    void updateUser(User user, String username);

}
