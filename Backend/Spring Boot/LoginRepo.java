package com.fullstackapplication.Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fullstackapplication.Backend.Model.Logins;

public interface LoginRepo extends JpaRepository<Logins, Integer> {

}
