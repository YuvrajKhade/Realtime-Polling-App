package com.pollApp.realTimePollRooms.repository;

import com.pollApp.realTimePollRooms.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollRepository extends JpaRepository<Poll,String> {
}
