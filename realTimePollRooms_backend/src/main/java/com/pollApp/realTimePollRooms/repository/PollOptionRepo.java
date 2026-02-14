package com.pollApp.realTimePollRooms.repository;

import com.pollApp.realTimePollRooms.model.PollOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollOptionRepo extends JpaRepository<PollOption,Long> {
}
