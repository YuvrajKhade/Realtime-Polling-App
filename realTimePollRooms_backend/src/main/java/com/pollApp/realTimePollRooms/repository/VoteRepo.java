package com.pollApp.realTimePollRooms.repository;

import com.pollApp.realTimePollRooms.model.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepo extends JpaRepository<Vote,Long> {
    boolean existsByPollIdAndVoterId(String pollId,String voterId);
    boolean existsByPollIdAndVoter(String pollId,String voter);
    long countByOptionId(Long optionId);

}
