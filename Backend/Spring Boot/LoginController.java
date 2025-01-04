package com.fullstackapplication.Backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fullstackapplication.Backend.Model.Logins;
import com.fullstackapplication.Backend.Repository.LoginRepo;

@RestController
@CrossOrigin("http://localhost:3000/")
public class LoginController {
	@Autowired
	private LoginRepo repo;
	
	@PostMapping("/insert")
	Logins newUser(@RequestBody Logins newUser) {
		return repo.save(newUser);
	}
	@GetMapping("/users")
	List<Logins> getAllUsers(){
		return repo.findAll();
	}
}
